// THE DISTRICT — Core Entity Engine & Multi-District Relational Data Layer
window.District = window.District || {};

District.data = {
  // =========================================================================
  // 1. DISTRICTS & JURISDICTION HIERARCHY
  // =========================================================================
  districts: {
    mellanby: {
      id: 'mellanby',
      name: 'Mellanby',
      type: 'Hall / Ward',
      parentDistrict: 'University of Ibadan',
      jurisdiction: ['Mellanby Hall', 'University of Ibadan', 'Ibadan', 'Oyo State', 'Nigeria'],
      ring: ['Mellanby', 'UI', 'Ibadan', 'Nigeria'],
      coord: '07°26′24″N · 03°53′46″E',
      tz: 'WAT',
      localTimeOffset: 1,
      providers: 384,
      businessesCount: 142,
      activeToday: 2116,
      eventsToday: 7,
      trending: ['Tailoring', 'Study Rooms', 'Provisions', 'Tech Society'],
      categories: ['Businesses', 'Places', 'Events', 'Organisations', 'Services', 'People', 'Opportunities'],
    },
    yaba: {
      id: 'yaba',
      name: 'Yaba',
      type: 'District / Tech Hub',
      parentDistrict: 'Lagos Mainland',
      jurisdiction: ['Yaba', 'Lagos Mainland', 'Lagos State', 'Nigeria'],
      ring: ['Yaba', 'Lagos Mainland', 'Lagos', 'Nigeria'],
      coord: '06°30′40″N · 03°22′22″E',
      tz: 'WAT',
      localTimeOffset: 1,
      providers: 612,
      businessesCount: 310,
      activeToday: 3980,
      eventsToday: 12,
      trending: ['Tech Repairs', 'Print & Design', 'Street Food', 'Coworking'],
      categories: ['Businesses', 'Places', 'Events', 'Organisations', 'Services', 'People', 'Opportunities'],
    },
    kilimani: {
      id: 'kilimani',
      name: 'Kilimani',
      type: 'Neighborhood',
      parentDistrict: 'Nairobi',
      jurisdiction: ['Kilimani', 'Nairobi County', 'Kenya'],
      ring: ['Kilimani', 'Nairobi', 'Kenya'],
      coord: '01°17′24″S · 36°47′08″E',
      tz: 'EAT',
      localTimeOffset: 3,
      providers: 298,
      businessesCount: 180,
      activeToday: 1540,
      eventsToday: 5,
      trending: ['Cafés', 'Fitness', 'Home Services', 'Art Spaces'],
      categories: ['Businesses', 'Places', 'Events', 'Organisations', 'Services', 'People', 'Opportunities'],
    },
    london: {
      id: 'london',
      name: 'Peckham',
      type: 'Borough Quarter',
      parentDistrict: 'Southwark',
      jurisdiction: ['Peckham', 'Southwark', 'London', 'UK'],
      ring: ['Peckham', 'Southwark', 'London', 'UK'],
      coord: '51°28′22″N · 00°04′08″W',
      tz: 'BST',
      localTimeOffset: 1,
      providers: 451,
      businessesCount: 220,
      activeToday: 2210,
      eventsToday: 9,
      trending: ['Vintage', 'Barbers', 'Supper Clubs', 'Print Studios'],
      categories: ['Businesses', 'Places', 'Events', 'Organisations', 'Services', 'People', 'Opportunities'],
    },
    newyork: {
      id: 'newyork',
      name: 'Bed-Stuy',
      type: 'Neighborhood',
      parentDistrict: 'Brooklyn',
      jurisdiction: ['Bed-Stuy', 'Brooklyn', 'New York', 'USA'],
      ring: ['Bed-Stuy', 'Brooklyn', 'New York', 'USA'],
      coord: '40°41′09″N · 73°56′22″W',
      tz: 'EDT',
      localTimeOffset: -4,
      providers: 703,
      businessesCount: 390,
      activeToday: 4310,
      eventsToday: 14,
      trending: ['Barbers', 'Bakeries', 'Studio Rentals', 'Community Gardens'],
      categories: ['Businesses', 'Places', 'Events', 'Organisations', 'Services', 'People', 'Opportunities'],
    },
  },

  currentDistrictId: 'mellanby',

  // =========================================================================
  // 2. CORE ENTITIES: PEOPLE
  // =========================================================================
  people: [
    // Mellanby
    {
      id: 'person-adaobi',
      name: 'Adaobi Nwosu',
      districtId: 'mellanby',
      role: 'Master Tailor & Designer',
      bio: 'Third-generation tailor blending traditional Nigerian textile craft with contemporary cut and drape.',
      avatarLabel: 'A · N',
      trustLevel: 'Verified Artisan',
      verified: true,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['fitting', 'alteration', 'agbada'],
      businessId: 'ija-tailoring',
      leadershipIn: [],
    },
    {
      id: 'person-bola',
      name: 'Bola Adewale',
      districtId: 'mellanby',
      role: 'Master Groomer',
      bio: 'Resident barber on Zik Avenue since 2019. Mentor to apprentice barbers.',
      avatarLabel: 'B · A',
      trustLevel: 'Verified Professional',
      verified: true,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['cut', 'cut-beard'],
      businessId: 'bola-cuts',
      leadershipIn: [],
    },
    {
      id: 'person-dami',
      name: 'Dami Alabi',
      districtId: 'mellanby',
      role: 'Chef & Caterer',
      bio: 'Culinary artist and founder of Dami\'s Kitchen. Famous across campus for Friday party jollof.',
      avatarLabel: 'D · A',
      trustLevel: 'Verified Merchant',
      verified: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['jollof-plate', 'small-chops'],
      businessId: 'dami-kitchen',
      leadershipIn: [],
    },
    {
      id: 'person-kemi',
      name: 'Kemi Osho',
      districtId: 'mellanby',
      role: 'Librarian & Space Curator',
      bio: 'Managing quiet study and coworking spaces at the Student Union Annex.',
      avatarLabel: 'K · O',
      trustLevel: 'Verified Host',
      verified: true,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['hourly', 'semester'],
      businessId: 'reading-room-place',
      placeId: 'reading-room-place',
      leadershipIn: [],
    },
    {
      id: 'person-samuel',
      name: 'Samuel Adeyemi',
      districtId: 'mellanby',
      role: 'Lead UI/UX Designer & Student',
      bio: 'Design lead at UI Tech Society. Freelance brand and interface designer.',
      avatarLabel: 'S · A',
      trustLevel: 'Verified Resident',
      verified: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['design-audit', 'brand-kit'],
      leadershipIn: ['ui-tech-society'],
    },
    {
      id: 'person-segun-exec',
      name: 'Segun Adeleke',
      districtId: 'mellanby',
      role: 'Hall Chairman (Mellanby Exec)',
      bio: 'Serving as the 2025/2026 Executive Chairman for Kenneth Mellanby Hall.',
      avatarLabel: 'S · A',
      trustLevel: 'Official Authority',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      leadershipIn: ['mellanby-exec'],
    },
    // Yaba
    {
      id: 'person-jide',
      name: 'Jide Balogun',
      districtId: 'yaba',
      role: 'Hardware Engineer & Repair Specialist',
      bio: 'Board-level micro-soldering and mobile diagnostic specialist on Herbert Macaulay Way.',
      avatarLabel: 'J · B',
      trustLevel: 'Verified Specialist',
      verified: true,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      servicesOffered: ['screen', 'diag'],
      businessId: 'jide-repairs',
      leadershipIn: [],
    },
    {
      id: 'person-chidinma',
      name: 'Chidinma Okafor',
      districtId: 'yaba',
      role: 'Community Lead at Yaba Tech Commons',
      bio: 'Fostering developer talent and startup incubation in the Yaba cluster.',
      avatarLabel: 'C · O',
      trustLevel: 'Verified Organizer',
      verified: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      leadershipIn: ['yaba-devs'],
    },
    // Kilimani
    {
      id: 'person-amani',
      name: 'Amani Wafula',
      districtId: 'kilimani',
      role: 'Roaster & Café Host',
      bio: 'Direct-trade Kenyan specialty coffee purveyor and founder of Amani\'s Corner Café.',
      avatarLabel: 'A · W',
      trustLevel: 'Verified Merchant',
      verified: true,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      businessId: 'amani-cafe',
      leadershipIn: [],
    },
    // Peckham
    {
      id: 'person-marcus',
      name: 'Marcus Reid',
      districtId: 'london',
      role: 'Vintage Curator & Archivist',
      bio: 'Curating European vintage menswear and workwear on Rye Lane since 2018.',
      avatarLabel: 'M · R',
      trustLevel: 'Verified Merchant',
      verified: true,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      businessId: 'marcus-vintage',
      leadershipIn: [],
    },
    // Bed-Stuy
    {
      id: 'person-darnell',
      name: 'Darnell Price',
      districtId: 'newyork',
      role: 'Master Barber & Community Mentor',
      bio: 'Fifteen years serving Bed-Stuy on Malcolm X Blvd. Straight-razor shaving specialist.',
      avatarLabel: 'D · P',
      trustLevel: 'Verified Master Barber',
      verified: true,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      businessId: 'darnell-barber',
      leadershipIn: [],
    },
  ],

  // =========================================================================
  // 3. CORE ENTITIES: BUSINESSES
  // =========================================================================
  businesses: [
    // Mellanby
    {
      id: 'ija-tailoring',
      name: 'Ìjà Tailoring Co.',
      category: 'Fashion & Tailoring',
      districtId: 'mellanby',
      ownerId: 'person-adaobi',
      ownerName: 'Adaobi Nwosu',
      location: 'Beside Mellanby Hall, Gate 2',
      coord: '07°26′25″N · 03°53′45″E',
      bio: 'Custom fittings, alterations, and made-to-order traditional wear — three generations of tailoring, now on The District.',
      avatarLabel: 'Ì · T',
      rating: 4.9,
      responseTime: '< 20m',
      completed: 213,
      openStatus: 'Open · Closes 7:00 PM',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 164, saves: 88, repeatRate: '94%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      trustDetails: {
        identity: { verified: true, method: 'Government-issued ID', date: 'Verified Mar 2025' },
        business: { verified: true, method: 'CAC business registration', date: 'Verified Mar 2025' },
        location: { verified: true, method: 'In-person address confirmation', date: 'Verified Apr 2025' },
        transactions: { verified: true, method: '200+ completed District transactions', date: 'Ongoing' },
      },
      services: [
        { id: 'fitting', name: 'Custom Fitting Session', price: '₦8,000', duration: '45 min', desc: 'Full measurement and consultation for a made-to-order piece.', orderType: 'booking' },
        { id: 'alteration', name: 'Alteration', price: 'from ₦2,500', duration: '20 min', desc: 'Hem, taper, or resize an existing garment.', orderType: 'booking' },
        { id: 'agbada', name: 'Agbada — Made to Order', price: '₦45,000', duration: '7–10 days', desc: 'Full traditional set, hand-finished with embroidery.', orderType: 'purchase' },
      ],
      products: [
        { id: 'aso-cap', name: 'Aso-Oke Fila Cap', price: '₦6,500', desc: 'Handwoven traditional cap, multiple sizes.' },
        { id: 'tape-set', name: 'Tailoring Tape & Chalk Kit', price: '₦2,000', desc: 'Essential measurements kit for students.' },
      ],
      reviews: [
        { author: 'Femi O.', rating: 5, text: 'Fastest turnaround I\'ve had for an agbada. Fit perfectly first try.' },
        { author: 'Grace A.', rating: 5, text: 'Adaobi remembered my measurements from last year. Attention to detail is unmatched.' },
      ],
    },
    {
      id: 'bola-cuts',
      name: 'Bola Cuts Barbershop',
      category: 'Grooming & Hair',
      districtId: 'mellanby',
      ownerId: 'person-bola',
      ownerName: 'Bola Adewale',
      location: 'Zik Avenue, opposite the bookshop',
      coord: '07°26′22″N · 03°53′40″E',
      bio: 'Barbering on Zik Avenue since 2019. Clean cuts, hot towel finishes, and appointment priority on weekends.',
      avatarLabel: 'B · C',
      rating: 4.8,
      responseTime: '< 10m',
      completed: 540,
      openStatus: 'Open for walk-ins',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 210, saves: 65, repeatRate: '91%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'cut', name: 'Signature Fade & Cut', price: '₦2,000', duration: '30 min', desc: 'Precision fade, clean lineup.', orderType: 'booking' },
        { id: 'cut-beard', name: 'Cut + Beard Grooming', price: '₦3,000', duration: '45 min', desc: 'Full grooming with beard oil treatment.', orderType: 'booking' },
      ],
      products: [],
      reviews: [
        { author: 'Tunde K.', rating: 5, text: 'Best fade on campus, no contest.' },
      ],
    },
    {
      id: 'dami-kitchen',
      name: "Dami's Kitchen",
      category: 'Food & Catering',
      districtId: 'mellanby',
      ownerId: 'person-dami',
      ownerName: 'Dami Alabi',
      location: 'Behind Tedder Hall Quad',
      coord: '07°26′28″N · 03°53′50″E',
      bio: 'Home-cooked comfort food, Friday jollof feasts, and catering for campus organizations. Pre-order to skip the lunch queue.',
      avatarLabel: 'D · K',
      rating: 4.7,
      responseTime: '< 15m',
      completed: 891,
      openStatus: 'Pre-orders Open · Lunch ready at 12:40 PM',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 340, saves: 124, repeatRate: '96%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'catering', name: 'Event Catering (Per 20 People)', price: '₦35,000', duration: '24 hr notice', desc: 'Jollof, fried rice, proteins, salad, and drinks.', orderType: 'booking' },
      ],
      products: [
        { id: 'jollof-plate', name: 'Friday Party Jollof Plate', price: '₦1,800', desc: 'Party jollof, peppered beef/chicken, fried plantain.', orderType: 'purchase' },
        { id: 'small-chops', name: 'Small Chops Platter (Serves 8)', price: '₦12,000', desc: 'Samosas, spring rolls, puff puff, peppered gizzard.', orderType: 'purchase' },
      ],
      reviews: [
        { author: 'Ngozi E.', rating: 5, text: 'The Friday jollof is worth planning your whole day around.' },
      ],
    },
    {
      id: 'campus-print-hub',
      name: 'Campus Print & Design Hub',
      category: 'Print & Media',
      districtId: 'mellanby',
      ownerName: 'Yemi Olawale',
      location: 'Sub-Basement, Student Union Building',
      coord: '07°26′20″N · 03°53′48″E',
      bio: 'High-speed document printing, project binding, poster printing, and event flyer production.',
      avatarLabel: 'P · H',
      rating: 4.8,
      responseTime: '< 5m',
      completed: 1420,
      openStatus: 'Open now · Closes 8:00 PM',
      image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 420, saves: 90, repeatRate: '88%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'project-bind', name: 'Hardcover Thesis Binding', price: '₦4,500', duration: '2 hours', desc: 'Gold foil lettering, institutional standard.' },
      ],
      products: [],
      reviews: [],
    },
    // Yaba
    {
      id: 'jide-repairs',
      name: 'Jide Fixes Phones & Laptops',
      category: 'Tech Repairs',
      districtId: 'yaba',
      ownerId: 'person-jide',
      ownerName: 'Jide Balogun',
      location: 'Herbert Macaulay Way, opposite Tech Hub',
      coord: '06°30′42″N · 03°22′20″E',
      bio: 'Screen replacements, battery servicing, water-damage revival, and board-level repairs. 90-day warranty on all parts.',
      avatarLabel: 'J · R',
      rating: 4.8,
      responseTime: '< 15m',
      completed: 780,
      openStatus: 'Open · 9:00 AM – 7:00 PM',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 310, saves: 95, repeatRate: '92%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'screen', name: 'OEM Screen Replacement', price: 'from ₦15,000', duration: '1 hour', desc: 'iPhone, Samsung, Pixel screens with warranty.', orderType: 'booking' },
        { id: 'diag', name: 'Full Hardware Diagnostics', price: '₦2,000', duration: '20 min', desc: 'Battery health, charging port, and motherboard check.', orderType: 'booking' },
      ],
      products: [],
      reviews: [{ author: 'Ifeoma S.', rating: 5, text: 'Fixed my MacBook charging port in 2 hours flat.' }],
    },
    {
      id: 'yaba-print-house',
      name: 'Yaba Print & Swag Studio',
      category: 'Print & Design',
      districtId: 'yaba',
      ownerName: 'Tunde Bakare',
      location: 'Commercial Avenue, Sabo Yaba',
      coord: '06°30′38″N · 03°22′24″E',
      bio: 'Startup merch, developer stickers, hoodies, event banners, and high-volume offset printing.',
      avatarLabel: 'Y · P',
      rating: 4.9,
      responseTime: '< 10m',
      completed: 1200,
      openStatus: 'Open · Closes 8:00 PM',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 450, saves: 110, repeatRate: '95%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'hoodies', name: 'Custom Embroidered Hoodies (10+)', price: '₦18,000 / unit', duration: '3 days', desc: 'Heavyweight cotton, screen-printed or embroidered.' },
      ],
      products: [],
      reviews: [],
    },
    // Kilimani
    {
      id: 'amani-cafe',
      name: "Amani's Corner Café",
      category: 'Food & Coffee',
      districtId: 'kilimani',
      ownerId: 'person-amani',
      ownerName: 'Amani Wafula',
      location: 'Off Wood Avenue, Kilimani',
      coord: '01°17′22″S · 36°47′05″E',
      bio: 'Specialty pour-over coffee, locally roasted single-origin beans, and all-day sourdough brunch.',
      avatarLabel: 'A · C',
      rating: 4.9,
      responseTime: '< 10m',
      completed: 640,
      openStatus: 'Open now · Closes 9:00 PM',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 280, saves: 140, repeatRate: '97%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [],
      products: [
        { id: 'pour-over', name: 'Kenya Nyeri Pour-Over Flight', price: 'KSh 650', desc: 'Three single-origin roast profiles with tasting notes.' },
      ],
      reviews: [{ author: 'Wanjiru K.', rating: 5, text: 'Best pour-over in Kilimani, hands down.' }],
    },
    // Peckham
    {
      id: 'marcus-vintage',
      name: 'Reid & Rail Vintage',
      category: 'Fashion & Vintage',
      districtId: 'london',
      ownerId: 'person-marcus',
      ownerName: 'Marcus Reid',
      location: 'Rye Lane, Peckham',
      coord: '51°28′20″N · 00°04′05″W',
      bio: 'Curated European workwear, deadstock denim, and mid-century outerwear. Tailoring and resizing on request.',
      avatarLabel: 'R · R',
      rating: 4.8,
      responseTime: '< 30m',
      completed: 420,
      openStatus: 'Open · 11:00 AM – 7:00 PM',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 310, saves: 180, repeatRate: '89%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'consult', name: 'Archive Styling Consultation', price: '£30', duration: '45 min', desc: '1-on-1 wardrobe curation and bespoke fit check.' },
      ],
      products: [
        { id: 'wool-jacket', name: '1970s French Chore Jacket', price: '£85', desc: 'Heavyweight cotton drill, restored vintage condition.' },
      ],
      reviews: [{ author: 'Aisha M.', rating: 5, text: 'Found an incredible jacket I get compliments on constantly.' }],
    },
    // Bed-Stuy
    {
      id: 'darnell-barber',
      name: 'Price Cuts & Parlor',
      category: 'Grooming & Barbershop',
      districtId: 'newyork',
      ownerId: 'person-darnell',
      ownerName: 'Darnell Price',
      location: 'Malcolm X Blvd, Bed-Stuy',
      coord: '40°41′10″N · 73°56′20″W',
      bio: 'Bed-Stuy neighborhood staple for 15 years. Traditional straight razor shaves, skin fades, and community mentorship.',
      avatarLabel: 'P · C',
      rating: 4.9,
      responseTime: '< 10m',
      completed: 980,
      openStatus: 'Open · Walk-ins welcome',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      signal: { visitsThisWeek: 410, saves: 160, repeatRate: '98%' },
      trust: { identity: true, business: true, location: true, transactions: true },
      services: [
        { id: 'classic-cut', name: 'Classic Fade & Lineup', price: '$35', duration: '30 min', desc: 'Signature cut, hot lather neck shave.' },
      ],
      products: [],
      reviews: [{ author: 'Marcus T.', rating: 5, text: 'Same chair every two weeks for two years. Best in Brooklyn.' }],
    },
  ],

  // =========================================================================
  // 4. CORE ENTITIES: ORGANIZATIONS & COMMUNITIES
  // =========================================================================
  organizations: [
    // Mellanby
    {
      id: 'mellanby-exec',
      name: 'Mellanby Hall Executive Council',
      category: 'Civic Governance',
      districtId: 'mellanby',
      authorityTier: 'Official Hall Authority',
      verifiedOfficial: true,
      bio: 'Official student governing body for Kenneth Mellanby Hall. Managing hall welfare, civic notices, social events, and facilities.',
      memberCount: 840,
      avatarLabel: 'M · E',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      leadership: [
        { name: 'Segun Adeleke', role: 'Executive Chairman' },
        { name: 'Tolani Salami', role: 'General Secretary' },
        { name: 'Emeka Obi', role: 'Welfare Officer' },
      ],
      openStatus: 'Hall Office Open 10am – 4pm',
      eventsHosted: ['inter-hall-football'],
      announcementsIssued: ['water-maintenance-notice'],
      signal: { activeMembers: 840, noticesThisMonth: 4 },
    },
    {
      id: 'ui-tech-society',
      name: 'UI Tech Society',
      category: 'Technology & Design',
      districtId: 'mellanby',
      authorityTier: 'Verified Student Organisation',
      verifiedOfficial: true,
      bio: 'The largest student developer and designer community at the University of Ibadan. Hosting workshops, hackathons, and mentorship.',
      memberCount: 1240,
      avatarLabel: 'U · T',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      leadership: [
        { name: 'Samuel Adeyemi', role: 'Design Lead' },
        { name: 'Amina Yusuf', role: 'President' },
      ],
      openStatus: 'Weekly meetups · Active on District',
      eventsHosted: ['freshers-design-night'],
      opportunitiesPosted: ['opp-graphic-designer'],
      signal: { newMembersThisWeek: 43, totalWorkshops: 18 },
    },
    {
      id: 'ui-entrepreneurs',
      name: 'UI Young Entrepreneurs Club',
      category: 'Business & Trade',
      districtId: 'mellanby',
      authorityTier: 'Verified Student Organisation',
      verifiedOfficial: true,
      bio: 'Empowering campus business owners, artisans, and tech founders with seed grants, market days, and mentorship.',
      memberCount: 620,
      avatarLabel: 'U · E',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      leadership: [{ name: 'Babatunde Cole', role: 'President' }],
      openStatus: 'Bi-weekly masterclasses',
      eventsHosted: ['entrepreneurship-workshop'],
      opportunitiesPosted: ['opp-student-barista'],
      signal: { activeMembers: 620, businessesSupported: 48 },
    },
    {
      id: 'mellanby-press',
      name: 'Mellanby Press Organisation',
      category: 'Media & Journalism',
      districtId: 'mellanby',
      authorityTier: 'Campus Media',
      verifiedOfficial: true,
      bio: 'Independent student press board of Kenneth Mellanby Hall. Publishing verified investigative reports and cultural gazettes.',
      memberCount: 35,
      avatarLabel: 'M · P',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      leadership: [{ name: 'Demilade Folarin', role: 'Editor-in-Chief' }],
      announcementsIssued: [],
      signal: { articlesPublished: 92, weeklyReaders: 1400 },
    },
    // Yaba
    {
      id: 'yaba-devs',
      name: 'Yaba Developers Circle',
      category: 'Technology & Startups',
      districtId: 'yaba',
      authorityTier: 'Tech Community',
      verifiedOfficial: true,
      bio: 'Open community of software engineers, product managers, and founders building Africa\'s tech infrastructure in Yaba.',
      memberCount: 2800,
      avatarLabel: 'Y · D',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      leadership: [{ name: 'Chidinma Okafor', role: 'Lead Organizer' }],
      openStatus: 'Monthly Demo Days',
      eventsHosted: ['yaba-demo-day'],
      signal: { newMembersThisWeek: 68, activeProjects: 34 },
    },
    // Kilimani
    {
      id: 'kilimani-creative',
      name: 'Kilimani Creatives Collective',
      category: 'Art & Culture',
      districtId: 'kilimani',
      authorityTier: 'Cultural Community',
      verifiedOfficial: true,
      bio: 'Independent artists, photographers, writers, and musicians shaping Nairobi\'s contemporary creative culture.',
      memberCount: 950,
      avatarLabel: 'K · C',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      leadership: [{ name: 'Njeri Maina', role: 'Curator' }],
      openStatus: 'Weekly studio visits',
      eventsHosted: [],
      signal: { activeMembers: 950, exhibitionsHosted: 12 },
    },
  ],

  // =========================================================================
  // 5. CORE ENTITIES: PLACES
  // =========================================================================
  places: [
    // Mellanby
    {
      id: 'reading-room-place',
      name: 'The Reading Room',
      type: 'Study & Coworking Space',
      districtId: 'mellanby',
      location: 'Top floor, Student Union Annex',
      coord: '07°26′23″N · 03°53′49″E',
      bio: 'Air-conditioned quiet study hall with high-speed wifi, uninterrupted solar power, dedicated power outlets at every desk, and coffee bar.',
      avatarLabel: 'R · R',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      liveStatus: { open: true, tag: '3 seats available', level: 'good' },
      hours: '07:00 AM – Midnight Daily',
      amenities: ['Solar Power', 'High-Speed WiFi', 'AC', 'Power Sockets', 'Quiet Policy', 'Coffee Machine'],
      capacity: '45 desks',
      hostedBusinessId: 'reading-room',
      signal: { savesThisWeek: 74, busyHours: '2:00 PM – 6:00 PM' },
    },
    {
      id: 'mellanby-sports-field',
      name: 'Mellanby Sports Pavilion & Field',
      type: 'Sports & Recreation',
      districtId: 'mellanby',
      location: 'Behind Mellanby Block D',
      coord: '07°26′30″N · 03°53′44″E',
      bio: 'Full-size grass football pitch, spectator bleachers, and volleyball court for hall tournaments and open training.',
      avatarLabel: 'M · S',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      liveStatus: { open: true, tag: 'Active now · Friendly match', level: 'active' },
      hours: '06:00 AM – 07:00 PM',
      amenities: ['Floodlights', 'Bleachers', 'Running Track', 'Equipment Locker'],
      capacity: '300 spectators',
      signal: { activeNow: 42, upcomingMatches: 3 },
    },
    {
      id: 'mellanby-quad',
      name: 'Mellanby Central Quad',
      type: 'Civic Commons & Square',
      districtId: 'mellanby',
      location: 'Mellanby Hall Centre',
      coord: '07°26′24″N · 03°53′46″E',
      bio: 'The green heart of Mellanby Hall. Shaded benches, bulletin boards, open-air gatherings, and student discussions.',
      avatarLabel: 'M · Q',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      liveStatus: { open: true, tag: 'Open civic space', level: 'good' },
      hours: '24/7 Access for Residents',
      amenities: ['Shaded Benches', 'Official Bulletin Board', 'Wi-Fi Hotspot'],
      capacity: 'Open commons',
      signal: { dailyFootTraffic: 1800 },
    },
    // Yaba
    {
      id: 'yaba-tech-hub',
      name: 'CcHub Yaba Innovation Hub',
      type: 'Coworking & Accelerator',
      districtId: 'yaba',
      location: '294 Herbert Macaulay Way, Yaba',
      coord: '06°30′40″N · 03°22′22″E',
      bio: 'The historic seedbed of Nigeria\'s startup ecosystem. 6 floors of coworking, maker labs, fiber internet, and event spaces.',
      avatarLabel: 'C · H',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      liveStatus: { open: true, tag: 'Open · 12 hot desks free', level: 'good' },
      hours: '24/7 for Members',
      amenities: ['Fiber Internet', 'Event Space', 'Podcast Studio', 'Rooftop Lounge', 'Coffee Bar'],
      capacity: '200 desks',
      signal: { dailyVisitors: 320, startupsHoused: 28 },
    },
    // Kilimani
    {
      id: 'kilimani-garden',
      name: 'Kilimani Community Eco-Garden',
      type: 'Public Park & Garden',
      districtId: 'kilimani',
      location: 'Argwings Kodhek Rd',
      coord: '01°17′26″S · 36°47′10″E',
      bio: 'Lush urban sanctuary with organic farm stalls, shaded walking paths, outdoor café tables, and weekend acoustic sessions.',
      avatarLabel: 'K · G',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      liveStatus: { open: true, tag: 'Open · Farmers market active', level: 'active' },
      hours: '06:00 AM – 06:30 PM',
      amenities: ['Walking Trails', 'Farm Stalls', 'Outdoor Seating', 'Restrooms'],
      capacity: '150 visitors',
      signal: { weekendVisitors: 600 },
    },
  ],

  // =========================================================================
  // 6. CREATED ACTIVITIES: EVENTS
  // =========================================================================
  events: [
    // Mellanby
    {
      id: 'freshers-design-night',
      title: 'Freshers Design & Figma Night',
      districtId: 'mellanby',
      date: 'This Friday',
      time: '6:00 PM – 8:30 PM',
      isoDate: '2026-08-28T18:00:00',
      venue: 'The Reading Room (Annex)',
      placeId: 'reading-room-place',
      organizerType: 'organization',
      organizerId: 'ui-tech-society',
      organizerName: 'UI Tech Society',
      description: 'Hands-on Figma workshop covering design systems, component tokens, and mobile prototyping for campus projects.',
      category: 'Technology',
      coverLabel: 'DESIGN',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      rsvpCount: 68,
      capacity: 80,
      userRsvpd: false,
    },
    {
      id: 'inter-hall-football',
      title: 'Mellanby vs. Tedder Hall Friendly Match',
      districtId: 'mellanby',
      date: 'Saturday',
      time: '4:00 PM – 6:00 PM',
      isoDate: '2026-08-29T16:00:00',
      venue: 'Mellanby Sports Pavilion',
      placeId: 'mellanby-sports-field',
      organizerType: 'organization',
      organizerId: 'mellanby-exec',
      organizerName: 'Mellanby Hall Executive',
      description: 'The annual pre-season exhibition match. Come support the Mellanby Lions.',
      category: 'Sports',
      coverLabel: 'MATCH',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      rsvpCount: 142,
      capacity: 300,
      userRsvpd: true,
    },
    {
      id: 'entrepreneurship-workshop',
      title: 'Campus Commerce: Pricing & Trust in 2026',
      districtId: 'mellanby',
      date: 'Next Monday',
      time: '2:00 PM – 4:00 PM',
      isoDate: '2026-08-31T14:00:00',
      venue: 'UI Conference Centre Room B',
      organizerType: 'organization',
      organizerId: 'ui-entrepreneurs',
      organizerName: 'UI Young Entrepreneurs Club',
      description: 'A masterclass with verified District merchants on managing digital bookings, customer retention, and CAC registration.',
      category: 'Business',
      coverLabel: 'BIZ',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      rsvpCount: 54,
      capacity: 100,
      userRsvpd: false,
    },
    // Yaba
    {
      id: 'yaba-demo-day',
      title: 'Yaba Founders Demo Night & Pitch Session',
      districtId: 'yaba',
      date: 'This Thursday',
      time: '5:30 PM – 8:00 PM',
      isoDate: '2026-08-27T17:30:00',
      venue: 'CcHub Yaba Rooftop',
      placeId: 'yaba-tech-hub',
      organizerType: 'organization',
      organizerId: 'yaba-devs',
      organizerName: 'Yaba Developers Circle',
      description: 'Five early-stage fintech and AI teams demo live MVPs to angel investors and the Yaba tech community.',
      category: 'Startups',
      coverLabel: 'DEMO',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      rsvpCount: 185,
      capacity: 220,
      userRsvpd: false,
    },
  ],

  // =========================================================================
  // 7. CREATED ACTIVITIES: OPPORTUNITIES (GIGS & JOBS)
  // =========================================================================
  opportunities: [
    // Mellanby
    {
      id: 'opp-graphic-designer',
      title: 'Graphic Designer for Event Brand Kit',
      districtId: 'mellanby',
      postedById: 'ui-tech-society',
      postedByName: 'UI Tech Society',
      postedByType: 'organization',
      compensation: '₦25,000 stipend',
      duration: '3 days · Remote/Campus',
      urgency: 'Active Today',
      description: 'Looking for a skilled illustrator/designer to create banners, social slides, and badges for the upcoming UI Hackathon.',
      requirements: ['Figma or Illustrator proficiency', 'Portfolio of poster or brand work', 'Fast turnaround'],
      applicantsCount: 5,
    },
    {
      id: 'opp-student-barista',
      title: 'Weekend Barista & Study Space Host',
      districtId: 'mellanby',
      postedById: 'reading-room-place',
      postedByName: 'The Reading Room',
      postedByType: 'business',
      compensation: '₦15,000 / weekend + free pass',
      duration: 'Weekends (Sat & Sun, 10am – 4pm)',
      urgency: 'Starts this Saturday',
      description: 'Help manage check-ins, prepare espresso drinks, and maintain the quiet study floor ambience on weekend shifts.',
      requirements: ['Punctual & friendly', 'Mellanby resident preferred', 'Customer service mindset'],
      applicantsCount: 8,
    },
    // Yaba
    {
      id: 'opp-frontend-dev',
      title: 'Junior React & Mobile Prototype Developer',
      districtId: 'yaba',
      postedById: 'yaba-devs',
      postedByName: 'Yaba Developers Circle',
      postedByType: 'organization',
      compensation: '₦180,000 / month',
      duration: 'Part-time (20 hrs/week)',
      urgency: 'Immediate Start',
      description: 'Build responsive web client prototypes for campus logistics tooling.',
      requirements: ['HTML/CSS/JS proficiency', 'Clean component design sense'],
      applicantsCount: 14,
    },
  ],

  // =========================================================================
  // 8. CREATED ACTIVITIES: ANNOUNCEMENTS (WITH AUTHORITY JURISDICTION)
  // =========================================================================
  announcements: [
    // Mellanby
    {
      id: 'water-maintenance-notice',
      title: 'Water Supply Maintenance & Tank Disinfection',
      districtId: 'mellanby',
      issuer: 'Mellanby Hall Executive Council',
      issuerType: 'Hall Authority',
      jurisdiction: 'Mellanby Hall (Blocks A–D)',
      audience: 'All Hall Residents',
      verifiedAuthority: true,
      time: 'Tomorrow, 8:00 AM – 12:00 PM',
      createdDate: 'Today, 7:30 AM',
      body: 'Scheduled borehole maintenance and central tank flushing will take place tomorrow morning. Water supply will be interrupted between 8:00 AM and 12:00 PM. Please store adequate water this evening. Normal supply resumes by 1:00 PM.',
      isUrgent: true,
    },
    {
      id: 'registration-deadline-notice',
      title: 'First Semester Course Registration Deadline',
      districtId: 'mellanby',
      issuer: 'University of Ibadan Academic Affairs',
      issuerType: 'University Authority',
      jurisdiction: 'University-wide',
      audience: 'All Students',
      verifiedAuthority: true,
      time: 'Portal closes Friday, 11:59 PM',
      createdDate: 'Yesterday',
      body: 'The university portal for first semester course registration and verification of course forms will close strictly on Friday.',
      isUrgent: false,
    },
    // Yaba
    {
      id: 'yaba-grid-notice',
      title: 'Commercial Avenue Fiber Cable Upgrade Notice',
      districtId: 'yaba',
      issuer: 'Lagos State Infrastructure Agency',
      issuerType: 'City Authority',
      jurisdiction: 'Yaba Tech Corridor',
      audience: 'Commercial Businesses',
      verifiedAuthority: true,
      time: 'Thursday night, 11:00 PM – 4:00 AM',
      createdDate: 'Today, 9:00 AM',
      body: 'Scheduled fiber duct installation along Herbert Macaulay Way. Road access remains open, expect brief connectivity switchover.',
      isUrgent: false,
    },
  ],

  // =========================================================================
  // 9. DERIVED LAYER: HAPPENING NOW (DISTRICT-AWARE TEMPORAL PULSE)
  // =========================================================================
  happeningNow: [
    // Mellanby
    { districtId: 'mellanby', time: '12:40', entityName: "Dami's Kitchen", entityType: 'business', text: 'Friday jollof lunch pre-orders now open for pickup', icon: 'food', badge: 'Food' },
    { districtId: 'mellanby', time: '13:00', entityName: 'The Reading Room', entityType: 'place', text: '3 study desks available on the quiet floor', icon: 'book', badge: 'Study' },
    { districtId: 'mellanby', time: '14:00', entityName: 'Mellanby Sports Pavilion', entityType: 'place', text: 'Inter-hall friendly football match kicking off', icon: 'activity', badge: 'Sports' },
    { districtId: 'mellanby', time: '15:30', entityName: 'UI Tech Society', entityType: 'organization', text: 'Design workshop sign-ups closing at 80 cap', icon: 'grid', badge: 'Workshop' },
    { districtId: 'mellanby', time: '18:00', entityName: 'Campus Fellowship', entityType: 'organization', text: 'Evening fellowship gathering at Central Chapel', icon: 'bell', badge: 'Community' },

    // Yaba
    { districtId: 'yaba', time: '11:00', entityName: 'CcHub Yaba', entityType: 'place', text: 'Open office hours with visiting fintech mentors', icon: 'grid', badge: 'Tech' },
    { districtId: 'yaba', time: '13:30', entityName: 'Jide Fixes Phones', entityType: 'business', text: 'Same-day screen replacements in 45 min', icon: 'tool', badge: 'Repairs' },
    { districtId: 'yaba', time: '17:30', entityName: 'Yaba Developers Circle', entityType: 'organization', text: 'Live startup pitch prep at Rooftop Hub', icon: 'activity', badge: 'Meetup' },

    // Kilimani
    { districtId: 'kilimani', time: '08:30', entityName: "Amani's Corner Café", entityType: 'business', text: 'Fresh single-origin Nyeri batch brewed', icon: 'food', badge: 'Coffee' },
    { districtId: 'kilimani', time: '16:00', entityName: 'Eco-Garden', entityType: 'place', text: 'Farmers market stalls opening for evening', icon: 'pin', badge: 'Market' },

    // Peckham
    { districtId: 'london', time: '12:00', entityName: 'Reid & Rail Vintage', entityType: 'business', text: 'New French chore jackets restocked', icon: 'bag', badge: 'Vintage' },

    // Bed-Stuy
    { districtId: 'newyork', time: '10:00', entityName: 'Price Cuts & Parlor', entityType: 'business', text: 'Morning chairs open for walk-ins on Malcolm X', icon: 'user', badge: 'Barber' },
  ],

  // =========================================================================
  // 10. DERIVED LAYER: RISING SIGNALS (DISTRICT-AWARE)
  // =========================================================================
  rising: [
    // Mellanby
    { districtId: 'mellanby', entityId: 'dami-kitchen', name: "Dami's Kitchen", type: 'Business', signal: '340 visits this week', metric: '🔥 +24% orders' },
    { districtId: 'mellanby', entityId: 'reading-room-place', name: 'The Reading Room', type: 'Place', signal: '74 saves by students', metric: '● 94% occupancy' },
    { districtId: 'mellanby', entityId: 'ui-tech-society', name: 'UI Tech Society', type: 'Organization', signal: '43 new members this week', metric: '✦ 1.2k total' },
    { districtId: 'mellanby', entityId: 'ija-tailoring', name: 'Ìjà Tailoring Co.', type: 'Business', signal: '164 profile views', metric: '★ 4.9 rating' },

    // Yaba
    { districtId: 'yaba', entityId: 'jide-repairs', name: 'Jide Fixes Phones', type: 'Business', signal: '310 repairs this week', metric: '★ 4.8 rating' },
    { districtId: 'yaba', entityId: 'yaba-tech-hub', name: 'CcHub Yaba', type: 'Place', signal: '320 daily visitors', metric: '● 12 desks free' },
    { districtId: 'yaba', entityId: 'yaba-devs', name: 'Yaba Developers Circle', type: 'Organization', signal: '68 new engineers joined', metric: '✦ 2.8k total' },

    // Kilimani
    { districtId: 'kilimani', entityId: 'amani-cafe', name: "Amani's Corner Café", type: 'Business', signal: '280 pour-overs served', metric: '★ 4.9 rating' },

    // Peckham
    { districtId: 'london', entityId: 'marcus-vintage', name: 'Reid & Rail Vintage', type: 'Business', signal: '180 saves this week', metric: '✦ Featured' },

    // Bed-Stuy
    { districtId: 'newyork', entityId: 'darnell-barber', name: 'Price Cuts & Parlor', type: 'Business', signal: '410 cuts this week', metric: '★ 4.9 rating' },
  ],

  // =========================================================================
  // 11. DERIVED LAYER: LIVE ACTIVITY STREAM
  // =========================================================================
  activity: [
    { districtId: 'mellanby', who: 'Adaobi (Ìjà Tailoring)', what: 'published 2 new Agbada Made-to-Order slots', when: '4m ago' },
    { districtId: 'mellanby', who: 'Bola Cuts', what: 'is open for weekend walk-ins', when: '12m ago' },
    { districtId: 'mellanby', who: 'Dami Alabi', what: 'posted Friday jollof pre-orders (pickup 12:40)', when: '25m ago' },
    { districtId: 'mellanby', who: 'The Reading Room', what: 'has 3 seats open right now', when: '40m ago' },
    { districtId: 'mellanby', who: 'UI Tech Society', what: 'posted an opportunity: Graphic Designer', when: '1h ago' },
    { districtId: 'mellanby', who: 'Mellanby Hall Exec', what: 'issued an Official Notice regarding Water Maintenance', when: '2h ago' },
    { districtId: 'yaba', who: 'Jide Repairs', what: 'received a 5-star review for MacBook logic board fix', when: '15m ago' },
    { districtId: 'yaba', who: 'Yaba Devs', what: 'opened RSVP for Thursday Pitch Demo Night', when: '1h ago' },
  ],

  // =========================================================================
  // 12. USER PARTICIPATION STATE & MY DISTRICT
  // =========================================================================
  user: {
    name: 'Tomiwa Adisa',
    handle: '@tomiwa.a',
    memberSince: '2025',
    avatarLabel: 'T · A',
    trust: { identity: true, business: false, location: true, transactions: true },
    trustDetails: {
      identity: { verified: true, method: 'Government-issued ID', date: 'Verified Jan 2025' },
      business: { verified: false, method: 'Not applicable — personal account', date: null },
      location: { verified: true, method: 'Mellanby Hall Room C12', date: 'Verified Jan 2025' },
      transactions: { verified: true, method: '14 completed District transactions', date: 'Ongoing' },
    },
    following: {
      'dami-kitchen': true,
      'ui-tech-society': true,
      'reading-room-place': true,
      'mellanby-exec': true,
    },
    saved: {
      'reading-room-place': { id: 'reading-room-place', title: 'The Reading Room', type: 'Place', subtitle: 'Study space · 3 seats available' },
      'freshers-design-night': { id: 'freshers-design-night', title: 'Freshers Design Night', type: 'Event', subtitle: 'Friday 6:00 PM · UI Tech Society' },
      'opp-graphic-designer': { id: 'opp-graphic-designer', title: 'Graphic Designer Needed', type: 'Opportunity', subtitle: 'UI Tech Society · ₦25k' },
    },
    rsvps: {
      'inter-hall-football': true,
    },
    applications: [
      { id: 'opp-graphic-designer', title: 'Graphic Designer for Event Brand Kit', organization: 'UI Tech Society', status: 'In Review', date: 'Yesterday' },
    ],
    ordersCount: 14,
    reviewsGiven: 9,
  },

  messages: [
    {
      providerId: 'ija-tailoring',
      preview: 'Your agbada will be ready Thursday morning.',
      when: '2h ago',
      unread: true,
      thread: [
        { from: 'them', text: 'Hi! Just confirming your fitting for Thursday.', when: 'Mon 4:12pm' },
        { from: 'me', text: 'Yes that works, morning is better for me.', when: 'Mon 4:20pm' },
        { from: 'them', text: 'Perfect, 9am then. Bring the fabric if you picked one.', when: 'Mon 4:25pm' },
        { from: 'them', text: 'Your agbada will be ready Thursday morning.', when: 'Today 9:02am' },
      ],
    },
    {
      providerId: 'bola-cuts',
      preview: 'See you at 4pm, table\'s free.',
      when: '1d ago',
      unread: false,
      thread: [
        { from: 'me', text: 'Any slots free today around 4?', when: 'Yesterday 2:40pm' },
        { from: 'them', text: 'See you at 4pm, table\'s free.', when: 'Yesterday 2:44pm' },
      ],
    },
    {
      providerId: 'dami-kitchen',
      preview: 'Pre-order for Friday is in, thank you!',
      when: '3d ago',
      unread: false,
      thread: [
        { from: 'me', text: 'Can I pre-order 2 jollof plates for Friday?', when: 'Sat 11:00am' },
        { from: 'them', text: 'Pre-order for Friday is in, thank you!', when: 'Sat 11:05am' },
      ],
    },
  ],

  orders: [
    { id: 'ORD-1042', providerId: 'ija-tailoring', service: 'Custom Fitting Session', status: 'Upcoming', when: 'Thu, 9:00am', amount: '₦8,000' },
    { id: 'ORD-1038', providerId: 'bola-cuts', service: 'Signature Fade & Cut', status: 'Completed', when: 'Last Tue', amount: '₦2,000' },
    { id: 'ORD-1031', providerId: 'reading-room-place', service: 'Study Room — Hourly', status: 'Completed', when: 'Last week', amount: '₦1,500' },
    { id: 'ORD-1022', providerId: 'dami-kitchen', service: 'Jollof Plate', status: 'Cancelled', when: '2 weeks ago', amount: '₦1,800' },
  ],

  // ---- provider dashboard (owner view — Adaobi / Ìjà Tailoring Co.) ----
  dashboard: {
    providerId: 'ija-tailoring',
    stats: { earningsMonth: '₦186,400', earningsChange: '+12%', ordersOpen: 5, responseRate: '98%', completionRate: '96%' },
    listings: [
      { id: 'fitting', name: 'Custom Fitting Session', type: 'Service', status: 'Active', price: '₦8,000' },
      { id: 'alteration', name: 'Alteration', type: 'Service', status: 'Active', price: 'from ₦2,500' },
      { id: 'agbada', name: 'Agbada — Made to Order', type: 'Product', status: 'Active', price: '₦45,000' },
      { id: 'draft-1', name: 'Aso-Oke Cap (new)', type: 'Product', status: 'Draft', price: '—' },
    ],
    orders: [
      { id: 'ORD-1042', customer: 'Tomiwa A.', service: 'Custom Fitting Session', status: 'Upcoming', when: 'Thu, 9:00am', amount: '₦8,000' },
      { id: 'ORD-1040', customer: 'Grace A.', service: 'Alteration', status: 'In progress', when: 'Today', amount: '₦2,500' },
      { id: 'ORD-1036', customer: 'Femi O.', service: 'Agbada — Made to Order', status: 'In progress', when: 'Due Fri', amount: '₦45,000' },
      { id: 'ORD-1029', customer: 'Chuka N.', service: 'Alteration', status: 'Completed', when: 'Last week', amount: '₦3,000' },
    ],
    customers: [
      { name: 'Tomiwa Adisa', orders: 3, lastOrder: 'This week' },
      { name: 'Grace Adeyemi', orders: 5, lastOrder: 'Today' },
      { name: 'Femi Okon', orders: 2, lastOrder: 'This week' },
      { name: 'Chuka Nnamdi', orders: 1, lastOrder: 'Last week' },
    ],
    earningsByWeek: [12000, 18500, 9800, 24200, 31000, 27600, 22300],
  },
};

// =========================================================================
// QUERY API & HELPER METHODS
// =========================================================================

// Compatibility layer for provider queries
District.data.providers = District.data.businesses;

District.getDistrict = function (id) {
  return District.data.districts[id || (District.state && District.state.districtId) || District.data.currentDistrictId];
};

District.getProvidersForDistrict = function (id) {
  var did = id || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.businesses.filter(function (b) { return b.districtId === did; });
};

District.getProvider = function (id) {
  return District.data.businesses.filter(function (b) { return b.id === id; })[0];
};

District.getBusinesses = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.businesses.filter(function (b) { return b.districtId === did; });
};

District.getOrganizations = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.organizations.filter(function (o) { return o.districtId === did; });
};

District.getPlaces = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.places.filter(function (p) { return p.districtId === did; });
};

District.getEvents = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.events.filter(function (e) { return e.districtId === did; });
};

District.getOpportunities = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.opportunities.filter(function (o) { return o.districtId === did; });
};

District.getPeople = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.people.filter(function (p) { return p.districtId === did; });
};

District.getAnnouncements = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  return District.data.announcements.filter(function (a) { return a.districtId === did; });
};

// District-aware Happening Now filter
District.getHappeningNow = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  var items = District.data.happeningNow.filter(function (h) { return h.districtId === did; });
  return items.length ? items : District.data.happeningNow.slice(0, 3);
};

// District-aware Rising filter
District.getRising = function (districtId) {
  var did = districtId || (District.state && District.state.districtId) || District.data.currentDistrictId;
  var items = District.data.rising.filter(function (r) { return r.districtId === did; });
  return items.length ? items : District.data.rising.slice(0, 2);
};

// Universal Entity Lookup
District.getEntity = function (id, type) {
  if (!id) return null;
  if (type === 'business' || !type) {
    var b = District.data.businesses.filter(function (x) { return x.id === id; })[0];
    if (b) return { entity: b, type: 'business' };
  }
  if (type === 'place' || !type) {
    var pl = District.data.places.filter(function (x) { return x.id === id; })[0];
    if (pl) return { entity: pl, type: 'place' };
  }
  if (type === 'org' || type === 'organization' || !type) {
    var og = District.data.organizations.filter(function (x) { return x.id === id; })[0];
    if (og) return { entity: og, type: 'organization' };
  }
  if (type === 'event' || !type) {
    var ev = District.data.events.filter(function (x) { return x.id === id; })[0];
    if (ev) return { entity: ev, type: 'event' };
  }
  if (type === 'opportunity' || !type) {
    var op = District.data.opportunities.filter(function (x) { return x.id === id; })[0];
    if (op) return { entity: op, type: 'opportunity' };
  }
  if (type === 'person' || !type) {
    var pe = District.data.people.filter(function (x) { return x.id === id; })[0];
    if (pe) return { entity: pe, type: 'person' };
  }
  if (type === 'announcement' || !type) {
    var an = District.data.announcements.filter(function (x) { return x.id === id; })[0];
    if (an) return { entity: an, type: 'announcement' };
  }
  return null;
};

// Participation Primitives
District.toggleFollow = function (entityId) {
  var isFollowing = !!District.data.user.following[entityId];
  District.data.user.following[entityId] = !isFollowing;
  District.toast(!isFollowing ? 'Following ' + entityId : 'Unfollowed ' + entityId);
  if (District.render) District.render();
  return !isFollowing;
};

District.toggleSave = function (entityId, entityType, title, subtitle) {
  var isSaved = !!District.data.user.saved[entityId];
  if (isSaved) {
    delete District.data.user.saved[entityId];
    District.toast('Removed from Saved');
  } else {
    District.data.user.saved[entityId] = {
      id: entityId,
      type: entityType || 'Item',
      title: title || entityId,
      subtitle: subtitle || 'Saved in The District',
    };
    District.toast('Saved to My District');
  }
  if (District.render) District.render();
  return !isSaved;
};

District.toggleRSVP = function (eventId) {
  var ev = District.data.events.filter(function (e) { return e.id === eventId; })[0];
  var isRsvpd = !!District.data.user.rsvps[eventId];
  District.data.user.rsvps[eventId] = !isRsvpd;
  if (ev) {
    ev.userRsvpd = !isRsvpd;
    ev.rsvpCount += (!isRsvpd ? 1 : -1);
  }
  District.toast(!isRsvpd ? 'RSVP confirmed! See you there.' : 'RSVP cancelled.');
  if (District.render) District.render();
  return !isRsvpd;
};

District.applyOpportunity = function (opportunityId, note) {
  var opp = District.data.opportunities.filter(function (o) { return o.id === opportunityId; })[0];
  if (opp) {
    opp.applicantsCount += 1;
    District.data.user.applications.unshift({
      id: opp.id,
      title: opp.title,
      organization: opp.postedByName,
      status: 'Submitted',
      date: 'Just now',
      note: note || '',
    });
    District.toast('Application submitted to ' + opp.postedByName);
    if (District.render) District.render();
  }
};
