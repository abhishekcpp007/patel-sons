export const company = {
  name: "Patel Sons",
  legalName: "Patel Sons Construction",
  tagline: "Building Homes. Building Trust.",
  description:
    "Patel Sons is a residential construction company developing row houses and apartment buildings, and taking private construction contracts on labour-rate and with-material basis.",
  founded: 2004,
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "hello@patelsons.in",
  address: "Plot 12, Industrial Estate Road, Near City Mall, Ahmedabad, Gujarat 380015",
  mapEmbed:
    "https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat&output=embed",
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  rera: "RERA Reg. No. GJ/AHM/2024/DUMMY-0001",
  founders: [
    { name: "Himanshu Verma", role: "Founder & Managing Partner", bio: "Started Patel Sons in 2004 after fifteen years as a site engineer. Still visits every site on Saturdays.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    { name: "Abhishek", role: "Co-Partner", bio: "Leads contracts, procurement and site operations. Your single point of contact on every private contract.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  ],
  social: {
    instagram: { label: "Instagram", handle: "@patelsons.build", url: "https://instagram.com/patelsons.build" },
    facebook: { label: "Facebook", handle: "/PatelSonsConstruction", url: "https://facebook.com/PatelSonsConstruction" },
    youtube: { label: "YouTube", handle: "@PatelSonsBuild", url: "https://youtube.com/@PatelSonsBuild" },
  },
  stats: [
    { value: 20, suffix: "+", label: "Years of experience" },
    { value: 480, suffix: "+", label: "Homes delivered" },
    { value: 12, suffix: " L+", label: "Sq. ft. constructed" },
    { value: 98, suffix: "%", label: "On-time handover" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contracts", label: "Contracts" },
  { href: "/materials", label: "Materials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
