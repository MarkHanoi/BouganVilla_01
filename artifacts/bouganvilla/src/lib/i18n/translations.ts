export type Language = "en" | "fr" | "pt" | "es" | "el" | "da" | "no" | "sv";

export interface LangMeta {
  code: Language;
  label: string;
  name: string;
}

export const LANGUAGES: LangMeta[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "es", label: "ES", name: "Español" },
  { code: "el", label: "GR", name: "Ελληνικά" },
  { code: "da", label: "DA", name: "Dansk" },
  { code: "no", label: "NO", name: "Norsk" },
  { code: "sv", label: "SV", name: "Svenska" },
];

export interface Translations {
  nav: {
    properties: string;
    destinations: string;
    forOwners: string;
    about: string;
    contact: string;
    enquire: string;
  };
  home: {
    hero: { tagline: string; line1: string; line2: string; sub: string; cta: string };
    manifesto: string;
    collection: {
      label: string;
      heading: string;
      viewProperty: string;
      learnMore: string;
      villa: string;
      apartment: string;
    };
    promise: { label: string; heading: string };
    usps: [
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string },
    ];
    about: {
      label: string;
      heading1: string;
      heading2: string;
      body1: string;
      body2: string;
      cta: string;
    };
    testimonials: { label: string; heading: string };
    cta: { label: string; heading: string; body: string; button: string };
  };
  properties: {
    label: string;
    heading: string;
    sub: string;
    viewProperty: string;
    learnMore: string;
    beds: string;
    baths: string;
    sleeps: string;
    villa: string;
    apartment: string;
    cta: { heading: string; body: string; button: string };
  };
  areas: {
    label: string;
    heading: string;
    sub: string;
    nearby: string;
    view: string;
    belverde: { tagline: string; description: string };
    saoMartinho: { tagline: string; description: string };
  };
  owners: {
    hero: {
      label: string;
      heading1: string;
      heading2: string;
      body: string;
      cta: string;
    };
    approach: {
      label: string;
      heading1: string;
      heading2: string;
      body1: string;
      body2: string;
      body3: string;
      cta: string;
    };
    bottom: { heading: string; body: string };
  };
  about: {
    hero: { label: string; heading1: string; heading2: string };
    body1: string;
    body2: string;
    body3: string;
    cta: string;
    stats: { properties: string; destinations: string };
    values: {
      heading: string;
      items: [
        { title: string; body: string },
        { title: string; body: string },
        { title: string; body: string },
      ];
    };
  };
  contact: {
    label: string;
    heading: string;
    sub: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      property: string;
      propertyPlaceholder: string;
      optVillaEmerald: string;
      optSaoMartinho: string;
      optBoth: string;
      optNotSure: string;
      checkin: string;
      checkout: string;
      guests: string;
      guestsPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      disclaimer: string;
      guest: string;
      guestsWord: string;
    };
    success: { heading: string; body: string };
    sidebar: {
      contactLabel: string;
      directBook: string;
      directBody: string;
      directCta: string;
    };
  };
  footer: {
    tagline: string;
    propertiesLabel: string;
    connectLabel: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  detail: {
    allProperties: string;
    atAGlance: string;
    whatsIncluded: string;
    nearby: string;
    insideTheVilla: string;
    sendEnquiry: string;
    whatsapp: string;
    respondTime: string;
    bedrooms: string;
    bathrooms: string;
    guests: string;
    parking: string;
    parkingValue: string;
    upTo: string;
    viewAllPhotos: string;
    photos: string;
    allPhotos: string;
    morePhotos: string;
    close: string;
    notFound: string;
    backToAll: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    sleepsLabel: string;
  };
}

const en: Translations = {
  nav: {
    properties: "Properties",
    destinations: "Destinations",
    forOwners: "For Owners",
    about: "About",
    contact: "Contact",
    enquire: "Enquire",
  },
  home: {
    hero: {
      tagline: "Portuguese Coast",
      line1: "Stay where the",
      line2: "light is different.",
      sub: "Handpicked villas and apartments on the Portuguese coast.",
      cta: "Explore Our Properties",
    },
    manifesto:
      "We only list homes we believe in — places where the light, the air, and the detail make a real difference to your stay.",
    collection: {
      label: "Our Collection",
      heading: "Two Exceptional Homes",
      viewProperty: "View Property",
      learnMore: "Learn More",
      villa: "Villa",
      apartment: "Apartment",
    },
    promise: { label: "Our Promise", heading: "Why Bougan Villa" },
    usps: [
      {
        title: "Personally Curated",
        body: "Only homes we love. We've stayed in every property we list — and we'd happily book them again.",
      },
      {
        title: "Local Knowledge",
        body: "We know every corner of the coast. The hidden coves, the best bakeries, the quiet roads. We share all of it.",
      },
      {
        title: "Seamless Stays",
        body: "From your first question to your last morning coffee, we handle everything — so you can simply be there.",
      },
    ],
    about: {
      label: "About Us",
      heading1: "Born from a love of",
      heading2: "the Portuguese coast.",
      body1:
        "Bougan Villa is a small, passionate agency born from a love of the Portuguese coast. We list only homes we believe in — places where the light, the air, and the detail make a real difference to your stay.",
      body2:
        "We're just starting — with two exceptional properties and a very clear idea of the kind of experience we want to create. Quality over volume, always.",
      cta: "Our Story",
    },
    testimonials: { label: "Guest Stories", heading: "What our guests say" },
    cta: {
      label: "Plan Your Stay",
      heading: "Ready to escape?",
      body: "Tell us when you'd like to visit, which property interests you, and what would make your stay perfect. We'll take it from there.",
      button: "Get in Touch",
    },
  },
  properties: {
    label: "Our Collection",
    heading: "Our Properties",
    sub: "Two homes. Both exceptional. Both chosen because we believe in them.",
    viewProperty: "View Property",
    learnMore: "Learn More",
    beds: "beds",
    baths: "baths",
    sleeps: "sleeps",
    villa: "Villa",
    apartment: "Apartment",
    cta: {
      heading: "Not sure which property is right for you?",
      body: "Tell us about your trip and we'll help you choose.",
      button: "Get in Touch",
    },
  },
  areas: {
    label: "Destinations",
    heading: "Where We Are",
    sub: "Two remarkable stretches of the Portuguese coast. Both entirely different. Both worth it.",
    nearby: "Nearby",
    view: "View",
    belverde: {
      tagline: "Pine Forest & Atlantic",
      description:
        "The Aroeira pine forest stretches across thousands of hectares of the Setúbal coast — ancient trees, clean air, and some of Portugal's finest Atlantic beaches just minutes away. Belverde sits quietly within it, a place entirely its own. No noise, no crowds. Just light through pines and the sound of the sea.",
    },
    saoMartinho: {
      tagline: "The Scallop Bay",
      description:
        "One of Portugal's most distinctive natural formations — a near-perfect circular bay of warm, sheltered water surrounded by golden cliffs. São Martinho do Porto is unhurried and authentic. Fishermen still bring their catch in each morning; the village moves at exactly the right pace. It's halfway between Lisbon and Porto, and somehow far from both.",
    },
  },
  owners: {
    hero: {
      label: "Property Owners",
      heading1: "Have a property",
      heading2: "on the Portuguese coast?",
      body: "We're a small agency with very high standards. We'd love to hear about your property — and if it's the right fit, we'd be honoured to represent it.",
      cta: "Get in Touch",
    },
    approach: {
      label: "Our Approach",
      heading1: "Small by design.",
      heading2: "Excellent by intention.",
      body1:
        "We're building a small, curated collection of exceptional properties on the Portuguese coast. We're not looking to be the biggest agency — we're looking to be the best one.",
      body2:
        "If you have a property that has something special — great light, a beautiful garden, a remarkable location — we'd love to talk. We work closely with each owner, and we list only homes we genuinely believe in.",
      body3:
        "Everything from guest management to photography to cleaning is handled with care. You receive your earnings, monthly, with full transparency.",
      cta: "Email us about your property",
    },
    bottom: {
      heading: "Think your property could be right for us?",
      body: "Send us a short email with a description and a few photos. No obligation.",
    },
  },
  about: {
    hero: {
      label: "Our Story",
      heading1: "Born from a love of",
      heading2: "the Portuguese coast.",
    },
    body1:
      "Bougan Villa is a small, passionate agency born from a love of the Portuguese coast. We list only homes we believe in — places where the light, the air, and the detail make a real difference to your stay.",
    body2:
      "We began with two properties: a villa hidden in the Aroeira pine forest near Belverde, and a bright apartment in the extraordinary bay of São Martinho do Porto. Both chosen because they moved us. Because we'd stay there ourselves — and have.",
    body3:
      "As we grow, our rule stays the same: only homes we believe in. We'd rather be small and good than large and ordinary.",
    cta: "Get in Touch",
    stats: { properties: "Exceptional Properties", destinations: "Coastal Destinations" },
    values: {
      heading: "What we believe",
      items: [
        {
          title: "Quality over volume",
          body: "We will never list a property we wouldn't be happy staying in ourselves. Full stop.",
        },
        {
          title: "Personal service",
          body: "When you contact us, you speak to a person who knows the properties, the area, and the coast.",
        },
        {
          title: "Honest curation",
          body: "If a property isn't right for you, we'll say so. We'd rather you have the perfect trip than a booking we're not proud of.",
        },
      ],
    },
  },
  contact: {
    label: "Get in Touch",
    heading: "Plan Your Stay",
    sub: "Tell us when you'd like to visit and which property interests you. We'll come back to you within 2 hours.",
    form: {
      name: "Full Name *",
      namePlaceholder: "Your name",
      email: "Email *",
      property: "Property of Interest *",
      propertyPlaceholder: "Select a property",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Silver Coast",
      optBoth: "Both — not sure yet",
      optNotSure: "Not sure — help me choose",
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Guests",
      guestsPlaceholder: "Select",
      message: "Message *",
      messagePlaceholder:
        "Tell us about your ideal stay — any special requests, questions about the property, or anything else we should know...",
      submit: "Send Enquiry",
      disclaimer: "We respond within 2 business hours. No obligation.",
      guest: "guest",
      guestsWord: "guests",
    },
    success: {
      heading: "Thank you",
      body: "We've received your enquiry and will be in touch very soon.",
    },
    sidebar: {
      contactLabel: "Contact",
      directBook: "Prefer to book directly?",
      directBody: "Villa Emerald is also available on Airbnb.",
      directCta: "View on Airbnb →",
    },
  },
  footer: {
    tagline: "Curated stays on the Portuguese coast.",
    propertiesLabel: "Our Properties",
    connectLabel: "Connect",
    copyright: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },
  detail: {
    allProperties: "All Properties",
    atAGlance: "At a glance",
    whatsIncluded: "What's included",
    nearby: "Nearby",
    insideTheVilla: "Inside the villa",
    sendEnquiry: "Send Enquiry",
    whatsapp: "WhatsApp Us",
    respondTime: "We respond within 2 hours",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    guests: "Guests",
    parking: "Parking",
    parkingValue: "Indoor",
    upTo: "Up to",
    viewAllPhotos: "View all",
    photos: "photos",
    allPhotos: "All",
    morePhotos: "more photos",
    close: "Close",
    notFound: "Property not found",
    backToAll: "Back to all properties",
    bedroomsLabel: "bedrooms",
    bathroomsLabel: "bathrooms",
    sleepsLabel: "sleeps",
  },
};

const fr: Translations = {
  nav: {
    properties: "Propriétés",
    destinations: "Destinations",
    forOwners: "Propriétaires",
    about: "À propos",
    contact: "Contact",
    enquire: "Demander",
  },
  home: {
    hero: {
      tagline: "Côte Portugaise",
      line1: "Séjournez là où",
      line2: "la lumière est différente.",
      sub: "Villas et appartements sélectionnés sur la côte portugaise.",
      cta: "Découvrir nos propriétés",
    },
    manifesto:
      "Nous ne sélectionnons que des maisons en lesquelles nous croyons — des endroits où la lumière, l'air et les détails font une vraie différence pour votre séjour.",
    collection: {
      label: "Notre Collection",
      heading: "Deux Maisons Exceptionnelles",
      viewProperty: "Voir la propriété",
      learnMore: "En savoir plus",
      villa: "Villa",
      apartment: "Appartement",
    },
    promise: { label: "Notre Promesse", heading: "Pourquoi Bougan Villa" },
    usps: [
      {
        title: "Sélection Personnelle",
        body: "Uniquement des maisons que nous aimons. Nous avons séjourné dans chaque propriété — et nous le referions avec plaisir.",
      },
      {
        title: "Connaissance Locale",
        body: "Nous connaissons chaque recoin de la côte. Les criques cachées, les meilleures boulangeries, les routes tranquilles. Nous partageons tout.",
      },
      {
        title: "Séjours Sans Souci",
        body: "De votre première question à votre dernier café du matin, nous gérons tout — pour que vous puissiez simplement être là.",
      },
    ],
    about: {
      label: "À propos",
      heading1: "Née d'un amour pour",
      heading2: "la côte portugaise.",
      body1:
        "Bougan Villa est une petite agence passionnée, née d'un amour pour la côte portugaise. Nous ne sélectionnons que des maisons en lesquelles nous croyons — des endroits où la lumière, l'air et les détails font une vraie différence pour votre séjour.",
      body2:
        "Nous démarrons avec deux propriétés exceptionnelles et une idée très claire du type d'expérience que nous souhaitons créer. Qualité plutôt que volume, toujours.",
      cta: "Notre Histoire",
    },
    testimonials: { label: "Témoignages", heading: "Ce que disent nos clients" },
    cta: {
      label: "Planifiez votre séjour",
      heading: "Prêt à vous évader ?",
      body: "Dites-nous quand vous souhaitez venir, quelle propriété vous intéresse et ce qui rendrait votre séjour parfait. Nous nous occupons du reste.",
      button: "Nous Contacter",
    },
  },
  properties: {
    label: "Notre Collection",
    heading: "Nos Propriétés",
    sub: "Deux maisons. Toutes deux exceptionnelles. Toutes deux choisies parce que nous y croyons.",
    viewProperty: "Voir la propriété",
    learnMore: "En savoir plus",
    beds: "chambres",
    baths: "salles de bain",
    sleeps: "couchages",
    villa: "Villa",
    apartment: "Appartement",
    cta: {
      heading: "Vous ne savez pas quelle propriété choisir ?",
      body: "Parlez-nous de votre voyage et nous vous aiderons à choisir.",
      button: "Nous Contacter",
    },
  },
  areas: {
    label: "Destinations",
    heading: "Où Nous Sommes",
    sub: "Deux remarquables tronçons de la côte portugaise. Entièrement différents. Tous deux valent le détour.",
    nearby: "À proximité",
    view: "Voir",
    belverde: {
      tagline: "Forêt de Pins & Atlantique",
      description:
        "La forêt de pins d'Aroeira s'étend sur des milliers d'hectares de la côte de Setúbal — des arbres séculaires, un air pur, et certaines des plus belles plages atlantiques du Portugal à quelques minutes. Belverde s'y niche tranquillement, un lieu tout à fait singulier. Pas de bruit, pas de foule. Juste la lumière à travers les pins et le bruit de la mer.",
    },
    saoMartinho: {
      tagline: "La Baie en Coquille",
      description:
        "L'une des formations naturelles les plus remarquables du Portugal — une baie presque parfaitement circulaire d'eaux chaudes et abritées, entourée de falaises dorées. São Martinho do Porto est calme et authentique. Les pêcheurs apportent encore leur prise chaque matin ; le village évolue exactement au bon rythme. À mi-chemin entre Lisbonne et Porto, et pourtant loin des deux.",
    },
  },
  owners: {
    hero: {
      label: "Propriétaires",
      heading1: "Vous avez une propriété",
      heading2: "sur la côte portugaise ?",
      body: "Nous sommes une petite agence avec des standards très élevés. Nous serions ravis d'entendre parler de votre propriété — et si elle convient, nous serions honorés de la représenter.",
      cta: "Nous Contacter",
    },
    approach: {
      label: "Notre Approche",
      heading1: "Petite par conception.",
      heading2: "Excellente par intention.",
      body1:
        "Nous constituons une petite collection triée sur le volet de propriétés exceptionnelles sur la côte portugaise. Nous ne cherchons pas à être la plus grande agence — nous cherchons à être la meilleure.",
      body2:
        "Si vous avez une propriété qui a quelque chose de spécial — une belle lumière, un jardin magnifique, un emplacement remarquable — nous adorerions en discuter. Nous travaillons en étroite collaboration avec chaque propriétaire.",
      body3:
        "Tout, de la gestion des clients à la photographie en passant par le nettoyage, est géré avec soin. Vous recevez vos revenus mensuellement, en toute transparence.",
      cta: "Écrivez-nous au sujet de votre propriété",
    },
    bottom: {
      heading: "Vous pensez que votre propriété pourrait nous convenir ?",
      body: "Envoyez-nous un court email avec une description et quelques photos. Sans engagement.",
    },
  },
  about: {
    hero: {
      label: "Notre Histoire",
      heading1: "Née d'un amour pour",
      heading2: "la côte portugaise.",
    },
    body1:
      "Bougan Villa est une petite agence passionnée, née d'un amour pour la côte portugaise. Nous ne sélectionnons que des maisons en lesquelles nous croyons — des endroits où la lumière, l'air et les détails font une vraie différence pour votre séjour.",
    body2:
      "Nous avons commencé avec deux propriétés : une villa cachée dans la forêt de pins d'Aroeira près de Belverde, et un appartement lumineux dans l'extraordinaire baie de São Martinho do Porto. Toutes deux choisies parce qu'elles nous ont touchés.",
    body3:
      "Au fil de notre croissance, notre règle reste la même : uniquement des maisons en lesquelles nous croyons. Nous préférons être petits et bons que grands et ordinaires.",
    cta: "Nous Contacter",
    stats: { properties: "Propriétés Exceptionnelles", destinations: "Destinations Côtières" },
    values: {
      heading: "Ce en quoi nous croyons",
      items: [
        {
          title: "Qualité plutôt que volume",
          body: "Nous ne listerons jamais une propriété dans laquelle nous ne serions pas heureux de séjourner nous-mêmes. Sans exception.",
        },
        {
          title: "Service personnalisé",
          body: "Lorsque vous nous contactez, vous parlez à une personne qui connaît les propriétés, la région et la côte.",
        },
        {
          title: "Sélection honnête",
          body: "Si une propriété ne vous convient pas, nous le dirons. Nous préférons que vous ayez le voyage parfait plutôt qu'une réservation dont nous ne sommes pas fiers.",
        },
      ],
    },
  },
  contact: {
    label: "Nous Contacter",
    heading: "Planifiez votre séjour",
    sub: "Dites-nous quand vous souhaitez venir et quelle propriété vous intéresse. Nous vous répondrons dans les 2 heures.",
    form: {
      name: "Nom complet *",
      namePlaceholder: "Votre nom",
      email: "Email *",
      property: "Propriété souhaitée *",
      propertyPlaceholder: "Sélectionnez une propriété",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Silver Coast",
      optBoth: "Les deux — pas encore sûr(e)",
      optNotSure: "Pas sûr(e) — aidez-moi à choisir",
      checkin: "Arrivée",
      checkout: "Départ",
      guests: "Voyageurs",
      guestsPlaceholder: "Sélectionner",
      message: "Message *",
      messagePlaceholder:
        "Dites-nous ce que serait votre séjour idéal — demandes spéciales, questions sur la propriété, ou tout ce que nous devrions savoir...",
      submit: "Envoyer la demande",
      disclaimer: "Nous répondons dans les 2 heures ouvrables. Sans engagement.",
      guest: "voyageur",
      guestsWord: "voyageurs",
    },
    success: {
      heading: "Merci",
      body: "Nous avons bien reçu votre demande et vous contacterons très bientôt.",
    },
    sidebar: {
      contactLabel: "Contact",
      directBook: "Vous préférez réserver directement ?",
      directBody: "Villa Emerald est également disponible sur Airbnb.",
      directCta: "Voir sur Airbnb →",
    },
  },
  footer: {
    tagline: "Séjours sélectionnés sur la côte portugaise.",
    propertiesLabel: "Nos Propriétés",
    connectLabel: "Nous Rejoindre",
    copyright: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales",
  },
  detail: {
    allProperties: "Toutes les propriétés",
    atAGlance: "En un coup d'œil",
    whatsIncluded: "Ce qui est inclus",
    nearby: "À proximité",
    insideTheVilla: "À l'intérieur de la villa",
    sendEnquiry: "Envoyer une demande",
    whatsapp: "WhatsApp",
    respondTime: "Nous répondons dans les 2 heures",
    bedrooms: "Chambres",
    bathrooms: "Salles de bain",
    guests: "Voyageurs",
    parking: "Parking",
    parkingValue: "Couvert",
    upTo: "Jusqu'à",
    viewAllPhotos: "Voir toutes",
    photos: "photos",
    allPhotos: "Toutes",
    morePhotos: "autres photos",
    close: "Fermer",
    notFound: "Propriété introuvable",
    backToAll: "Toutes les propriétés",
    bedroomsLabel: "chambres",
    bathroomsLabel: "salles de bain",
    sleepsLabel: "couchages",
  },
};

const pt: Translations = {
  nav: {
    properties: "Propriedades",
    destinations: "Destinos",
    forOwners: "Proprietários",
    about: "Sobre",
    contact: "Contacto",
    enquire: "Reservar",
  },
  home: {
    hero: {
      tagline: "Costa Portuguesa",
      line1: "Fique onde",
      line2: "a luz é diferente.",
      sub: "Moradias e apartamentos selecionados na costa portuguesa.",
      cta: "Explorar as nossas propriedades",
    },
    manifesto:
      "Só listamos casas em que acreditamos — lugares onde a luz, o ar e o detalhe fazem uma diferença real na sua estadia.",
    collection: {
      label: "A Nossa Coleção",
      heading: "Duas Casas Excecionais",
      viewProperty: "Ver propriedade",
      learnMore: "Saber mais",
      villa: "Moradia",
      apartment: "Apartamento",
    },
    promise: { label: "A Nossa Promessa", heading: "Porquê a Bougan Villa" },
    usps: [
      {
        title: "Seleção Pessoal",
        body: "Apenas casas que amamos. Ficámos em cada propriedade que listamos — e voltaríamos com prazer.",
      },
      {
        title: "Conhecimento Local",
        body: "Conhecemos cada canto da costa. As enseadas escondidas, as melhores padarias, as estradas sossegadas. Partilhamos tudo.",
      },
      {
        title: "Estadias Perfeitas",
        body: "Desde a sua primeira pergunta até ao último café da manhã, tratamos de tudo — para que possa simplesmente estar lá.",
      },
    ],
    about: {
      label: "Sobre nós",
      heading1: "Nascida do amor pela",
      heading2: "costa portuguesa.",
      body1:
        "A Bougan Villa é uma pequena agência apaixonada, nascida do amor pela costa portuguesa. Só listamos casas em que acreditamos — lugares onde a luz, o ar e o detalhe fazem uma diferença real na sua estadia.",
      body2:
        "Estamos apenas a começar — com duas propriedades excecionais e uma ideia muito clara do tipo de experiência que queremos criar. Qualidade em vez de volume, sempre.",
      cta: "A Nossa História",
    },
    testimonials: { label: "Histórias de Hóspedes", heading: "O que dizem os nossos hóspedes" },
    cta: {
      label: "Planeie a sua Estadia",
      heading: "Pronto para escapar?",
      body: "Diga-nos quando gostaria de visitar, qual propriedade lhe interessa e o que tornaria a sua estadia perfeita. Tratamos do resto.",
      button: "Contacte-nos",
    },
  },
  properties: {
    label: "A Nossa Coleção",
    heading: "As Nossas Propriedades",
    sub: "Duas casas. Ambas excecionais. Ambas escolhidas porque acreditamos nelas.",
    viewProperty: "Ver propriedade",
    learnMore: "Saber mais",
    beds: "quartos",
    baths: "casas de banho",
    sleeps: "hóspedes",
    villa: "Moradia",
    apartment: "Apartamento",
    cta: {
      heading: "Não tem a certeza de qual propriedade escolher?",
      body: "Fale-nos da sua viagem e ajudamo-lo a escolher.",
      button: "Contacte-nos",
    },
  },
  areas: {
    label: "Destinos",
    heading: "Onde Estamos",
    sub: "Dois troços notáveis da costa portuguesa. Completamente diferentes. Ambos valem a pena.",
    nearby: "Nas proximidades",
    view: "Ver",
    belverde: {
      tagline: "Floresta de Pinheiros & Atlântico",
      description:
        "A floresta de pinheiros de Aroeira estende-se por milhares de hectares da costa de Setúbal — árvores antigas, ar limpo, e algumas das melhores praias atlânticas de Portugal a poucos minutos. Belverde existe tranquilamente no seu interior, um lugar inteiramente próprio. Sem ruído, sem multidões. Apenas luz entre os pinheiros e o som do mar.",
    },
    saoMartinho: {
      tagline: "A Baía em Concha",
      description:
        "Uma das formações naturais mais distintas de Portugal — uma baía quase perfeitamente circular de água quente e abrigada, rodeada de falésias douradas. São Martinho do Porto é tranquilo e autêntico. Os pescadores ainda trazem a sua apanha de manhã; a aldeia move-se exatamente ao ritmo certo. Fica a meio caminho entre Lisboa e o Porto, e de alguma forma longe de ambos.",
    },
  },
  owners: {
    hero: {
      label: "Proprietários",
      heading1: "Tem uma propriedade",
      heading2: "na costa portuguesa?",
      body: "Somos uma pequena agência com padrões muito elevados. Gostaríamos de saber sobre a sua propriedade — e se for adequada, seria uma honra representá-la.",
      cta: "Contacte-nos",
    },
    approach: {
      label: "A Nossa Abordagem",
      heading1: "Pequena por design.",
      heading2: "Excelente por intenção.",
      body1:
        "Estamos a construir uma pequena coleção curada de propriedades excecionais na costa portuguesa. Não queremos ser a maior agência — queremos ser a melhor.",
      body2:
        "Se tem uma propriedade com algo especial — boa luz, um jardim bonito, uma localização notável — adoraríamos conversar. Trabalhamos de perto com cada proprietário, e só listamos casas em que genuinamente acreditamos.",
      body3:
        "Tudo, desde a gestão de hóspedes à fotografia e limpeza, é tratado com cuidado. Recebe os seus rendimentos mensalmente, com total transparência.",
      cta: "Escreva-nos sobre a sua propriedade",
    },
    bottom: {
      heading: "Acha que a sua propriedade poderia ser certa para nós?",
      body: "Envie-nos um email curto com uma descrição e algumas fotos. Sem compromisso.",
    },
  },
  about: {
    hero: {
      label: "A Nossa História",
      heading1: "Nascida do amor pela",
      heading2: "costa portuguesa.",
    },
    body1:
      "A Bougan Villa é uma pequena agência apaixonada, nascida do amor pela costa portuguesa. Só listamos casas em que acreditamos — lugares onde a luz, o ar e o detalhe fazem uma diferença real na sua estadia.",
    body2:
      "Começámos com duas propriedades: uma moradia escondida na floresta de pinheiros de Aroeira perto de Belverde, e um apartamento luminoso na extraordinária baía de São Martinho do Porto. Ambas escolhidas porque nos emocionaram. Porque ficaríamos nós próprios — e ficámos.",
    body3:
      "À medida que crescemos, a nossa regra permanece a mesma: apenas casas em que acreditamos. Preferimos ser pequenos e bons a grandes e ordinários.",
    cta: "Contacte-nos",
    stats: { properties: "Propriedades Excecionais", destinations: "Destinos Costeiros" },
    values: {
      heading: "O que acreditamos",
      items: [
        {
          title: "Qualidade em vez de volume",
          body: "Nunca listaremos uma propriedade onde não ficaríamos felizes de nos hospedar. Ponto final.",
        },
        {
          title: "Serviço pessoal",
          body: "Quando nos contacta, fala com uma pessoa que conhece as propriedades, a área e a costa.",
        },
        {
          title: "Curadoria honesta",
          body: "Se uma propriedade não é certa para si, dizemos. Preferimos que tenha a viagem perfeita a uma reserva de que não nos orgulhamos.",
        },
      ],
    },
  },
  contact: {
    label: "Contacte-nos",
    heading: "Planeie a sua Estadia",
    sub: "Diga-nos quando gostaria de visitar e qual propriedade lhe interessa. Respondemos dentro de 2 horas.",
    form: {
      name: "Nome completo *",
      namePlaceholder: "O seu nome",
      email: "Email *",
      property: "Propriedade de interesse *",
      propertyPlaceholder: "Selecione uma propriedade",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Costa de Prata",
      optBoth: "Ambas — ainda não tenho a certeza",
      optNotSure: "Não tenho a certeza — ajude-me a escolher",
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Hóspedes",
      guestsPlaceholder: "Selecionar",
      message: "Mensagem *",
      messagePlaceholder:
        "Fale-nos da sua estadia ideal — pedidos especiais, questões sobre a propriedade, ou qualquer coisa que devamos saber...",
      submit: "Enviar pedido",
      disclaimer: "Respondemos dentro de 2 horas úteis. Sem compromisso.",
      guest: "hóspede",
      guestsWord: "hóspedes",
    },
    success: {
      heading: "Obrigado",
      body: "Recebemos o seu pedido e entraremos em contacto muito em breve.",
    },
    sidebar: {
      contactLabel: "Contacto",
      directBook: "Prefere reservar diretamente?",
      directBody: "Villa Emerald também está disponível no Airbnb.",
      directCta: "Ver no Airbnb →",
    },
  },
  footer: {
    tagline: "Estadias selecionadas na costa portuguesa.",
    propertiesLabel: "As Nossas Propriedades",
    connectLabel: "Contactos",
    copyright: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos e Condições",
  },
  detail: {
    allProperties: "Todas as propriedades",
    atAGlance: "Em resumo",
    whatsIncluded: "O que está incluído",
    nearby: "Nas proximidades",
    insideTheVilla: "Interior da moradia",
    sendEnquiry: "Enviar pedido",
    whatsapp: "WhatsApp",
    respondTime: "Respondemos dentro de 2 horas",
    bedrooms: "Quartos",
    bathrooms: "Casas de banho",
    guests: "Hóspedes",
    parking: "Estacionamento",
    parkingValue: "Coberto",
    upTo: "Até",
    viewAllPhotos: "Ver todas",
    photos: "fotos",
    allPhotos: "Todas",
    morePhotos: "fotos",
    close: "Fechar",
    notFound: "Propriedade não encontrada",
    backToAll: "Todas as propriedades",
    bedroomsLabel: "quartos",
    bathroomsLabel: "casas de banho",
    sleepsLabel: "hóspedes",
  },
};

const es: Translations = {
  nav: {
    properties: "Propiedades",
    destinations: "Destinos",
    forOwners: "Propietarios",
    about: "Nosotros",
    contact: "Contacto",
    enquire: "Consultar",
  },
  home: {
    hero: {
      tagline: "Costa Portuguesa",
      line1: "Quédate donde",
      line2: "la luz es diferente.",
      sub: "Villas y apartamentos seleccionados en la costa portuguesa.",
      cta: "Explorar nuestras propiedades",
    },
    manifesto:
      "Solo listamos casas en las que creemos — lugares donde la luz, el aire y los detalles marcan una diferencia real en tu estancia.",
    collection: {
      label: "Nuestra Colección",
      heading: "Dos Hogares Excepcionales",
      viewProperty: "Ver propiedad",
      learnMore: "Saber más",
      villa: "Villa",
      apartment: "Apartamento",
    },
    promise: { label: "Nuestra Promesa", heading: "Por qué Bougan Villa" },
    usps: [
      {
        title: "Selección Personal",
        body: "Solo casas que amamos. Hemos alojado en cada propiedad que listamos — y lo repetiríamos encantados.",
      },
      {
        title: "Conocimiento Local",
        body: "Conocemos cada rincón de la costa. Las calas escondidas, las mejores panaderías, los caminos tranquilos. Lo compartimos todo.",
      },
      {
        title: "Estancias Sin Preocupaciones",
        body: "Desde tu primera pregunta hasta el último café de la mañana, lo gestionamos todo — para que simplemente puedas estar allí.",
      },
    ],
    about: {
      label: "Nosotros",
      heading1: "Nacida del amor por",
      heading2: "la costa portuguesa.",
      body1:
        "Bougan Villa es una pequeña agencia apasionada, nacida del amor por la costa portuguesa. Solo listamos casas en las que creemos — lugares donde la luz, el aire y los detalles marcan una diferencia real en tu estancia.",
      body2:
        "Estamos empezando — con dos propiedades excepcionales y una idea muy clara del tipo de experiencia que queremos crear. Calidad sobre volumen, siempre.",
      cta: "Nuestra Historia",
    },
    testimonials: { label: "Experiencias de Huéspedes", heading: "Lo que dicen nuestros huéspedes" },
    cta: {
      label: "Planifica tu Estancia",
      heading: "¿Listo para escapar?",
      body: "Cuéntanos cuándo te gustaría visitar, qué propiedad te interesa y qué haría tu estancia perfecta. Nosotros nos encargamos del resto.",
      button: "Contáctanos",
    },
  },
  properties: {
    label: "Nuestra Colección",
    heading: "Nuestras Propiedades",
    sub: "Dos casas. Ambas excepcionales. Ambas elegidas porque creemos en ellas.",
    viewProperty: "Ver propiedad",
    learnMore: "Saber más",
    beds: "habitaciones",
    baths: "baños",
    sleeps: "duerme",
    villa: "Villa",
    apartment: "Apartamento",
    cta: {
      heading: "¿No sabes qué propiedad es la adecuada para ti?",
      body: "Cuéntanos sobre tu viaje y te ayudaremos a elegir.",
      button: "Contáctanos",
    },
  },
  areas: {
    label: "Destinos",
    heading: "Dónde Estamos",
    sub: "Dos tramos notables de la costa portuguesa. Completamente diferentes. Ambos merecen la pena.",
    nearby: "Cerca",
    view: "Ver",
    belverde: {
      tagline: "Bosque de Pinos & Atlántico",
      description:
        "El bosque de pinos de Aroeira se extiende por miles de hectáreas de la costa de Setúbal — árboles centenarios, aire limpio, y algunas de las mejores playas atlánticas de Portugal a pocos minutos. Belverde se asienta tranquilamente en su interior, un lugar completamente propio. Sin ruido, sin multitudes. Solo luz entre los pinos y el sonido del mar.",
    },
    saoMartinho: {
      tagline: "La Bahía en Concha",
      description:
        "Una de las formaciones naturales más singulares de Portugal — una bahía casi perfectamente circular de aguas cálidas y resguardadas rodeada de acantilados dorados. São Martinho do Porto es tranquilo y auténtico. Los pescadores todavía traen su captura cada mañana; el pueblo avanza exactamente al ritmo adecuado. Está a medio camino entre Lisboa y Oporto, y de alguna manera lejos de ambos.",
    },
  },
  owners: {
    hero: {
      label: "Propietarios",
      heading1: "¿Tienes una propiedad",
      heading2: "en la costa portuguesa?",
      body: "Somos una pequeña agencia con estándares muy altos. Nos encantaría saber sobre tu propiedad — y si encaja, sería un honor representarla.",
      cta: "Contáctanos",
    },
    approach: {
      label: "Nuestro Enfoque",
      heading1: "Pequeña por diseño.",
      heading2: "Excelente por intención.",
      body1:
        "Estamos construyendo una pequeña colección curada de propiedades excepcionales en la costa portuguesa. No buscamos ser la agencia más grande — buscamos ser la mejor.",
      body2:
        "Si tienes una propiedad con algo especial — buena luz, un jardín hermoso, una ubicación notable — nos encantaría hablar. Trabajamos estrechamente con cada propietario y solo listamos casas en las que genuinamente creemos.",
      body3:
        "Todo, desde la gestión de huéspedes hasta la fotografía y la limpieza, se maneja con cuidado. Recibes tus ingresos mensualmente, con total transparencia.",
      cta: "Escríbenos sobre tu propiedad",
    },
    bottom: {
      heading: "¿Crees que tu propiedad podría ser perfecta para nosotros?",
      body: "Envíanos un breve email con una descripción y algunas fotos. Sin compromiso.",
    },
  },
  about: {
    hero: {
      label: "Nuestra Historia",
      heading1: "Nacida del amor por",
      heading2: "la costa portuguesa.",
    },
    body1:
      "Bougan Villa es una pequeña agencia apasionada, nacida del amor por la costa portuguesa. Solo listamos casas en las que creemos — lugares donde la luz, el aire y los detalles marcan una diferencia real en tu estancia.",
    body2:
      "Empezamos con dos propiedades: una villa escondida en el bosque de pinos de Aroeira cerca de Belverde, y un luminoso apartamento en la extraordinaria bahía de São Martinho do Porto. Ambas elegidas porque nos conmovieron. Porque nosotros mismos nos quedaríamos — y lo hemos hecho.",
    body3:
      "A medida que crecemos, nuestra regla sigue siendo la misma: solo casas en las que creemos. Preferimos ser pequeños y buenos que grandes y ordinarios.",
    cta: "Contáctanos",
    stats: { properties: "Propiedades Excepcionales", destinations: "Destinos Costeros" },
    values: {
      heading: "En lo que creemos",
      items: [
        {
          title: "Calidad sobre volumen",
          body: "Nunca listaremos una propiedad en la que no estaríamos felices de alojarnos nosotros mismos. Sin excepciones.",
        },
        {
          title: "Servicio personal",
          body: "Cuando nos contactas, hablas con una persona que conoce las propiedades, la zona y la costa.",
        },
        {
          title: "Curaduría honesta",
          body: "Si una propiedad no es adecuada para ti, lo diremos. Preferimos que tengas el viaje perfecto a una reserva de la que no estemos orgullosos.",
        },
      ],
    },
  },
  contact: {
    label: "Contáctanos",
    heading: "Planifica tu Estancia",
    sub: "Cuéntanos cuándo te gustaría visitar y qué propiedad te interesa. Te responderemos en 2 horas.",
    form: {
      name: "Nombre completo *",
      namePlaceholder: "Tu nombre",
      email: "Email *",
      property: "Propiedad de interés *",
      propertyPlaceholder: "Selecciona una propiedad",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Costa de Plata",
      optBoth: "Ambas — aún no estoy seguro/a",
      optNotSure: "No estoy seguro/a — ayúdame a elegir",
      checkin: "Llegada",
      checkout: "Salida",
      guests: "Huéspedes",
      guestsPlaceholder: "Seleccionar",
      message: "Mensaje *",
      messagePlaceholder:
        "Cuéntanos sobre tu estancia ideal — solicitudes especiales, preguntas sobre la propiedad, o cualquier cosa que debamos saber...",
      submit: "Enviar consulta",
      disclaimer: "Respondemos en 2 horas laborables. Sin compromiso.",
      guest: "huésped",
      guestsWord: "huéspedes",
    },
    success: {
      heading: "Gracias",
      body: "Hemos recibido tu consulta y nos pondremos en contacto muy pronto.",
    },
    sidebar: {
      contactLabel: "Contacto",
      directBook: "¿Prefieres reservar directamente?",
      directBody: "Villa Emerald también está disponible en Airbnb.",
      directCta: "Ver en Airbnb →",
    },
  },
  footer: {
    tagline: "Estancias seleccionadas en la costa portuguesa.",
    propertiesLabel: "Nuestras Propiedades",
    connectLabel: "Conectar",
    copyright: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos y Condiciones",
  },
  detail: {
    allProperties: "Todas las propiedades",
    atAGlance: "De un vistazo",
    whatsIncluded: "Qué está incluido",
    nearby: "Cerca",
    insideTheVilla: "Interior de la villa",
    sendEnquiry: "Enviar consulta",
    whatsapp: "WhatsApp",
    respondTime: "Respondemos en 2 horas",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    guests: "Huéspedes",
    parking: "Aparcamiento",
    parkingValue: "Cubierto",
    upTo: "Hasta",
    viewAllPhotos: "Ver todas",
    photos: "fotos",
    allPhotos: "Todas",
    morePhotos: "fotos más",
    close: "Cerrar",
    notFound: "Propiedad no encontrada",
    backToAll: "Todas las propiedades",
    bedroomsLabel: "habitaciones",
    bathroomsLabel: "baños",
    sleepsLabel: "duerme",
  },
};

const el: Translations = {
  nav: {
    properties: "Ιδιοκτησίες",
    destinations: "Προορισμοί",
    forOwners: "Ιδιοκτήτες",
    about: "Σχετικά",
    contact: "Επικοινωνία",
    enquire: "Αίτηση",
  },
  home: {
    hero: {
      tagline: "Πορτογαλική Ακτή",
      line1: "Μείνετε εκεί που",
      line2: "το φως είναι διαφορετικό.",
      sub: "Επιλεγμένες βίλες και διαμερίσματα στην πορτογαλική ακτή.",
      cta: "Εξερευνήστε τις ιδιοκτησίες μας",
    },
    manifesto:
      "Καταχωρούμε μόνο σπίτια στα οποία πιστεύουμε — μέρη όπου το φως, ο αέρας και η λεπτομέρεια κάνουν πραγματική διαφορά στη διαμονή σας.",
    collection: {
      label: "Η Συλλογή μας",
      heading: "Δύο Εξαιρετικά Σπίτια",
      viewProperty: "Δείτε την ιδιοκτησία",
      learnMore: "Μάθετε περισσότερα",
      villa: "Βίλα",
      apartment: "Διαμέρισμα",
    },
    promise: { label: "Η Υπόσχεσή μας", heading: "Γιατί Bougan Villa" },
    usps: [
      {
        title: "Προσωπικά Επιλεγμένα",
        body: "Μόνο σπίτια που αγαπάμε. Έχουμε μείνει σε κάθε ιδιοκτησία που καταχωρούμε — και θα τα κλείναμε ξανά με χαρά.",
      },
      {
        title: "Τοπική Γνώση",
        body: "Γνωρίζουμε κάθε γωνιά της ακτής. Τους κρυμμένους κόλπους, τα καλύτερα αρτοποιεία, τους ήσυχους δρόμους. Τα μοιραζόμαστε όλα.",
      },
      {
        title: "Απλή Διαμονή",
        body: "Από την πρώτη σας ερώτηση μέχρι τον τελευταίο πρωινό καφέ, διαχειριζόμαστε τα πάντα — για να μπορείτε απλά να είστε εκεί.",
      },
    ],
    about: {
      label: "Σχετικά",
      heading1: "Γεννημένη από αγάπη για",
      heading2: "την πορτογαλική ακτή.",
      body1:
        "Η Bougan Villa είναι μια μικρή, παθιασμένη πρακτορεία, γεννημένη από αγάπη για την πορτογαλική ακτή. Καταχωρούμε μόνο σπίτια στα οποία πιστεύουμε — μέρη όπου το φως, ο αέρας και η λεπτομέρεια κάνουν πραγματική διαφορά.",
      body2:
        "Μόλις ξεκινάμε — με δύο εξαιρετικές ιδιοκτησίες και μια πολύ σαφή ιδέα για το είδος εμπειρίας που θέλουμε να δημιουργήσουμε. Ποιότητα πάνω από ποσότητα, πάντα.",
      cta: "Η Ιστορία μας",
    },
    testimonials: { label: "Εμπειρίες Επισκεπτών", heading: "Τι λένε οι επισκέπτες μας" },
    cta: {
      label: "Σχεδιάστε τη Διαμονή σας",
      heading: "Έτοιμοι να ξεφύγετε;",
      body: "Πείτε μας πότε θα θέλατε να επισκεφθείτε, ποια ιδιοκτησία σας ενδιαφέρει και τι θα έκανε τη διαμονή σας τέλεια. Αναλαμβάνουμε από εκεί.",
      button: "Επικοινωνήστε μαζί μας",
    },
  },
  properties: {
    label: "Η Συλλογή μας",
    heading: "Οι Ιδιοκτησίες μας",
    sub: "Δύο σπίτια. Και τα δύο εξαιρετικά. Και τα δύο επιλεγμένα γιατί πιστεύουμε σε αυτά.",
    viewProperty: "Δείτε την ιδιοκτησία",
    learnMore: "Μάθετε περισσότερα",
    beds: "υπνοδωμάτια",
    baths: "μπάνια",
    sleeps: "κοιμάται",
    villa: "Βίλα",
    apartment: "Διαμέρισμα",
    cta: {
      heading: "Δεν είστε σίγουροι ποια ιδιοκτησία είναι κατάλληλη για εσάς;",
      body: "Πείτε μας για το ταξίδι σας και θα σας βοηθήσουμε να επιλέξετε.",
      button: "Επικοινωνήστε",
    },
  },
  areas: {
    label: "Προορισμοί",
    heading: "Πού Βρισκόμαστε",
    sub: "Δύο αξιοσημείωτα τμήματα της πορτογαλικής ακτής. Εντελώς διαφορετικά. Και τα δύο αξίζει τον κόπο.",
    nearby: "Κοντά",
    view: "Δείτε",
    belverde: {
      tagline: "Δάσος Πεύκων & Ατλαντικός",
      description:
        "Το πευκοδάσος του Aroeira εκτείνεται σε χιλιάδες εκτάρια της ακτής Setúbal — αρχαία δέντρα, καθαρός αέρας, και μερικές από τις καλύτερες ατλαντικές παραλίες της Πορτογαλίας λίγα λεπτά μακριά. Το Belverde αναπαύεται ήσυχα εντός αυτού, ένα μέρος εντελώς δικό του. Χωρίς θόρυβο, χωρίς πλήθη. Μόνο φως μέσα από τα πεύκα και ο ήχος της θάλασσας.",
    },
    saoMartinho: {
      tagline: "Ο Κόλπος Χτένι",
      description:
        "Ένας από τους πιο χαρακτηριστικούς φυσικούς σχηματισμούς της Πορτογαλίας — σχεδόν τέλειος κυκλικός κόλπος με ζεστά, ήρεμα νερά, περιτριγυρισμένος από χρυσούς βράχους. Το São Martinho do Porto είναι ήρεμο και αυθεντικό. Οι ψαράδες φέρνουν ακόμα τη ψαριά τους κάθε πρωί· το χωριό κινείται ακριβώς στον σωστό ρυθμό. Βρίσκεται στα μισά της διαδρομής μεταξύ Λισαβόνας και Πόρτο.",
    },
  },
  owners: {
    hero: {
      label: "Ιδιοκτήτες",
      heading1: "Έχετε ιδιοκτησία",
      heading2: "στην πορτογαλική ακτή;",
      body: "Είμαστε μια μικρή πρακτορεία με πολύ υψηλά πρότυπα. Θα χαρούμε να ακούσουμε για την ιδιοκτησία σας — και αν ταιριάζει, θα ήταν τιμή μας να την εκπροσωπήσουμε.",
      cta: "Επικοινωνήστε μαζί μας",
    },
    approach: {
      label: "Η Προσέγγισή μας",
      heading1: "Μικρή από σχεδιασμό.",
      heading2: "Εξαιρετική από πρόθεση.",
      body1:
        "Χτίζουμε μια μικρή, επιλεγμένη συλλογή εξαιρετικών ιδιοκτησιών στην πορτογαλική ακτή. Δεν θέλουμε να είμαστε η μεγαλύτερη πρακτορεία — θέλουμε να είμαστε η καλύτερη.",
      body2:
        "Αν έχετε ιδιοκτησία με κάτι ιδιαίτερο — υπέροχο φως, όμορφο κήπο, αξιόλογη τοποθεσία — θα θέλαμε πολύ να μιλήσουμε. Δουλεύουμε στενά με κάθε ιδιοκτήτη και καταχωρούμε μόνο σπίτια στα οποία πραγματικά πιστεύουμε.",
      body3:
        "Όλα, από τη διαχείριση επισκεπτών έως τη φωτογράφηση και τον καθαρισμό, χειρίζονται με φροντίδα. Λαμβάνετε τα έσοδά σας μηνιαίως, με πλήρη διαφάνεια.",
      cta: "Στείλτε μας email για την ιδιοκτησία σας",
    },
    bottom: {
      heading: "Πιστεύετε ότι η ιδιοκτησία σας θα ταίριαζε;",
      body: "Στείλτε μας ένα σύντομο email με μια περιγραφή και μερικές φωτογραφίες. Χωρίς δέσμευση.",
    },
  },
  about: {
    hero: {
      label: "Η Ιστορία μας",
      heading1: "Γεννημένη από αγάπη για",
      heading2: "την πορτογαλική ακτή.",
    },
    body1:
      "Η Bougan Villa είναι μια μικρή, παθιασμένη πρακτορεία, γεννημένη από αγάπη για την πορτογαλική ακτή. Καταχωρούμε μόνο σπίτια στα οποία πιστεύουμε — μέρη όπου το φως, ο αέρας και η λεπτομέρεια κάνουν πραγματική διαφορά.",
    body2:
      "Ξεκινήσαμε με δύο ιδιοκτησίες: μια βίλα κρυμμένη στο πευκοδάσος του Aroeira κοντά στο Belverde, και ένα φωτεινό διαμέρισμα στον εξαιρετικό κόλπο του São Martinho do Porto. Και τα δύο επιλέχθηκαν γιατί μας συγκίνησαν. Γιατί θα μέναμε εκεί οι ίδιοι — και το κάναμε.",
    body3:
      "Καθώς μεγαλώνουμε, ο κανόνας μας παραμένει ίδιος: μόνο σπίτια στα οποία πιστεύουμε. Προτιμάμε να είμαστε μικροί και καλοί παρά μεγάλοι και συνηθισμένοι.",
    cta: "Επικοινωνήστε μαζί μας",
    stats: { properties: "Εξαιρετικές Ιδιοκτησίες", destinations: "Παράκτιοι Προορισμοί" },
    values: {
      heading: "Σε τι πιστεύουμε",
      items: [
        {
          title: "Ποιότητα αντί ποσότητας",
          body: "Δεν θα καταχωρίσουμε ποτέ ιδιοκτησία στην οποία δεν θα χαρούμε να μείνουμε εμείς οι ίδιοι. Τελεία.",
        },
        {
          title: "Προσωπική εξυπηρέτηση",
          body: "Όταν επικοινωνείτε μαζί μας, μιλάτε με άτομο που γνωρίζει τις ιδιοκτησίες, την περιοχή και την ακτή.",
        },
        {
          title: "Ειλικρινής επιλογή",
          body: "Αν μια ιδιοκτησία δεν είναι κατάλληλη για εσάς, θα το πούμε. Προτιμάμε να έχετε το τέλειο ταξίδι.",
        },
      ],
    },
  },
  contact: {
    label: "Επικοινωνήστε",
    heading: "Σχεδιάστε τη Διαμονή σας",
    sub: "Πείτε μας πότε θα θέλατε να επισκεφθείτε και ποια ιδιοκτησία σας ενδιαφέρει. Θα σας απαντήσουμε εντός 2 ωρών.",
    form: {
      name: "Πλήρες Όνομα *",
      namePlaceholder: "Το όνομά σας",
      email: "Email *",
      property: "Ιδιοκτησία ενδιαφέροντος *",
      propertyPlaceholder: "Επιλέξτε ιδιοκτησία",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Ασημένια Ακτή",
      optBoth: "Και οι δύο — δεν είμαι σίγουρος/η ακόμα",
      optNotSure: "Δεν είμαι σίγουρος/η — βοηθήστε με να επιλέξω",
      checkin: "Άφιξη",
      checkout: "Αναχώρηση",
      guests: "Επισκέπτες",
      guestsPlaceholder: "Επιλογή",
      message: "Μήνυμα *",
      messagePlaceholder:
        "Πείτε μας για την ιδανική διαμονή σας — ειδικές απαιτήσεις, ερωτήσεις για την ιδιοκτησία, ή οτιδήποτε άλλο πρέπει να γνωρίζουμε...",
      submit: "Αποστολή αίτησης",
      disclaimer: "Απαντάμε εντός 2 εργάσιμων ωρών. Χωρίς δέσμευση.",
      guest: "επισκέπτης",
      guestsWord: "επισκέπτες",
    },
    success: {
      heading: "Ευχαριστούμε",
      body: "Λάβαμε την αίτησή σας και θα επικοινωνήσουμε μαζί σας πολύ σύντομα.",
    },
    sidebar: {
      contactLabel: "Επικοινωνία",
      directBook: "Προτιμάτε να κλείσετε απευθείας;",
      directBody: "Η Villa Emerald είναι επίσης διαθέσιμη στο Airbnb.",
      directCta: "Δείτε στο Airbnb →",
    },
  },
  footer: {
    tagline: "Επιλεγμένες διαμονές στην πορτογαλική ακτή.",
    propertiesLabel: "Οι Ιδιοκτησίες μας",
    connectLabel: "Επικοινωνία",
    copyright: "Με επιφύλαξη παντός δικαιώματος.",
    privacy: "Πολιτική Απορρήτου",
    terms: "Όροι & Προϋποθέσεις",
  },
  detail: {
    allProperties: "Όλες οι ιδιοκτησίες",
    atAGlance: "Με μια ματιά",
    whatsIncluded: "Τι περιλαμβάνεται",
    nearby: "Κοντά",
    insideTheVilla: "Εσωτερικό βίλας",
    sendEnquiry: "Αποστολή αίτησης",
    whatsapp: "WhatsApp",
    respondTime: "Απαντάμε εντός 2 ωρών",
    bedrooms: "Υπνοδωμάτια",
    bathrooms: "Μπάνια",
    guests: "Επισκέπτες",
    parking: "Χώρος στάθμευσης",
    parkingValue: "Κλειστό",
    upTo: "Έως",
    viewAllPhotos: "Δείτε όλες",
    photos: "φωτογραφίες",
    allPhotos: "Όλες",
    morePhotos: "περισσότερες",
    close: "Κλείσιμο",
    notFound: "Η ιδιοκτησία δεν βρέθηκε",
    backToAll: "Όλες οι ιδιοκτησίες",
    bedroomsLabel: "υπνοδωμάτια",
    bathroomsLabel: "μπάνια",
    sleepsLabel: "κοιμάται",
  },
};

const da: Translations = {
  nav: {
    properties: "Ejendomme",
    destinations: "Destinationer",
    forOwners: "Ejere",
    about: "Om os",
    contact: "Kontakt",
    enquire: "Forespørgsel",
  },
  home: {
    hero: {
      tagline: "Portugisisk Kyst",
      line1: "Bo der, hvor",
      line2: "lyset er anderledes.",
      sub: "Håndplukkede villaer og lejligheder på den portugisiske kyst.",
      cta: "Udforsk vores ejendomme",
    },
    manifesto:
      "Vi opsætter kun hjem, vi tror på — steder, hvor lyset, luften og detaljerne gør en reel forskel for dit ophold.",
    collection: {
      label: "Vores Samling",
      heading: "To Exceptionelle Hjem",
      viewProperty: "Se ejendommen",
      learnMore: "Lær mere",
      villa: "Villa",
      apartment: "Lejlighed",
    },
    promise: { label: "Vores Løfte", heading: "Hvorfor Bougan Villa" },
    usps: [
      {
        title: "Personligt Udvalgt",
        body: "Kun hjem vi elsker. Vi har boet i hver ejendom, vi viser — og vi ville gladeligt booke dem igen.",
      },
      {
        title: "Lokal Viden",
        body: "Vi kender hvert hjørne af kysten. De skjulte bugter, de bedste bagerier, de stille veje. Vi deler det hele.",
      },
      {
        title: "Problemfrie Ophold",
        body: "Fra dit første spørgsmål til din sidste morgenkaffe håndterer vi alt — så du bare kan være til stede.",
      },
    ],
    about: {
      label: "Om os",
      heading1: "Født af kærlighed til",
      heading2: "den portugisiske kyst.",
      body1:
        "Bougan Villa er et lille, passioneret bureau, født af kærlighed til den portugisiske kyst. Vi opsætter kun hjem, vi tror på — steder, hvor lyset, luften og detaljerne gør en reel forskel for dit ophold.",
      body2:
        "Vi er lige begyndt — med to exceptionelle ejendomme og en meget klar idé om den slags oplevelse, vi ønsker at skabe. Kvalitet frem for volumen, altid.",
      cta: "Vores Historie",
    },
    testimonials: { label: "Gæstehistorier", heading: "Hvad vores gæster siger" },
    cta: {
      label: "Planlæg dit Ophold",
      heading: "Klar til at flygte?",
      body: "Fortæl os, hvornår du vil besøge, hvilken ejendom der interesserer dig, og hvad der ville gøre dit ophold perfekt. Vi klarer resten.",
      button: "Kontakt os",
    },
  },
  properties: {
    label: "Vores Samling",
    heading: "Vores Ejendomme",
    sub: "To hjem. Begge exceptionelle. Begge valgt fordi vi tror på dem.",
    viewProperty: "Se ejendommen",
    learnMore: "Lær mere",
    beds: "soveværelser",
    baths: "badeværelser",
    sleeps: "sover",
    villa: "Villa",
    apartment: "Lejlighed",
    cta: {
      heading: "Ikke sikker på hvilken ejendom der passer til dig?",
      body: "Fortæl os om din rejse, og vi hjælper dig med at vælge.",
      button: "Kontakt os",
    },
  },
  areas: {
    label: "Destinationer",
    heading: "Hvor Vi Er",
    sub: "To bemærkelsesværdige strækninger af den portugisiske kyst. Begge helt forskellige. Begge det værd.",
    nearby: "I nærheden",
    view: "Se",
    belverde: {
      tagline: "Fyrreskov & Atlanterhavet",
      description:
        "Aroeira-fyrreskovens strækker sig over tusindvis af hektarer af Setúbal-kysten — gamle træer, ren luft og nogle af Portugals fineste atlanterhavsstrender få minutter væk. Belverde sidder stille inden i det, et sted helt for sig selv. Ingen støj, ingen folkemængder. Kun lys gennem fyrretræerne og lyden af havet.",
    },
    saoMartinho: {
      tagline: "Muslingbugten",
      description:
        "En af Portugals mest karakteristiske naturformationer — en næsten perfekt cirkulær bugt med varmt, læ vand omgivet af gyldne klipper. São Martinho do Porto er uforhaste og autentisk. Fiskerne bringer stadig deres fangst ind hver morgen; landsbyen bevæger sig i præcis det rigtige tempo. Den ligger halvvejs mellem Lissabon og Porto, og alligevel langt fra begge.",
    },
  },
  owners: {
    hero: {
      label: "Ejendomsejere",
      heading1: "Har du en ejendom",
      heading2: "på den portugisiske kyst?",
      body: "Vi er et lille bureau med meget høje standarder. Vi vil meget gerne høre om din ejendom — og hvis den er det rette match, ville det være en ære at repræsentere den.",
      cta: "Kontakt os",
    },
    approach: {
      label: "Vores Tilgang",
      heading1: "Lille af design.",
      heading2: "Fremragende af intention.",
      body1:
        "Vi bygger en lille, kurateret samling af exceptionelle ejendomme på den portugisiske kyst. Vi ønsker ikke at være det største bureau — vi ønsker at være det bedste.",
      body2:
        "Hvis du har en ejendom med noget særligt — godt lys, en smuk have, en bemærkelsesværdig beliggenhed — vil vi meget gerne tale. Vi arbejder tæt med hver ejer og opsætter kun hjem, vi virkelig tror på.",
      body3:
        "Alt fra gæstehåndtering til fotografering til rengøring håndteres med omhu. Du modtager din indtjening månedligt med fuld gennemsigtighed.",
      cta: "Skriv til os om din ejendom",
    },
    bottom: {
      heading: "Tror du, at din ejendom kunne passe til os?",
      body: "Send os en kort email med en beskrivelse og et par fotos. Ingen forpligtelse.",
    },
  },
  about: {
    hero: {
      label: "Vores Historie",
      heading1: "Født af kærlighed til",
      heading2: "den portugisiske kyst.",
    },
    body1:
      "Bougan Villa er et lille, passioneret bureau, født af kærlighed til den portugisiske kyst. Vi opsætter kun hjem, vi tror på — steder, hvor lyset, luften og detaljerne gør en reel forskel for dit ophold.",
    body2:
      "Vi startede med to ejendomme: en villa skjult i Aroeira-fyrreskovens nær Belverde og en lys lejlighed i den ekstraordinære bugt ved São Martinho do Porto. Begge valgt fordi de rørte os. Fordi vi selv ville bo der — og har gjort det.",
    body3:
      "Efterhånden som vi vokser, forbliver vores regel den samme: kun hjem vi tror på. Vi vil hellere være små og gode end store og ordinære.",
    cta: "Kontakt os",
    stats: { properties: "Exceptionelle Ejendomme", destinations: "Kystdestinationer" },
    values: {
      heading: "Hvad vi tror på",
      items: [
        {
          title: "Kvalitet frem for volumen",
          body: "Vi vil aldrig opsætte en ejendom, vi ikke selv ville være glade for at bo i. Punktum.",
        },
        {
          title: "Personlig service",
          body: "Når du kontakter os, taler du med en person, der kender ejendommene, området og kysten.",
        },
        {
          title: "Ærlig kuratering",
          body: "Hvis en ejendom ikke er rigtig for dig, siger vi det. Vi vil hellere have, at du får den perfekte rejse.",
        },
      ],
    },
  },
  contact: {
    label: "Kontakt os",
    heading: "Planlæg dit Ophold",
    sub: "Fortæl os, hvornår du vil besøge og hvilken ejendom der interesserer dig. Vi vender tilbage inden for 2 timer.",
    form: {
      name: "Fulde navn *",
      namePlaceholder: "Dit navn",
      email: "Email *",
      property: "Ejendom af interesse *",
      propertyPlaceholder: "Vælg en ejendom",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Sølvkysten",
      optBoth: "Begge — ikke sikker endnu",
      optNotSure: "Ikke sikker — hjælp mig med at vælge",
      checkin: "Ankomst",
      checkout: "Afrejse",
      guests: "Gæster",
      guestsPlaceholder: "Vælg",
      message: "Besked *",
      messagePlaceholder:
        "Fortæl os om dit ideelle ophold — særlige ønsker, spørgsmål om ejendommen eller andet vi bør vide...",
      submit: "Send forespørgsel",
      disclaimer: "Vi svarer inden for 2 arbejdstimer. Ingen forpligtelse.",
      guest: "gæst",
      guestsWord: "gæster",
    },
    success: {
      heading: "Tak",
      body: "Vi har modtaget din forespørgsel og vil kontakte dig meget snart.",
    },
    sidebar: {
      contactLabel: "Kontakt",
      directBook: "Foretrækker du at booke direkte?",
      directBody: "Villa Emerald er også tilgængelig på Airbnb.",
      directCta: "Se på Airbnb →",
    },
  },
  footer: {
    tagline: "Kuraterede ophold på den portugisiske kyst.",
    propertiesLabel: "Vores Ejendomme",
    connectLabel: "Forbind",
    copyright: "Alle rettigheder forbeholdes.",
    privacy: "Privatlivspolitik",
    terms: "Vilkår og betingelser",
  },
  detail: {
    allProperties: "Alle ejendomme",
    atAGlance: "Overblik",
    whatsIncluded: "Hvad er inkluderet",
    nearby: "I nærheden",
    insideTheVilla: "Indendørs",
    sendEnquiry: "Send forespørgsel",
    whatsapp: "WhatsApp",
    respondTime: "Vi svarer inden for 2 timer",
    bedrooms: "Soveværelser",
    bathrooms: "Badeværelser",
    guests: "Gæster",
    parking: "Parkering",
    parkingValue: "Indendørs",
    upTo: "Op til",
    viewAllPhotos: "Se alle",
    photos: "fotos",
    allPhotos: "Alle",
    morePhotos: "flere fotos",
    close: "Luk",
    notFound: "Ejendommen blev ikke fundet",
    backToAll: "Alle ejendomme",
    bedroomsLabel: "soveværelser",
    bathroomsLabel: "badeværelser",
    sleepsLabel: "sover",
  },
};

const no: Translations = {
  nav: {
    properties: "Eiendommer",
    destinations: "Destinasjoner",
    forOwners: "Eiere",
    about: "Om oss",
    contact: "Kontakt",
    enquire: "Forespørsel",
  },
  home: {
    hero: {
      tagline: "Portugisisk Kyst",
      line1: "Bo der hvor",
      line2: "lyset er annerledes.",
      sub: "Håndplukkede villaer og leiligheter på den portugisiske kysten.",
      cta: "Utforsk våre eiendommer",
    },
    manifesto:
      "Vi lister bare hjem vi tror på — steder der lyset, luften og detaljene gjør en ekte forskjell for oppholdet ditt.",
    collection: {
      label: "Vår Samling",
      heading: "To Eksepsjonelle Hjem",
      viewProperty: "Se eiendommen",
      learnMore: "Lær mer",
      villa: "Villa",
      apartment: "Leilighet",
    },
    promise: { label: "Vårt Løfte", heading: "Hvorfor Bougan Villa" },
    usps: [
      {
        title: "Personlig Utvalgt",
        body: "Bare hjem vi elsker. Vi har bodd i hver eiendom vi viser — og vi ville gjerne bestilt dem igjen.",
      },
      {
        title: "Lokal Kunnskap",
        body: "Vi kjenner hvert hjørne av kysten. De skjulte vikene, de beste bakeriene, de stille veiene. Vi deler alt.",
      },
      {
        title: "Problemfrie Opphold",
        body: "Fra ditt første spørsmål til siste morgenkaffe håndterer vi alt — slik at du rett og slett kan være der.",
      },
    ],
    about: {
      label: "Om oss",
      heading1: "Født av kjærlighet til",
      heading2: "den portugisiske kysten.",
      body1:
        "Bougan Villa er et lite, lidenskapelig byrå, født av kjærlighet til den portugisiske kysten. Vi lister bare hjem vi tror på — steder der lyset, luften og detaljene gjør en ekte forskjell.",
      body2:
        "Vi har akkurat begynt — med to eksepsjonelle eiendommer og en veldig klar idé om hva slags opplevelse vi ønsker å skape. Kvalitet over volum, alltid.",
      cta: "Vår Historie",
    },
    testimonials: { label: "Gjestehistorier", heading: "Hva gjestene våre sier" },
    cta: {
      label: "Planlegg ditt Opphold",
      heading: "Klar for å rømme?",
      body: "Fortell oss når du ønsker å besøke, hvilken eiendom som interesserer deg, og hva som ville gjøre oppholdet ditt perfekt. Vi tar det derfra.",
      button: "Ta Kontakt",
    },
  },
  properties: {
    label: "Vår Samling",
    heading: "Våre Eiendommer",
    sub: "To hjem. Begge eksepsjonelle. Begge valgt fordi vi tror på dem.",
    viewProperty: "Se eiendommen",
    learnMore: "Lær mer",
    beds: "soverom",
    baths: "bad",
    sleeps: "sover",
    villa: "Villa",
    apartment: "Leilighet",
    cta: {
      heading: "Ikke sikker på hvilken eiendom som passer deg?",
      body: "Fortell oss om turen din, så hjelper vi deg å velge.",
      button: "Ta Kontakt",
    },
  },
  areas: {
    label: "Destinasjoner",
    heading: "Hvor Vi Er",
    sub: "To bemerkelsesverdige strekninger av den portugisiske kysten. Helt forskjellige. Begge verdt det.",
    nearby: "I nærheten",
    view: "Se",
    belverde: {
      tagline: "Furuskog & Atlanteren",
      description:
        "Aroeira-furuskogen strekker seg over tusenvis av hektar av Setúbal-kysten — gamle trær, ren luft og noen av Portugals fineste atlanterhavsstrander bare minutter unna. Belverde sitter stille inni det, et sted helt for seg selv. Ingen støy, ingen folkemengder. Bare lys gjennom furutrærne og lyden av havet.",
    },
    saoMartinho: {
      tagline: "Kamskjellbukten",
      description:
        "En av Portugals mest særegne naturformasjoner — en nesten perfekt sirkulær bukt med varmt, lunt vann omgitt av gylne klipper. São Martinho do Porto er rolig og autentisk. Fiskerne tar fortsatt inn fangsten sin hver morgen; landsbyen beveger seg i nøyaktig det rette tempoet. Den ligger halvveis mellom Lisboa og Porto, og likevel langt fra begge.",
    },
  },
  owners: {
    hero: {
      label: "Eiendomseiere",
      heading1: "Har du en eiendom",
      heading2: "på den portugisiske kysten?",
      body: "Vi er et lite byrå med svært høye standarder. Vi vil gjerne høre om eiendommen din — og hvis den passer, ville det være en ære å representere den.",
      cta: "Ta Kontakt",
    },
    approach: {
      label: "Vår Tilnærming",
      heading1: "Liten av design.",
      heading2: "Fremragende av intensjon.",
      body1:
        "Vi bygger en liten, kuratert samling av eksepsjonelle eiendommer på den portugisiske kysten. Vi ønsker ikke å være det største byrået — vi ønsker å være det beste.",
      body2:
        "Hvis du har en eiendom med noe spesielt — godt lys, en vakker hage, en bemerkelsesverdig beliggenhet — vil vi gjerne snakke. Vi jobber tett med hver eier og lister bare hjem vi virkelig tror på.",
      body3:
        "Alt fra gjesteadministrasjon til fotografering til rengjøring håndteres med omsorg. Du mottar inntektene dine månedlig, med full åpenhet.",
      cta: "Skriv til oss om eiendommen din",
    },
    bottom: {
      heading: "Tror du eiendommen din kan passe?",
      body: "Send oss en kort e-post med en beskrivelse og noen bilder. Ingen forpliktelse.",
    },
  },
  about: {
    hero: {
      label: "Vår Historie",
      heading1: "Født av kjærlighet til",
      heading2: "den portugisiske kysten.",
    },
    body1:
      "Bougan Villa er et lite, lidenskapelig byrå, født av kjærlighet til den portugisiske kysten. Vi lister bare hjem vi tror på — steder der lyset, luften og detaljene gjør en ekte forskjell.",
    body2:
      "Vi startet med to eiendommer: en villa skjult i Aroeira-furuskogen nær Belverde, og en lys leilighet i den ekstraordinære bukten ved São Martinho do Porto. Begge valgt fordi de beveget oss. Fordi vi ville bo der selv — og har gjort det.",
    body3:
      "Etter hvert som vi vokser, forblir regelen vår den samme: bare hjem vi tror på. Vi vil heller være små og gode enn store og ordinære.",
    cta: "Ta Kontakt",
    stats: { properties: "Eksepsjonelle Eiendommer", destinations: "Kystdestinasjoner" },
    values: {
      heading: "Hva vi tror på",
      items: [
        {
          title: "Kvalitet over volum",
          body: "Vi vil aldri liste en eiendom vi ikke selv ville vært glade for å bo i. Punktum.",
        },
        {
          title: "Personlig service",
          body: "Når du kontakter oss, snakker du med en person som kjenner eiendommene, området og kysten.",
        },
        {
          title: "Ærlig kuratering",
          body: "Hvis en eiendom ikke er riktig for deg, sier vi det. Vi vil heller at du skal ha den perfekte reisen.",
        },
      ],
    },
  },
  contact: {
    label: "Ta Kontakt",
    heading: "Planlegg ditt Opphold",
    sub: "Fortell oss når du ønsker å besøke og hvilken eiendom som interesserer deg. Vi kommer tilbake til deg innen 2 timer.",
    form: {
      name: "Fullt navn *",
      namePlaceholder: "Ditt navn",
      email: "E-post *",
      property: "Eiendom av interesse *",
      propertyPlaceholder: "Velg en eiendom",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Sølvkysten",
      optBoth: "Begge — ikke sikker ennå",
      optNotSure: "Ikke sikker — hjelp meg å velge",
      checkin: "Innsjekk",
      checkout: "Utsjekk",
      guests: "Gjester",
      guestsPlaceholder: "Velg",
      message: "Melding *",
      messagePlaceholder:
        "Fortell oss om ditt ideelle opphold — spesielle ønsker, spørsmål om eiendommen, eller annet vi bør vite...",
      submit: "Send forespørsel",
      disclaimer: "Vi svarer innen 2 arbeidstimer. Ingen forpliktelse.",
      guest: "gjest",
      guestsWord: "gjester",
    },
    success: {
      heading: "Takk",
      body: "Vi har mottatt forespørselen din og tar kontakt veldig snart.",
    },
    sidebar: {
      contactLabel: "Kontakt",
      directBook: "Foretrekker du å booke direkte?",
      directBody: "Villa Emerald er også tilgjengelig på Airbnb.",
      directCta: "Se på Airbnb →",
    },
  },
  footer: {
    tagline: "Kuraterte opphold på den portugisiske kysten.",
    propertiesLabel: "Våre Eiendommer",
    connectLabel: "Kontakt",
    copyright: "Alle rettigheter reservert.",
    privacy: "Personvernpolicy",
    terms: "Vilkår og betingelser",
  },
  detail: {
    allProperties: "Alle eiendommer",
    atAGlance: "Oversikt",
    whatsIncluded: "Hva er inkludert",
    nearby: "I nærheten",
    insideTheVilla: "Innendørs",
    sendEnquiry: "Send forespørsel",
    whatsapp: "WhatsApp",
    respondTime: "Vi svarer innen 2 timer",
    bedrooms: "Soverom",
    bathrooms: "Bad",
    guests: "Gjester",
    parking: "Parkering",
    parkingValue: "Innendørs",
    upTo: "Opptil",
    viewAllPhotos: "Se alle",
    photos: "bilder",
    allPhotos: "Alle",
    morePhotos: "flere bilder",
    close: "Lukk",
    notFound: "Eiendommen ble ikke funnet",
    backToAll: "Alle eiendommer",
    bedroomsLabel: "soverom",
    bathroomsLabel: "bad",
    sleepsLabel: "sover",
  },
};

const sv: Translations = {
  nav: {
    properties: "Fastigheter",
    destinations: "Destinationer",
    forOwners: "Ägare",
    about: "Om oss",
    contact: "Kontakt",
    enquire: "Förfrågan",
  },
  home: {
    hero: {
      tagline: "Portugisiska Kusten",
      line1: "Bo där",
      line2: "ljuset är annorlunda.",
      sub: "Handplockade villor och lägenheter på den portugisiska kusten.",
      cta: "Utforska våra fastigheter",
    },
    manifesto:
      "Vi listar bara hem vi tror på — platser där ljuset, luften och detaljerna gör en verklig skillnad för din vistelse.",
    collection: {
      label: "Vår Samling",
      heading: "Två Exceptionella Hem",
      viewProperty: "Se fastigheten",
      learnMore: "Läs mer",
      villa: "Villa",
      apartment: "Lägenhet",
    },
    promise: { label: "Vårt Löfte", heading: "Varför Bougan Villa" },
    usps: [
      {
        title: "Personligt Utvalt",
        body: "Bara hem vi älskar. Vi har bott i varje fastighet vi listar — och vi skulle gärna boka dem igen.",
      },
      {
        title: "Lokal Kunskap",
        body: "Vi känner varje hörn av kusten. De dolda vikarna, de bästa bagerierna, de lugna vägarna. Vi delar allt.",
      },
      {
        title: "Sömlösa Vistelser",
        body: "Från din första fråga till sista morgonkaffet hanterar vi allt — så att du helt enkelt kan vara där.",
      },
    ],
    about: {
      label: "Om oss",
      heading1: "Född ur kärlek till",
      heading2: "den portugisiska kusten.",
      body1:
        "Bougan Villa är ett litet, passionerat byrå, fött ur kärlek till den portugisiska kusten. Vi listar bara hem vi tror på — platser där ljuset, luften och detaljerna gör en verklig skillnad.",
      body2:
        "Vi har precis börjat — med två exceptionella fastigheter och en mycket tydlig idé om vilken typ av upplevelse vi vill skapa. Kvalitet över volym, alltid.",
      cta: "Vår Historia",
    },
    testimonials: { label: "Gästberättelser", heading: "Vad våra gäster säger" },
    cta: {
      label: "Planera din Vistelse",
      heading: "Redo att fly?",
      body: "Berätta för oss när du vill besöka, vilken fastighet som intresserar dig och vad som skulle göra din vistelse perfekt. Vi tar hand om resten.",
      button: "Kontakta oss",
    },
  },
  properties: {
    label: "Vår Samling",
    heading: "Våra Fastigheter",
    sub: "Två hem. Båda exceptionella. Båda valda för att vi tror på dem.",
    viewProperty: "Se fastigheten",
    learnMore: "Läs mer",
    beds: "sovrum",
    baths: "badrum",
    sleeps: "sover",
    villa: "Villa",
    apartment: "Lägenhet",
    cta: {
      heading: "Inte säker på vilken fastighet som passar dig?",
      body: "Berätta om din resa så hjälper vi dig att välja.",
      button: "Kontakta oss",
    },
  },
  areas: {
    label: "Destinationer",
    heading: "Var Vi Är",
    sub: "Två anmärkningsvärda sträckor av den portugisiska kusten. Helt olika. Båda värda det.",
    nearby: "I närheten",
    view: "Se",
    belverde: {
      tagline: "Tallskog & Atlanten",
      description:
        "Aroeira-tallskogen sträcker sig över tusentals hektar av Setúbal-kusten — gamla träd, ren luft och några av Portugals finaste atlantstränder bara några minuter bort. Belverde sitter lugnt inuti det, en plats helt för sig själv. Inget buller, inga folkmassor. Bara ljus genom tallar och ljudet av havet.",
    },
    saoMartinho: {
      tagline: "Kammusselsbukten",
      description:
        "En av Portugals mest utmärkande naturformationer — en nästan perfekt cirkulär bukt med varmt, skyddat vatten omgivet av gyllene klippor. São Martinho do Porto är stillsamt och äkta. Fiskarna tar fortfarande in sin fångst varje morgon; byn rör sig i exakt rätt takt. Den ligger halvvägs mellan Lissabon och Porto, och ändå långt från båda.",
    },
  },
  owners: {
    hero: {
      label: "Fastighetsägare",
      heading1: "Har du en fastighet",
      heading2: "på den portugisiska kusten?",
      body: "Vi är ett litet byrå med mycket höga standarder. Vi skulle gärna höra om din fastighet — och om det passar, skulle det vara en ära att representera den.",
      cta: "Kontakta oss",
    },
    approach: {
      label: "Vår Approach",
      heading1: "Liten av design.",
      heading2: "Utmärkt av intention.",
      body1:
        "Vi bygger en liten, kurerad samling av exceptionella fastigheter på den portugisiska kusten. Vi vill inte vara det största byrået — vi vill vara det bästa.",
      body2:
        "Om du har en fastighet med något speciellt — bra ljus, en vacker trädgård, ett anmärkningsvärt läge — skulle vi gärna prata. Vi arbetar nära varje ägare och listar bara hem vi verkligen tror på.",
      body3:
        "Allt från gästhantering till fotografering till städning hanteras med omsorg. Du får dina intäkter månadsvis, med full transparens.",
      cta: "Skriv till oss om din fastighet",
    },
    bottom: {
      heading: "Tror du att din fastighet kan passa oss?",
      body: "Skicka oss ett kort e-postmeddelande med en beskrivning och några bilder. Ingen förpliktelse.",
    },
  },
  about: {
    hero: {
      label: "Vår Historia",
      heading1: "Född ur kärlek till",
      heading2: "den portugisiska kusten.",
    },
    body1:
      "Bougan Villa är ett litet, passionerat byrå, fött ur kärlek till den portugisiska kusten. Vi listar bara hem vi tror på — platser där ljuset, luften och detaljerna gör en verklig skillnad.",
    body2:
      "Vi började med två fastigheter: en villa gömd i Aroeira-tallskogen nära Belverde, och en ljus lägenhet i den extraordinära bukten vid São Martinho do Porto. Båda valda för att de rörde oss. För att vi själva skulle bo där — och har gjort det.",
    body3:
      "När vi växer förblir vår regel densamma: bara hem vi tror på. Vi föredrar att vara små och bra framför stora och ordinära.",
    cta: "Kontakta oss",
    stats: { properties: "Exceptionella Fastigheter", destinations: "Kustdestinationer" },
    values: {
      heading: "Vad vi tror på",
      items: [
        {
          title: "Kvalitet över volym",
          body: "Vi kommer aldrig lista en fastighet vi inte själva skulle vara glada att bo i. Punkt.",
        },
        {
          title: "Personlig service",
          body: "När du kontaktar oss pratar du med en person som känner fastigheterna, området och kusten.",
        },
        {
          title: "Ärlig kuratering",
          body: "Om en fastighet inte passar dig säger vi det. Vi föredrar att du får den perfekta resan.",
        },
      ],
    },
  },
  contact: {
    label: "Kontakta oss",
    heading: "Planera din Vistelse",
    sub: "Berätta för oss när du vill besöka och vilken fastighet som intresserar dig. Vi återkommer inom 2 timmar.",
    form: {
      name: "Fullständigt namn *",
      namePlaceholder: "Ditt namn",
      email: "E-post *",
      property: "Fastighet av intresse *",
      propertyPlaceholder: "Välj en fastighet",
      optVillaEmerald: "Villa Emerald — Belverde, Aroeira",
      optSaoMartinho: "Apartamento São Martinho — Silverkusten",
      optBoth: "Båda — inte säker ännu",
      optNotSure: "Inte säker — hjälp mig välja",
      checkin: "Incheckning",
      checkout: "Utcheckning",
      guests: "Gäster",
      guestsPlaceholder: "Välj",
      message: "Meddelande *",
      messagePlaceholder:
        "Berätta om din ideala vistelse — speciella önskemål, frågor om fastigheten eller annat vi bör veta...",
      submit: "Skicka förfrågan",
      disclaimer: "Vi svarar inom 2 arbetstimmar. Ingen förpliktelse.",
      guest: "gäst",
      guestsWord: "gäster",
    },
    success: {
      heading: "Tack",
      body: "Vi har tagit emot din förfrågan och hör av oss mycket snart.",
    },
    sidebar: {
      contactLabel: "Kontakt",
      directBook: "Föredrar du att boka direkt?",
      directBody: "Villa Emerald finns också på Airbnb.",
      directCta: "Se på Airbnb →",
    },
  },
  footer: {
    tagline: "Kuraterade vistelser på den portugisiska kusten.",
    propertiesLabel: "Våra Fastigheter",
    connectLabel: "Kontakt",
    copyright: "Alla rättigheter förbehållna.",
    privacy: "Integritetspolicy",
    terms: "Villkor och bestämmelser",
  },
  detail: {
    allProperties: "Alla fastigheter",
    atAGlance: "Översikt",
    whatsIncluded: "Vad som ingår",
    nearby: "I närheten",
    insideTheVilla: "Inomhus",
    sendEnquiry: "Skicka förfrågan",
    whatsapp: "WhatsApp",
    respondTime: "Vi svarar inom 2 timmar",
    bedrooms: "Sovrum",
    bathrooms: "Badrum",
    guests: "Gäster",
    parking: "Parkering",
    parkingValue: "Inomhus",
    upTo: "Upp till",
    viewAllPhotos: "Se alla",
    photos: "bilder",
    allPhotos: "Alla",
    morePhotos: "fler bilder",
    close: "Stäng",
    notFound: "Fastigheten hittades inte",
    backToAll: "Alla fastigheter",
    bedroomsLabel: "sovrum",
    bathroomsLabel: "badrum",
    sleepsLabel: "sover",
  },
};

export const translations: Record<Language, Translations> = { en, fr, pt, es, el, da, no, sv };
