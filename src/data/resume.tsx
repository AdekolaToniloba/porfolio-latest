import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Toni Adekola",
  initials: "AO",
  url: "https://adekolatoni.netlify.app",
  location: "Lagos, Nigeria",
  locationLink: "https://www.google.com/maps/place/lagos",
  description:
    "Software Engineer. I love building things, helping, and working with new people.",
  summary:
    "A passionate computer scientist and frontend developer who enjoys solving problems and writing clean, efficient code. Graduated from the [Uiversity of Lagos](/#education). [HNG 11 Finalist](https://certgo.app/c-e0929944)",

  // avatarUrl: "/me.png",
  skills: [
    "React",
    "Next",
    "Typescript",
    "Python",
    "C",
    "Java",
    "Html5",
    "Css3",
    "JavaScript",
    "Redux",
    "Php",
    "VsCode",
    "Git",
    "Github",
    "Tailwind Css",
    "Vercel",
    "Bootstrap",
    "Babel",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "https://theadekolaexperience.hashnode.dev",
      icon: NotebookIcon,
      label: "Blog",
    },
  ],
  contact: {
    email: "atoniloba@gmail.com",
    tel: "+2347015139603",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/AdekolaToniloba",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adekola-toniloba-424224179",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/atoniloba",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:atoniloba@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "HNG Tech",
      href: "https://hng.tech/internship",
      badges: [],
      location: "Remote",
      title: "Frontend Engineer Intern",
      logoUrl: "/hng.jpg",
      start: "July 2024",
      end: "Aug 2024",
      description:
        "Developed, maintained and pushed 2 frontend applications to production using React, Next JS, Tailwind, and TypeScript. Collaborated with a cross-functional team of designers, backend developers, and QA engineers. Utilized Vitest to write comprehensive unit and end-to-end tests, improving code quality and reducing bug occurrences.",
    },
    {
      company: "LASIEC",
      badges: [],
      href: "https://lasiec.gov.ng",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/lasiec.jpg",
      start: "May 2019",
      end: "January 2020",
      description:
        "Improved the commission’s web platform by enhancing accessibility, performance, and SEO using best coding practices and clean code practices. Collaborated in a 5-member team to review the commission’s database, successfully reducing redundancies and increasing operational efficiency through proposed changes.",
    },
  ],
  education: [
    {
      school: "University of Lagos",
      href: "https://unilag.edu.ng",
      degree: "Bachelor's Degree of Computer Science (BSc.)",
      logoUrl: "/unilag.svg",
      start: "2018",
      end: "2023",
    },
    {
      school: "ALX Software Engineering",
      href: "https://www.alxafrica.com/programme/back-end-web-development/",
      degree: "Software Engineering (Backend)",
      logoUrl: "/alx.jpeg",
      start: "JUL 2024",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "Remote Bingo",
      href: "https://remote.bingo",
      dates: "Jul 2024 - Present",
      active: true,
      description:
        " Contributed to a responsive remote bingo game for friends to enjoy online, featuring real-time interaction and seamless user management. The game enhances social connectivity by offering a fun, easy-to-use platform with smooth user authentication and customizable game features.",
      technologies: [
        "Next.js",
        "Typescript",
        "Nest.js",
        "Zod",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Centrifugo",
        "Gsap",
        "Zustand",
      ],
      links: [
        {
          type: "Website",
          href: "https://remote.bingo",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/hgKrxVd/Screenshot-2024-09-03-at-2-23-19-PM.png",
      video: "",
    },
    {
      title: "DEV LINKS",
      href: "https://dev-links-blush.vercel.app",
      dates: "July 2024",
      active: true,
      description:
        "Built a full-stack link-sharing app with CRUD operations, drag-and-drop reordering, form validation, and user authentication. The app allows users to add profile details, preview their profile, and copy links to the clipboard, all within a responsive interface optimized for different screen sizes.",
      technologies: ["Next.js", "Typescript", "Firebase", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://dev-links-blush.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/AdekolaToniloba/devLinks",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/2yGX51T/Screenshot-2024-09-03-at-2-25-39-PM.png",
      video: "",
    },
    {
      title: "HNG BoilerPlate",
      href: "https://starlight-nestjs.teams.hng.tech",
      dates: "July 2024 - August 2024",
      active: true,
      description:
        "Contributed to building a scalable and maintainable React boilerplate that serves as a comprehensive starter kit for developers. This boilerplate includes essential features like user authentication, messaging, and user management, streamlining development by reducing repetitive tasks and ensuring consistency.",
      technologies: [
        "Next.js",
        "Typescript",
        "Next-auth",
        "TailwindCSS",
        "Shadcn UI",
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://starlight-nestjs.teams.hng.tech",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/8j9qkkv/Screenshot-2024-09-03-at-2-26-10-PM.png",
      video: "",
    },
    {
      title: "Loruki",
      href: "https://lorukisitee.netlify.app",
      dates: "April 2023",
      active: true,
      description:
        "Created a simple template based on a simplle clooud hosting service using html, css, javascript, and bootstrap",
      technologies: ["Html", "Css", "Bootstrap"],
      links: [
        {
          type: "Website",
          href: "https://lorukisitee.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/AdekolaToniloba/loruki-website",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://i.ibb.co/NTGj1wB/Screenshot-2024-09-04-at-3-33-10-AM.png",
      video: "",
    },
  ],
} as const;
