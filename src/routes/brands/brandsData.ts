export type Brand = {
  title: string;
  profile: string;
  link: string;
  image: string;
};

export const BRANDS_DATA: Array<Brand> = [
  {
    title: "ITL Health",
    profile:
      "Discover the world of ITL Health, the manufacturer of multi-award-winning, 100% pure magnesium-based supplements. Backed by cutting-edge research, these supplements deliver real health results. All ITL Health products are crafted without fillers, binders, or excipients, ensuring exceptional quality and sustainability. Experience a calmer mind, better sleep, and numerous health-boosting benefits with ITL Health's range of 100% pure magnesium supplements.",
    link: "https://itlhealth.co.uk/",
    image: require("../../assets/images/itlhealth.png"),
  },
  {
    title: "ALLIMAX International",
    profile:
      "ALLIMAX International Allimax International was formed on the 11 August 1999 the day of the solar eclipse in the UK however, the idea was forming way before this in 1982 when our Managing Director Norman was working as an International Water Civil Engineer, and bought Garlic The Powerful Panacea by Paul Simons, for just 80p.'Reading this book started my mission and I discovered that the mother compound allicin, had antimicrobial properties. From there I thought if it is that good, why is it not available widely? At this time, I was working as Civil Engineer in the water industry and it started my questioning why are we using Chlorine to treat water? Chlorine is a very abrasive, an aggressive chemical and strips the life out of our environment, estuaries, rivers, and sea-beds. So, I went on a quest to change how water was treated.' Since the 1980s Norman has been devoted to researching and testing the powerful properties of Garlic and is now considered an expert on many aspects of allicin’s powerful properties.Norman J Bennett, Managing DirectorAs a frequent user of garlic supplements, Norman had already become aware of the active components of garlic having a beneficial effect on good health and wellness. With the added discoveries from reading the book, the idea of using one of these active principles, allicin, was born.Little did we know that this discovery would lead us to manufacturing a world first in stabilising allicin and that the allicin, once stabilised, could be used as a food supplement. Another world first. From this ‘lightbulb’ moment, ALLIMED®and ALLICINMAX®were born.Today, we supply our unique, stabilised allicin based products to health food stores and health practitioners and consumers throughout the UK and export to over 40 countries worldwide. We continue to support research into this important active ingredient allicin and look forward to the future developments of allicin based products.",
    link: "https://www.allimax.com/",
    image: require("../../assets/images/allimax.jpeg"),
  },
];
