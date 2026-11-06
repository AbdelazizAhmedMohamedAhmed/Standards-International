export const companyContact = {
  generalEmail: "info@standards-intl.com",
  salesEmail: "sales@standards-intl.com",
  partnerEmail: "partner@standards-intl.com",
  location: "Cairo, Egypt",
  whatsappNumber: "+201111014264",
  whatsappDisplay: "+20 111 101 4264",
} as const;

export const services = [
  {
    id: "trading",
    title: "International Trading",
    short: "Import and export of goods between Egypt and international markets.",
    body: "We handle the commercial side of cross-border trade: product specification, offers, negotiation and order follow-up, so buyers and sellers can trade with clarity and confidence.",
  },
  {
    id: "sourcing",
    title: "Global Product Sourcing",
    short: "Finding the right products at the right specification and price.",
    body: "We search for products that match your technical requirements, quality expectations and budget, and present comparable options you can evaluate.",
  },
  {
    id: "suppliers",
    title: "Supplier Discovery",
    short: "Identifying capable manufacturers and suppliers.",
    body: "We look for suppliers whose capacity, quality standards and commercial terms fit your needs, and gather the information you need to shortlist them.",
  },
  {
    id: "matchmaking",
    title: "Buyer–Supplier Matchmaking",
    short: "Introducing the right buyers to the right suppliers.",
    body: "We connect manufacturers and exporters with serious buyers, and buyers with qualified suppliers, focusing on fit rather than volume.",
  },
  {
    id: "procurement",
    title: "Procurement Coordination",
    short: "Managing the steps between offer and delivery.",
    body: "We coordinate quotations, samples, documentation and communication between parties to keep procurement organised and on schedule.",
  },
  {
    id: "export",
    title: "Export Market Development",
    short: "Helping producers reach new international markets.",
    body: "We help producers understand target markets, prepare their offer and approach potential buyers abroad.",
  },
  {
    id: "logistics",
    title: "Trade & Logistics Coordination",
    short: "Aligning shipping, documents and timelines.",
    body: "We work with logistics partners to coordinate shipping arrangements, trade documents and delivery timelines for each order.",
  },
] as const;

export const steps = [
  {
    title: "Understand",
    body: "We start by understanding your product, requirements, volumes and goals.",
  },
  { title: "Discover", body: "We search for suitable suppliers, buyers or markets." },
  { title: "Evaluate", body: "We compare options on quality, capacity, terms and reliability." },
  { title: "Connect", body: "We introduce the right parties and support negotiation." },
  { title: "Coordinate", body: "We coordinate samples, documents, orders and logistics." },
  { title: "Grow", body: "We build on each deal to develop long-term partnerships." },
] as const;

export const processDetails = [
  {
    focus: "Define the brief",
    detail:
      "Clarify the product specification, quantity, intended use, destination and preferred timing. Identify packaging needs and any required supporting documents.",
    outcome: "A clear set of requirements to guide the search.",
  },
  {
    focus: "Build a shortlist",
    detail:
      "Look for potential suppliers or buyers that fit the brief. Gather product information, capacity details and initial commercial terms for comparison.",
    outcome: "Relevant options, with questions that need clarification.",
  },
  {
    focus: "Compare like for like",
    detail:
      "Review specification fit, sample requirements, order quantities, pricing basis and proposed lead times. Identify missing information before moving forward.",
    outcome: "A comparison of options and outstanding checks.",
  },
  {
    focus: "Align the parties",
    detail:
      "Clarify the offer, responsibilities and points for negotiation. Discuss product acceptance, payment arrangements and delivery terms with the parties involved.",
    outcome: "Commercial details ready for confirmation by both parties.",
  },
  {
    focus: "Follow the order",
    detail:
      "Coordinate communication around samples, order status, packaging, documents and shipping arrangements. Requirements depend on the goods and destination.",
    outcome: "An agreed scope of coordination and order milestones.",
  },
  {
    focus: "Review and improve",
    detail:
      "Review product feedback, delivery experience and future requirements. Use the findings to refine specifications and planning for subsequent opportunities.",
    outcome: "Clearer priorities for the next order or market opportunity.",
  },
] as const;

export const tradePreparation = [
  {
    title: "Product brief",
    body: "Product name, grade, dimensions, composition or drawings, plus intended use and packaging requirements.",
  },
  {
    title: "Commercial requirements",
    body: "Requested quantity, delivery country, preferred timing and any target budget or delivery terms.",
  },
  {
    title: "Supporting documents",
    body: "Available specifications, sample details and required certificates. Chemical requests may need a safety data sheet; food requests may need shelf-life and storage details.",
  },
] as const;

// Focus sectors, not claims of past experience.
export const industries = [
  "Packaging Materials",
  "Chemicals",
  "Building Materials",
  "Food & Beverages",
  "Furniture",
] as const;

export const inquiryTypes = [
  "I Want to Import",
  "I Want to Export",
  "I Need a Supplier",
  "I Am a Manufacturer",
  "Business Partnership",
] as const;

export const faqs = [
  {
    id: "services",
    question: "What does STANDARDS do?",
    answer:
      "STANDARDS focuses on international trading, product sourcing, supplier discovery, buyer–supplier matchmaking, procurement coordination, export market development and trade logistics coordination.",
  },
  {
    id: "products",
    question: "Which products and sectors do you focus on?",
    answer:
      "Our five focus sectors are Packaging Materials, Chemicals, Building Materials, Food & Beverages, and Furniture. The Industries page describes the product lines within each sector.",
  },
  {
    id: "sourcing",
    question: "Can you help me find a supplier?",
    answer:
      "Supplier discovery and global sourcing are part of our services. The process starts with your product specifications, required quantity, target market and commercial requirements, so suitable options can be evaluated.",
  },
  {
    id: "export",
    question: "Can manufacturers explore export opportunities?",
    answer:
      "Export market development and buyer–supplier matchmaking support producers looking for international markets. Share your product range, production capacity and target countries as a starting point.",
  },
  {
    id: "requirements",
    question: "What details should I prepare for a trade inquiry?",
    answer:
      "Prepare your company details, product description, technical specifications, quantity and delivery country. Drawings, packaging requirements and any required certifications can help clarify the request.",
  },
  {
    id: "terms",
    question: "How are prices, quantities and delivery timelines determined?",
    answer:
      "These details depend on the product specifications, supplier, order volume and destination. They need to be confirmed for the specific request rather than assumed from a general product description.",
  },
  {
    id: "logistics",
    question: "What does trade and logistics coordination include?",
    answer:
      "It covers coordination with logistics partners on shipping arrangements, trade documents and delivery timelines. The scope is defined for each order; requirements vary by product and destination.",
  },
  {
    id: "online-inquiry",
    question: "Can I send an inquiry through the website now?",
    answer:
      "Online inquiry sending is not enabled yet. The Contact page lets you enter and check buyer or partner details, but submitting the form does not send them to STANDARDS.",
  },
] as const;

export const industryDescriptions = [
  "Cartons, films, bags and protective packaging.",
  "Industrial chemicals, polymers and raw inputs.",
  "Cement, steel, tiles, marble and finishing materials.",
  "Grains, fresh produce, packaged foods and beverages.",
  "Indoor and outdoor furniture.",
] as const;

// Product lines per sector (same order as `industries`).
export const industryProducts = [
  [
    {
      name: "Corrugated cartons",
      body: "Single, double and triple-wall boxes for shipping and retail.",
    },
    {
      name: "Stretch & shrink film",
      body: "Pallet wrap and shrink film to secure and protect loads.",
    },
    {
      name: "Woven PP bags",
      body: "Durable sacks for grains, sugar, feed and building materials.",
    },
    {
      name: "Flexible packaging",
      body: "Printed laminated pouches and roll stock for food and goods.",
    },
  ],
  [
    {
      name: "Industrial chemicals",
      body: "Acids, alkalis and solvents for manufacturing and treatment.",
    },
    { name: "Polymers & resins", body: "PE, PP, PVC and PET granules for plastics processing." },
    { name: "Detergent raw materials", body: "Surfactants and additives for cleaning products." },
    {
      name: "Construction chemicals",
      body: "Admixtures, sealants and coatings for building projects.",
    },
  ],
  [
    {
      name: "Cement & aggregates",
      body: "Portland cement, gypsum and aggregates for construction.",
    },
    { name: "Steel & rebar", body: "Reinforcement bars, mesh and structural steel." },
    { name: "Tiles & ceramics", body: "Porcelain and ceramic floor and wall tiles." },
    {
      name: "Marble & natural stone",
      body: "Slabs, cut-to-size tiles and finished stone products.",
    },
  ],
  [
    { name: "Grains & pulses", body: "Rice, wheat, lentils, beans and other dry commodities." },
    { name: "Fresh produce", body: "Citrus, vegetables and seasonal fruits." },
    { name: "Packaged foods", body: "Canned, dried and shelf-stable food products." },
    { name: "Beverages", body: "Bottled water, juices and soft drinks." },
  ],
  [
    { name: "Home furniture", body: "Dining, living and bedroom sets in wood and upholstery." },
    { name: "Office furniture", body: "Desks, seating and storage for workspaces." },
    { name: "Hospitality furniture", body: "Furniture for hotels, restaurants and cafés." },
    { name: "Outdoor furniture", body: "Weather-resistant pieces for gardens and terraces." },
  ],
] as const;

// Real photo and video sources. Keep in sync when media changes.
export const mediaCredits = [
  {
    item: "Home banner still — frame from the Port of Cork container-terminal video",
    author: "Filming Cork",
    license: "CC BY 3.0; still frame extracted from the source video",
    url: "https://commons.wikimedia.org/wiki/File:Aerial_views_of_a_container_terminal_at_the_Port_of_Cork,_Cork,_Ireland.webm",
  },
  {
    item: "Services overview video",
    author: "Provided by STANDARDS",
    license: "Supplied for the STANDARDS website; underlying media retain their original rights",
    url: "/videos/standards-services-overview.mp4",
  },
  {
    item: "Business meeting",
    author: "Shixart1985",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Business_professional_engages_in_note-taking_during_a_meeting_at_a_modern_office_desk.jpg",
  },
  {
    item: "Handshake",
    author: "rawpixel.com",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Business_agreement_handshake_at_coffee_shop.jpg",
  },
  {
    item: "Container ship",
    author: "W. Bulach",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:00_0883_Container_Ship_MARUS.jpg",
  },
  {
    item: "Warehouse — How We Work",
    author: "Axisadman",
    license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg",
  },
  {
    item: "About — illustrative modern trade office and container port",
    author: "AI-generated for STANDARDS",
    license: "Generated illustration; not a photograph of company premises",
    url: "/about",
  },
  {
    item: "Bottling line inspection",
    author: "Gobierno de Castilla-La Mancha",
    license: "CC BY-SA 2.0",
    url: "https://commons.wikimedia.org/wiki/File:2021-12-10_-_Visita_a_las_instalaciones_de_la_bodega_%E2%80%98Jes%C3%BAs_del_Perd%C3%B3n%E2%80%99_-_51737878759.jpg",
  },
  {
    item: "Building materials — reinforcement steel (cropped; crop licensed CC BY-SA 4.0)",
    author: "W.carter",
    license: "CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/",
    url: "https://commons.wikimedia.org/wiki/File:A_bunch_of_rebar_up_close.jpg",
  },
  {
    item: "Packaging, chemicals, food and furniture photos",
    author: "Openverse (StockSnap / rawpixel)",
    license: "CC0",
    url: "https://openverse.org",
  },
];

/** Public site origin used for canonical URLs, sitemap and structured data. */
export const SITE_URL = (import.meta.env["VITE_SITE_URL"] || "https://standards-intl.com").replace(
  /\/+$/,
  "",
);

type ServiceDetail = {
  audience: string;
  problems: string[];
  scope: string[];
  deliverables: string[];
  faq: { q: string; a: string }[];
};

/** Per-service detail content, keyed by service id. Describes coordination/advisory scope only, no regulated activities. */
export const serviceDetails: Record<string, ServiceDetail> = {
  trading: {
    audience:
      "Importers, exporters and procurement teams trading goods between Egypt and international markets.",
    problems: [
      "Unclear product specifications between buyer and seller",
      "Slow or fragmented offer and negotiation cycles",
      "Little visibility after an order is placed",
    ],
    scope: [
      "Clarify product specifications and commercial terms",
      "Prepare and compare offers",
      "Coordinate negotiation between parties",
      "Follow up orders through to delivery",
    ],
    deliverables: [
      "Agreed product specification summary",
      "Structured commercial offer",
      "Order follow-up updates",
    ],
    faq: [
      {
        q: "Do you trade on our behalf?",
        a: "The commercial role is agreed per transaction and confirmed in writing before any order proceeds.",
      },
    ],
  },
  sourcing: {
    audience: "Buyers who need a specific product at a defined quality, specification and budget.",
    problems: [
      "Too many unverified supplier options",
      "Offers that are hard to compare",
      "Specifications lost in translation",
    ],
    scope: [
      "Understand buyer requirements",
      "Identify potential suppliers",
      "Coordinate sourcing inquiries",
      "Obtain and compare commercial offers",
      "Support the purchasing decision",
    ],
    deliverables: [
      "Requirements brief",
      "Comparison of shortlisted offers",
      "Recommendation for next steps",
    ],
    faq: [
      {
        q: "What do you need to start sourcing?",
        a: "Product description, specifications, estimated quantity, destination country and target timeline.",
      },
    ],
  },
  suppliers: {
    audience:
      "Companies looking for capable manufacturers or suppliers for a new or existing product line.",
    problems: [
      "Uncertainty about supplier capacity",
      "Missing or inconsistent documentation",
      "Difficulty building a reliable shortlist",
    ],
    scope: [
      "Supplier identification",
      "Capability assessment based on provided information",
      "Documentation review",
      "Supplier shortlisting",
      "Highlighting commercial risk considerations",
    ],
    deliverables: [
      "Supplier shortlist with key details",
      "Summary of documents received",
      "Points to clarify before ordering",
    ],
    faq: [
      {
        q: "Do you certify suppliers?",
        a: "No. We review the information and documents suppliers provide; we do not issue independent certification.",
      },
    ],
  },
  matchmaking: {
    audience: "Manufacturers seeking serious buyers, and buyers seeking qualified suppliers.",
    problems: ["Introductions that don't fit real needs", "Time lost with unqualified contacts"],
    scope: [
      "Connect buyers and suppliers",
      "Facilitate commercial introductions",
      "Coordinate early discussions",
      "Support relationship development",
    ],
    deliverables: ["Introduction summary for each party", "Coordinated first discussion"],
    faq: [
      {
        q: "How are matches chosen?",
        a: "On fit: product, specification, volume, market and commercial terms, rather than the number of introductions.",
      },
    ],
  },
  procurement: {
    audience:
      "Procurement teams managing quotations, samples and documents across several parties.",
    problems: ["Scattered communication between parties", "Delays between offer and delivery"],
    scope: [
      "Coordinate quotations and samples",
      "Organise documentation exchange",
      "Keep parties aligned on schedule",
    ],
    deliverables: ["Procurement status updates", "Organised document set for the order"],
    faq: [
      {
        q: "Can you handle samples?",
        a: "We coordinate sample requests and communication; arrangements are confirmed per order.",
      },
    ],
  },
  export: {
    audience: "Producers and exporters exploring new international markets.",
    problems: [
      "Limited knowledge of target markets",
      "Difficulty reaching potential buyers abroad",
    ],
    scope: [
      "Review target markets with you",
      "Help prepare your commercial offer",
      "Identify potential buyers",
      "Facilitate introductions and market-entry discussions",
    ],
    deliverables: ["Target market notes", "Prepared offer outline", "Buyer introduction plan"],
    faq: [
      {
        q: "What should exporters share first?",
        a: "Your product range, production capacity, current export markets and target countries.",
      },
    ],
  },
  logistics: {
    audience: "Buyers and sellers who need shipping, documents and timelines kept in line.",
    problems: [
      "Misaligned shipping and document timelines",
      "Unclear responsibility between parties",
    ],
    scope: [
      "Coordinate with logistics partners",
      "Shipment-related communication",
      "Trade document coordination",
      "Follow-up with relevant trading parties",
    ],
    deliverables: ["Shipment coordination updates", "Document checklist for the order"],
    faq: [
      {
        q: "Are you a freight forwarder or customs broker?",
        a: "No. We coordinate with licensed logistics partners; regulated activities are performed by them.",
      },
    ],
  },
};
