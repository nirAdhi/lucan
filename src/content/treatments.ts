/**
 * Treatment landing pages (PRD s8-s10).
 *
 * Each entry drives one page at /treatments/[slug] using the s9 template and carries its
 * own s10 SEO fields. Prices are referenced by slug from content/pricing.ts, never typed
 * into copy, so a price change never leaves a stale figure behind on a treatment page.
 *
 * CLINICAL COPY: the descriptions below are general, cautious explanations of routine
 * dental procedures, written to avoid guarantees, outcome claims and statistics
 * (PRD s30). They still require sign-off by a clinician at the practice before launch.
 * The treatment list itself, and every price, comes from ldic.ie (August 2026).
 *
 * Phase 2 moves this into the `treatments` + `seo_metadata` tables behind the admin CMS.
 */

export type TreatmentFaq = { question: string; answer: string };

export type ProcessStep = { title: string; body: string };

export type Treatment = {
  slug: string;
  /** Display name, used in navigation and cards. */
  name: string;
  /** Page H1 - deliberately distinct from the SEO title (PRD s10). */
  h1: string;
  category: "Implants" | "Cosmetic" | "Orthodontics" | "Restorative" | "Surgery" | "Urgent";
  /** One line under the hero heading. */
  summary: string;
  /** Card blurb on /treatments and the homepage grid. */
  cardText: string;
  seo: {
    title: string;
    description: string;
    /** Focus topic from the s12 keyword groups. */
    focusKeyword: string;
  };
  whatIsIt: string[];
  whoIsItFor: string[];
  benefits: { title: string; body: string }[];
  process: ProcessStep[];
  timeline: string;
  technology: string[];
  /** Price slugs quoted on the page, in display order. */
  priceSlugs: string[];
  /** Price group to deep-link to on /pricing. */
  priceGroup: string;
  faqs: TreatmentFaq[];
  /** Related treatment slugs - the manual internal-linking layer from PRD s27. */
  related: string[];
  /** Appears in the homepage "Key treatments" grid (PRD s7). */
  featured: boolean;
  /** Booking reason pre-selected when arriving from this page. */
  bookingReason: string;
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    h1: "Dental implants in Lucan",
    category: "Implants",
    summary:
      "A replacement tooth root, placed by our implant and periodontal team, restored with a crown made to match your own teeth.",
    cardText:
      "Replace a single missing tooth or several, planned with on-site CT imaging by our implant team.",
    seo: {
      title: "Dental Implants in Lucan | LDIC",
      description:
        "Dental implants at Lucan Dental & Implantology Centre, Lucan Village. Implants from €950, crown on implant from €950. Planned on site with CT imaging. Book a consultation.",
      focusKeyword: "dental implants Lucan",
    },
    whatIsIt: [
      "A dental implant is a small titanium post placed into the jawbone to take the place of a missing tooth root. Once the bone has healed around it, the implant supports a crown, bridge or denture.",
      "Implantology is the practice's particular focus. Implant treatment here is carried out by dentists with postgraduate training in periodontology and oral surgery, and planned using OPG and CT imaging taken in the practice.",
    ],
    whoIsItFor: [
      "You have a missing tooth, or several, and would prefer not to wear a denture.",
      "You have a tooth that cannot be saved and want to plan what comes next.",
      "You have an existing bridge or denture and want to look at a fixed alternative.",
      "You have been told bone volume may be a problem - bone grafting and sinus lifts are carried out here.",
    ],
    benefits: [
      {
        title: "Fixed, not removable",
        body: "An implant crown is fixed in place and cleaned like a natural tooth.",
      },
      {
        title: "Neighbouring teeth left alone",
        body: "Unlike a conventional bridge, an implant does not rely on preparing the healthy teeth either side.",
      },
      {
        title: "Planned before anything is placed",
        body: "CT imaging shows the bone available, so the position is planned before the day of surgery.",
      },
      {
        title: "Sedation available",
        body: "IV sedation can be arranged for patients who would find surgery difficult.",
      },
    ],
    process: [
      {
        title: "Consultation and imaging",
        body: "An examination with OPG or CT imaging to assess the tooth, the bone and your general dental health.",
      },
      {
        title: "Written plan and costs",
        body: "You receive a written treatment plan setting out the stages, the timescale and the total cost before anything begins.",
      },
      {
        title: "Implant placement",
        body: "The implant is placed under local anaesthetic, with sedation if you prefer. Bone grafting or a sinus lift is carried out at this stage if the plan calls for it.",
      },
      {
        title: "Healing",
        body: "The bone integrates with the implant over a period of months. A temporary tooth can usually be provided in the meantime where appearance matters.",
      },
      {
        title: "The crown",
        body: "Once healing is confirmed, impressions or a scan are taken and the final crown is fitted and adjusted.",
      },
      {
        title: "Review and maintenance",
        body: "Implants are reviewed and cleaned as part of your ongoing hygiene appointments.",
      },
    ],
    timeline:
      "Most single-implant cases run over several months from placement to final crown, because the bone needs time to heal around the implant. Your dentist will give you the timescale for your own case at the planning stage.",
    technology: [
      "On-site OPG imaging",
      "On-site CT scanning for implant planning",
      "Bone grafting and sinus lift surgery",
      "IV sedation",
    ],
    priceSlugs: [
      "implant",
      "crown-on-implant",
      "specialist-consultation-ct",
      "bone-graft",
      "sinus-lift",
      "iv-sedation",
    ],
    priceGroup: "dental-implants",
    faqs: [
      {
        question: "How much does a dental implant cost in Lucan?",
        answer:
          "The practice lists implants from €950 and a crown on an implant from €950. A specialist consultation with a CT scan is €300. Your own cost depends on how many implants are needed and whether grafting is involved, and is confirmed in a written plan after your consultation.",
      },
      {
        question: "Is placing an implant painful?",
        answer:
          "The surgery itself is carried out under local anaesthetic, so the area is numb. IV sedation is available from €350 if you would rather be sedated. Your dentist will discuss what to expect afterwards and how to manage it.",
      },
      {
        question: "What if I have been told I do not have enough bone?",
        answer:
          "Bone grafting and sinus lift procedures are carried out at the practice, and CT imaging is used to assess what is available before a plan is made. Whether grafting is suitable in your case is a clinical decision made at consultation.",
      },
      {
        question: "How long does the whole process take?",
        answer:
          "Implant treatment is staged over months rather than weeks, because the implant needs to integrate with the bone before the final crown is fitted. You will be given a timescale for your case in your written plan.",
      },
      {
        question: "Do I need a referral?",
        answer:
          "No. You can book a consultation directly. The practice also accepts referrals from other dentists for implant and periodontal treatment.",
      },
    ],
    related: ["dental-crowns", "dentures", "wisdom-teeth-removal"],
    featured: true,
    bookingReason: "Implant consultation",
  },
  {
    slug: "invisalign",
    name: "Invisalign & Clear Aligners",
    h1: "Invisalign and clear aligners in Lucan",
    category: "Orthodontics",
    summary:
      "Removable, near-invisible aligners that move your teeth gradually, reviewed at the practice throughout treatment.",
    cardText:
      "Straighten teeth with removable clear aligners, assessed and monitored in Lucan Village.",
    seo: {
      title: "Invisalign & Clear Aligners in Lucan | LDIC",
      description:
        "Invisalign and clear aligner treatment at Lucan Dental & Implantology Centre, Lucan Village. Clear aligners €4,000 to €5,800. First consultation €50. Book an assessment.",
      focusKeyword: "Invisalign Lucan",
    },
    whatIsIt: [
      "Clear aligners are a series of thin, removable plastic trays worn over your teeth. Each tray moves the teeth a small amount, and you change to the next in the series as treatment progresses.",
      "They are made to fit your own teeth from scans or impressions, and are taken out to eat and to clean your teeth.",
    ],
    whoIsItFor: [
      "You have crowded, spaced or slightly rotated teeth and want them straightened.",
      "You would rather not wear fixed metal braces.",
      "Your bite has changed since previous orthodontic treatment.",
      "You are preparing for cosmetic work and want the teeth aligned first.",
    ],
    benefits: [
      {
        title: "Discreet",
        body: "The aligners are clear and sit closely over the teeth, so they are far less visible than fixed braces.",
      },
      {
        title: "Removable",
        body: "You take them out to eat and to brush, which makes cleaning your teeth straightforward during treatment.",
      },
      {
        title: "Planned in advance",
        body: "Digital planning shows the intended sequence of movements before treatment starts.",
      },
      {
        title: "Fixed braces also available",
        body: "If aligners are not the best option for your case, metal braces are offered as an alternative.",
      },
    ],
    process: [
      {
        title: "First consultation",
        body: "A €50 consultation to look at your teeth and discuss what you would like to change.",
      },
      {
        title: "Orthodontic assessment",
        body: "A fuller assessment from €110, including the records and imaging needed to plan tooth movement.",
      },
      {
        title: "Your plan",
        body: "You are shown the proposed movements and given the cost and expected duration in writing.",
      },
      {
        title: "Wearing the aligners",
        body: "You wear each aligner as instructed - typically most of the day and night - and move through the series in order.",
      },
      {
        title: "Reviews",
        body: "You are seen at intervals so progress can be checked and adjustments made.",
      },
      {
        title: "Retainers",
        body: "A retainer holds the result. Fixed retainers are €150 per arch and removable retainers from €150 per arch.",
      },
    ],
    timeline:
      "Aligner treatment usually runs over months rather than weeks, and the duration depends on how far the teeth need to move. Your dentist will give you an expected duration after the assessment.",
    technology: [
      "Digital treatment planning",
      "Clear aligner systems including Invisalign",
      "Fixed and removable retainers",
    ],
    priceSlugs: [
      "clear-aligners",
      "ortho-first-consultation",
      "ortho-assessment",
      "fixed-retainer",
      "essix-retainer",
    ],
    priceGroup: "orthodontics",
    faqs: [
      {
        question: "How much is Invisalign in Lucan?",
        answer:
          "Invisalign and clear aligner treatment is listed at €4,000 to €5,800. The first consultation is €50 and an orthodontic assessment is from €110. Your final cost is confirmed in writing after the assessment.",
      },
      {
        question: "How long do I have to wear them each day?",
        answer:
          "Aligners only work while they are in your mouth, so they are worn for most of the day and night and removed to eat and clean your teeth. Your dentist will give you the wear instructions for your plan.",
      },
      {
        question: "Will I need a retainer afterwards?",
        answer:
          "Yes. Teeth can move back after any orthodontic treatment, so a retainer is part of the plan. Fixed retainers are €150 per arch and removable retainers start from €150 per arch.",
      },
      {
        question: "Are clear aligners suitable for every case?",
        answer:
          "Not always. Some bites are better treated with fixed braces, which are also available at the practice. The assessment is what determines which option suits your teeth.",
      },
    ],
    related: ["teeth-whitening", "composite-bonding", "veneers"],
    featured: true,
    bookingReason: "Orthodontic consultation",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    h1: "Teeth whitening in Lucan",
    category: "Cosmetic",
    summary:
      "Professional whitening carried out in the surgery, or with a personalised take-home kit, after a check that your teeth and gums are healthy.",
    cardText: "In-surgery whitening at €300, or a personalised home kit at €250.",
    seo: {
      title: "Teeth Whitening in Lucan | LDIC",
      description:
        "Professional teeth whitening at Lucan Dental & Implantology Centre, Lucan Village. In-surgery whitening €300, home kit with personalised trays €250. Book an appointment.",
      focusKeyword: "teeth whitening Lucan",
    },
    whatIsIt: [
      "Whitening uses a professional gel to lighten the natural shade of your teeth. It is carried out either in a single appointment at the practice, or at home using trays made to fit your own teeth.",
      "Whitening is only started once your dentist has confirmed your teeth and gums are healthy, because decay or gum problems need to be treated first.",
    ],
    whoIsItFor: [
      "Your teeth have darkened or discoloured over time.",
      "You have an event coming up and want your teeth looking their best.",
      "You have had whitening before and want a top-up.",
      "You are planning cosmetic work and want to settle on a shade first.",
    ],
    benefits: [
      {
        title: "Supervised by a dentist",
        body: "Your teeth and gums are examined first, and the gel strength and duration are prescribed for you.",
      },
      {
        title: "Trays made for your teeth",
        body: "The home kit uses a personalised tray, which keeps the gel where it is meant to be.",
      },
      {
        title: "Two ways to do it",
        body: "In-surgery whitening in one visit, or the home kit at your own pace - whichever suits you.",
      },
      {
        title: "Top-ups available",
        body: "Additional whitening syringes are €40 when you want to refresh the result.",
      },
    ],
    process: [
      {
        title: "Examination",
        body: "A check that your teeth and gums are healthy, and a discussion of what whitening can realistically change for your teeth.",
      },
      {
        title: "Cleaning first if needed",
        body: "A scale and polish is often carried out before whitening so the gel works on a clean surface.",
      },
      {
        title: "In-surgery or home kit",
        body: "In-surgery whitening is completed at the practice. The home kit includes two gels and a personalised tray, with instructions for use.",
      },
      {
        title: "Review",
        body: "Your dentist checks the result and advises on maintenance and top-ups.",
      },
    ],
    timeline:
      "In-surgery whitening is completed in an appointment. Home whitening is used over a number of days as directed by your dentist. How much a shade changes varies from person to person, and existing crowns, veneers and fillings do not whiten.",
    technology: [
      "Professional whitening gels",
      "Personalised whitening trays",
      "Airflow polishing available",
    ],
    priceSlugs: ["whitening-surgery", "whitening-home", "whitening-topup", "scale-polish"],
    priceGroup: "cleaning-and-whitening",
    faqs: [
      {
        question: "How much does teeth whitening cost?",
        answer:
          "Whitening in the surgery is €300. A home kit with two gels and a personalised tray is €250. Top-up syringes are €40.",
      },
      {
        question: "Will whitening work on crowns or fillings?",
        answer:
          "No. Whitening changes the shade of natural tooth, not of crowns, veneers or white fillings. If you have restorations at the front of your mouth, your dentist will explain how that affects the result.",
      },
      {
        question: "Is whitening safe?",
        answer:
          "Whitening should be carried out under the supervision of a dentist, after your teeth and gums have been examined. Some people notice temporary sensitivity, which your dentist will advise you about.",
      },
      {
        question: "How long does it last?",
        answer:
          "It varies with diet and habits such as coffee, tea and smoking. Top-up syringes are available at €40 when you want to refresh the shade.",
      },
    ],
    related: ["composite-bonding", "veneers", "invisalign"],
    featured: true,
    bookingReason: "Cosmetic consultation",
  },
  {
    slug: "veneers",
    name: "Veneers",
    h1: "Dental veneers in Lucan",
    category: "Cosmetic",
    summary:
      "Thin custom-made facings bonded to the front of the teeth to change their shape, shade or alignment.",
    cardText: "Ceramic veneers from €750 per tooth, or composite veneers from €275.",
    seo: {
      title: "Dental Veneers in Lucan | LDIC",
      description:
        "Porcelain and composite veneers at Lucan Dental & Implantology Centre, Lucan Village. Ceramic veneers from €750, composite from €275. Book a cosmetic consultation.",
      focusKeyword: "veneers Lucan",
    },
    whatIsIt: [
      "A veneer is a thin facing fitted to the front surface of a tooth. Ceramic veneers, in e.max or zirconium, are made in a laboratory and bonded into place. Composite veneers are built up directly onto the tooth in a single visit.",
      "Veneers change the appearance of the front teeth. They are planned with a mock-up so you can see the intended shape before the teeth are prepared.",
    ],
    whoIsItFor: [
      "You have chipped, worn or uneven front teeth.",
      "You have discolouration that does not respond to whitening.",
      "You have small gaps between the front teeth.",
      "You want to change the shape of the front teeth without orthodontic treatment.",
    ],
    benefits: [
      {
        title: "Planned before it is permanent",
        body: "A study model mock-up or wax-up, from €150 per arch, lets the intended result be discussed first.",
      },
      {
        title: "Two materials, two budgets",
        body: "Ceramic veneers are laboratory-made and hard-wearing; composite veneers cost less and can often be done in one visit.",
      },
      {
        title: "Shade matched",
        body: "The shade is chosen with you, and whitening can be done beforehand if you want a lighter base shade.",
      },
      {
        title: "Restorative team",
        body: "Veneer work is carried out by dentists with a restorative and rehabilitation focus.",
      },
    ],
    process: [
      {
        title: "Cosmetic consultation",
        body: "An examination and a discussion of what you would like to change, including whether veneers, bonding or orthodontics is the better route.",
      },
      {
        title: "Mock-up",
        body: "Where useful, a wax-up or mock-up is prepared so the proposed shape can be looked at before anything is prepared.",
      },
      {
        title: "Preparation and temporaries",
        body: "For ceramic veneers a small amount of enamel is prepared and impressions or scans are taken. Temporary coverage is provided where needed.",
      },
      {
        title: "Fitting",
        body: "The veneers are tried in, checked for shade and fit, then bonded and polished.",
      },
      {
        title: "Review",
        body: "A review appointment checks the bite and the finish, and covers how to look after them.",
      },
    ],
    timeline:
      "Composite veneers can often be completed in a single appointment. Ceramic veneers take at least two visits, with laboratory time in between. Veneers need maintaining and may need replacing over the years.",
    technology: [
      "e.max and zirconium ceramics",
      "Direct composite layering",
      "Study model mock-ups and wax-ups",
    ],
    priceSlugs: ["veneers", "composite-bonding", "study-models", "crown-full-ceramic"],
    priceGroup: "crowns-and-veneers",
    faqs: [
      {
        question: "How much do veneers cost in Lucan?",
        answer:
          "Ceramic veneers in e.max or zirconium are listed from €750. Composite bonding and composite veneers are from €275. A study model mock-up or wax-up is from €150 per arch. Your plan will confirm the number of teeth involved and the total.",
      },
      {
        question: "What is the difference between veneers and composite bonding?",
        answer:
          "Composite bonding is built up directly on the tooth in the surgery and costs less. Ceramic veneers are made in a laboratory from e.max or zirconium and are more hard-wearing. Your dentist will explain which suits your teeth.",
      },
      {
        question: "Do veneers damage the teeth underneath?",
        answer:
          "Ceramic veneers usually involve preparing a small amount of enamel, which is not reversible. That is why the plan and mock-up stage matters, and why your dentist will discuss alternatives with you first.",
      },
      {
        question: "Should I whiten my teeth first?",
        answer:
          "Often yes, because veneers are made to a fixed shade and do not whiten afterwards. Whitening beforehand lets the shade be matched to your lighter natural teeth.",
      },
    ],
    related: ["composite-bonding", "teeth-whitening", "dental-crowns"],
    featured: false,
    bookingReason: "Cosmetic consultation",
  },
  {
    slug: "composite-bonding",
    name: "Composite Bonding",
    h1: "Composite bonding in Lucan",
    category: "Cosmetic",
    summary:
      "Tooth-coloured composite shaped directly onto the teeth to repair chips, close small gaps or even out edges.",
    cardText: "Reshape and repair front teeth from €275, usually in a single appointment.",
    seo: {
      title: "Composite Bonding in Lucan | LDIC",
      description:
        "Composite bonding at Lucan Dental & Implantology Centre, Lucan Village. Bonding from €275, incisal edge bonding €160. Usually one appointment. Book a consultation.",
      focusKeyword: "composite bonding Lucan",
    },
    whatIsIt: [
      "Composite bonding uses the same tooth-coloured material as a white filling, applied and shaped directly onto the tooth, then set and polished.",
      "Because it is done in the surgery rather than a laboratory, bonding is usually completed in one appointment and generally involves less preparation of the tooth than a ceramic veneer.",
    ],
    whoIsItFor: [
      "You have chipped a front tooth.",
      "The edges of your front teeth are uneven or worn.",
      "You have small gaps you would like closed.",
      "You want a cosmetic change without laboratory-made restorations.",
    ],
    benefits: [
      {
        title: "Usually one visit",
        body: "The work is completed chairside, so most cases do not need a second appointment.",
      },
      {
        title: "Less preparation",
        body: "Bonding generally requires less removal of tooth structure than ceramic veneers.",
      },
      {
        title: "Lower cost",
        body: "Bonding starts from €275, and incisal edge bonding is €160.",
      },
      {
        title: "Repairable",
        body: "Composite can usually be repaired or added to if it chips.",
      },
    ],
    process: [
      {
        title: "Consultation",
        body: "An examination, a discussion of the shape and shade you want, and a check that the teeth and gums are healthy.",
      },
      {
        title: "Shade selection",
        body: "The composite shade is matched to your teeth. Whitening beforehand is an option if you want a lighter base.",
      },
      {
        title: "Bonding appointment",
        body: "The composite is applied in layers, shaped, set and polished in the same appointment.",
      },
      {
        title: "Review",
        body: "The bite and finish are checked, with advice on care and on avoiding habits that chip composite.",
      },
    ],
    timeline:
      "Most bonding is completed in a single appointment. Composite can stain or chip over time and may need polishing, repair or replacement, which your dentist will discuss with you.",
    technology: [
      "Layered direct composite",
      "Shade matching",
      "Incisal edge bonding",
    ],
    priceSlugs: ["composite-bonding", "incisal-edge-bonding", "white-filling"],
    priceGroup: "fillings-and-restorations",
    faqs: [
      {
        question: "How much is composite bonding?",
        answer:
          "Composite bonding and composite veneers are listed from €275. Incisal edge bonding, which reshapes the edge of a tooth, is €160. Your cost depends on how many teeth are treated.",
      },
      {
        question: "How long does bonding last?",
        answer:
          "It varies with the size of the bonding, your bite and habits such as nail biting or grinding. Composite can be polished, repaired or replaced when needed.",
      },
      {
        question: "Does it hurt?",
        answer:
          "Bonding usually needs little or no preparation of the tooth, and many cases are done without an anaesthetic. Your dentist will tell you what to expect for your teeth.",
      },
      {
        question: "Bonding or veneers?",
        answer:
          "Bonding costs less and is done in one visit; ceramic veneers are laboratory-made and more hard-wearing. Which is appropriate depends on how much of the tooth needs changing.",
      },
    ],
    related: ["veneers", "teeth-whitening", "invisalign"],
    featured: false,
    bookingReason: "Cosmetic consultation",
  },
  {
    slug: "root-canal",
    name: "Root Canal Treatment",
    h1: "Root canal treatment in Lucan",
    category: "Restorative",
    summary:
      "Treatment that removes infection from inside a tooth so the tooth itself can be kept, carried out by our dentists or with an endodontist.",
    cardText:
      "Save an infected tooth rather than lose it, from €500, with endodontist referral available.",
    seo: {
      title: "Root Canal Treatment in Lucan | LDIC",
      description:
        "Root canal treatment at Lucan Dental & Implantology Centre, Lucan Village. Front tooth €500, premolar €600, molar €700. Endodontist appointments available. Book now.",
      focusKeyword: "root canal Lucan",
    },
    whatIsIt: [
      "Root canal treatment, or endodontics, treats a tooth whose nerve has become infected or has died. The inside of the tooth is cleaned, disinfected and sealed, which allows the tooth to be kept rather than extracted.",
      "The practice carries out root canal treatment with its own dentists, and also offers appointments with an endodontist for more complex cases and re-treatments.",
    ],
    whoIsItFor: [
      "You have persistent toothache, or pain on biting.",
      "A tooth is sensitive to heat or cold long after the stimulus is removed.",
      "You have swelling or an abscess near a tooth.",
      "A previous root filling has not settled and may need re-treatment.",
    ],
    benefits: [
      {
        title: "The tooth is kept",
        body: "Treating the tooth avoids the gap, and the later cost, that follows an extraction.",
      },
      {
        title: "Infection dealt with",
        body: "The source of infection inside the tooth is removed and the canal sealed.",
      },
      {
        title: "Endodontist option",
        body: "Complex cases and re-treatments can be booked with an endodontist.",
      },
      {
        title: "Urgent relief available",
        body: "Where a tooth needs settling quickly, an emergency canal opening or pulp dressing can be carried out first.",
      },
    ],
    process: [
      {
        title: "Examination and X-ray",
        body: "An examination with a small X-ray or OPG to confirm the diagnosis and see the shape of the roots.",
      },
      {
        title: "Pain relief if needed",
        body: "If the tooth is acutely painful, a pulp dressing or emergency canal opening (€170 to €200) can settle it before full treatment.",
      },
      {
        title: "Cleaning the canals",
        body: "Under local anaesthetic the canals are cleaned and disinfected. Some teeth need more than one appointment.",
      },
      {
        title: "Sealing",
        body: "The canals are filled and sealed, and the tooth restored.",
      },
      {
        title: "Rebuilding the tooth",
        body: "A root-treated back tooth often needs a crown to protect it. A post and core may be needed first.",
      },
    ],
    timeline:
      "Root canal treatment takes one or more appointments depending on the tooth. A crown, where needed, is usually arranged after the root treatment has settled. Your dentist will explain the stages and the total cost before starting.",
    technology: [
      "Digital small X-rays and OPG",
      "Endodontist appointments for complex cases",
      "Post and core build-ups",
    ],
    priceSlugs: [
      "rct-front",
      "rct-premolar",
      "rct-molar",
      "rct-molar-endo",
      "pulp-dressing",
      "crown-full-ceramic",
    ],
    priceGroup: "root-canal",
    faqs: [
      {
        question: "How much does a root canal cost in Lucan?",
        answer:
          "The listed prices are €500 for a front tooth, €600 for a premolar and €700 for a molar. Treatment with an endodontist is €600 to €800 depending on the tooth, and re-treatments are €100 more. A crown afterwards is priced separately.",
      },
      {
        question: "Is root canal treatment painful?",
        answer:
          "Treatment is carried out under local anaesthetic. If the tooth is very painful beforehand, an emergency appointment can be used to settle it first. Your dentist will discuss aftercare with you.",
      },
      {
        question: "Will I need a crown afterwards?",
        answer:
          "Back teeth are often crowned after root canal treatment because they carry heavy biting forces. Crowns are listed from €550 for metal ceramic and from €750 for full ceramic or zirconium.",
      },
      {
        question: "Is it better to extract the tooth instead?",
        answer:
          "That depends on how much sound tooth remains and on your overall plan. Keeping a tooth is often preferable, but extraction and later replacement with an implant is sometimes the more predictable option. Both are discussed at the examination.",
      },
    ],
    related: ["dental-crowns", "emergency-dentistry", "dental-implants"],
    featured: true,
    bookingReason: "General examination",
  },
  {
    slug: "dental-crowns",
    name: "Dental Crowns",
    h1: "Dental crowns in Lucan",
    category: "Restorative",
    summary:
      "A custom-made cap that covers and protects a damaged, heavily filled or root-treated tooth.",
    cardText:
      "Protect a weakened tooth with a metal ceramic crown from €550, or full ceramic from €750.",
    seo: {
      title: "Dental Crowns in Lucan | LDIC",
      description:
        "Dental crowns at Lucan Dental & Implantology Centre, Lucan Village. Metal ceramic from €550, e.max or zirconium from €750. Book an appointment on (01) 628 1500.",
      focusKeyword: "dental crowns Lucan",
    },
    whatIsIt: [
      "A crown is a laboratory-made cap that fits over a prepared tooth, restoring its shape and protecting what remains of it.",
      "Crowns are made in metal ceramic, full ceramic (e.max) or zirconium. Which material suits a tooth depends on where it sits in the mouth, how it looks and how heavily it is loaded when you bite.",
    ],
    whoIsItFor: [
      "A tooth is cracked, heavily worn or has a large filling that keeps failing.",
      "You have had root canal treatment on a back tooth.",
      "A crown or bridge has come loose or been lost.",
      "You are restoring an implant, which is crowned in the same way.",
    ],
    benefits: [
      {
        title: "Protects what is left",
        body: "A crown holds a weakened tooth together and spreads the biting load.",
      },
      {
        title: "Material chosen for the tooth",
        body: "Metal ceramic, e.max and zirconium are all available, so the choice can suit both strength and appearance.",
      },
      {
        title: "Temporary provided",
        body: "A temporary acrylic crown covers the tooth while the final crown is being made.",
      },
      {
        title: "Also restores implants",
        body: "The same laboratory work provides crowns on implants, listed from €950.",
      },
    ],
    process: [
      {
        title: "Assessment",
        body: "An examination, with an X-ray where needed, to check the tooth is suitable for a crown and that the root is sound.",
      },
      {
        title: "Preparation",
        body: "The tooth is shaped under local anaesthetic. A post and core is placed first if the tooth needs building up.",
      },
      {
        title: "Impressions and temporary",
        body: "Impressions or a scan are taken for the laboratory and a temporary crown is fitted.",
      },
      {
        title: "Fitting",
        body: "The crown is tried in, checked for fit, shade and bite, then cemented.",
      },
      {
        title: "Review",
        body: "The bite is rechecked and cleaning around the crown is explained.",
      },
    ],
    timeline:
      "A crown normally takes two appointments with laboratory time in between. Crowns are long-lasting but not permanent, and can need replacing over the years.",
    technology: [
      "e.max and zirconium ceramics",
      "Metal ceramic crowns",
      "Fibreglass and metal post and core build-ups",
    ],
    priceSlugs: [
      "crown-metal-ceramic",
      "crown-full-ceramic",
      "crown-zirconium",
      "post-fibreglass",
      "temporary-crown",
      "recement-crown",
    ],
    priceGroup: "crowns-and-veneers",
    faqs: [
      {
        question: "How much is a crown in Lucan?",
        answer:
          "Metal ceramic crowns are listed from €550, and full ceramic (e.max) and zirconium crowns from €750. A fibreglass post and core is from €150, and a temporary acrylic crown is €250 to €300.",
      },
      {
        question: "My crown has come off - what should I do?",
        answer:
          "Contact the practice on (01) 628 1500. Recementing a crown or bridge is listed from €100, but the tooth needs to be checked first to make sure nothing underneath has broken or decayed.",
      },
      {
        question: "Which crown material is best?",
        answer:
          "It depends on the tooth. Zirconium and e.max are chosen where appearance matters and for their strength; metal ceramic remains a well-proven option. Your dentist will recommend a material for your tooth.",
      },
      {
        question: "Is a crown better than a large filling?",
        answer:
          "Where a lot of the tooth has been lost, a crown spreads the load and reduces the risk of the tooth fracturing. Smaller cavities are usually better restored with a filling.",
      },
    ],
    related: ["root-canal", "veneers", "dental-implants"],
    featured: false,
    bookingReason: "General examination",
  },
  {
    slug: "dentures",
    name: "Dentures",
    h1: "Dentures in Lucan",
    category: "Restorative",
    summary:
      "Full and partial dentures made to fit, in acrylic, flexible, Bredent and chrome cobalt designs.",
    cardText:
      "Full and partial dentures from €650, including flexible and chrome cobalt designs.",
    seo: {
      title: "Dentures in Lucan | LDIC",
      description:
        "Full and partial dentures at Lucan Dental & Implantology Centre, Lucan Village. Acrylic from €650, flexible from €750, chrome cobalt €1,250. Book a consultation.",
      focusKeyword: "dentures Lucan",
    },
    whatIsIt: [
      "A denture is a removable replacement for missing teeth. A full denture replaces all the teeth in an arch; a partial denture fills the gaps and is held by the remaining teeth.",
      "The practice provides acrylic-based, flexible, Bredent and chrome cobalt dentures. The design affects how the denture is retained, how bulky it feels and how it wears.",
    ],
    whoIsItFor: [
      "You have several missing teeth and want them replaced.",
      "Your existing denture is loose, uncomfortable or worn.",
      "You have had teeth removed and need a replacement while healing.",
      "You want to compare a denture with implant treatment before deciding.",
    ],
    benefits: [
      {
        title: "Several designs",
        body: "Acrylic, flexible, Bredent and chrome cobalt options, chosen to suit the mouth and the budget.",
      },
      {
        title: "Made to fit you",
        body: "Impressions and try-in stages mean the fit, bite and appearance are checked before the denture is finished.",
      },
      {
        title: "Non-surgical",
        body: "A denture replaces teeth without surgery, which matters when surgery is not suitable.",
      },
      {
        title: "Implant route available",
        body: "If you would prefer something fixed, the practice can plan implant treatment instead.",
      },
    ],
    process: [
      {
        title: "Examination",
        body: "An assessment of the remaining teeth and gums, with X-rays where needed, and a discussion of the options.",
      },
      {
        title: "Impressions",
        body: "Impressions are taken so the laboratory can build a denture to your mouth.",
      },
      {
        title: "Try-in",
        body: "A trial denture is checked for bite, fit and appearance, and adjusted before it is finished.",
      },
      {
        title: "Fitting",
        body: "The finished denture is fitted and adjusted.",
      },
      {
        title: "Review and adjustment",
        body: "Follow-up appointments deal with any sore spots and check the fit as your mouth settles.",
      },
    ],
    timeline:
      "Dentures are made over several appointments, because the impression, try-in and fitting stages each need laboratory time. New dentures usually need a short period of adjustment, and relines or remakes may be needed as the mouth changes over the years.",
    technology: [
      "Acrylic, flexible and Bredent dentures",
      "Chrome cobalt frameworks",
      "Implant-supported alternatives",
    ],
    priceSlugs: [
      "denture-acrylic",
      "denture-flexible",
      "denture-bredent",
      "denture-chrome-cobalt",
      "implant",
    ],
    priceGroup: "prosthetic-dentistry",
    faqs: [
      {
        question: "How much do dentures cost in Lucan?",
        answer:
          "Acrylic-based dentures are €650 to €850, flexible dentures €750 to €950, Bredent dentures €900 to €1,200 and chrome cobalt dentures €1,250. Your plan will confirm the design and cost for your case.",
      },
      {
        question: "What is the difference between the denture types?",
        answer:
          "They differ in the material and framework used, which affects strength, bulk and how the denture is held in place. Chrome cobalt uses a cast metal framework; flexible and Bredent dentures use different resin systems. Your dentist will recommend a design for your mouth.",
      },
      {
        question: "Can I have implants instead of a denture?",
        answer:
          "Often yes, and implants are a particular focus of the practice. Suitability depends on your bone and general dental health, which is assessed with CT imaging at a consultation.",
      },
      {
        question: "How long do I need to get used to a new denture?",
        answer:
          "Most people need a settling-in period, and small adjustments are normal. Review appointments are part of the treatment.",
      },
    ],
    related: ["dental-implants", "dental-crowns", "wisdom-teeth-removal"],
    featured: false,
    bookingReason: "General examination",
  },
  {
    slug: "wisdom-teeth-removal",
    name: "Wisdom Teeth Removal",
    h1: "Wisdom teeth removal in Lucan",
    category: "Surgery",
    summary:
      "Assessment and surgical removal of wisdom teeth by our oral surgery team, with sedation available.",
    cardText:
      "Wisdom tooth extraction from €250, assessed with on-site OPG and CT imaging.",
    seo: {
      title: "Wisdom Teeth Removal in Lucan | LDIC",
      description:
        "Wisdom teeth removal at Lucan Dental & Implantology Centre, Lucan Village. Wisdom tooth extraction €250 to €550, OPG €60, IV sedation from €350. Book an assessment.",
      focusKeyword: "wisdom teeth removal Lucan",
    },
    whatIsIt: [
      "Wisdom teeth are the last teeth to come through, usually in your late teens or twenties. They can cause problems when there is not enough room, when they only partly erupt, or when they are difficult to keep clean.",
      "Where removal is needed, it is carried out at the practice by dentists with training in oral and maxillofacial surgery, planned from OPG or CT imaging.",
    ],
    whoIsItFor: [
      "You have pain, swelling or repeated infection around a wisdom tooth.",
      "A wisdom tooth has partly erupted and is hard to clean.",
      "Decay has developed in a wisdom tooth or the tooth in front of it.",
      "You have been told a wisdom tooth is impacted and want it assessed.",
    ],
    benefits: [
      {
        title: "Assessed with imaging",
        body: "OPG and CT imaging show the roots and their relationship to nearby structures before surgery is planned.",
      },
      {
        title: "Surgical experience",
        body: "Removal is carried out by clinicians whose training is in oral and maxillofacial surgery.",
      },
      {
        title: "Sedation available",
        body: "IV sedation from €350 is available if you would find the procedure difficult.",
      },
      {
        title: "Not always necessary",
        body: "A wisdom tooth that is causing no problems may simply be monitored - the assessment is what decides.",
      },
    ],
    process: [
      {
        title: "Assessment",
        body: "An examination with OPG (€60) or CT imaging (€120) to see the position of the tooth and its roots.",
      },
      {
        title: "Plan and consent",
        body: "The procedure, the alternatives and the risks are explained, along with the cost, before you decide.",
      },
      {
        title: "Removal",
        body: "The tooth is removed under local anaesthetic, with sedation if arranged. A surgical approach is used where the tooth is impacted.",
      },
      {
        title: "Aftercare",
        body: "You are given written aftercare instructions and told what to do if you have concerns while healing.",
      },
      {
        title: "Review",
        body: "A review appointment checks healing where needed.",
      },
    ],
    timeline:
      "Removal is a single appointment. Healing takes days rather than weeks for most people, with swelling and discomfort in the first few days. Your surgeon will explain the recovery and the risks that apply to your particular tooth.",
    technology: [
      "On-site OPG and CT imaging",
      "Surgical extraction technique",
      "IV sedation",
    ],
    priceSlugs: [
      "extraction-wisdom",
      "extraction-surgical",
      "extraction-regular",
      "opg",
      "ct-scan",
      "iv-sedation",
    ],
    priceGroup: "extractions",
    faqs: [
      {
        question: "How much does wisdom tooth removal cost?",
        answer:
          "Wisdom tooth extraction is listed at €250 to €550, depending on how difficult the tooth is. A surgical extraction is €220 to €350 and a regular extraction €120 to €220. Imaging is €60 for an OPG or €120 for a CT scan.",
      },
      {
        question: "Do all wisdom teeth need to come out?",
        answer:
          "No. Wisdom teeth that are healthy, functional and cleanable are often left in place and monitored. The purpose of the assessment is to decide whether removal is warranted.",
      },
      {
        question: "Can I be sedated?",
        answer:
          "Yes, IV sedation is available from €350 and can be arranged in advance. Most extractions are carried out under local anaesthetic alone.",
      },
      {
        question: "How long is the recovery?",
        answer:
          "Most people are past the worst within a few days, though it varies with how surgical the removal was. You are given written aftercare instructions and told who to contact if you are worried.",
      },
    ],
    related: ["emergency-dentistry", "dental-implants", "root-canal"],
    featured: false,
    bookingReason: "Consultation",
  },
  {
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    h1: "Emergency dentist in Lucan",
    category: "Urgent",
    summary:
      "Same-practice help for dental pain, swelling, broken teeth and lost crowns, with emergency appointments at €100.",
    cardText:
      "In pain or damaged a tooth? Emergency appointments at €100 - phone the practice first.",
    seo: {
      title: "Emergency Dentist in Lucan | LDIC",
      description:
        "Emergency dental care at Lucan Dental & Implantology Centre, Lucan Village. Emergency appointment €100. Phone (01) 628 1500. Open Monday to Friday, 9am to 5pm.",
      focusKeyword: "emergency dentist Lucan",
    },
    whatIsIt: [
      "An emergency appointment is a focused visit to deal with an urgent problem: severe toothache, swelling, a broken or knocked-out tooth, a lost filling or crown, or bleeding that will not settle.",
      "The aim of the visit is to make you comfortable and stabilise the tooth. Any longer treatment is planned afterwards, with the cost set out in writing.",
    ],
    whoIsItFor: [
      "You have severe or worsening toothache.",
      "You have facial or gum swelling, or a suspected abscess.",
      "You have broken, chipped or knocked out a tooth.",
      "A filling or crown has come out and the tooth is sharp or sensitive.",
    ],
    benefits: [
      {
        title: "Seen and assessed",
        body: "An emergency appointment is €100 and includes assessing the problem and getting you comfortable.",
      },
      {
        title: "Imaging on site",
        body: "Small X-rays, OPG and CT scanning are available in the practice, so diagnosis does not wait.",
      },
      {
        title: "Urgent pain relief",
        body: "Where a nerve is involved, a pulp dressing or emergency canal opening (€170 to €200) can settle the tooth.",
      },
      {
        title: "Surgical cover",
        body: "Extractions and surgical extractions can be carried out where a tooth cannot be saved.",
      },
    ],
    process: [
      {
        title: "Phone the practice",
        body: "Call (01) 628 1500. Emergencies are triaged by phone so you are given the soonest appropriate appointment.",
      },
      {
        title: "Assessment",
        body: "An examination, with an X-ray where needed, to find the cause of the problem.",
      },
      {
        title: "Immediate treatment",
        body: "Treatment on the day is aimed at relieving pain and stabilising the tooth.",
      },
      {
        title: "The plan afterwards",
        body: "You are given a written plan and cost for any further treatment, such as a root canal, crown or extraction.",
      },
    ],
    timeline:
      "Emergency appointments are within practice hours, Monday to Friday 9am to 5pm, with some Saturdays by appointment. If you are seriously unwell - difficulty breathing or swallowing, or a rapidly spreading facial swelling - go to a hospital emergency department rather than waiting for a dental appointment.",
    technology: [
      "Small X-rays, OPG and CT imaging on site",
      "Emergency canal opening and pulp dressing",
      "Surgical extraction",
    ],
    priceSlugs: [
      "emergency-appointment",
      "pulp-dressing",
      "temporary-filling",
      "recement-crown",
      "extraction-regular",
      "small-xray",
    ],
    priceGroup: "general-dentistry",
    faqs: [
      {
        question: "How do I get an emergency dental appointment in Lucan?",
        answer:
          "Phone the practice on (01) 628 1500. Urgent problems are triaged by phone so the soonest suitable appointment can be offered. You can also submit an urgent request online and the practice will call you back within opening hours.",
      },
      {
        question: "How much is an emergency appointment?",
        answer:
          "An emergency appointment is €100. Any treatment carried out - a temporary filling at €60, recementing a crown from €100, an emergency canal opening at €170 to €200 - is priced separately and explained before it is done.",
      },
      {
        question: "What should I do if I knock out a tooth?",
        answer:
          "Handle the tooth by the crown rather than the root, do not scrub it, and phone the practice immediately - time matters with an avulsed tooth. If the practice is closed, contact an out-of-hours emergency dental service or a hospital emergency department.",
      },
      {
        question: "What if it happens outside opening hours?",
        answer:
          "The practice is open Monday to Friday, 9am to 5pm, with some Saturdays by appointment. Outside those hours, contact an out-of-hours emergency dental service, or go to a hospital emergency department if you have severe swelling, difficulty breathing or swallowing, or an injury from trauma.",
      },
    ],
    related: ["root-canal", "wisdom-teeth-removal", "dental-crowns"],
    featured: true,
    bookingReason: "Emergency appointment",
  },
];

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((treatment) => treatment.slug === slug);
}

export function getTreatments(slugs: readonly string[]): Treatment[] {
  return slugs
    .map((slug) => getTreatment(slug))
    .filter((treatment): treatment is Treatment => Boolean(treatment));
}

export const featuredTreatments = treatments.filter((treatment) => treatment.featured);

export const treatmentCategories = [
  "Implants",
  "Cosmetic",
  "Orthodontics",
  "Restorative",
  "Surgery",
  "Urgent",
] as const;

/**
 * Wider service list from ldic.ie/our-services, shown on /treatments beneath the pages
 * that have their own landing page. These do not have dedicated pages yet - PRD s12 asks
 * for pages to follow real search demand rather than being generated wholesale.
 */
export const otherServices: { group: string; items: string[] }[] = [
  {
    group: "Preventive care",
    items: [
      "Routine dental check-ups",
      "Professional teeth cleaning and polishing",
      "Oral cancer screening",
      "Fluoride treatments",
      "Dental sealants",
      "Fillings",
    ],
  },
  {
    group: "Cosmetic dentistry",
    items: ["Smile makeovers", "Crowns and bridges"],
  },
  {
    group: "Restorative dentistry",
    items: ["Inlays and onlays", "Bridges"],
  },
  {
    group: "Oral surgery and advanced care",
    items: [
      "Bone grafting",
      "Gum surgery",
      "Apicoectomy",
      "Oral pathology assessment",
      "Teeth extractions",
    ],
  },
  {
    group: "Periodontal and gum care",
    items: [
      "Deep cleaning (scaling and root planing)",
      "Gum disease management",
      "Periodontal maintenance",
    ],
  },
  {
    group: "Other services",
    items: [
      "Digital X-rays",
      "Sedation dentistry for anxious patients",
      "TMJ / TMD treatment",
      "Children's dentistry",
      "Dentist referrals",
    ],
  },
];
