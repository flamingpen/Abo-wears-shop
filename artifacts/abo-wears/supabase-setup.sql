-- ============================================================
-- ABO WEARS — Supabase Database Setup
-- Run this entire file in your Supabase SQL Editor (once).
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT DEFAULT '',
  href TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  image TEXT NOT NULL,
  badge TEXT,
  colors TEXT[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROMOS TABLE
CREATE TABLE IF NOT EXISTS promos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  banner_image TEXT,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROMO PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS promo_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_id UUID REFERENCES promos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  original_price INTEGER NOT NULL,
  promo_price INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAGE VIEWS TABLE (analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED: CATEGORIES
-- ============================================================
INSERT INTO categories (id, label, icon, description, href, sort_order, active) VALUES
  ('club-jerseys',        'Club Jerseys',        '🏆', 'Latest club football jerseys',                         '/jerseys', 1,  true),
  ('retro-jerseys',       'Retro Jerseys',        '⚽', 'Classic vintage football shirts',                      '/jerseys', 2,  true),
  ('country-jerseys',     'Country Jerseys',      '🌍', 'Country football jerseys from around the world',       '/jerseys', 3,  true),
  ('nfl-jerseys',         'NFL Jerseys',          '🏈', 'Official American football team jerseys',              '/jerseys', 4,  true),
  ('basketball-jerseys',  'Basketball Jerseys',   '🏀', 'NBA and basketball team jerseys',                      '/jerseys', 5,  true),
  ('baseball-jerseys',    'Baseball Jerseys',     '⚾', 'MLB and baseball team jerseys',                        '/jerseys', 6,  true),
  ('joggers',             'Joggers',              '👟', 'Comfortable sporty joggers',                           '/joggers', 7,  true),
  ('shorts',              'Shorts',               '🩳', 'Training & casual shorts',                             '/shorts',  8,  true),
  ('face-caps',           'Face Caps',            '🧢', 'Stylish sports caps',                                  '/face-caps', 9, true),
  ('gloves',              'Gloves',               '🥊', 'Sports & training gloves',                             '/gloves',  10, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED: PRODUCTS (using Unsplash placeholder images)
-- The admin can update images via the dashboard.
-- ============================================================

-- Club Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('cj-1', 'Arsenal 24/25 Home Jersey',      15000, 'club-jerseys', 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=500&fit=crop', 'New',        true),
  ('cj-2', 'Arsenal 24/25 Away Jersey',      15000, 'club-jerseys', 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=500&fit=crop', NULL,         true),
  ('cj-3', 'Man City 24/25 Home Jersey',     15000, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,         true),
  ('cj-4', 'Real Madrid 24/25 Home Jersey',  16000, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', '🔥 Hot',     true),
  ('cj-5', 'Chelsea 24/25 Home Jersey',      15000, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,         true),
  ('cj-6', 'Man Utd 24/25 Home Jersey',      15500, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,         true),
  ('cj-7', 'Liverpool 24/25 Home Jersey',    15000, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,         true),
  ('cj-8', 'Barcelona 24/25 Home Jersey',    15500, 'club-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,         true)
ON CONFLICT (id) DO NOTHING;

-- Retro Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('rj-1', 'Nigeria 1994 World Cup Retro',       15000, 'retro-jerseys', 'https://images.unsplash.com/photo-1547491421-a105f8f1e91a?w=500&h=500&fit=crop', '🇳🇬 Icon',    true),
  ('rj-2', 'Arsenal 2004 Invincibles Retro',     16000, 'retro-jerseys', 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=500&fit=crop', '🔥 Popular',  true),
  ('rj-3', 'Man Utd 1999 Treble Retro',          16000, 'retro-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,          true),
  ('rj-4', 'Brazil 1970 World Cup Retro',        17000, 'retro-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,          true),
  ('rj-5', 'Barcelona 2009 Treble Retro',        17500, 'retro-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', 'Best Seller', true),
  ('rj-6', 'Real Madrid 2002 Champions Retro',   16000, 'retro-jerseys', 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=500&fit=crop', NULL,          true)
ON CONFLICT (id) DO NOTHING;

-- Country Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('nj-1', 'Nigeria Super Eagles Home Jersey', 14000, 'country-jerseys', 'https://images.unsplash.com/photo-1547491421-a105f8f1e91a?w=500&h=500&fit=crop', '🇳🇬 Local Fave', true),
  ('nj-2', 'Nigeria Super Eagles Away Jersey', 14000, 'country-jerseys', 'https://images.unsplash.com/photo-1547491421-a105f8f1e91a?w=500&h=500&fit=crop', NULL,             true),
  ('nj-3', 'Brazil 24/25 Home Jersey',         16000, 'country-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,             true),
  ('nj-4', 'France 24/25 Home Jersey',         15500, 'country-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,             true),
  ('nj-5', 'Germany 24/25 Home Jersey',        15000, 'country-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', NULL,             true),
  ('nj-6', 'Argentina 24/25 Home Jersey',      15500, 'country-jerseys', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500&h=500&fit=crop', 'Best Seller',    true)
ON CONFLICT (id) DO NOTHING;

-- NFL Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('nfl-1', 'Kansas City Chiefs Patrick Mahomes #15', 18000, 'nfl-jerseys', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=500&h=500&fit=crop', '🔥 Hot',  true),
  ('nfl-2', 'Dallas Cowboys Dak Prescott #4',         17500, 'nfl-jerseys', 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=500&fit=crop', NULL,      true),
  ('nfl-3', 'Buffalo Bills Josh Allen #17',           17500, 'nfl-jerseys', 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=500&h=500&fit=crop', NULL,      true),
  ('nfl-4', 'San Francisco 49ers #23 Home',           17000, 'nfl-jerseys', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=500&h=500&fit=crop', NULL,      true),
  ('nfl-5', 'Philadelphia Eagles #11 Away',           17000, 'nfl-jerseys', 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=500&fit=crop', 'Popular', true),
  ('nfl-6', 'Miami Dolphins #1 Home Jersey',          16500, 'nfl-jerseys', 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=500&h=500&fit=crop', NULL,      true)
ON CONFLICT (id) DO NOTHING;

-- Basketball Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('bb-1', 'LA Lakers LeBron James #23',            17000, 'basketball-jerseys', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop', '🔥 Icon',  true),
  ('bb-2', 'Chicago Bulls Michael Jordan #23 Retro', 18000, 'basketball-jerseys', 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&h=500&fit=crop', 'Legend',   true),
  ('bb-3', 'Golden State Warriors Stephen Curry #30', 17000, 'basketball-jerseys', 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&h=500&fit=crop', NULL,       true),
  ('bb-4', 'Boston Celtics Jayson Tatum #0',         16500, 'basketball-jerseys', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop', NULL,       true),
  ('bb-5', 'Brooklyn Nets Kevin Durant #7',           17000, 'basketball-jerseys', 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&h=500&fit=crop', NULL,       true),
  ('bb-6', 'Miami Heat Jimmy Butler #22',             16000, 'basketball-jerseys', 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&h=500&fit=crop', 'Popular',  true)
ON CONFLICT (id) DO NOTHING;

-- Baseball Jerseys
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('bsb-1', 'New York Yankees Classic Home Jersey', 16500, 'baseball-jerseys', 'https://images.unsplash.com/photo-1562593028-c7c77e0b7bdc?w=500&h=500&fit=crop', 'Classic', true),
  ('bsb-2', 'LA Dodgers Away Jersey',               16000, 'baseball-jerseys', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=500&fit=crop', NULL,      true),
  ('bsb-3', 'Chicago Cubs Home Jersey #17',         15500, 'baseball-jerseys', 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=500&h=500&fit=crop', NULL,      true),
  ('bsb-4', 'Boston Red Sox Home Jersey',           16000, 'baseball-jerseys', 'https://images.unsplash.com/photo-1562593028-c7c77e0b7bdc?w=500&h=500&fit=crop', NULL,      true),
  ('bsb-5', 'Atlanta Braves Away Jersey',           15500, 'baseball-jerseys', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=500&fit=crop', 'Popular', true),
  ('bsb-6', 'Houston Astros Home Jersey',           15500, 'baseball-jerseys', 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=500&h=500&fit=crop', NULL,      true)
ON CONFLICT (id) DO NOTHING;

-- Joggers
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('jg-1', 'Classic Black Jogger Pants',   10000, 'joggers', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop', NULL,      true),
  ('jg-2', 'Navy Blue Jogger Pants',       10000, 'joggers', 'https://images.unsplash.com/photo-1617952739019-63b27b1acbc8?w=500&h=500&fit=crop', NULL,      true),
  ('jg-3', 'All-White Sporty Joggers',     11000, 'joggers', 'https://images.unsplash.com/photo-1599744331096-b6f99f4e5e39?w=500&h=500&fit=crop', 'Trending', true),
  ('jg-4', 'Olive Green Training Joggers', 10500, 'joggers', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop', NULL,      true),
  ('jg-5', 'Charcoal Grey Joggers',        10000, 'joggers', 'https://images.unsplash.com/photo-1617952739019-63b27b1acbc8?w=500&h=500&fit=crop', NULL,      true)
ON CONFLICT (id) DO NOTHING;

-- Shorts
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('sh-1', 'Football Training Shorts – Black', 5000, 'shorts', 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&h=500&fit=crop', NULL,      true),
  ('sh-2', 'Football Training Shorts – Navy',  5000, 'shorts', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&h=500&fit=crop', NULL,      true),
  ('sh-3', 'Casual Sport Shorts – Grey',       5500, 'shorts', 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&h=500&fit=crop', 'Popular', true),
  ('sh-4', 'Running Shorts – White',           5000, 'shorts', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&h=500&fit=crop', NULL,      true),
  ('sh-5', 'Compression Shorts – Black',       6000, 'shorts', 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&h=500&fit=crop', NULL,      true)
ON CONFLICT (id) DO NOTHING;

-- Face Caps
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('fc-1', 'Classic Snapback Cap – Black', 4000, 'face-caps', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop', NULL,        true),
  ('fc-2', 'Fitted Dad Cap – White',       3500, 'face-caps', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&h=500&fit=crop', NULL,        true),
  ('fc-3', 'ABO Wears Branded Cap',        4500, 'face-caps', 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=500&fit=crop', 'Exclusive',   true),
  ('fc-4', 'Sports Cap – Navy Blue',       3500, 'face-caps', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop', NULL,        true)
ON CONFLICT (id) DO NOTHING;

-- Gloves
INSERT INTO products (id, name, price, category_id, image, badge, active) VALUES
  ('gl-1', 'Pro Training Gloves – Black',    7000,  'gloves', 'https://images.unsplash.com/photo-1601422407692-ad6d71ca5478?w=500&h=500&fit=crop', 'Best Seller', true),
  ('gl-2', 'Boxing Gloves – Red/Black',      12000, 'gloves', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', '🔥 Hot',      true),
  ('gl-3', 'Goalkeeper Gloves – Green',      9000,  'gloves', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop', NULL,          true),
  ('gl-4', 'Fitness Grip Gloves – White',    6500,  'gloves', 'https://images.unsplash.com/photo-1601422407692-ad6d71ca5478?w=500&h=500&fit=crop', NULL,          true),
  ('gl-5', 'Sports Compression Gloves',      7500,  'gloves', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', NULL,          true),
  ('gl-6', 'Half-Finger Training Gloves',    6000,  'gloves', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop', 'Popular',     true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Done! Your database tables and seed data are ready.
--
-- NEXT STEPS:
--
-- 1. IMAGE UPLOADS (for uploading photos from phone/computer):
--    Go to Supabase → Storage → Create a new bucket
--    Bucket name:  product-images
--    Public bucket: YES (toggle on)
--    Click "Create bucket"
--    Then click the bucket → Policies → Enable public access
--
-- 2. ADMIN ACCOUNTS:
--    Go to Supabase → Authentication → Users → Add user
--    Create accounts for:
--      flamingpen1@gmail.com
--      aboluwasesan62@gmail.com
--    Set a password for each. These are the only logins
--    that can access /admin on the site.
-- ============================================================
