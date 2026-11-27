import webinarConfig from './webinar'
import { refundPolicyText } from './legal'

export const faq = [
  ['What is this masterclass about?', 'This live masterclass focuses on understanding PCOS, hormonal health, balanced nutrition and sustainable lifestyle habits that can fit into everyday life.'],
  ['When is the webinar?', 'The live webinar is scheduled for ' + webinarConfig.webinar.summary + '.'],
  ['Who can attend this masterclass?', 'The masterclass is designed for women who want to understand PCOS, nutrition and hormonal wellness better, including women who have been diagnosed with PCOS or PCOD.'],
  ['Do I need a confirmed PCOS diagnosis to attend?', 'No. Anyone interested in learning about PCOS and women’s hormonal health can attend. The webinar does not provide an individual medical diagnosis.'],
  ['Do I need to follow a strict diet?', 'No. The masterclass focuses on balanced nutrition and sustainable lifestyle habits rather than extreme dietary restrictions.'],
  ['Will I have to stop eating rice, roti or my favourite foods?', 'The masterclass explores balanced nutrition using familiar Indian foods and everyday meals. Individual dietary requirements may vary.'],
  ['Will I receive a personalised diet plan?', 'This is a group educational masterclass. Personalised nutrition plans and medical recommendations require an individual assessment.'],
  ['Can I attend if I am planning a pregnancy?', 'Yes. The masterclass provides general educational information about PCOS and hormonal wellness. Individual fertility concerns should be discussed with a qualified healthcare professional.'],
  ['Do I need to stop my current medicines?', 'No. Continue your prescribed medications and consult your treating healthcare professional before making any changes.'],
  ['Does my husband or family need to attend?', 'No. You can attend independently. Additional attendee access is subject to the webinar registration policy.'],
  ['Will I be able to ask questions during the webinar?', 'The masterclass includes a live Q&A session covering common questions about PCOS, nutrition and lifestyle habits. Individual medical consultations are not included.'],
  ['Can I attend using my mobile phone?', 'Yes. You can join the live online masterclass using a smartphone, tablet, laptop or desktop computer with a stable internet connection.'],
  ['How will I receive the webinar joining link?', 'After successful registration and payment verification, joining instructions will be shared through the confirmed communication channels.'],
  ['Are eBooks included with registration?', 'Yes! All registered participants will receive three complimentary eBooks by Dr. Vaishnavi Jayawant after successful payment.'],
  ['Will I receive a recording of the webinar?', 'No. This is a live, interactive webinar, and no recording will be provided. If you miss the session, you will be notified about the next scheduled webinar and can attend that session.'],
  ['What if I miss the live webinar?', 'If you are unable to attend the scheduled webinar, our team will inform you about the next available session. You may attend that session without registering again.'],
  ['Do I need to share personal medical information during the webinar?', 'No. You can ask general questions during the live Q&A without sharing sensitive medical information.'],
  ['What is the refund and cancellation policy?', refundPolicyText],
].map(([question, answer]) => ({ question, answer }))
