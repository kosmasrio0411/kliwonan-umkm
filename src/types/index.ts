// ─── Product Media ──────────────────────────────────────────────────────────────
export interface ProductMedia {
  id: string; // Using string id (UUID) for mock db operations
  product_id: number;
  media_url: string;
  media_type: 'image' | 'video';
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string; // keeping for backward compatibility, mapped to short_description
  short_description?: string; // New field from admin requirements
  long_description?: string; // New field from admin requirements
  price: string;
  priceNum: number; // numeric price for sorting
  imageUrl: string;
  thumbnail_url?: string; // New field
  whatsapp_number?: string; // New field
  phone: string; // backward compat
  user_id?: string; // product owner ID
  
  // Relations
  media?: ProductMedia[];
}

// ─── Category ─────────────────────────────────────────────────────────────────
export type Category = 'Semua' | 'UMKM' | 'Hasil Pertanian';

// ─── Sort Order ───────────────────────────────────────────────────────────────
export type SortOrder = 'newest' | 'price-low' | 'price-high';

// ─── Footer Variant ───────────────────────────────────────────────────────────
export type FooterVariant = 'full' | 'simple';

// ─── Thumbnail (for Product Detail gallery) ───────────────────────────────────
export interface Thumbnail {
  src: string;
  alt: string;
  isVideo?: boolean;
}
