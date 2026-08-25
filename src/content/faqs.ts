/**
 * Practice-level FAQs (PRD s7, s48).
 *
 * Answers are drawn from published practice information (hours, prices, policies on
 * ldic.ie as of August 2026). Treatment-specific FAQs live with each treatment in
 * content/treatments.ts so that the FAQPage schema on a treatment page stays about that
 * treatment.
 */

export type Faq = { question: string; answer: string };

export type FaqGroup = { slug: string; title: string; faqs: Faq[] };

/** Shown on the homepage (PRD s7) - kept short and booking-oriented. */
export const homepageFaqs: Faq[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can request an appointment online at any time and the practice will confirm it with you, or phone (01) 628 1500 during opening hours. New patients are welcome.",
  },
  {
    question: "Where is the practice?",
    answer:
      "Lucan Dental & Implantology Centre is in Lucan Village, Co. Dublin, opposite AIB Bank.",
  },
  {
    question: "What are the opening hours?",
    answer:
      "Monday to Friday, 9am to 5pm, with some Saturdays by appointment only.",
  },
  {
    question: "How much is a check-up?",
    answer:
      "A general dentist exam is €60 for existing patients, or €110 with teeth cleaning. A PRSI exam is free once per year, subject to eligibility. The full price list is published on the pricing page.",
  },
  {
    question: "Do you treat dental emergencies?",
    answer:
      "Yes. An emergency appointment is €100. Phone (01) 628 1500 so the problem can be triaged and you can be given the soonest suitable appointment.",
  },
  {
    question: "Do you take children?",
    answer:
      "Yes. A child's exam is €50, or €80 with an X-ray and prescription, and fissure sealants are €50 per tooth.",
  },
];

export const faqGroups: FaqGroup[] = [
  {
    slug: "appointments",
    title: "Appointments",
    faqs: [
      {
        question: "Are you taking new patients?",
        answer:
          "Yes. The practice welcomes new patients. You can request an appointment online or phone (01) 628 1500.",
      },
      {
        question: "What happens at a first appointment?",
        answer:
          "Your dentist takes time to listen to your concerns, examines your teeth and gums, explains the options and provides a clear, written treatment plan.",
      },
      {
        question: "What if I need to change my appointment?",
        answer:
          "The practice asks for at least 24 hours' notice to reschedule. Late cancellation or non-attendance fees may otherwise apply.",
      },
      {
        question: "Can I ask for a particular dentist?",
        answer:
          "Yes. You can request a specific dentist when you book, or leave it open and the practice will offer the earliest suitable appointment.",
      },
      {
        question: "Do you see patients on Saturdays?",
        answer: "Some Saturdays, by appointment only. Regular hours are Monday to Friday, 9am to 5pm.",
      },
    ],
  },
  {
    slug: "costs-and-prsi",
    title: "Costs, PRSI and payment",
    faqs: [
      {
        question: "Are your prices published?",
        answer:
          "Yes. The full price list is on the pricing page. Prices there are a guide - a written plan with the final cost is provided after an examination.",
      },
      {
        question: "What does PRSI cover?",
        answer:
          "PRSI entitlements are subject to eligibility. The practice lists a free general dentist exam once per year and a scale and polish at €15 under PRSI. Bring your PPS number and the practice will check your eligibility.",
      },
      {
        question: "Will I know the cost before treatment starts?",
        answer:
          "Yes. Treatment plans are provided in writing, with costs, before treatment begins.",
      },
      {
        question: "Do you charge for X-rays separately?",
        answer:
          "Yes. A small X-ray is €40, an OPG is €60 and a CT scan is €120. Some consultations are priced with imaging included - for example a consultation with OPG at €90.",
      },
    ],
  },
  {
    slug: "nervous-patients",
    title: "Nervous patients",
    faqs: [
      {
        question: "I am very anxious about the dentist. Can you help?",
        answer:
          "Yes. The practice offers sedation dentistry for anxious patients, and the surgery environment has been set up to be calmer, with gentle scents and soothing background sound. Tell the practice when you book so enough time is allowed.",
      },
      {
        question: "Is sedation available?",
        answer:
          "IV sedation is available from €350 and is arranged in advance as part of your treatment plan.",
      },
      {
        question: "Can I just come in for a chat first?",
        answer:
          "You can book a consultation to discuss your concerns and options before committing to treatment. Consultation fees are listed on the pricing page.",
      },
    ],
  },
  {
    slug: "referrals",
    title: "Referrals and specialist care",
    faqs: [
      {
        question: "Do you accept referrals from other dentists?",
        answer:
          "Yes. The practice accepts referrals from other dentists, particularly for implant, periodontal and oral surgery treatment.",
      },
      {
        question: "Do I need a referral to be seen?",
        answer:
          "No. Patients can book directly, including for implant and surgical consultations.",
      },
      {
        question: "Can I get a referral letter or hospital report?",
        answer:
          "Yes. A referral letter with consultation or X-ray is €100, as is a hospital report.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((group) => group.faqs);
