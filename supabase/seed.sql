-- ================================================
-- SEED DATA — Données de test pour le développement
-- ================================================
-- À exécuter dans Supabase SQL Editor APRÈS les migrations

-- Listing fictif 1
INSERT INTO public.listings (
  id, host_id, title, slug, description, property_type, status,
  location, city, country, price_per_night, cleaning_fee,
  max_guests, bedrooms, bathrooms, amenities, is_featured,
  cover_image, images, rating_average, rating_count
) VALUES (
  uuid_generate_v4(),
  -- REMPLACE PAR L'ID D'UN VRAI UTILISATEUR APRÈS INSCRIPTION
  '00000000-0000-0000-0000-000000000000',
  'Appartement Vue Lagune - Plateau',
  'appartement-vue-lagune-plateau',
  'Magnifique appartement moderne avec vue imprenable sur la lagune Ébrié. Situé au cœur du Plateau, à deux pas des ambassades et des grandes entreprises. Idéal pour expatriés et voyageurs d''affaires.',
  'apartment',
  'published',
  'Boulevard de la République, Plateau',
  'Abidjan',
  'CI',
  85000,
  15000,
  4, 2, 2,
  ARRAY['wifi', 'ac', 'parking', 'security', 'generator', 'water_tank'],
  true,
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  ARRAY[
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
  ],
  4.8, 24
);
