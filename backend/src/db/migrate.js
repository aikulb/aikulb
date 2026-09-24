import { executeQuery } from './connection.js';
import bcrypt from 'bcryptjs';

async function migrate() {
  console.log('🚀 Starting AI KLUB Database Migration & Seeding...');

  // Helper execution function
  const exec = (sql, args = []) => executeQuery(sql, args);

  // 1. Users Table
  await exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer',
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Categories Table
  await exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );
  `);

  // 3. Products Table
  await exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      price REAL NOT NULL,
      original_price REAL,
      discount REAL DEFAULT 0,
      rating REAL DEFAULT 5.0,
      material TEXT NOT NULL,
      nfc_enabled BOOLEAN DEFAULT 1,
      qr_enabled BOOLEAN DEFAULT 1,
      category_id TEXT,
      sku TEXT UNIQUE,
      stock INTEGER DEFAULT 100,
      is_featured BOOLEAN DEFAULT 0,
      image_url TEXT,
      images_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Profiles Table
  await exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      username TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      title TEXT,
      company TEXT,
      bio TEXT,
      avatar_url TEXT,
      banner_url TEXT,
      theme TEXT DEFAULT 'dark-electric',
      phone TEXT,
      email TEXT,
      whatsapp TEXT,
      website TEXT,
      linkedin TEXT,
      instagram TEXT,
      youtube TEXT,
      github TEXT,
      vcf_data TEXT,
      custom_links_json TEXT,
      services_json TEXT,
      portfolio_json TEXT,
      address TEXT,
      is_active BOOLEAN DEFAULT 1,
      views_count INTEGER DEFAULT 0,
      nfc_taps INTEGER DEFAULT 0,
      qr_scans INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  try {
    await exec(`ALTER TABLE profiles ADD COLUMN address TEXT;`);
  } catch (e) {
    // Column may already exist
  }

  // 5. Leads Table
  await exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      profile_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT,
      status TEXT DEFAULT 'New',
      source TEXT DEFAULT 'NFC Tap',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Orders Table
  await exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      total_amount REAL NOT NULL,
      discount_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'Processing',
      payment_status TEXT DEFAULT 'Paid',
      payment_method TEXT DEFAULT 'UPI / Card',
      shipping_address_json TEXT,
      items_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Custom Card Designs Table
  await exec(`
    CREATE TABLE IF NOT EXISTS custom_card_designs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      card_name TEXT,
      material TEXT,
      color TEXT,
      text_line1 TEXT,
      text_line2 TEXT,
      logo_url TEXT,
      qr_position TEXT,
      social_icons_json TEXT,
      preview_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Teams & Team Members Tables
  await exec(`
    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      plan TEXT DEFAULT 'Enterprise',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      team_id TEXT NOT NULL,
      user_id TEXT,
      profile_id TEXT,
      card_assigned TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 9. Reviews Table
  await exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      rating REAL NOT NULL,
      comment TEXT,
      verified_purchase BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 10. Coupons Table
  await exec(`
    CREATE TABLE IF NOT EXISTS coupons (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      discount_percent REAL NOT NULL,
      max_uses INTEGER DEFAULT 1000,
      current_uses INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 11. Homepage Content Table
  await exec(`
    CREATE TABLE IF NOT EXISTS homepage_content (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 12. User Carts Table for Database Synchronization
  await exec(`
    CREATE TABLE IF NOT EXISTS user_carts (
      user_id TEXT PRIMARY KEY,
      items_json TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Tables created successfully!');

  // Seed Categories
  const categories = [
    { id: 'cat-metal', name: 'Metal NFC Cards', slug: 'metal-cards', description: 'Laser engraved premium matte & mirror finish stainless steel cards.' },
    { id: 'cat-wood', name: 'Wooden NFC Cards', slug: 'wooden-cards', description: 'Eco-friendly natural walnut and bamboo smart cards.' },
    { id: 'cat-pvc', name: 'PVC Smart Cards', slug: 'pvc-cards', description: 'Durable, waterproof matte finish smart cards with custom prints.' },
    { id: 'cat-stand', name: 'Smart NFC Standees', slug: 'smart-stands', description: 'Interactive acrylic desk stands for Google reviews, menus, and lead capture.' },
    { id: 'cat-review', name: 'NFC Review Products', slug: 'review-cards', description: 'Tap-to-review Google and Trustpilot smart cards and stands.' },
    { id: 'cat-social', name: 'NFC Social Cards', slug: 'social-cards', description: 'Instant social media, Instagram & YouTube link sharing cards.' },
  ];

  for (const cat of categories) {
    await exec({
      sql: `INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)`,
      args: [cat.id, cat.name, cat.slug, cat.description],
    });
  }

  // Seed Initial Products
  const products = [
    {
      id: 'prod-metal-gold-trishul',
      name: 'Ai Klub 24K Gold Trishul Emblem Edition',
      slug: 'aiklub-24k-gold-trishul-emblem-edition',
      description: 'Executive 24K Gold Brushed Stainless Steel NFC card featuring the iconic 3D engraved Trishul-AK Emblem, "PEOPLE | IDEAS | TECHNOLOGY" tagline, and "TAP TO CONNECT" QR code integration.',
      short_description: 'Brushed 24K Gold Metal with 3D Engraved Trishul Emblem & QR Code.',
      price: 1999,
      original_price: 3499,
      discount: 42,
      rating: 5.0,
      material: 'Brushed 24K Gold Stainless Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-GLD-TRISHUL',
      stock: 100,
      is_featured: 1,
      image_url: '/src/cardImages/WhatsApp Image 2026-09-22 at 15.47.05 (1).jpeg',
      images_json: JSON.stringify(['/src/cardImages/WhatsApp Image 2026-09-22 at 15.47.05 (1).jpeg']),
    },
    {
      id: 'prod-metal-silver-trishul',
      name: 'Ai Klub Platinum Silver Trishul Emblem Edition',
      slug: 'aiklub-platinum-silver-trishul-emblem-edition',
      description: 'Ultra-sleek Platinum Silver brushed metal NFC smart card with precision 3D engraved Trishul emblem, "CONNECT / COLLABORATE / CREATE / GROW" corner accent, and high-contrast QR code.',
      short_description: 'Platinum Silver Brushed Metal with 3D Trishul Emblem & 4-Pillar Corner Accent.',
      price: 1899,
      original_price: 3199,
      discount: 40,
      rating: 4.9,
      material: 'Platinum Silver Brushed Metal',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-SLV-TRISHUL',
      stock: 120,
      is_featured: 1,
      image_url: '/src/cardImages/WhatsApp Image 2026-09-22 at 15.47.05.jpeg',
      images_json: JSON.stringify(['/src/cardImages/WhatsApp Image 2026-09-22 at 15.47.05.jpeg', '/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.17.jpeg']),
    },
    {
      id: 'prod-metal-blue-world',
      name: 'Ai Klub Sapphire Blue World Map Edition',
      slug: 'aiklub-sapphire-blue-world-map-edition',
      description: 'Stunning Electric Sapphire Blue brushed metal NFC card featuring an intricate Silver Dot-Matrix World Map design, 5 core pillars (People, Ideas, Technology, Opportunities, Global Network), and neon wave lines.',
      short_description: 'Electric Sapphire Blue Alloy with Etched Silver Dot-Matrix World Map & 5 Strategic Pillars.',
      price: 2199,
      original_price: 3799,
      discount: 42,
      rating: 5.0,
      material: 'Metallic Sapphire Blue Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-BLU-WORLD',
      stock: 90,
      is_featured: 1,
      image_url: '/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.17 (1).jpeg',
      images_json: JSON.stringify(['/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.17 (1).jpeg']),
    },
    {
      id: 'prod-metal-blue-trishul',
      name: 'Ai Klub Sapphire Blue Trishul Emblem Edition',
      slug: 'aiklub-sapphire-blue-trishul-emblem-edition',
      description: 'Bold Metallic Sapphire Blue NFC card accented with a polished silver chrome Trishul-AK Emblem and sharp high-definition QR code for effortless networking.',
      short_description: 'Metallic Sapphire Blue with Chrome Trishul Emblem & Tap To Connect QR Code.',
      price: 2099,
      original_price: 3599,
      discount: 41,
      rating: 4.9,
      material: 'Metallic Sapphire Blue Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-BLU-TRISHUL',
      stock: 110,
      is_featured: 1,
      image_url: '/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.18.jpeg',
      images_json: JSON.stringify(['/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.18.jpeg']),
    },
    {
      id: 'prod-metal-silver-world',
      name: 'Ai Klub Platinum Silver World Map Edition',
      slug: 'aiklub-platinum-silver-world-map-edition',
      description: 'Pure Brushed Silver metal smart card with dot-matrix world map, centered "A SMARTER TOMORROW TOGETHER" tagline, and "TAP . CONNECT . GROW." footer.',
      short_description: 'Brushed Platinum Silver with Etched World Map & 5 Strategic Pillar Icons.',
      price: 1999,
      original_price: 3399,
      discount: 41,
      rating: 4.9,
      material: 'Brushed Platinum Silver Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-SLV-WORLD',
      stock: 130,
      is_featured: 1,
      image_url: '/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.16.jpeg',
      images_json: JSON.stringify(['/src/cardImages/WhatsApp Image 2026-09-22 at 16.00.16.jpeg']),
    },
    {
      id: 'prod-metal-black',
      name: 'AI KLUB Black Metal NFC Card',
      slug: 'aiklub-black-metal-nfc-card',
      description: 'Crafted from aerospace-grade matte black stainless steel with high-precision laser engraving. Embedded with an NTAG216 high-speed NFC microchip.',
      short_description: 'Premium black metal NFC card with high-precision laser engraving.',
      price: 1999,
      original_price: 2999,
      discount: 33,
      rating: 4.9,
      material: 'Matte Black Stainless Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-BLK-01',
      stock: 150,
      is_featured: 1,
      image_url: '/assets/products/metal_black.svg',
      images_json: JSON.stringify(['/assets/products/metal_black.svg', '/assets/products/metal_black_back.svg']),
    },
    {
      id: 'prod-metal-gold',
      name: 'AI KLUB Gold NFC Card',
      slug: 'aiklub-gold-nfc-card',
      description: 'Luxurious mirror-finish 24K gold metallic smart business card. Unmatched executive elegance with instant digital identity tap sharing.',
      short_description: 'Executive gold mirror finish NFC smart business card.',
      price: 2399,
      original_price: 3499,
      discount: 31,
      rating: 5.0,
      material: '24K Electroplated Gold Metal',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-GLD-02',
      stock: 80,
      is_featured: 1,
      image_url: '/assets/products/metal_gold.svg',
      images_json: JSON.stringify(['/assets/products/metal_gold.svg']),
    },
    {
      id: 'prod-metal-silver',
      name: 'AI KLUB Silver Metal Card',
      slug: 'aiklub-silver-metal-card',
      description: 'Sleek brushed silver metal smart card featuring custom metallic laser etching and full dynamic profile synchronization.',
      short_description: 'Minimal silver brushed metal NFC smart business card.',
      price: 1999,
      original_price: 2799,
      discount: 28,
      rating: 4.8,
      material: 'Brushed Silver Steel',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-metal',
      sku: 'AIK-MTL-SLV-03',
      stock: 120,
      is_featured: 1,
      image_url: '/assets/products/metal_silver.svg',
      images_json: JSON.stringify(['/assets/products/metal_silver.svg']),
    },
    {
      id: 'prod-wood-walnut',
      name: 'AI KLUB Wooden NFC Card',
      slug: 'aiklub-wooden-nfc-card',
      description: 'Handcrafted from 100% natural organic dark walnut wood. Eco-conscious networking with high-performance integrated NFC antenna.',
      short_description: 'Natural organic dark walnut wooden smart card.',
      price: 1499,
      original_price: 1999,
      discount: 25,
      rating: 4.9,
      material: 'Organic Dark Walnut Wood',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-wood',
      sku: 'AIK-WOD-WAL-04',
      stock: 200,
      is_featured: 1,
      image_url: '/assets/products/wood_walnut.svg',
      images_json: JSON.stringify(['/assets/products/wood_walnut.svg']),
    },
    {
      id: 'prod-wood-bamboo',
      name: 'AI KLUB Bamboo NFC Card',
      slug: 'aiklub-bamboo-nfc-card',
      description: 'Sustainably sourced light bamboo smart card with custom laser branding. Lightweight, durable, and environmentally clean.',
      short_description: 'Eco-friendly sustainable light bamboo NFC smart card.',
      price: 1399,
      original_price: 1899,
      discount: 26,
      rating: 4.7,
      material: 'Natural Sustainable Bamboo',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-wood',
      sku: 'AIK-WOD-BAM-05',
      stock: 180,
      is_featured: 0,
      image_url: '/assets/products/wood_bamboo.svg',
      images_json: JSON.stringify(['/assets/products/wood_bamboo.svg']),
    },
    {
      id: 'prod-pvc-card',
      name: 'AI KLUB PVC Smart Card',
      slug: 'aiklub-pvc-smart-card',
      description: 'Heavy-duty matte waterproof PVC card featuring vibrant edge-to-edge custom printing and built-in NFC chip.',
      short_description: 'Affordable, high-durability waterproof NFC business card.',
      price: 999,
      original_price: 1499,
      discount: 33,
      rating: 4.8,
      material: 'Matte Waterproof PVC',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-pvc',
      sku: 'AIK-PVC-STD-06',
      stock: 500,
      is_featured: 1,
      image_url: '/assets/products/pvc_card.svg',
      images_json: JSON.stringify(['/assets/products/pvc_card.svg']),
    },
    {
      id: 'prod-smart-stand',
      name: 'AI KLUB Smart Stand',
      slug: 'aiklub-smart-stand',
      description: 'Clear acrylic counter stand embedded with dual NFC + QR technology. Perfect for restaurants, clinics, hotels, retail counters, and office receptions.',
      short_description: 'NFC-enabled desk stand for reviews, menus, and digital links.',
      price: 799,
      original_price: 1199,
      discount: 33,
      rating: 4.9,
      material: 'Crystal Acrylic & NFC Core',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-stand',
      sku: 'AIK-STN-ACR-07',
      stock: 250,
      is_featured: 1,
      image_url: '/assets/products/smart_stand.svg',
      images_json: JSON.stringify(['/assets/products/smart_stand.svg']),
    },
    {
      id: 'prod-google-review',
      name: 'AI KLUB Google Review Card',
      slug: 'aiklub-google-review-card',
      description: 'Boost 5-star Google customer reviews effortlessly. When customers tap this smart card, your direct Google Review page opens instantly on their phone.',
      short_description: 'Instant tap-to-review Google smart card for businesses.',
      price: 599,
      original_price: 999,
      discount: 40,
      rating: 5.0,
      material: 'Gloss Smart PVC & NFC',
      nfc_enabled: 1,
      qr_enabled: 1,
      category_id: 'cat-review',
      sku: 'AIK-REV-GGL-08',
      stock: 400,
      is_featured: 1,
      image_url: '/assets/products/review_card.svg',
      images_json: JSON.stringify(['/assets/products/review_card.svg']),
    }
  ];

  for (const p of products) {
    await exec({
      sql: `INSERT OR REPLACE INTO products (id, name, slug, description, short_description, price, original_price, discount, rating, material, nfc_enabled, qr_enabled, category_id, sku, stock, is_featured, image_url, images_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id, p.name, p.slug, p.description, p.short_description, p.price, p.original_price, p.discount, p.rating, p.material, p.nfc_enabled, p.qr_enabled, p.category_id, p.sku, p.stock, p.is_featured, p.image_url, p.images_json
      ],
    });
  }

  // Seed Demo Admin & Demo User (with both aiklub.com and aikulb.com domain aliases)
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  await exec({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-admin-1', 'AI KLUB Admin', 'admin@aiklub.com', passwordHash, 'admin'],
  });

  await exec({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-admin-2', 'AI KLUB Admin', 'admin@aikulb.com', passwordHash, 'admin'],
  });

  await exec({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-john-1', 'John Doe', 'john@aiklub.com', passwordHash, 'customer'],
  });

  await exec({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-john-2', 'John Doe', 'john@aikulb.com', passwordHash, 'customer'],
  });

  // Seed Demo Profile `/profile/john`
  const sampleVcf = `BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nORG:ABC Technologies\nTITLE:Founder & CEO\nTEL;TYPE=CELL:+1234567890\nEMAIL:john@abctechnologies.com\nURL:https://abctechnologies.com\nEND:VCARD`;

  await exec({
    sql: `INSERT OR REPLACE INTO profiles (
      id, user_id, username, full_name, title, company, bio, avatar_url, banner_url, theme, phone, email, whatsapp, website, linkedin, instagram, youtube, github, vcf_data, custom_links_json, services_json, portfolio_json, views_count, nfc_taps, qr_scans
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      'prof-john-1',
      'user-john-1',
      'john',
      'John Doe',
      'Founder & CEO',
      'ABC Technologies',
      'Building next-generation AI and smart hardware platforms. Passionate about innovation, smart networking, and executive leadership.',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      'dark-electric',
      '+1 (555) 234-5678',
      'john@abctechnologies.com',
      '15552345678',
      'https://abctechnologies.com',
      'https://linkedin.com/in/johndoe',
      'https://instagram.com/johndoe.ai',
      'https://youtube.com/@johndoetech',
      'https://github.com/johndoe',
      sampleVcf,
      JSON.stringify([
        { title: 'Company Deck 2026', url: 'https://abctechnologies.com/deck.pdf', icon: 'FileText' },
        { title: 'Book a 15-min Meeting', url: 'https://calendly.com', icon: 'Calendar' }
      ]),
      JSON.stringify([
        { name: 'AI Product Strategy', desc: 'Enterprise roadmap design & AI integration advisory.' },
        { name: 'Executive Mentorship', desc: '1-on-1 scaling guidance for tech founders.' }
      ]),
      JSON.stringify([
        { title: 'AI KLUB NFC Hardware Launch', tag: 'Smart Hardware', link: 'https://aiklub.com' },
        { title: 'Neural Engine Core', tag: 'SaaS Platform', link: 'https://abctechnologies.com' }
      ]),
      2840,
      1420,
      1420
    ],
  });

  // Seed Reference Profile `/profile/nicholas` matching Reference Design
  const nicholasVcf = `BEGIN:VCARD\nVERSION:3.0\nN:Perry;Nicholas;;;\nFN:Nicholas Perry\nORG:ai klub\nTITLE:Designer @ ai klub\nTEL;TYPE=CELL:149-219-4462\nEMAIL:nicholas@aiklub.com\nURL:https://www.aiklub.com\nEND:VCARD`;

  await exec({
    sql: `INSERT OR REPLACE INTO profiles (
      id, user_id, username, full_name, title, company, bio, avatar_url, banner_url, theme, phone, email, whatsapp, website, linkedin, instagram, youtube, github, vcf_data, custom_links_json, services_json, portfolio_json, views_count, nfc_taps, qr_scans
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      'prof-nicholas-1',
      'user-john-1',
      'nicholas',
      'Nicholas Perry',
      'Designer @ ai klub',
      'ai klub',
      'With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      'dark-electric',
      '149-219-4462',
      'nicholas@aiklub.com',
      '1492194462',
      'https://www.aiklub.com',
      'https://linkedin.com/in/nicholasperry',
      'https://instagram.com/nicholasperry',
      'https://youtube.com/@nicholasperry',
      'https://github.com/nicholasperry',
      nicholasVcf,
      JSON.stringify([
        { title: 'Portfolio 2026', url: 'https://www.aiklub.com', icon: 'Globe' },
        { title: 'Download Business Deck', url: 'https://www.aiklub.com/deck', icon: 'FileText' }
      ]),
      JSON.stringify([
        { name: 'UI/UX Design', desc: 'Crafting digital card & modern web interfaces.' },
        { name: 'Brand Identity', desc: 'Custom luxury physical card & NFC branding.' }
      ]),
      JSON.stringify([
        { title: 'Smart NFC Card Line', tag: 'Product Design', link: 'https://www.aiklub.com' }
      ]),
      3420,
      1890,
      1530
    ],
  });

  // Seed Sample Leads for John
  const sampleLeads = [
    { id: 'lead-1', profile_id: 'prof-john-1', name: 'Sarah Jenkins', email: 'sarah@vertex.io', phone: '+1 987 654 3210', company: 'Vertex Ventures', message: 'Interested in bulk ordering AI KLUB cards for our 120 executives.', status: 'Qualified' },
    { id: 'lead-2', profile_id: 'prof-john-1', name: 'David Miller', email: 'david@cloudgrid.net', phone: '+1 456 789 0123', company: 'CloudGrid Systems', message: 'Would love to discuss enterprise API integration.', status: 'New' },
    { id: 'lead-3', profile_id: 'prof-john-1', name: 'Elena Rostova', email: 'elena@novatech.com', phone: '+1 312 555 0199', company: 'NovaTech Global', message: 'Sample card request and partner program inquiry.', status: 'Contacted' }
  ];

  for (const l of sampleLeads) {
    await exec({
      sql: `INSERT OR REPLACE INTO leads (id, profile_id, name, email, phone, company, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [l.id, l.profile_id, l.name, l.email, l.phone, l.company, l.message, l.status],
    });
  }

  // Seed Sample Coupons
  await exec({
    sql: `INSERT OR REPLACE INTO coupons (id, code, discount_percent, max_uses, current_uses, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
    args: ['coup-1', 'AIKLUB10', 10, 1000, 42, 1],
  });
  await exec({
    sql: `INSERT OR REPLACE INTO coupons (id, code, discount_percent, max_uses, current_uses, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
    args: ['coup-2', 'TAPSMART', 15, 500, 18, 1],
  });

  // Seed Homepage Dynamic Content
  const homepageContent = {
    hero: {
      headline: "Your Identity.\nOne Tap.",
      supporting: "Share your contact, social profiles, portfolio, WhatsApp and business information instantly with a single tap.",
      primaryCta: "Create Your Digital Profile",
      secondaryCta: "Explore Smart Cards",
      statViews: "2,840 Profile Views",
      statLeads: "148 Leads Generated",
      statGrowth: "+28% This Month"
    },
    platformStats: {
      profiles: "50K+",
      connections: "1M+",
      teams: "500+",
      reliability: "99.9%"
    },
    trustedBrands: [
      { name: 'Nexa Global', tag: 'AI Systems', code: 'Ne' },
      { name: 'Vertex Ventures', tag: 'Venture Capital', code: 'Ve' },
      { name: 'Orbit Labs', tag: 'Smart Hardware', code: 'Or' },
      { name: 'NovaTech', tag: 'Cloud Infra', code: 'No' },
      { name: 'CloudGrid', tag: 'Enterprise Data', code: 'Cl' },
      { name: 'Apex Capital', tag: 'FinTech', code: 'Ap' },
      { name: 'Elevate Health', tag: 'Biotech', code: 'El' },
      { name: 'CoreLabs', tag: 'Software', code: 'Co' },
      { name: 'Quantum Tech', tag: 'Deep Learning', code: 'Qu' },
      { name: 'Pulse Robotics', tag: 'Robotics', code: 'Pu' }
    ]
  };

  await exec({
    sql: `INSERT OR REPLACE INTO homepage_content (key, value_json) VALUES (?, ?)`,
    args: ['hero_section', JSON.stringify(homepageContent.hero)],
  });

  await exec({
    sql: `INSERT OR REPLACE INTO homepage_content (key, value_json) VALUES (?, ?)`,
    args: ['platform_stats', JSON.stringify(homepageContent.platformStats)],
  });

  await exec({
    sql: `INSERT OR REPLACE INTO homepage_content (key, value_json) VALUES (?, ?)`,
    args: ['trusted_brands', JSON.stringify(homepageContent.trustedBrands)],
  });

  console.log('🎉 AI KLUB Database Migration & Seeding Complete!');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
