import { MultiSelectOption } from "../../../shared/components/MultiSelect";

export type Practitioner = {
  id?: string;
  consultation: string;
  university: string;
  email: string;
  phoneNumber: string;
  url: string;
  disciplines?: Array<MultiSelectOption>;
  profile: string;
  imageReference?: string;
  registeringBody: string;
  googlePlaceId?: string;
  healthConcerns?: Array<MultiSelectOption>;
  distance?: string;
  firstName?: string;
  lastName?: string;
};

export const practitioner_SIGN_UP_TEXTFIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    sm: 6,
    xs: 12,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    sm: 6,
    xs: 12,
  },
  {
    name: "url",
    label: "Website Url",
    type: "url",
    sm: 6,
    xs: 12,
  },
  {
    name: "university",
    label: "University",
    type: "text",
    sm: 6,
    xs: 12,
  },
];

export const practitioner_HEALTH_CONCERNS_OPTIONS = [
  {
    name: "Autoimmunity",
  },
  {
    name: "Gut Health",
  },
  {
    name: "Heart, Cardiovascular issues, Diabetes",
  },
  {
    name: "Pregnancy, Fertility",
  },
  {
    name: "Thyroid Conditions",
  },
  {
    name: "Children’s Health",
  },
  {
    name: "Food allergies, Intolerances",
  },
  {
    name: "Men’s Health",
  },
  {
    name: "Women's Health",
  },
  {
    name: "Ageing",
  },
  {
    name: "Weight Loss, Weight Gain",
  },
  {
    name: "Stress Management",
  },
  {
    name: "Phlebotomy",
  },
  {
    name: "Sports Nutrition",
  },
  {
    name: "Sports Performance",
  },
  {
    name: "Mindfulness",
  },
  {
    name: "Bone Health",
  },
  {
    name: "Post Surgery Wellbeing",
  },
  {
    name: "Post Pregnancy Wellbeing",
  },
  {
    name: "Muscle Health",
  },
  {
    name: "Mindful Eating",
  },
  {
    name: "Visualisation Technique",
  },
  {
    name: "Relaxation Technique",
  },
  {
    name: "Handshake Technique",
  },
  {
    name: "Eye Cues",
  },
  {
    name: "Eye Fixation Technique",
  },
  {
    name: "Bodyscan",
  },
  {
    name: "Countdown Breathing",
  },
  {
    name: "Anxiety",
  },
  {
    name: "Couples Counseling",
  },
  {
    name: "Children’s Counseling",
  },
  {
    name: "Stress",
  },
  {
    name: "Trauma",
  },
  {
    name: "Anger Management",
  },
  {
    name: "ADHD Support",
  },
  {
    name: "Emotional Abuse",
  },
  {
    name: "Phobias",
  },
  {
    name: "Postnatal Depression",
  },
  {
    name: "Relationship issues",
  },
  {
    name: "Family Issues",
  },
  {
    name: "Gender Dysphoria",
  },
  {
    name: "Bereavement",
  },
  {
    name: "Bipolar Disorder",
  },
  {
    name: "Self-Harm",
  },
  {
    name: "Imposter Syndrome",
  },
  {
    name: "Sexual Abuse",
  },
  {
    name: "Eating Disorders",
  },
];

export const practitioner_DISCIPLINE_OPTIONS = [
  {
    name: "Nutritionist",
  },
  {
    name: "Naturopath",
  },
  {
    name: "Acupuncturist",
  },
  {
    name: "Health Coach",
  },
  {
    name: "Fitness Trainer",
  },
  {
    name: "Yoga Instructor",
  },
  {
    name: "Herbalist",
  },
  {
    name: "Pilates Instructor",
  },
  {
    name: "Psychotherapist",
  },
  {
    name: "Counselor",
  },
  {
    name: "Hypnotherapist",
  },
  {
    name: "Osteopath",
  },
  {
    name: "Chiropractor",
  },
];

export const practitioner_CONSULATION_TYPE_OPTIONS = [
  {
    name: "Online",
  },
  {
    name: "In Person",
  },
  {
    name: "Both",
  },
];

export const practitioner_INSTITUTE_OPTIONS = [
  {
    name: "BANT",
  },
  {
    name: "ANP",
  },
  {
    name: "AfN",
  },
  {
    name: "UKVRN",
  },
  {
    name: "CNHC",
  },
  {
    name: "BAcC",
  },
  {
    name: "NRPT",
  },
  {
    name: "CIMSPA",
  },
  {
    name: "British Wheel of Yoga",
  },
  {
    name: "URHP",
  },
  {
    name: "AMH",
  },
  {
    name: "BISMA",
  },
  {
    name: "N/A",
  },
];
