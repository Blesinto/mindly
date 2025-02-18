/** @format */

interface NavLink {
  label: string;
  path: string;
}

export const NavLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/About" },
];

export const FooterLinks = [
  {
    label: "Team Mindly",
    path: "/team",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "About",
    path: "/About",
  },
  {
    label: "Terms",
    path: "/terms",
  },
  {
    label: "Help",
    path: "/help",
  },
];
