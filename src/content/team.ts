/**
 * Clinical team (PRD s46).
 *
 * Names, roles, qualifications and biography facts are taken from
 * https://ldic.ie/meet-the-team/ (August 2026). Nothing here is inferred: no credential,
 * registration number, language or speciality has been added that the practice has not
 * already published. Fields the practice still needs to supply are marked TODO(verify).
 *
 * Phase 2 moves this into the `dentists` table and drives booking availability from it.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  qualifications: string;
  /** Short line used on cards and in schema. */
  summary: string;
  bio: string[];
  specialities: string[];
  /** Treatment slugs this clinician leads on - powers "Your dentist" on treatment pages. */
  treatments: string[];
  /** TODO(verify): practice to supply portrait images; until then an initials avatar renders. */
  photo: string | null;
  /** TODO(verify): Dental Council of Ireland registration number, if the practice publishes it. */
  registration?: string;
  languages?: string[];
  seo: { title: string; description: string };
};

export const team: TeamMember[] = [
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
    treatments: ["dental-implants"],
    photo: null,
    seo: {
      title: "Dr. Tomas Henriksen | Periodontist & Implant Dentist, Lucan | LDIC",
      description:
        "Dr. Tomas Henriksen (DDS MSc) is a periodontist and implant dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
    },
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
    treatments: ["dental-implants", "wisdom-teeth-removal"],
    photo: null,
    seo: {
      title: "Dr. Siarhei Aksiuchyts | Oral Surgeon & Implant Dentist, Lucan | LDIC",
      description:
        "Dr. Siarhei Aksiuchyts (DDS MSc) is an oral surgeon and implant dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
    },
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
    treatments: [
      "invisalign",
      "teeth-whitening",
      "composite-bonding",
      "root-canal",
      "veneers",
    ],
    photo: null,
    seo: {
      title: "Dr. Nicole Mursalova | General & Cosmetic Dentist, Lucan | LDIC",
      description:
        "Dr. Nicole Mursalova (DDS) is a general and cosmetic dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
    },
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
    treatments: ["dental-crowns", "dentures", "veneers", "root-canal"],
    photo: null,
    seo: {
      title: "Dr. Adriana Zamfiroiu | General & Cosmetic Dentist, Lucan | LDIC",
      description:
        "Dr. Adriana Zamfiroiu (DMD, MSc Oro-Dental Rehabilitation) is a general and cosmetic dentist at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
    },
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}

/** Clinicians associated with a treatment, for the "Your dentist" block (PRD s9). */
export function getTeamForTreatment(treatmentSlug: string): TeamMember[] {
  return team.filter((member) => member.treatments.includes(treatmentSlug));
}

export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
