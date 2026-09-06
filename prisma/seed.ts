/**
 * One-time migration of the original hardcoded content (as of the last commit before
 * Phase 2) into Postgres. Run with `npx prisma db seed` (or automatically via
 * `prisma migrate dev`) against an empty database - it upserts by slug, so running it
 * again is harmless.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const team = [
  {
    slug: "dr-tomas-henriksen",
    name: "Dr. Tomas Henriksen",
    role: "Periodontist & Implant Dentist",
    qualifications: "DDS MSc",
    summary:
      "Postgraduate-trained in advanced gum care and dental implants, leading implant and periodontal treatment at the practice.",
    bio: [
      "Dr. Tomas Henriksen has received extensive postgraduate training in advanced gum care (periodontology) and especially in the provision of dental implants.",
      "He leads surgical and non-surgical periodontal therapy at Lucan Dental & Implantology Centre, and plans implant treatment using the practice's on-site OPG and CT imaging.",
    ],
    specialities: [
      "Periodontology (advanced gum care)",
      "Dental implants",
      "Surgical and non-surgical periodontal therapy",
    ],
    tags: ["Implants","Gum care","Periodontology"],
    treatments: ["dental-implants"],
    photoUrl: null,
    registration: null,
    languages: [] as string[],
    seoTitle: "Dr. Tomas Henriksen | Periodontist & Implant Dentist, Lucan | LDIC",
    seoDescription:
      "Dr. Tomas Henriksen (DDS MSc) is a periodontist and implant dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
  },
  {
    slug: "dr-siarhei-aksiuchyts",
    name: "Dr. Siarhei Aksiuchyts",
    role: "Oral Surgeon & Implant Dentist",
    qualifications: "DDS MSc",
    summary:
      "Oral and maxillofacial surgeon with a focus on implant placement, bone augmentation and digital implantology.",
    bio: [
      "Dr. Siarhei Aksiuchyts is an oral surgeon and implant dentist working in oral and maxillofacial surgery, implant placement, bone augmentation, sinus lifts and digital implantology.",
      "He completed over 1,800 hours of training at the Riga Stradins University Institute of Stomatology between 2019 and 2022, and participated in 47 orthognathic surgeries during that period.",
    ],
    specialities: [
      "Oral and maxillofacial surgery",
      "Implant placement",
      "Bone augmentation and sinus lifts",
      "Digital implantology",
    ],
    tags: ["Oral surgery","Implants","Bone grafting"],
    treatments: ["dental-implants", "wisdom-teeth-removal"],
    photoUrl: null,
    registration: null,
    languages: [] as string[],
    seoTitle: "Dr. Siarhei Aksiuchyts | Oral Surgeon & Implant Dentist, Lucan | LDIC",
    seoDescription:
      "Dr. Siarhei Aksiuchyts (DDS MSc) is an oral surgeon and implant dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
  },
  {
    slug: "dr-nicole-mursalova",
    name: "Dr. Nicole Mursalova",
    role: "General & Cosmetic Dentist",
    qualifications: "DDS",
    summary:
      "General and cosmetic dentist working across clear aligner orthodontics, aesthetic dentistry and root canal treatment.",
    bio: [
      "Dr. Nicole Mursalova is passionate about helping patients achieve healthy, confident smiles through gentle, precise and personalised treatment.",
      "Her work covers general dentistry, clear aligner orthodontics, aesthetic dentistry and endodontics (root canal treatment).",
    ],
    specialities: [
      "General dentistry",
      "Clear aligner orthodontics",
      "Aesthetic dentistry",
      "Endodontics (root canal treatment)",
    ],
    tags: ["Cosmetic","Clear aligners","Root canal"],
    treatments: ["invisalign", "teeth-whitening", "composite-bonding", "root-canal", "veneers"],
    photoUrl: null,
    registration: null,
    languages: [] as string[],
    seoTitle: "Dr. Nicole Mursalova | General & Cosmetic Dentist, Lucan | LDIC",
    seoDescription:
      "Dr. Nicole Mursalova (DDS) is a general and cosmetic dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
  },
  {
    slug: "dr-adriana-zamfiroiu",
    name: "Dr. Adriana Zamfiroiu",
    role: "General & Cosmetic Dentist",
    qualifications: "DMD (2006), Master's Degree in Oro-Dental Rehabilitation (2007)",
    summary:
      "Nearly two decades of experience in restorative and preventive dentistry, with a focus on reducing dental anxiety.",
    bio: [
      "Dr. Adriana Zamfiroiu qualified DMD in 2006 and completed a Master's Degree in Oro-Dental Rehabilitation in 2007, bringing nearly two decades of experience to the practice.",
      "Her work centres on dental rehabilitation, restorative and preventive care and minimally invasive techniques, with an emphasis on patient-centred care that helps reduce dental anxiety.",
    ],
    specialities: [
      "Dental rehabilitation",
      "Restorative dentistry",
      "Preventive care",
      "Minimally invasive techniques",
    ],
    tags: ["Restorative","Preventive","Anxious patients"],
    treatments: ["dental-crowns", "dentures", "veneers", "root-canal"],
    photoUrl: null,
    registration: null,
    languages: [] as string[],
    seoTitle: "Dr. Adriana Zamfiroiu | General & Cosmetic Dentist, Lucan | LDIC",
    seoDescription:
      "Dr. Adriana Zamfiroiu (DMD, MSc Oro-Dental Rehabilitation) is a general and cosmetic dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
  },
];

const priceGroups: { slug: string; title: string; items: { slug: string; name: string; price: string; note?: string }[] }[] = [
  {
    slug: "general-dentistry",
    title: "General dentistry",
    items: [
      { slug: "prescription", name: "Prescription", price: "€35" },
      { slug: "exam-existing", name: "General dentist exam (existing patients)", price: "€60" },
      { slug: "exam-prsi", name: "General dentist exam (PRSI)", price: "Free", note: "Once per year, subject to eligibility" },
      { slug: "exam-and-clean", name: "General dentist exam and teeth cleaning", price: "€110" },
      { slug: "consultation-opg", name: "Consultation with OPG", price: "€90" },
      { slug: "scale-polish-from", name: "Scale & polish", price: "From €80", note: "Plus €60 if Airflow is needed" },
      { slug: "referral-letter", name: "Referral letter (with consultation / X-ray)", price: "€100" },
      { slug: "hospital-report", name: "Hospital report", price: "€100" },
      { slug: "emergency-appointment", name: "Emergency appointment", price: "€100" },
      { slug: "exam-diagnosis-plan", name: "Examination, diagnosis, treatment plan and prescription", price: "€120" },
      { slug: "specialist-consultation-opg", name: "Specialist consultation with OPG", price: "€200" },
      { slug: "specialist-consultation-ct", name: "Specialist consultation with CT scan", price: "€300" },
      { slug: "opg", name: "OPG", price: "€60" },
      { slug: "ct-scan", name: "CT scan", price: "€120" },
      { slug: "small-xray", name: "Small X-ray", price: "€40" },
      { slug: "study-models", name: "Study models mock-up / wax-up", price: "From €150 per arch" },
      { slug: "mouthguard", name: "Mouthguard / nightguard", price: "From €200" },
      { slug: "sportsguard", name: "Sportsguard / gumshield", price: "From €150 per arch" },
      { slug: "essix-retainer", name: "Essix retainer / removable retainer", price: "From €150 per arch or €250 both arches" },
      { slug: "fixed-retainer-post-ortho", name: "Fixed retainer (after orthodontic treatment)", price: "€180 per arch" },
      { slug: "periodontal-splint", name: "Periodontal splint", price: "€250" },
    ],
  },
  {
    slug: "cleaning-and-whitening",
    title: "Cleaning and whitening",
    items: [
      { slug: "scale-polish", name: "Scale and polish", price: "€80" },
      { slug: "scale-polish-under-13", name: "Scale and polish (under 13 years)", price: "€60" },
      { slug: "scale-polish-prsi", name: "Scale and polish (PRSI)", price: "€15", note: "Once per year, subject to eligibility" },
      { slug: "scale-polish-airflow", name: "Scale and polish with Airflow", price: "From €100" },
      { slug: "deep-cleaning", name: "Deep cleaning", price: "€120 per arch" },
      { slug: "periodontal-treatment", name: "Periodontal treatment", price: "From €350 per arch" },
      { slug: "whitening-home", name: "Whitening (home kit with two gels and personalised tray)", price: "€250" },
      { slug: "whitening-surgery", name: "Whitening (in surgery)", price: "€300" },
      { slug: "whitening-topup", name: "Top-up whitening syringe", price: "€40" },
    ],
  },
  {
    slug: "fillings-and-restorations",
    title: "Fillings and restorations",
    items: [
      { slug: "temporary-filling", name: "Temporary filling", price: "€60" },
      { slug: "white-filling", name: "White composite filling", price: "€120 to €200" },
      { slug: "composite-bonding", name: "Composite bonding / veneers", price: "From €275" },
      { slug: "incisal-edge-bonding", name: "Incisal edge bonding", price: "€160" },
    ],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    items: [
      { slug: "ortho-first-consultation", name: "First consultation", price: "€50" },
      { slug: "ortho-assessment", name: "Orthodontic assessment", price: "From €110" },
      { slug: "fixed-retainer", name: "Fixed retainer", price: "€150 per arch" },
      { slug: "braces-single-arch", name: "Metal braces (single arch)", price: "€2,500 to €3,200" },
      { slug: "braces-both-arches", name: "Metal braces (both arches)", price: "€3,200 to €5,500" },
      { slug: "clear-aligners", name: "Invisalign / clear aligners", price: "€4,000 to €5,800" },
    ],
  },
  {
    slug: "prosthetic-dentistry",
    title: "Prosthetic dentistry",
    items: [
      { slug: "denture-acrylic", name: "Acrylic-based denture", price: "€650 to €850" },
      { slug: "denture-flexible", name: "Flexible denture", price: "€750 to €950" },
      { slug: "denture-bredent", name: "Bredent denture", price: "€900 to €1,200" },
      { slug: "denture-chrome-cobalt", name: "Chrome cobalt denture", price: "€1,250" },
    ],
  },
  {
    slug: "crowns-and-veneers",
    title: "Dental crowns and veneers",
    items: [
      { slug: "post-fibreglass", name: "Core / post preparation (fibreglass)", price: "From €150" },
      { slug: "post-metal", name: "Core / post preparation (metal)", price: "€200 to €250" },
      { slug: "crown-metal-ceramic", name: "Crown, metal ceramic", price: "From €550" },
      { slug: "crown-full-ceramic", name: "Crown, full ceramic (e.max)", price: "From €750" },
      { slug: "crown-zirconium", name: "Crown, zirconium", price: "From €750" },
      { slug: "veneers", name: "Veneers (e.max, zirconium)", price: "From €750" },
      { slug: "temporary-crown", name: "Temporary acrylic crown", price: "€250 to €300" },
      { slug: "maryland-bridge", name: "Maryland bridge", price: "€800 to €1,400" },
      { slug: "recement-crown", name: "Recementing crown / bridge", price: "From €100" },
    ],
  },
  {
    slug: "root-canal",
    title: "Root canal treatment",
    items: [
      { slug: "rct-front", name: "Front tooth", price: "€500" },
      { slug: "rct-front-retreat", name: "Front tooth re-treatment", price: "€600" },
      { slug: "rct-premolar", name: "Premolar", price: "€600" },
      { slug: "rct-premolar-retreat", name: "Premolar re-treatment", price: "€700" },
      { slug: "rct-molar", name: "Molar", price: "€700" },
      { slug: "rct-molar-retreat", name: "Molar re-treatment", price: "€800" },
      { slug: "rct-front-endo", name: "Front tooth with endodontist", price: "€600" },
      { slug: "rct-front-endo-retreat", name: "Front tooth re-treatment with endodontist", price: "€700" },
      { slug: "rct-premolar-endo", name: "Premolar with endodontist", price: "€700" },
      { slug: "rct-premolar-endo-retreat", name: "Premolar re-treatment with endodontist", price: "€800" },
      { slug: "rct-molar-endo", name: "Molar with endodontist", price: "€800" },
      { slug: "rct-molar-endo-retreat", name: "Molar re-treatment with endodontist", price: "€900" },
      { slug: "pulp-dressing", name: "Pulp dressing / emergency canal opening", price: "€170 to €200" },
    ],
  },
  {
    slug: "extractions",
    title: "Extractions",
    items: [
      { slug: "extraction-regular", name: "Regular extraction", price: "€120 to €220" },
      { slug: "extraction-surgical", name: "Surgical extraction", price: "€220 to €350" },
      { slug: "extraction-wisdom", name: "Wisdom tooth extraction", price: "€250 to €550" },
    ],
  },
  {
    slug: "dental-implants",
    title: "Dental implants",
    items: [
      { slug: "implant", name: "Implant", price: "From €950" },
      { slug: "crown-on-implant", name: "Crown on implant", price: "From €950" },
      { slug: "implant-explantation", name: "Implant explantation", price: "From €400" },
    ],
  },
  {
    slug: "other-surgery",
    title: "Other surgery",
    items: [
      { slug: "sinus-lift", name: "Sinus lift", price: "€1,200 to €2,200" },
      { slug: "bone-graft", name: "Bone graft", price: "€400 to €2,300" },
      { slug: "gingivectomy", name: "Gingivectomy", price: "From €300" },
      { slug: "frenectomy", name: "Frenectomy", price: "€250 to €500" },
      { slug: "open-flap-surgery", name: "Open flap surgery", price: "From €300" },
      { slug: "iv-sedation", name: "IV sedation", price: "From €350" },
      { slug: "biopsy", name: "Biopsy", price: "From €250" },
    ],
  },
  {
    slug: "childrens-treatments",
    title: "Children's treatments",
    items: [
      { slug: "child-exam", name: "Exam", price: "€50" },
      { slug: "child-exam-xray", name: "Exam, X-ray and prescription", price: "€80" },
      { slug: "child-filling-deciduous", name: "Filling on a deciduous tooth", price: "From €100" },
      { slug: "child-filling-permanent", name: "Filling on a permanent tooth", price: "From €120" },
      { slug: "child-extraction", name: "Extraction of temporary tooth", price: "From €90" },
      { slug: "fissure-sealant", name: "Fissure sealant", price: "€50 per tooth" },
    ],
  },
];

async function main() {
  for (const [index, member] of team.entries()) {
    await prisma.dentist.upsert({
      where: { slug: member.slug },
      create: { ...member, order: index },
      update: { ...member, order: index },
    });
  }
  console.log(`Seeded ${team.length} dentists.`);

  let itemCount = 0;
  for (const [groupOrder, group] of priceGroups.entries()) {
    for (const [itemOrder, item] of group.items.entries()) {
      await prisma.priceItem.upsert({
        where: { slug: item.slug },
        create: {
          ...item,
          note: item.note ?? null,
          groupSlug: group.slug,
          groupTitle: group.title,
          groupOrder,
          itemOrder,
        },
        update: {
          ...item,
          note: item.note ?? null,
          groupSlug: group.slug,
          groupTitle: group.title,
          groupOrder,
          itemOrder,
        },
      });
      itemCount++;
    }
  }
  console.log(`Seeded ${itemCount} price items across ${priceGroups.length} groups.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
