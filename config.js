// Site configuration
const siteConfig = {
  // Personal Information
  name: "Joseph Duguay",
  title: "Remote Pilot",
  tagline: "Drone Photography and Videography",
  phone: "+1 (719) 666-1812",
  email: "contact@flynuka.com",
  
  // Social Links (add or remove as needed)
  socialLinks: {
    instagram: {
      handle: "@flynuka",
      url: "https://instagram.com/flynuka",
      icon: "fab fa-instagram"
    },
    // Add more social links here:
    // twitter: {
    //   handle: "@flynuka",
    //   url: "https://twitter.com/flynuka",
    //   icon: "fab fa-twitter"
    // },
    // linkedin: {
    //   handle: "Joseph Duguay",
    //   url: "https://linkedin.com/in/josephduguay",
    //   icon: "fab fa-linkedin"
    // },
    // youtube: {
    //   handle: "Flynuka",
    //   url: "https://youtube.com/@flynuka",
    //   icon: "fab fa-youtube"
    // }
  },
  
  // Portfolio Images (use placeholder URLs for now)
  portfolio: [
    {
      id: 1,
      title: "Aerial Landscape",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      description: "Stunning aerial view of natural landscapes"
    },
    {
      id: 2,
      title: "Urban Architecture",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      description: "Modern cityscapes from above"
    },
    {
      id: 3,
      title: "Event Coverage",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      description: "Dynamic event videography"
    },
    {
      id: 4,
      title: "Real Estate",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      description: "Professional property photography"
    },
    {
      id: 5,
      title: "Commercial Video",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
      description: "High-quality commercial content"
    },
    {
      id: 6,
      title: "Nature Documentary",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      description: "Cinematic nature footage"
    }
  ],
  
  // Services
  services: [
    {
      title: "Aerial Photography",
      description: "Stunning high-resolution aerial images for real estate, events, and commercial use.",
      icon: "fas fa-camera"
    },
    {
      title: "Drone Videography",
      description: "Cinematic video production with smooth, professional aerial footage.",
      icon: "fas fa-video"
    },
    {
      title: "Real Estate",
      description: "Property showcases that highlight unique features and surrounding areas.",
      icon: "fas fa-home"
    },
    {
      title: "Event Coverage",
      description: "Capture your special moments from unique aerial perspectives.",
      icon: "fas fa-calendar-alt"
    }
  ],
  
  // About Section
  about: {
    headline: "Elevating Perspectives Through Aerial Excellence",
    description: "With years of experience as a certified remote pilot, I specialize in capturing breathtaking aerial imagery and cinematic footage. From commercial projects to personal events, I bring a unique perspective to every assignment.",
    highlights: [
      "FAA Certified Remote Pilot",
      "Professional Grade Equipment",
      "Creative Vision & Technical Expertise",
      "Fully Insured & Licensed"
    ]
  },
  
  // EmailJS Configuration
  // Get these values from https://dashboard.emailjs.com/
  emailjs: {
    serviceId: "service_yu1fcbi",        // Replace with your EmailJS Service ID
    templateId: "template_6lbas8s",       // Replace with your EmailJS Template ID
    publicKey: "JhDUSfAjpAQMBdV1n"          // Replace with your EmailJS Public Key
  },
  
  // Cloudflare Turnstile Configuration
  // Get these values from https://dash.cloudflare.com/
  turnstile: {
    siteKey: "YOUR_TURNSTILE_SITE_KEY",  // Replace with your Turnstile Site Key (public)
    secretKey: "YOUR_TURNSTILE_SECRET_KEY" // Replace with your Turnstile Secret Key (keep private - for server-side verification)
  }
};

