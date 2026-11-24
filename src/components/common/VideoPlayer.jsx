import { Play, VideoOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import './video-player.css'

export default function VideoPlayer({ poster, video, captions, developmentPoster, descriptionId }) {
  const player = useRef(null)
  const playButton = useRef(null)
  const [active, setActive] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (active) player.current?.focus()
    else if (failed) playButton.current?.focus()
  }, [active, failed])

  function playbackFailed() {
    setActive(false)
    setFailed(true)
  }

  function play() {
    const element = player.current
    if (!element || !video) return

    // Reveal the native player and keep play() within the same user activation.
    flushSync(() => {
      setFailed(false)
      setActive(true)
    })
    element.src = video
    element.play().catch(playbackFailed)
  }

  return (
    <div className="intro-player">
      <img className="intro-poster" src={poster} alt="" loading="lazy" decoding="async" width={1280} height={720} />
      {video && (
        <video
          ref={player}
          className="intro-native-video"
          poster={poster}
          controls
          playsInline
          preload="none"
          tabIndex={0}
          hidden={!active}
          aria-label="Introduction video"
          aria-describedby={descriptionId}
          onError={playbackFailed}
        >
          {active && captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
        </video>
      )}
      {!active && (
        <div className="intro-player-overlay">
          {developmentPoster && (
            <span className="intro-poster-label">Development preview · AI-generated presenter</span>
          )}
          {video ? (
            <button
              ref={playButton}
              className="intro-play-button pulse-ring"
              type="button"
              aria-label={failed ? 'Retry introduction video' : 'Play introduction video'}
              aria-describedby={descriptionId}
              onClick={play}
            >
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          ) : (
            <span className="intro-preview-icon" aria-hidden="true"><VideoOff /></span>
          )}
          {(!video || failed) && (
            <p className="intro-player-status" role={failed ? 'status' : undefined}>
              {failed ? 'Unable to play the video. Try again.' : 'Preview only · Introduction video unavailable'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
