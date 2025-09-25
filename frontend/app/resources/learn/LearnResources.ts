// app/learn/learnResources.ts

export interface LearnResource {
  title: string;
  description: string;
  href: string;
}

export interface LearnCategory {
  name: string;
  description: string;
  slug: string;
  resources: LearnResource[];
}

export const learnCategories: LearnCategory[] = [
  {
    name: "Power Transmission",
    description:
      "Reference sheets and formulas for mechanical design, gears, belts, chains, springs, and tolerances.",
    slug: "power-transmission",
    resources: [
      {
        title: "SI (International System of Units)",
        description: "Base units, supplementary units, and usage examples.",
        href: "/resources/learn/power-transmission/si-units",
      },
      {
        title: "Ball Screws",
        description: "Selection guidelines and load calculations for ball screws.",
        href: "/resources/learn/power-transmission/ball-screws",
      },
      {
        title: "Spring Calculations",
        description: "Formulas and precautions for coil spring design.",
        href: "/resources/learn/power-transmission/spring-calculations",
      },
      // ... add more as you expand
    ],
  },
  {
    name: "Networking & Computer Systems",
    description:
      "Guides covering networking fundamentals, hardware, protocols, and certification prep.",
    slug: "networking",
    resources: [
      {
        title: "OSI Model",
        description: "Explanation of the OSI layers and their functions.",
        href: "/resources/learn/networking/osi-model",
      },
      {
        title: "TCP/IP Basics",
        description: "Understanding IP addressing, subnetting, and protocols.",
        href: "/resources/learn/networking/tcp-ip",
      },
    ],
  },
  {
    name: "Industrial Automation",
    description:
      "PLC basics, control systems, industrial protocols, and automation fundamentals.",
    slug: "industrial-automation",
    resources: [
      {
        title: "PLC Basics",
        description: "Introduction to programmable logic controllers and ladder logic.",
        href: "/resources/learn/industrial-automation/plc-basics",
      },
    ],
  },
];
