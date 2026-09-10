import { db } from './connection.js';
import bcrypt from 'bcryptjs';

async function migrate() {
  console.log('🚀 Starting AIKULB Database Migration & Seeding...');

  // 1. Users Table
  await db.execute(`
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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );
  `);

  // 3. Products Table
  await db.execute(`
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
  await db.execute(`
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
      is_active BOOLEAN DEFAULT 1,
      views_count INTEGER DEFAULT 0,
      nfc_taps INTEGER DEFAULT 0,
      qr_scans INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Leads Table
  await db.execute(`
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
  await db.execute(`
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
  await db.execute(`
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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      plan TEXT DEFAULT 'Enterprise',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
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
  await db.execute(`
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
  await db.execute(`
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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS homepage_content (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
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
    await db.execute({
      sql: `INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)`,
      args: [cat.id, cat.name, cat.slug, cat.description],
    });
  }

  // Seed Initial Products
  const products = [
    {
      id: 'prod-metal-black',
      name: 'AIKULB Black Metal NFC Card',
      slug: 'aikulb-black-metal-nfc-card',
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
      name: 'AIKULB Gold NFC Card',
      slug: 'aikulb-gold-nfc-card',
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
      name: 'AIKULB Silver Metal Card',
      slug: 'aikulb-silver-metal-card',
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
      name: 'AIKULB Wooden NFC Card',
      slug: 'aikulb-wooden-nfc-card',
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
      name: 'AIKULB Bamboo NFC Card',
      slug: 'aikulb-bamboo-nfc-card',
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
      name: 'AIKULB PVC Smart Card',
      slug: 'aikulb-pvc-smart-card',
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
      name: 'AIKULB Smart Stand',
      slug: 'aikulb-smart-stand',
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
      name: 'AIKULB Google Review Card',
      slug: 'aikulb-google-review-card',
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
    await db.execute({
      sql: `INSERT OR REPLACE INTO products (id, name, slug, description, short_description, price, original_price, discount, rating, material, nfc_enabled, qr_enabled, category_id, sku, stock, is_featured, image_url, images_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id, p.name, p.slug, p.description, p.short_description, p.price, p.original_price, p.discount, p.rating, p.material, p.nfc_enabled, p.qr_enabled, p.category_id, p.sku, p.stock, p.is_featured, p.image_url, p.images_json
      ],
    });
  }

  // Seed Demo Admin & Demo User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  await db.execute({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-admin-1', 'AIKULB Admin', 'admin@aikulb.com', passwordHash, 'admin'],
  });

  await db.execute({
    sql: `INSERT OR REPLACE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['user-john-1', 'John Doe', 'john@aikulb.com', passwordHash, 'customer'],
  });

  // Seed Demo Profile `/profile/john`
  const sampleVcf = `BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nORG:ABC Technologies\nTITLE:Founder & CEO\nTEL;TYPE=CELL:+1234567890\nEMAIL:john@abctechnologies.com\nURL:https://abctechnologies.com\nEND:VCARD`;

  await db.execute({
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
        { title: 'AIKULB NFC Hardware Launch', tag: 'Smart Hardware', link: 'https://aikulb.com' },
        { title: 'Neural Engine Core', tag: 'SaaS Platform', link: 'https://abctechnologies.com' }
      ]),
      2840,
      1420,
      1420
    ],
  });

  // Seed Sample Leads for John
  const sampleLeads = [
    { id: 'lead-1', profile_id: 'prof-john-1', name: 'Sarah Jenkins', email: 'sarah@vertex.io', phone: '+1 987 654 3210', company: 'Vertex Ventures', message: 'Interested in bulk ordering AIKULB cards for our 120 executives.', status: 'Qualified' },
    { id: 'lead-2', profile_id: 'prof-john-1', name: 'David Miller', email: 'david@cloudgrid.net', phone: '+1 456 789 0123', company: 'CloudGrid Systems', message: 'Would love to discuss enterprise API integration.', status: 'New' },
    { id: 'lead-3', profile_id: 'prof-john-1', name: 'Elena Rostova', email: 'elena@novatech.com', phone: '+1 312 555 0199', company: 'NovaTech Global', message: 'Sample card request and partner program inquiry.', status: 'Contacted' }
  ];

  for (const l of sampleLeads) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO leads (id, profile_id, name, email, phone, company, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [l.id, l.profile_id, l.name, l.email, l.phone, l.company, l.message, l.status],
    });
  }

  // Seed Sample Coupons
  await db.execute({
    sql: `INSERT OR REPLACE INTO coupons (id, code, discount_percent, max_uses, current_uses, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
    args: ['coup-1', 'AIKULB10', 10, 1000, 42, 1],
  });
  await db.execute({
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
    }
  };

  await db.execute({
    sql: `INSERT OR REPLACE INTO homepage_content (key, value_json) VALUES (?, ?)`,
    args: ['hero_section', JSON.stringify(homepageContent.hero)],
  });

  await db.execute({
    sql: `INSERT OR REPLACE INTO homepage_content (key, value_json) VALUES (?, ?)`,
    args: ['platform_stats', JSON.stringify(homepageContent.platformStats)],
  });

  console.log('🎉 AIKULB Database Migration & Seeding Complete!');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
