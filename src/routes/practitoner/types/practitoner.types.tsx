export type Practitoner = {
  consultationType: string;
  email: string;
  phoneNumber: string;
  discipline: string;
  profile: string;
  healthConcerns?: Array<string>;
};

export const PRACTITONER_SIGN_UP_TEXTFIELDS = [
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
    name: "websiteUrl",
    label: "Website Url",
    type: "url",
    sm: 6,
    xs: 12,
  },
];

export const PRACTITONER_HEALTH_CONCERNS_OPTIONS = [
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
    name: "Ageing",
  },
  {
    name: "Weight Loss, Weight Gain",
  },
  {
    name: "Stress Management",
  },
];

export const PRACTITONER_DISCIPLINE_OPTIONS = [
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
];

export const PRACTITONER_CONSULATION_TYPE_OPTIONS = [
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
