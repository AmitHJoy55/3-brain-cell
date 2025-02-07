export const navLinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Disaster",
        path: "/disaster"
    },
    {
        name: "Survival Skill",
        path: "/survival-skill"
    },
    {
        name: "Sign In",
        path: "/sign-in"
    }
];

// For Hero.jsx
export const texts = [
    {
      title: "Devastating Flood in Sylhet",
      subtitle:
        "In result of late poor pre-caution, more than 1.6 million people in Sylhet have lost their home in June 2024 in Sylhet. 20,000 people are forced to take shelter in school. 75% of the area was under water.",
    },
    {
      title: "Hell Fire in Bongo Bazar, Dhaka",
      subtitle:
        "Due to late reporting, it took roughly 75 hours to be completely extinguished the fire. The fire destroyed 3,845 stores and causing property damage estimated at approximately US$27.7 million",
    },
    {
      title: "Early Warning System in Cyclone",
      subtitle:
        "Gaps in early warning system, have increased the death tolls in cyclone. Just in 2024, 20 people lost their lives due to early warning.",
    },
  ];

import { fire, cyclone, flood } from "../../assets/Assests";
export const heroImg = [fire, cyclone, flood]; // also used in PastDisaster.jsx

// For PastDisaster.jsx
export const ongoingDisaster = [
  {
    category: "Flood",
    title:
      "Devastating Flood in Feni, Bangladesh",
    image: flood,
  },
  {
    category: "Cyclone",
    title:
      "Cyclone Amphan hits Coastal Areas of Bangladesh",
    image: cyclone,
  },
  {
    category: "Fire",
    title:
      "Fire in the Bongo Bazar Market",
    image: fire,
  },
];
