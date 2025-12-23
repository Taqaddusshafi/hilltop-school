-- =====================================================
-- HILLTOP EDUCATIONAL INSTITUTE - COMPLETE SUPABASE SCHEMA
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable Row Level Security
-- ALTER DATABASE postgres SET "app.settings.jwt_secret" = 'your-jwt-secret';

-- =====================================================
-- 1. NAVBAR & MENU ITEMS
-- =====================================================

-- Navbar Info
CREATE TABLE IF NOT EXISTS navbar_info (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(255) DEFAULT 'Hilltop Educational Institute',
  tagline VARCHAR(255) DEFAULT 'Empowering Minds, Building Futures',
  logo_text VARCHAR(10) DEFAULT 'HEI',
  phone VARCHAR(50) DEFAULT '+91 98765 43210',
  email VARCHAR(255) DEFAULT 'info@hilltop.edu',
  address_short VARCHAR(255) DEFAULT 'Darend, Ganderbal - 191201',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. HERO SECTION
-- =====================================================

-- Hero Content
CREATE TABLE IF NOT EXISTS hero (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Welcome to Hilltop Educational Institute',
  subtitle VARCHAR(255) DEFAULT 'Empowering Minds, Building Futures Since 1995',
  description TEXT,
  background_color_from VARCHAR(50) DEFAULT 'green-900',
  background_color_via VARCHAR(50) DEFAULT 'green-700',
  background_color_to VARCHAR(50) DEFAULT 'emerald-800',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Images (Slider)
CREATE TABLE IF NOT EXISTS hero_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. NOTICES (Live Notice Board)
-- =====================================================

CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  notice_type VARCHAR(50) DEFAULT 'general', -- general, urgent, event, holiday
  is_pinned BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- 4. STATISTICS
-- =====================================================

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL, -- Users, BookOpen, Award, GraduationCap, etc.
  value VARCHAR(50) NOT NULL, -- "2000+", "95%", etc.
  label VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. HIGHLIGHTS (Why Choose Us)
-- =====================================================

CREATE TABLE IF NOT EXISTS highlights (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. PROGRAMS
-- =====================================================

CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50) DEFAULT 'GraduationCap',
  title VARCHAR(100) NOT NULL,
  grades VARCHAR(100),
  description TEXT,
  students_count VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. PRINCIPAL MESSAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS principal_message (
  id SERIAL PRIMARY KEY,
  badge_text VARCHAR(100) DEFAULT 'From the Principal''s Desk',
  heading VARCHAR(100) DEFAULT 'A Message of',
  highlight_text VARCHAR(100) DEFAULT 'Hope & Excellence',
  quote_text TEXT,
  message_text TEXT,
  principal_name VARCHAR(100) NOT NULL,
  principal_title VARCHAR(255),
  principal_initials VARCHAR(10),
  photo_url TEXT,
  experience_years VARCHAR(20) DEFAULT '25+',
  alumni_count VARCHAR(20) DEFAULT '10K+',
  awards_count VARCHAR(20) DEFAULT '100+',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. TESTIMONIALS
-- =====================================================

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100), -- "Parent of Class 10 Student", "Alumni - Batch 2020"
  photo_url TEXT,
  rating INTEGER DEFAULT 5,
  testimonial_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. GALLERY
-- =====================================================

-- Gallery Categories
CREATE TABLE IF NOT EXISTS gallery_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Photos
CREATE TABLE IF NOT EXISTS gallery_photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id INTEGER REFERENCES gallery_categories(id),
  event_date DATE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Videos
CREATE TABLE IF NOT EXISTS gallery_videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration VARCHAR(20),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Page Content
CREATE TABLE IF NOT EXISTS gallery_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Gallery',
  hero_subtitle TEXT,
  photo_heading VARCHAR(255) DEFAULT 'Photo Gallery',
  photo_description TEXT,
  video_heading VARCHAR(255) DEFAULT 'Video Gallery',
  virtual_tour_heading VARCHAR(255) DEFAULT 'Virtual Campus Tour',
  virtual_tour_description TEXT,
  virtual_tour_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. NEWS & EVENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  category VARCHAR(50) DEFAULT 'news', -- news, event, announcement
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. CTA BANNER
-- =====================================================

CREATE TABLE IF NOT EXISTS cta_banner (
  id SERIAL PRIMARY KEY,
  badge_text VARCHAR(100) DEFAULT 'Admissions Open 2025-26',
  heading VARCHAR(255) DEFAULT 'Give Your Child the',
  highlight_text VARCHAR(100) DEFAULT 'Best Start',
  description TEXT,
  classes_info VARCHAR(100) DEFAULT 'Nursery to Class 12',
  start_date VARCHAR(100) DEFAULT 'March 2025',
  button_text VARCHAR(50) DEFAULT 'Apply Now',
  button_link VARCHAR(255) DEFAULT '/admissions',
  phone VARCHAR(50) DEFAULT '+919876543210',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. CONTACT INFO
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  section_heading VARCHAR(255) DEFAULT 'Get in Touch',
  section_description TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  office_hours VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 13. FOOTER INFO
-- =====================================================

CREATE TABLE IF NOT EXISTS footer_info (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(255) DEFAULT 'Hilltop Educational Institute',
  tagline TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  twitter_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 14. SECTION CONTENT (Reusable headings/descriptions)
-- =====================================================

CREATE TABLE IF NOT EXISTS section_content (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) UNIQUE NOT NULL, -- highlights, programs, testimonials, etc.
  heading VARCHAR(255),
  highlight_text VARCHAR(100),
  description TEXT,
  badge_text VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 15. ABOUT PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS about_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'About Us',
  hero_subtitle TEXT,
  intro_heading VARCHAR(255),
  intro_content TEXT,
  vision_heading VARCHAR(100) DEFAULT 'Our Vision',
  vision_content TEXT,
  mission_heading VARCHAR(100) DEFAULT 'Our Mission',
  mission_content TEXT,
  history_heading VARCHAR(255),
  history_content TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Core Values
CREATE TABLE IF NOT EXISTS core_values (
  id SERIAL PRIMARY KEY,
  icon_name VARCHAR(50),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Management Team
CREATE TABLE IF NOT EXISTS management_team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  photo_url TEXT,
  bio TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 16. ACADEMICS PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS academics_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Academics',
  hero_subtitle TEXT,
  curriculum_heading VARCHAR(255),
  curriculum_description TEXT,
  subjects_heading VARCHAR(255),
  achievements_heading VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic Levels
CREATE TABLE IF NOT EXISTS academic_levels (
  id SERIAL PRIMARY KEY,
  level_name VARCHAR(100) NOT NULL, -- Primary, Middle, Secondary
  class_range VARCHAR(100), -- "Nursery - Class 5"
  description TEXT,
  icon_name VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
  id SERIAL PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50),
  description TEXT,
  category VARCHAR(50), -- core, language, elective
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic Achievements
CREATE TABLE IF NOT EXISTS academic_achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year VARCHAR(10),
  icon_name VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 17. ADMISSIONS PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS admissions_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Admissions',
  hero_subtitle TEXT,
  process_heading VARCHAR(255),
  process_description TEXT,
  eligibility_heading VARCHAR(255),
  fee_structure_heading VARCHAR(255),
  fee_note TEXT,
  academic_year VARCHAR(20),
  contact_phone VARCHAR(50),
  admission_deadline VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Steps
CREATE TABLE IF NOT EXISTS admission_steps (
  id SERIAL PRIMARY KEY,
  step_number VARCHAR(10) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Eligibility Criteria
CREATE TABLE IF NOT EXISTS eligibility_criteria (
  id SERIAL PRIMARY KEY,
  criteria TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Required Documents
CREATE TABLE IF NOT EXISTS required_documents (
  id SERIAL PRIMARY KEY,
  document_name VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee Structure
CREATE TABLE IF NOT EXISTS fee_structure (
  id SERIAL PRIMARY KEY,
  class_name VARCHAR(100) NOT NULL,
  admission_fee VARCHAR(50),
  annual_fee VARCHAR(50),
  monthly_fee VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Applications
CREATE TABLE IF NOT EXISTS admission_applications (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  date_of_birth DATE,
  gender VARCHAR(20),
  applying_for_class VARCHAR(50),
  previous_school VARCHAR(255),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, approved, rejected
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 18. FACULTY PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS faculty_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Our Faculty',
  hero_subtitle TEXT,
  intro_heading VARCHAR(255),
  intro_description TEXT,
  support_staff_heading VARCHAR(255),
  support_staff_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty Members
CREATE TABLE IF NOT EXISTS faculty_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  qualification VARCHAR(255),
  subject VARCHAR(100),
  experience VARCHAR(50),
  department VARCHAR(100),
  photo_url TEXT,
  achievements TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support Staff
CREATE TABLE IF NOT EXISTS support_staff (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  staff_count VARCHAR(20),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 19. STUDENTS PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS students_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Students Corner',
  hero_subtitle TEXT,
  downloads_heading VARCHAR(255),
  downloads_description TEXT,
  elibrary_heading VARCHAR(255),
  elibrary_description TEXT,
  achievements_heading VARCHAR(255),
  achievements_description TEXT,
  alumni_heading VARCHAR(255),
  alumni_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Downloads
CREATE TABLE IF NOT EXISTS student_downloads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  file_url TEXT,
  file_size VARCHAR(50),
  icon_name VARCHAR(50) DEFAULT 'FileText',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- E-Library Resources
CREATE TABLE IF NOT EXISTS elibrary_resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  count VARCHAR(50),
  link_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Achievements
CREATE TABLE IF NOT EXISTS student_achievements (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  class_name VARCHAR(50),
  achievement TEXT,
  year VARCHAR(10),
  photo_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alumni Stats
CREATE TABLE IF NOT EXISTS alumni_stats (
  id SERIAL PRIMARY KEY,
  stat_value VARCHAR(50) NOT NULL,
  stat_label VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 20. ACTIVITIES PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS activities_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Co-curricular Activities',
  hero_subtitle TEXT,
  sports_heading VARCHAR(255),
  sports_description TEXT,
  arts_heading VARCHAR(255),
  arts_description TEXT,
  clubs_heading VARCHAR(255),
  clubs_description TEXT,
  events_heading VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sports Categories
CREATE TABLE IF NOT EXISTS sports_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sports List
CREATE TABLE IF NOT EXISTS sports_list (
  id SERIAL PRIMARY KEY,
  sport_name VARCHAR(100) NOT NULL,
  category_id INTEGER REFERENCES sports_categories(id),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Arts Categories
CREATE TABLE IF NOT EXISTS arts_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Arts List
CREATE TABLE IF NOT EXISTS arts_list (
  id SERIAL PRIMARY KEY,
  art_name VARCHAR(100) NOT NULL,
  category_id INTEGER REFERENCES arts_categories(id),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clubs
CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  members VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Annual Events
CREATE TABLE IF NOT EXISTS annual_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_month VARCHAR(20),
  description TEXT,
  highlight BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 21. CONTACT PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Contact Us',
  hero_subtitle TEXT,
  contact_info_heading VARCHAR(255),
  contact_info_description TEXT,
  form_heading VARCHAR(255),
  form_description TEXT,
  location_map_heading VARCHAR(255),
  map_description TEXT,
  map_embed_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Details
CREATE TABLE IF NOT EXISTS contact_details (
  id SERIAL PRIMARY KEY,
  detail_type VARCHAR(50) NOT NULL, -- address, phone, email, hours
  icon_name VARCHAR(50),
  heading VARCHAR(100),
  content TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 22. INFRASTRUCTURE PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS infrastructure_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) DEFAULT 'Infrastructure',
  hero_subtitle TEXT,
  overview_heading VARCHAR(255),
  overview_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  image_url TEXT,
  features TEXT[], -- Array of features
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default navbar info
INSERT INTO navbar_info (school_name, tagline, logo_text, phone, email, address_short) 
VALUES ('Hilltop Educational Institute', 'Empowering Minds, Building Futures', 'HEI', '+91 98765 43210', 'info@hilltop.edu', 'Darend, Ganderbal - 191201')
ON CONFLICT DO NOTHING;

-- Insert default menu items
INSERT INTO menu_items (label, href, display_order) VALUES
('Home', '/', 1),
('About', '/about', 2),
('Academics', '/academics', 3),
('Admissions', '/admissions', 4),
('Faculty', '/faculty', 5),
('Students', '/students', 6),
('Activities', '/activities', 7),
('Infrastructure', '/infrastructure', 8),
('Gallery', '/gallery', 9),
('Contact', '/contact', 10)
ON CONFLICT DO NOTHING;

-- Insert default footer info
INSERT INTO footer_info (school_name, tagline, address, phone, email)
VALUES ('Hilltop Educational Institute', 'Empowering Minds, Building Futures - Providing quality education since 1995.', 'Darend, Ganderbal, Jammu & Kashmir - 191201', '+91 98765 43210', 'info@hilltop.edu')
ON CONFLICT DO NOTHING;

-- Insert section content defaults
INSERT INTO section_content (section_name, heading, description, badge_text) VALUES
('highlights', 'Why Choose Hilltop?', 'We provide a nurturing environment that fosters academic excellence', 'Our Strengths'),
('programs', 'Our Programs & Facilities', 'Comprehensive education programs designed to nurture every aspect of student development', 'Academic Excellence'),
('testimonials', 'What Our Community Says', 'Hear from parents, students, and alumni about their experience', 'Trusted by Families'),
('gallery_preview', 'Glimpse of Campus Life', 'Explore our vibrant campus, modern facilities, and memorable events', 'Photo Gallery')
ON CONFLICT (section_name) DO NOTHING;

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (Optional but Recommended)
-- =====================================================

-- For public read access (anonymous users can read)
-- ALTER TABLE navbar_info ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read" ON navbar_info FOR SELECT USING (true);

-- Add similar policies to all tables as needed

COMMIT;
