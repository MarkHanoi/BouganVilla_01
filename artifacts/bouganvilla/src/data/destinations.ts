export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  shortDesc: string;
  image: string;
  heroImage: string;
  highlights: string[];
  facts: { label: string; value: string }[];
  paragraphs: string[];
  comingSoon: boolean;
  propertyId?: string;
}

export const destinations: Destination[] = [
  {
    id: "aroeira",
    name: "Aroeira",
    region: "Setúbal Coast",
    tagline: "Pine Forest & Atlantic Shore",
    shortDesc:
      "A protected pine forest reserve 30 minutes south of Lisbon, where Europe's finest Atlantic beaches meet eucalyptus-scented calm.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Aroeira Beach (5 min)",
      "Lagoa de Albufeira",
      "Two championship golf courses",
      "30 min to Lisbon",
      "Setúbal Natural Park",
      "Atlantic pine forest reserve",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "30 min" },
      { label: "Nearest beach", value: "5 min" },
      { label: "Best for", value: "Families, Nature, Golf" },
      { label: "Season", value: "Year-round" },
    ],
    paragraphs: [
      "Aroeira is one of the last great pine forest reserves on the Setúbal coast — thousands of hectares of umbrella pine, eucalyptus and cork oak that stretch quietly down to the sea. Within it sits Belverde, a private condominium of villas and gardens that feels entirely removed from the city, yet sits only 30 minutes from Lisbon's centre.",
      "The beach is the point. Aroeira Beach, sheltered by dunes and flanked by the dark Atlantic pines, is one of the finest stretches of sand in the country. In summer it draws a loyal crowd of Lisbon families who have been coming for decades. In spring and autumn it's almost entirely yours.",
      "Beyond the beach: Lagoa de Albufeira, a brackish lagoon that connects to the sea only in winter, offers calm paddling and birdwatching. Two world-class golf courses are carved through the forest. The whole area sits within the Arrábida Natural Region, guaranteeing it will never be overdeveloped.",
      "For guests staying at Villa Emerald, Aroeira is the setting — its pine-scented morning air, the sound of Atlantic waves through open windows, and the unhurried pace that disappears 15 minutes north of the motorway.",
    ],
    comingSoon: false,
    propertyId: "villa-emerald",
  },
  {
    id: "sao-martinho",
    name: "São Martinho do Porto",
    region: "Silver Coast",
    tagline: "The Bay That Looks Like a Lake",
    shortDesc:
      "A sheltered scallop-shaped bay on the Silver Coast — warm turquoise water, a whitewashed village, and some of the calmest swimming on the Atlantic coast.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Sheltered scallop-shaped bay",
      "Warm turquoise water year-round",
      "Weekly farmers' market",
      "1h 15min north of Lisbon",
      "Nazaré — 25 min away",
      "Óbidos — 30 min away",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "1h 15min" },
      { label: "Nearest big wave surf", value: "Nazaré, 25 min" },
      { label: "Best for", value: "Families, Couples, Calm Sea" },
      { label: "Season", value: "May – October" },
    ],
    paragraphs: [
      "São Martinho do Porto has a secret that geography hands it: a bay shaped like an enormous scallop shell, almost completely enclosed by a narrow inlet, that turns the wild Atlantic into something that feels more like a warm lake. The water is genuinely turquoise in summer, and it stays warmer longer than anywhere else on the Silver Coast — ideal for families with small children or anyone who wants to swim without fighting the swell.",
      "The village itself moves at the pace of a place that has never had to try too hard. A whitewashed church square, a handful of good restaurants serving grilled fish and local wine, a Wednesday morning market that spills across the main street. The local bakeries open early — pastéis de nata and warm bread rolls before a morning on the beach.",
      "The Silver Coast north of Lisbon is still largely unknown to international visitors, which is its greatest asset. The towns have character without the crowds: Caldas da Rainha with its ceramic tradition, Óbidos entirely enclosed by medieval walls, Nazaré — once a quiet fishing village, now famous for the monster waves that break off Praia do Norte in winter (up to 30 metres). All within 30 minutes.",
      "Apartamento São Martinho sits in the heart of the village — bright, well-appointed, with a terrace facing the evening light. It is the perfect base for slow days by the bay and adventurous afternoons along the coast.",
    ],
    comingSoon: false,
    propertyId: "apartamento-sao-martinho",
  },
  {
    id: "ericeira",
    name: "Ericeira",
    region: "Lisbon Coast",
    tagline: "World Surf Reserve",
    shortDesc:
      "A whitewashed fishing village perched on Atlantic cliffs, one of only six World Surfing Reserves on the planet — and the only one in Europe.",
    image:
      "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "World Surfing Reserve",
      "5 world-class surf breaks",
      "Traditional fish restaurants",
      "40 min north of Lisbon",
      "Weekly fish market",
      "Cliffside old town",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "40 min" },
      { label: "Best surf season", value: "Sept – Mar" },
      { label: "Best for", value: "Surfers, Culture, Food" },
      { label: "Character", value: "Village, Authentic" },
    ],
    paragraphs: [
      "Ericeira is one of the last genuine fishing villages on the Portuguese coast. Its whitewashed houses with blue trim tumble down the cliffs to a working harbour where local fishermen have launched boats for centuries. In 2011 it became Europe's only World Surfing Reserve — recognition of the extraordinary concentration of consistent, quality waves that break at Ribeira d'Ilhas, Coxos, Pedra Branca and beyond.",
      "The surf draws an international crowd of athletes and enthusiasts, but the village has managed to absorb them without losing its soul. The daily fish market, the old women in black, the tiny churches and the extraordinary seafood restaurants that line the cliffside streets — all of it remains. Come in October when the swells are building and the tourists have gone.",
      "The food is exceptional and unpretentious. Grilled fish — bream, sea bass, mackerel — straight from the boats that morning. Percebes (barnacles) pried from the rocks below the cliff. Arroz de marisco ladled into the centre of the table. Eat at a table with a plastic tablecloth and a view of the ocean.",
      "Ericeira is 40 minutes north of Lisbon, and easily combined with a day in the city or a visit to Mafra's enormous royal palace, which sits 10 minutes inland. We will soon have a property here — until then, it makes a perfect day trip from Villa Emerald.",
    ],
    comingSoon: true,
  },
  {
    id: "lisbon",
    name: "Lisbon",
    region: "Capital",
    tagline: "Seven Hills, One Capital",
    shortDesc:
      "One of Europe's most beautiful capitals — ancient, sun-drenched and deeply personal, built across seven hills above the Tagus estuary.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Alfama & Mouraria quarters",
      "Belém Tower & Jerónimos",
      "Time Out Market",
      "30 min from Villa Emerald",
      "World's best pastel de nata",
      "Fado music, live every night",
    ],
    facts: [
      { label: "Distance from Villa Emerald", value: "30 min" },
      { label: "Best neighbourhood", value: "Alfama / LX Factory" },
      { label: "Best for", value: "Culture, Food, History" },
      { label: "Day or overnight", value: "Both" },
    ],
    paragraphs: [
      "Lisbon rewards slow exploration. Its seven hills are best navigated on foot — or on the famous yellow trams that grind their way up impossible gradients through Alfama's medieval labyrinth. The city has a quality that is hard to name: something between melancholy and warmth, expressed in the fado music that drifts from doorways after midnight.",
      "The architecture is extraordinary — Moorish, Manueline Gothic, Art Nouveau and modern all layered together. The Jerónimos Monastery in Belém is among the finest buildings in Europe. The azulejo tile façades that cover entire church walls and station concourses are a world apart from anything comparable in scale or quality.",
      "Eat well: Lisbon's food scene has transformed in the last decade while somehow remaining grounded. The Time Out Market in Cais do Sodré brings together the city's best chefs in an enormous indoor market. But the best meals remain in tiny tiled restaurants in Alfama, where the menu is written on a chalkboard and the house wine is poured from an unlabelled ceramic jug.",
      "From Villa Emerald in Aroeira, Lisbon is 30 minutes by car or 45 minutes by bus. We recommend spending at least one full day in the city — ideally two nights to do it justice.",
    ],
    comingSoon: true,
  },
  {
    id: "cascais",
    name: "Cascais",
    region: "Estoril Coast",
    tagline: "The Estoril Riviera",
    shortDesc:
      "A sophisticated coastal town on the Estoril Line — once the refuge of exiled European royalty, now a brilliant mix of beaches, marina and old-town charm.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "Praia da Rainha beach",
      "Cascais Marina",
      "Sintra — 20 min away",
      "Cascais old town",
      "Boca do Inferno cliffs",
      "Estoril Casino",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "35 min (train or car)" },
      { label: "Distance to Sintra", value: "20 min" },
      { label: "Best for", value: "Couples, Culture, Beaches" },
      { label: "Vibe", value: "Elegant, Relaxed" },
    ],
    paragraphs: [
      "Cascais sits at the end of the Estoril Line — a 35-minute train ride from Lisbon's Cais do Sodré station, rattling along the Tagus estuary past pastel-coloured beach suburbs. The town itself has the air of a place that has always been slightly apart from the republic: its cobbled streets, royal palace and manicured gardens speak of the exiled monarchs who made it their home during the twentieth century.",
      "The beaches are excellent: Praia da Rainha, Praia de Cascais and Praia do Guincho — a dramatic sweep of dune-backed Atlantic surf 9 kilometres west of town — offer three entirely different coastal experiences within a 20-minute radius. The clifftop walk to Boca do Inferno, where Atlantic swells thunder into a collapsed sea cave, is unmissable.",
      "Sintra sits 20 minutes inland by taxi — a Unesco World Heritage site of fantasy palaces, Moorish castle ruins and dense forest rising from the Serra de Sintra. The Pena Palace, perched on a crag above the clouds, is extraordinary. Come early to avoid the crowds.",
      "We will have a property in Cascais soon. In the meantime, it makes a full-day excursion — combining the town itself, a cliff walk, and a late lunch at one of the seafood restaurants in the fishing harbour before the train back to Lisbon.",
    ],
    comingSoon: true,
  },
  {
    id: "comporta",
    name: "Comporta",
    region: "Alentejo Coast",
    tagline: "Where the Dunes Meet the Rice Fields",
    shortDesc:
      "Portugal's best-kept secret — miles of untouched Atlantic beach, rice paddy landscapes, stork nests and boutique silence, an hour south of Lisbon.",
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "40km of untouched beach",
      "Comporta village",
      "Rice paddy landscapes",
      "Storks and flamingos",
      "Boutique restaurants & bars",
      "1hr 15min from Lisbon",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "1h 15min" },
      { label: "Best season", value: "May – October" },
      { label: "Best for", value: "Couples, Retreat, Nature" },
      { label: "Vibe", value: "Minimal, Boutique, Quiet" },
    ],
    paragraphs: [
      "Comporta is the place that Lisbon's creative class discovered thirty years ago and has been trying to keep to themselves ever since. The secret, unsurprisingly, is out — but the place has absorbed the attention with remarkable grace, remaining genuinely unspoiled in ways that are almost impossible to find this close to a European capital.",
      "The landscape is singular. Atlantic dunes and pine forest to the west, a vast rice-paddy delta to the east — an agricultural plain threaded by waterways where white storks nest on electricity poles and flamingos feed in shallow water. The village of Comporta itself is tiny: a whitewashed church, a handful of restaurants, rice barns converted into the most fashionable boutique hotels in the country.",
      "The beach is the point. Praia de Comporta stretches for kilometres in each direction — wide, backed by dunes, with a sea that runs from green in summer to the full grey fury of the Atlantic in winter. Beach bars serve fresh fish and cold wine. At the northern end, the natural park begins and the beach goes on, empty, for as long as you want to walk.",
      "We are actively looking for a property in Comporta. If you own or know of a property here that might suit our portfolio, we would love to hear from you. In the meantime, Comporta is an excellent day trip from Apartamento São Martinho on the Silver Coast.",
    ],
    comingSoon: true,
  },
  {
    id: "costa-caparica",
    name: "Costa da Caparica",
    region: "Setúbal Coast",
    tagline: "Thirty Kilometres of Atlantic",
    shortDesc:
      "Europe's longest urban beach — 30km of Atlantic swell, surf schools, seafood shacks and a genuinely local, festive beach culture, 20 minutes from Lisbon.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    highlights: [
      "30km Atlantic beach",
      "Surf schools & rentals",
      "Ferry from Lisbon (summer)",
      "Beach bars & seafood",
      "20 min from Lisbon",
      "Family-friendly north end",
    ],
    facts: [
      { label: "Distance to Lisbon", value: "20 min (car) / ferry" },
      { label: "Best surf spots", value: "Central breaks" },
      { label: "Best for", value: "Surf, Families, Day trips" },
      { label: "Season", value: "April – October" },
    ],
    paragraphs: [
      "Costa da Caparica begins where the Tagus estuary ends and the Atlantic begins in earnest. A 30-kilometre arc of beach running south from the river mouth, it is the city of Lisbon's great exhale — the place where Lisboetas have fled on summer weekends for generations, packing the seafront trams, the surf buses, the ferries that cross from Belém.",
      "The beach itself is enormous and divided informally by character: the northern end, close to the ferry terminus, is family territory — cafés, playgrounds, calmer surf. Moving south the beaches grow quieter, the dunes taller, the surfers more serious. By the time you reach Fonte da Telha the only buildings are a handful of beach restaurants and a surf camp.",
      "The surf is consistent year-round, driven by Atlantic swells that wrap around the headland and break in long, rolling lefts and rights. Dozens of surf schools operate along the length of the beach — Costa da Caparica is where most Lisboetas learn to surf.",
      "From Villa Emerald in Aroeira, Costa da Caparica is 15 minutes by car — an easy half-day: surf in the morning, fresh fish at a beachfront restaurant, back to the pool by mid-afternoon. We plan to have a property here soon.",
    ],
    comingSoon: true,
  },
];
