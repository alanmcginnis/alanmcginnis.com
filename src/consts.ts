import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Alan McGinnis",
  EMAIL: "alan@alanmcginnis.com",
  NUM_HIGHLIGHTS_ON_HOMEPAGE: 2,
  NUM_EXPERIENCES_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Alan McGinnis helps teams solve complex problems and drive measurable business results.",
};

export const EXPERIENCE: Metadata = {
  TITLE: "Experience",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const HIGHLIGHTS: Metadata = {
  TITLE: "Highlights",
  DESCRIPTION: "A collection of my highlighted work and achievements.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/alanmcginnis"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/mcginnisalan/",
  }
];
