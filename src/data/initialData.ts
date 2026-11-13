import type { InstrumentItem, RepairService, GenerationInfo } from '../types';

export const INITIAL_GENERATIONS: GenerationInfo[] = [
  {
    id: 1,
    generationTitle: {
      en: "1st Generation (Founder)",
      hi: "प्रथम पीढ़ी (संस्थापक)"
    },
    personName: {
      en: "Late Shree Ram Sundar Mistri",
      hi: "स्व. श्री राम सुंदर मिस्त्री जी"
    },
    badge: {
      en: "Pioneer of Harmonium Craftsmanship",
      hi: "हारमोनियम निर्माण के अग्रदूत"
    },
    defaultImage: "/images/generations/gen1.jpg",
    description: {
      en: "Laid the foundation of this illustrious journey decades ago by initiating the business of crafting and dealing in Harmoniums and Sitars. With an intuitive mastery of seasoned wood, acoustic resonance, and intricate handwork, he set the benchmark of quality in the region.",
      hi: "इस गौरवशाली सफर की नींव हमारे परदादा स्व. श्री राम सुंदर मिस्त्री जी ने रखी थी। अपने समय में उन्होंने हारमोनियम और सितार के व्यवसाय की शुरुआत की। लकड़ी की परख, ध्वनि (Acoustics) की गहरी समझ और बारीक कारीगरी के बल पर उन्होंने क्षेत्र में गुणवत्ता की एक ऐसी मिसाल कायम की, जो आने वाली पीढ़ियों के लिए प्रेरणा बनी।"
    },
    specialties: {
      en: ["Acoustic Sitar & Harmonium Crafting", "Natural Wood Seasoning", "Master Hand Tooling"],
      hi: ["हारमोनियम एवं सितार निर्माण", "प्राकृतिक काष्ठ शोधन", "हस्तशिल्प व नाद-विज्ञान"]
    }
  },
  {
    id: 2,
    generationTitle: {
      en: "2nd Generation",
      hi: "द्वितीय पीढ़ी"
    },
    personName: {
      en: "Late Shree Jagannath Mistri",
      hi: "स्व. श्री जगन्नाथ मिस्त्री जी"
    },
    badge: {
      en: "The Brand's Namesake & Master Craftsman",
      hi: "प्रतिष्ठान के प्रेरणास्रोत एवं सिद्धहस्त कारीगर"
    },
    defaultImage: "/images/generations/gen2.jpeg",
    description: {
      en: "Inheriting his father's treasured skill, Late Shree Jagannath Mistri expanded the harmonium trade with extraordinary dedication, integrity, and hard work. His mastery over reed work and woodworking earned the lifelong respect of musicians across the region.",
      hi: "अपने पिता से विरासत में मिले इस अमूल्य हुनर को हमारे दादा स्व. श्री जगन्नाथ मिस्त्री जी ने पूरी लगन, निष्ठा और समर्पण के साथ आगे बढ़ाया। उन्होंने हारमोनियम के निर्माण व व्यापार को नई ऊंचाइयों पर पहुंचाया। उनकी ईमानदारी, मधुर व्यवहार और बेजोड़ कारीगरी ने दूर-दूर तक के संगीत साधकों का दिल जीत लिया।"
    },
    specialties: {
      en: ["Master Reed Tuning", "Bellows (Pankha) Engineering", "Unwavering Integrity"],
      hi: ["बारीक सुर-रीड सेटिंग", "धौंकनी (पंखा) निर्माण", "सच्ची सेवा व प्रतिष्ठा"]
    }
  },
  {
    id: 3,
    generationTitle: {
      en: "3rd Generation",
      hi: "तृतीय पीढ़ी"
    },
    personName: {
      en: "Late Shree Sudama Sharma",
      hi: "स्व. श्री सुदामा शर्मा जी"
    },
    badge: {
      en: "Pillar of Persistence & Pure Tone",
      hi: "अथक परिश्रम व शुद्ध सुर के संवाहक"
    },
    defaultImage: "/images/generations/gen3.jpeg",
    description: {
      en: "Carried forward the family legacy with immense perseverance, passion, and sincerity. Through sheer dedication, he strengthened the harmonium business and upheld the timeless values of pure sound, durability, and honest service that remain the soul of our establishment today.",
      hi: "हमारे पिता स्व. श्री सुदामा शर्मा जी ने इस पारिवारिक परंपरा को अपनी अथक मेहनत, शिद्दत और निस्वार्थ सेवा से सींचा। उन्होंने कठिन परिस्थितियों में भी हारमोनियम के कारोबार को मजबूती से आगे बढ़ाया और शुद्ध सुर, टिकाऊपन तथा ग्राहक संतुष्टि के उन सिद्धांतों को जीवित रखा, जो आज भी हमारी दुकान की पहचान हैं।"
    },
    specialties: {
      en: ["Resonance & Tone Perfection", "Durable Instrument Body Work", "Community Trust"],
      hi: ["सुरों की मधुरता व गूंज", "मजबूत वाद्य निर्माण", "ग्राहकों का अटूट विश्वास"]
    }
  },
  {
    id: 4,
    generationTitle: {
      en: "4th Generation (Present Proprietor)",
      hi: "चतुर्थ पीढ़ी (वर्तमान संचालक)"
    },
    personName: {
      en: "Shree Santosh Kumar Sharma",
      hi: "श्री संतोष कुमार शर्मा जी"
    },
    badge: {
      en: "Accomplished Organ & Keyboard Musician",
      hi: "कुशल ऑर्गन एवं कीबोर्ड वादक"
    },
    defaultImage: "/images/generations/gen4.jpeg",
    description: {
      en: "Leading the legacy into a modern era. Out of deep love and respect for his grandfather (Late Shree Jagannath Mistri), Shree Santosh Kumar Sharma named this establishment \"Jagannath Musical & Furniture.\" Being an accomplished Organ & Keyboard Musician himself, he personally tests and tunes instruments to perfection. He expanded the store beyond harmoniums to offer sales and expert repairing of Tabla, Dholak, Naal, Jhal, Keyboards, and a wide variety of musical instruments.",
      hi: "आज इस महान विरासत को आधुनिक स्वरूप देते हुए श्री संतोष कुमार शर्मा जी पूरी निष्ठा के साथ आगे बढ़ा रहे हैं। अपने दादा जी (स्व. श्री जगन्नाथ मिस्त्री जी) के प्रति असीम श्रद्धा और सम्मान व्यक्त करते हुए श्री संतोष कुमार शर्मा जी ने ही इस प्रतिष्ठान का नाम \"जगन्नाथ म्यूजिकल एंड फर्नीचर\" रखा। स्वयं एक कुशल ऑर्गन (कीबोर्ड) वादक (Musician) होने के कारण संतोष जी हर वाद्य यंत्र के सुर और ताल की बारीकी से परख करते हैं। उन्होंने इस व्यवसाय को केवल हारमोनियम तक सीमित न रखते हुए आज तबला, ढोलक, नाल, झाल सहित सभी प्रकार के वाद्य यंत्रों की बिक्री एवं विशेषज्ञ मरम्मत तक विस्तारित किया है।"
    },
    specialties: {
      en: ["Professional Musician's Ear", "Multi-Instrument Expertise", "Modern Studio & Stage Tuning"],
      hi: ["संगीतकार के कानों से सुर परख", "बहु-वाद्य विशेषज्ञता", "मंच एवं भजन मंडलियों हेतु सुर साधना"]
    }
  }
];

export const INITIAL_INSTRUMENTS: InstrumentItem[] = [
  {
    id: "inst-1",
    name: {
      en: "7-Stopper Seasoned Sheesham Harmonium (Bass-Male)",
      hi: "7-स्टॉपर शीशम हारमोनियम (बास-मेल सुर)"
    },
    category: "harmonium",
    price: 8500,
    inStock: true,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "Seasoned Indian Sheesham wood, 39 keys, 7 stoppers, double reed sets (Bass-Male), 7-fold premium bellows.",
      hi: "परिपक्व शीशम की लकड़ी, 39 चाबियां, 7 स्टॉपर, बास-मेल डबल रीड, 7-तह मजबूत धौंकनी (पंखा)।"
    },
    featured: true
  },
  {
    id: "inst-2",
    name: {
      en: "9-Scale Changer Concert Harmonium (German Reeds)",
      hi: "9-स्केल चेंजर कॉन्सर्ट हारमोनियम (जर्मन रीड)"
    },
    category: "harmonium",
    price: 24500,
    inStock: true,
    image: "https://images.unsplash.com/photo-1520523839898-507127053c37?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "3 sets of German/Premier reeds, 9 scale changing positions, Burma Teak finish, organ sound chamber.",
      hi: "3 सेट जर्मन/प्रीमियर रीड्स, 9 स्केल बदलने की सुविधा, बर्मा टीक फिनिश, ऑर्गन साउंड चेंबर।"
    },
    featured: true
  },
  {
    id: "inst-3",
    name: {
      en: "Professional Brass Bayan & Sheesham Dayan Tabla Pair",
      hi: "प्रोफेशनल भारी पीतल बायां व शीशम दायां तबला जोड़ी"
    },
    category: "tabla-dholak",
    price: 9200,
    inStock: true,
    image: "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "3.5 kg Heavy engraved Brass Dugga (Bayan), seasoned Sheesham Dayan tuned to C# (काली 1), handmade pudis.",
      hi: "3.5 किलो भारी नक्काशीदार पीतल बायां (डुग्गी), शीशम दायां C# (काली 1) सुर में सेट, प्रामाणिक हस्तनिर्मित पूड़ी।"
    },
    featured: true
  },
  {
    id: "inst-4",
    name: {
      en: "Banaras Sheesham Handcrafted Dholak (Rope/Ring Fitted)",
      hi: "बनारसी शीशम हस्तनिर्मित ढोलक (रस्सी व छल्ला फिटिंग)"
    },
    category: "tabla-dholak",
    price: 4800,
    inStock: true,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "Heavy solid Sheesham wood shell, authentic goat skin chanti and masala coated bayan for deep thunderous bass.",
      hi: "भारी ठोस शीशम की खोल, शुद्ध बकरे के चमड़े की चांटी, गहरा गूंजदार मसाला बायां।"
    }
  },
  {
    id: "inst-5",
    name: {
      en: "Professional Maharashtrian Style Naal (Nut-Bolt Tuning)",
      hi: "प्रोफेशनल नट-बोल्ट फिटिंग नाल (उच्च सुर)"
    },
    category: "naal-jhal",
    price: 5400,
    inStock: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "High-pitch crisp chanti with tabla-style syahi, modern nut-bolt tuning system, easy key adjustment.",
      hi: "तबले जैसी स्याही वाली तीखी चांटी, आधुनिक नट-बोल्ट ट्यूनिंग, भजन व कीर्तन हेतु सर्वश्रेष्ठ।"
    }
  },
  {
    id: "inst-6",
    name: {
      en: "Traditional Pure Brass & Bell-Metal Kansi Jhal (Manjira Pair)",
      hi: "परंपरागत शुद्ध कांसी झाल / मंजीरा (भारी वजन)"
    },
    category: "naal-jhal",
    price: 1250,
    inStock: true,
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "Made of bell metal (Kansa/Brass alloy), resonant high sustain, hand-turned, ideal for Ramayan & Bhajan.",
      hi: "कांसी व पीतल मिश्रित धातु से निर्मित, लंबी खनक व गूंज, रामचरितमानस पाठ व कीर्तन हेतु आदर्श।"
    }
  },
  {
    id: "inst-7",
    name: {
      en: "61-Key Touch Response Portable Electronic Keyboard",
      hi: "61-की टच रिस्पॉन्स पोर्टेबल इलेक्ट्रॉनिक कीबोर्ड"
    },
    category: "keyboards-others",
    price: 11990,
    inStock: true,
    image: "https://images.unsplash.com/photo-1520523839898-507127053c37?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "Loaded with authentic Indian musical voices (Harmonium, Sitar, Shehnai, Tanpura) and tabla rhythm styles.",
      hi: "भारतीय वाद्य ध्वनियों (हारमोनियम, सितार, शहनाई, तानपुरा) व भारतीय ताल रिदम से सुसज्जित।"
    }
  },
  {
    id: "inst-8",
    name: {
      en: "Compact Folding Safari Harmonium with Lockable Case",
      hi: "कॉम्पैक्ट फोल्डिंग सूटकेस मॉडल हारमोनियम"
    },
    category: "harmonium",
    price: 14200,
    inStock: false,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    specifications: {
      en: "Collapses inside its own teakwood suitcase body, 3.25 octaves, best for traveling musicians and bhajan mandalis.",
      hi: "स्वयं के सूटकेस बॉक्स में बंद होने वाला फोल्डिंग मॉडल, 3.25 सप्तक, यात्रा एवं दूरदराज कार्यक्रमों के लिए उत्तम।"
    }
  }
];

export const INITIAL_REPAIR_SERVICES: RepairService[] = [
  // Harmonium
  {
    id: "rep-harm-1",
    category: "harmonium",
    serviceName: {
      en: "Complete Sur Tuning (Master Pitch Alignment)",
      hi: "संपूर्ण सुर मिलाना (मास्टर ट्यूनिंग - C/C#/D)"
    },
    startingFee: 350,
    description: {
      en: "Harmonizing all reeds (Bass & Male) to concert 440Hz standard or custom pitch for flawless singing support.",
      hi: "हारमोनियम के सभी सुरों (बास व मेल) को 440Hz या मनपसंद सुर पर सटीक बिठाना जिससे गायन में मधुरता आए।"
    },
    turnaround: {
      en: "Same Day / 24 Hours",
      hi: "उसी दिन / 24 घंटे"
    }
  },
  {
    id: "rep-harm-2",
    category: "harmonium",
    serviceName: {
      en: "Reed (Sur Patri) Replacement & Air Calibration",
      hi: "रीड (सुर पत्ती) बदलना व हवा सेटिंग"
    },
    startingFee: 250,
    description: {
      en: "Replacing cracked or silent reeds with premium Pali/German bronze reeds and calibrating air valve response.",
      hi: "टूटी या बेसुरी रीड को बदलकर नई ब्रास/जर्मन पत्ती लगाना व एयर वाल्व को सुचारु करना।"
    },
    turnaround: {
      en: "Same Day",
      hi: "उसी दिन उपलब्ध"
    }
  },
  {
    id: "rep-harm-3",
    category: "harmonium",
    serviceName: {
      en: "Bellows (Pankha/Dhokani) Leather & Air-Leak Seal",
      hi: "धौंकनी (पंखा) मरम्मत व लीकेज सीलिंग"
    },
    startingFee: 300,
    description: {
      en: "Restoring 7-fold bellows, repairing torn corners, genuine leather padding and zero-air-loss sealing.",
      hi: "7-तह धौंकनी की फटी लेदर बदलना, कोनों को सील करना और लंबे समय तक हवा रोकने की क्षमता लौटाना।"
    },
    turnaround: {
      en: "24-48 Hours",
      hi: "24 से 48 घंटे"
    }
  },
  {
    id: "rep-harm-4",
    category: "harmonium",
    serviceName: {
      en: "Key Alignment, Spring Replacement & Servicing",
      hi: "चाबी (Keys) लेवलिंग, स्प्रिंग व पैड सर्विसिंग"
    },
    startingFee: 200,
    description: {
      en: "Fixing stuck keys, height alignment, replacing worn felts, new high-tension springs for rapid touch.",
      hi: "अटकने वाली चाबियों को दुरुस्त करना, नई स्प्रिंग लगाना और स्मूथ उंगली संचालन के लिए पैडिंग।"
    },
    turnaround: {
      en: "Same Day",
      hi: "उसी दिन"
    }
  },

  // Naal
  {
    id: "rep-naal-1",
    category: "naal",
    serviceName: {
      en: "New High-Tension Pudi Fitting (Chanti / Bayan)",
      hi: "नई पूड़ी फिटिंग (चांटी अथवा बायां)"
    },
    startingFee: 400,
    description: {
      en: "Hand-selected leather pudi with accurate syahi weighting for sharp snap on chanti and warm bass on bayan.",
      hi: "सटीक स्याही वाली नई पूड़ी चढ़ाना जिससे चांटी में स्पष्ट 'ता' और बाएं में भारी गूंज मिले।"
    },
    turnaround: {
      en: "Same Day / 24 Hours",
      hi: "उसी दिन / 24 घंटे"
    }
  },
  {
    id: "rep-naal-2",
    category: "naal",
    serviceName: {
      en: "Rassi / Baddhi Tightening & Pitch Calibration",
      hi: "रस्सी / बद्धी खिंचाई व सुर मिलाना"
    },
    startingFee: 200,
    description: {
      en: "Professional mechanical tensioning, knot reinforcement, and fine tuning for steady stage pitch.",
      hi: "बद्धी को बराबर तनाव के साथ कसना ताकि बजाते समय सुर न उतरे।"
    },
    turnaround: {
      en: "1-2 Hours",
      hi: "1 से 2 घंटे"
    }
  },
  {
    id: "rep-naal-3",
    category: "naal",
    serviceName: {
      en: "Shell Body Polish, Crack Sealing & Nut-Bolt Service",
      hi: "नाल बॉडी पॉलिश, दरार मरम्मत व नट-बोल्ट सर्विस"
    },
    startingFee: 350,
    description: {
      en: "Treating wood dryness, crack reinforcement, threading service on iron hooks and gloss heritage polish.",
      hi: "लकड़ी की दरारें भरना, नट-बोल्ट की चूड़ियां ठीक करना व आकर्षक नेचुरल पॉलिश।"
    },
    turnaround: {
      en: "24-48 Hours",
      hi: "24 से 48 घंटे"
    }
  },

  // Dholak
  {
    id: "rep-dhol-1",
    category: "dholak",
    serviceName: {
      en: "Pudi Replacement (Chanti / Bayan Khari)",
      hi: "ढोलक पूड़ी बदलना (चांटी व बायां खाड़ी)"
    },
    startingFee: 300,
    description: {
      en: "Fitting genuine skin pudis tuned specifically for folk, bhajan, kirtan, or classical performances.",
      hi: "कच्चे चमड़े की उच्च गुणवत्ता वाली पूड़ी लगाना जो भजन-कीर्तन व लोकगीतों के लिए उपयुक्त हो।"
    },
    turnaround: {
      en: "Same Day / 24 Hours",
      hi: "उसी दिन / 24 घंटे"
    }
  },
  {
    id: "rep-dhol-2",
    category: "dholak",
    serviceName: {
      en: "Rope & Steel Ring Setting / Nut-Bolt Upgrade",
      hi: "रस्सी-छल्ला खिंचाई व नट-बोल्ट सेटिंग"
    },
    startingFee: 180,
    description: {
      en: "Even rope distribution, high tensile ring fitting, or converting rope dholak to nut-bolt mechanism.",
      hi: "रस्सियों की संतुलित खिंचाई, स्टील छल्ले की सेटिंग और सुर स्थायित्व।"
    },
    turnaround: {
      en: "1-3 Hours",
      hi: "1 से 3 घंटे"
    }
  },
  {
    id: "rep-dhol-3",
    category: "dholak",
    serviceName: {
      en: "Inner Masala (Dholak Bayan Dough) Application",
      hi: "बाएं का अंदरूनी मसाला लगाना व बेस ट्यूनिंग"
    },
    startingFee: 250,
    description: {
      en: "Traditional mineral-oil & iron compound application inside bayan for round, thunderous 'gham' tone.",
      hi: "बाएं के अंदर परंपरागत मसाला लेप जिससे 'घम' की गहरी गूंज और भारी बेस प्राप्त होता है।"
    },
    turnaround: {
      en: "Same Day",
      hi: "उसी दिन"
    }
  },

  // Tabla
  {
    id: "rep-tab-1",
    category: "tabla",
    serviceName: {
      en: "Dayan / Bayan Handcrafted Pudi Replacement",
      hi: "दायां / बायां प्रामाणिक पूड़ी रिप्लेसमेंट"
    },
    startingFee: 450,
    description: {
      en: "Hand-braided (Gajra) goat-skin pudi fitting, matched precisely to the diameter of your dagga or dayan.",
      hi: "हाथ से गुंथी मजबूत गजरा पूड़ी, शीशम दायां व पीतल बायां के सटीक नाप अनुसार फिटिंग।"
    },
    turnaround: {
      en: "24 Hours",
      hi: "24 घंटे"
    }
  },
  {
    id: "rep-tab-2",
    category: "tabla",
    serviceName: {
      en: "Fresh Syahi (Black Ink Center) Reconditioning",
      hi: "स्याही मरम्मत, घिसाई व नया मसाला कार्य"
    },
    startingFee: 300,
    description: {
      en: "Restoring cracked or flaking syahi to bring back crisp 'Na' and 'Tin' bell harmonics.",
      hi: "फटी या उखड़ी स्याही की मरम्मत, सटीक घिसाई ताकि 'ना' और 'तिन' बोलों में स्पष्ट खनक आए।"
    },
    turnaround: {
      en: "Same Day / 24 Hours",
      hi: "उसी दिन / 24 घंटे"
    }
  },
  {
    id: "rep-tab-3",
    category: "tabla",
    serviceName: {
      en: "Gatta & Baddhi Setting (Camel Leather Straps)",
      hi: "गट्टा व बद्धी खिंचाई (ऊंट की खाल की बद्धी)"
    },
    startingFee: 250,
    description: {
      en: "Installing fresh seasoned wooden gattas and uniform high-tension pulling of genuine baddhi.",
      hi: "शीशम के नए गट्टे लगाना, बद्धी की मजबूत खिंचाई ताकि हाथ का हल्का हथौड़ा पड़ते ही सुर मिल जाए।"
    },
    turnaround: {
      en: "Same Day",
      hi: "उसी दिन"
    }
  },
  {
    id: "rep-tab-4",
    category: "tabla",
    serviceName: {
      en: "Master Sur Milana (Concert Pitch Balancing)",
      hi: "मास्टर सुर मिलाना (राग व स्केल अनुसार)"
    },
    startingFee: 200,
    description: {
      en: "Acoustic micro-tuning by accomplished musician Santosh Kumar Sharma to ensure perfect octaves across 8 points.",
      hi: "संगीतकार संतोष कुमार शर्मा जी द्वारा गजरों के आठों बिंदुओं पर शुद्ध सुर का सूक्ष्म संतुलन।"
    },
    turnaround: {
      en: "1-2 Hours",
      hi: "1 से 2 घंटे"
    }
  }
];

export const BUSINESS_CONFIG = {
  name: {
    en: "Jagannath Musical & Furniture",
    hi: "जगन्नाथ म्यूजिकल एंड फर्नीचर"
  },
  tagline: {
    en: "Four Generations of Musical Craftsmanship, Pure Sound & Trust",
    hi: "चार पीढ़ियों की संगीत साधना, कारीगरी और अटूट विश्वास"
  },
  address: {
    en: "Sonar Toli, Zamania Kasba, Ghazipur, Uttar Pradesh - 232329",
    hi: "सोनार टोली, ज़मानिया कस्बा, गाज़ीपुर, उत्तर प्रदेश - 232329"
  },
  musicDivision: {
    proprietor: {
      en: "Shree Santosh Kumar Sharma (Accomplished Organ & Keyboard Musician)",
      hi: "श्री संतोष कुमार शर्मा (कुशल ऑर्गन एवं कीबोर्ड वादक)"
    },
    proprietorShort: {
      en: "Shree Santosh Kumar Sharma",
      hi: "श्री संतोष कुमार शर्मा"
    },
    phone1: "+91 8787219674",
    phone2: "+91 9935315824",
    primaryWhatsApp: "918787219674",
    phone1Raw: "8787219674",
    phone2Raw: "9935315824"
  },
  furnitureDivision: {
    proprietor1: {
      name: {
        en: "Shree Sanjay Sharma",
        hi: "श्री संजय शर्मा"
      },
      whatsApp: "+91 8726517121",
      whatsAppRaw: "8726517121"
    },
    proprietor2: {
      name: {
        en: "Shree Saheb Sharma",
        hi: "श्री साहेब शर्मा"
      },
      phone: "+91 9935509076",
      phoneRaw: "9935509076",
      whatsApp: "+91 9935509076",
      whatsAppRaw: "9935509076"
    },
    description: {
      en: "Continuing our family's fine woodworking heritage, our furniture division is independently managed by Shree Sanjay Sharma and Shree Saheb Sharma. For custom wooden furniture orders and inquiries, please contact directly:",
      hi: "हमारी पारिवारिक काष्ठ कला की विरासत को आगे बढ़ाते हुए फर्नीचर का कारोबार श्री संजय शर्मा एवं श्री साहेब शर्मा जी द्वारा संचालित किया जाता है। फर्नीचर से संबंधित किसी भी जानकारी या कस्टम ऑर्डर के लिए सीधे संपर्क करें:"
    }
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14421.32832560833!2d83.56708765!3d25.4300305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e29a997efea97%3A0xc3fcecaeef824c9c!2sZamania%20Kasba%2C%20Zamania%2C%20Uttar%20Pradesh%20232329!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};
