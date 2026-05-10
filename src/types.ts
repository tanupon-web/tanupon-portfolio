export interface SiteConfig {
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    navy: string;
    navy2: string;
    navy3: string;
    silver: string;
    silver2: string;
    silver3: string;
    white: string;
  };
  navigation: {
    links: { label: string; href: string }[];
  };
  hero: {
    tag: string;
    title: string;
    avatar: {
      url: string;
      name: string;
      objectPosition?: string;
    };
    subtext: string;
    ctas: {
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
    };
  };
  marquee: string[];
  labels: {
    hero: string;
    about: string;
    services: string;
    works: string;
    blog: string;
    contact: string;
  };
  about: {
    title: string;
    tags: string[];
    textBlocks: string[];
    highlight: string;
    values: {
      num: string;
      title: string;
      description: string;
    }[];
  };
  stats: {
    value: string;
    label: string;
    suffix?: string;
  }[];
  services: {
    title: string;
    items: {
      id: string;
      number: string;
      icon: string; // SVG path or lucide icon name (we'll stick to a preset list or simple paths)
      title: string;
      description: string;
    }[];
  };
  works: {
    title: string;
    items: {
      id: string;
      number: string;
      name: string;
      description: string;
      category: string;
      year: string;
      isSoon?: boolean;
      pipeline?: { label: string; sub: string }[];
      content?: string;
    }[];
  };
  blog: {
    title: string;
    items: {
      date: string;
      category: string;
      title: string;
      id: string;
      isSoon?: boolean;
      content?: string;
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    form: {
      placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
      buttonText: string;
      formActionUrl?: string; // Add this for Formspree/other services
    };
  };
  footer: {
    logo: string;
    copy: string;
    links: { label: string; href: string }[];
    socials: { label: string; href: string }[];
  };
}
