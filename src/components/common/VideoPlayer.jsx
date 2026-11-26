import { LoaderCircle, Play, Volume2 } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { hasBlockingModal } from '../../config/offer'
import '../../styles/animations.css'
import './video-player.css'

export default function VideoPlayer({ poster, video, captions }) {
  const player = useRef(null)
  const frame = useRef(null)
  const eligible = useRef(false)
  const wantsPlayback = useRef(true)
  const managedPauses = useRef(0)
  const attempt = useRef(0)
  const [visible, setVisible] = useState(false)
  const [muted, setMuted] = useState(true)
  const [controls, setControls] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [problem, setProblem] = useState(null)
  const hintId = useId()

  function pauseForPage(element) {
    element.autoplay = false
    attempt.current += 1
    if (!element.paused) {
      managedPauses.current += 1
      element.pause()
    }
  }

  function play(element) {
    const currentAttempt = ++attempt.current
    element.play().catch((error) => {
      if (attempt.current !== currentAttempt || !eligible.current) return
      element.autoplay = false
      wantsPlayback.current = false
      setProblem(error.name === 'NotAllowedError' ? 'blocked' : 'failed')
    })
  }

  useEffect(() => {
    const element = player.current
    let inView = false
    let inlineFullscreen = false

    function sync() {
      const fullscreen = inlineFullscreen || document.fullscreenElement === element
      const canPlay = (inView || fullscreen) && !document.hidden && !hasBlockingModal()
      if (canPlay === eligible.current) return
      eligible.current = canPlay
      setVisible(canPlay)
      if (!canPlay) {
        pauseForPage(element)
      } else if (wantsPlayback.current && element.paused && !element.ended) {
        // Enable native autoplay only after the first viewport check.
        element.autoplay = element.muted
        play(element)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.5
      sync()
    }, { threshold: 0.5 })
    const modals = new MutationObserver(sync)
    const onFullscreenStart = () => { inlineFullscreen = true; sync() }
    const onFullscreenEnd = () => { inlineFullscreen = false; sync() }

    observer.observe(frame.current)
    modals.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'hidden', 'role', 'aria-modal', 'data-checkout-active'],
    })
    document.addEventListener('visibilitychange', sync)
    document.addEventListener('fullscreenchange', sync)
    element.addEventListener('webkitbeginfullscreen', onFullscreenStart)
    element.addEventListener('webkitendfullscreen', onFullscreenEnd)

    return () => {
      observer.disconnect()
      modals.disconnect()
      document.removeEventListener('visibilitychange', sync)
      document.removeEventListener('fullscreenchange', sync)
      element.removeEventListener('webkitbeginfullscreen', onFullscreenStart)
      element.removeEventListener('webkitendfullscreen', onFullscreenEnd)
    }
  }, [])

  function activate() {
    const element = player.current
    if (!eligible.current || hasBlockingModal() || document.hidden) return
    if (element.error) {
      setReady(false)
      setLoading(true)
      element.load()
    }
    if (!problem) {
      element.muted = false
      setMuted(false)
      setControls(true)
      if (document.activeElement?.closest('.intro-player-overlay')) element.focus()
    }
    wantsPlayback.current = true
    setProblem(null)
    play(element)
  }

  const showOverlay = muted || Boolean(problem)
  const ActionIcon = problem ? Play : Volume2

  return (
    <>
      <div className="intro-player" ref={frame} data-visible={visible}>
        <video
          ref={player}
          className="intro-native-video"
          src={video}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          controls={controls}
          tabIndex={controls ? 0 : -1}
          aria-label="Introduction video"
          aria-describedby={muted && !problem ? hintId : undefined}
          onLoadedData={() => setReady(true)}
          onWaiting={() => setLoading(true)}
          onPlaying={(event) => {
            event.currentTarget.autoplay = false
            setLoading(false)
            setProblem(null)
          }}
          onPlay={(event) => {
            if (eligible.current && !hasBlockingModal() && !document.hidden) wantsPlayback.current = true
            else pauseForPage(event.currentTarget)
          }}
          onPause={() => {
            if (managedPauses.current) managedPauses.current -= 1
            else wantsPlayback.current = false
          }}
          onEnded={() => { wantsPlayback.current = false }}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          onError={() => {
            wantsPlayback.current = false
            setProblem('failed')
          }}
        >
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
        </video>
        <img className="intro-poster" src={poster} alt="" data-ready={ready} />
        {loading && !problem && <LoaderCircle className="intro-player-spinner" aria-hidden="true" />}
        <div className="intro-player-overlay" data-shown={showOverlay} inert={!showOverlay}>
          <button className="intro-play-button" type="button" onClick={activate}>
            <span className="intro-play-button-face">
              <ActionIcon aria-hidden="true" size={20} />
              {problem === 'failed' ? 'Retry Video' : problem ? 'Play Video' : 'Tap for Sound'}
            </span>
          </button>
          {problem === 'failed' && <p className="intro-player-status" role="status">Unable to play the video. Try again.</p>}
        </div>
      </div>
      {muted && !problem && (
        <p className="intro-video-hint" id={hintId}>
          <Volume2 aria-hidden="true" size={17} />
          Tap the video to turn the sound on
        </p>
      )}
    </>
  )
}
