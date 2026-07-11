import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { PRODUCTS } from '../data/products';
import type { Thumbnail } from '../types';

// Per-product thumbnail data (mock; in production this would come from API)
const PRODUCT_THUMBNAILS: Record<number, Thumbnail[]> = {
  1: [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMEfR0lpC85l91mJXwDmnq9sjpAbEpCDFsv2ZtOJ2ucJeNh9oJbzdR1bYyHL18D35IrUGQT8jhr1NGvHaakIvVswsFtW5WJY31XE69g8qX519URpmK3dGx60qcDZwnhnD2iE8fsxL5kg61WGEDDvOSRI1Nd6K-RRwACMGuuwYrLgNzYjUTieYx6qbG0zL0DdzNFXJxeSmf3bf0WNpCpNnYJs_TrYrclSr6V5AONCSFl3m-uEhTWf-s',
      alt: 'Kopi Arabika Gayo - Tampak Utama',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArWEJsp-jXG4aqaqELy9Rogb1HDjqBu8KK8xqWVbLnmlkxH0Cvmfi0YZhcmFUCnmzI_gKXYgnlOW0Pat3KKrQc1esxO-ebVToVQSpioF-2VvB3ShwDjF3WfMF98z8aBpyh3IaTheigZhLIQ9OqLGRVkVtz_70l7Zf-sl8LU7DBZAzSgFDTv30BnVBCndq1fx4iuAGNkTAYE1fRhR5xWK3DM0H69wqs8Yy5LwasIV4nHwvvUAhZZxmJ',
      alt: 'Kopi Arabika Gayo - Kemasan',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkhWErgBZ7XwffeL6hv9VSyR3cGCqL7fQsRrMZ-LuFlEEA7YJgNOGw-AlgU6os8xjCjndw4X8MyjQFZN9_wEWVGYp0a4rpQxJ5Gjl0Ew3fmJIhY_8xdlcrU6I95SSxMqSojeDcXE0OZZ1l0NzE9-w8HJStihuRhbux3voUIZ1Xa18EgTMapXARiffMA-O-XQmd-3A8hVcoGyykmdKf81JfZBVhLJN8EWZjiW3tjq9autsQTVGGDYlv',
      alt: 'Kopi Arabika Gayo - Proses',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW5dx1f7aB3HTmi9R19yZgY5tvCNmwjwjDXB8f3kr11UmBmsr7aeVNpg2W0kH_7gNnm9nPzMHB4uecVBM8zcJb7l77iW-SMLRtWaVrZ29EHFFsKlkMPWnTbgp0nM0nPK3nhI4aNbLPFQ-2ZT2NQ0wU6JPrZVNItdChYQJq94cW4xRBKPPna8KA6zgE3xMHnGZQRF1OUsmHlpl7SOAPn1uW-S0zy91CCWYeBx7U5gT-90c6J6HhgIEI',
      alt: 'Kopi Arabika Gayo - Video',
      isVideo: true,
    },
  ],
};

// Fallback: build 4 thumbnails from product image for products without specific data
function getThumbsForProduct(id: number, imageUrl: string): Thumbnail[] {
  if (PRODUCT_THUMBNAILS[id]) return PRODUCT_THUMBNAILS[id];
  return [
    { src: imageUrl, alt: 'Gambar produk 1' },
    { src: imageUrl, alt: 'Gambar produk 2' },
    { src: imageUrl, alt: 'Gambar produk 3' },
    { src: imageUrl, alt: 'Video produk', isVideo: true },
  ];
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface-variant font-body-md text-body-md">
        <div className="text-center">
          <p className="text-xl mb-4">Produk tidak ditemukan.</p>
          <button
            onClick={() => navigate('/')}
            className="text-primary underline font-label-md text-label-md"
          >
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  const thumbnails = getThumbsForProduct(product.id, product.imageUrl);
  const activeThumb = thumbnails[activeIndex];
  const waLink = `https://wa.me/${product.phone}?text=Halo,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`;

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Header — Back Nav */}
      <header className="bg-surface shadow-sm sticky top-0 z-50 w-full px-mobile-margin md:px-desktop-margin py-md flex items-center justify-between transition-all duration-300">
        <button
          id="btn-back"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors group"
          aria-label="Kembali ke katalog"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="font-label-md text-label-md">Kembali ke Katalog</span>
        </button>
        <div className="font-headline-md text-headline-md font-bold text-primary">
          Lapak Kliwonan
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-mobile-margin md:px-desktop-margin py-xl md:py-xxl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-xl">
          {/* ── Left: Media Gallery ── */}
          <div className="md:col-span-7 flex flex-col gap-sm relative">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-level-2 bg-surface-container aspect-square md:aspect-[4/3] relative group">
              {activeThumb.isVideo ? (
                <>
                  <img
                    src={activeThumb.src}
                    alt={activeThumb.alt}
                    className="w-full h-full object-cover blur-[2px] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}
                    >
                      play_circle
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src={activeThumb.src}
                  alt={activeThumb.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Pagination Pill */}
              <div className="absolute top-md right-md bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-level-1 font-label-sm text-label-sm text-on-surface">
                {activeIndex + 1}/{thumbnails.length}
              </div>
            </div>

            {/* Thumbnail Swiper */}
            <div className="flex gap-sm overflow-x-auto pb-2 snap-x scrollbar-hide">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  id={`thumb-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 snap-start cursor-pointer relative transition-opacity ${
                    idx === activeIndex
                      ? 'border-2 border-primary shadow-sm opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Lihat gambar ${idx + 1}`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className={`w-full h-full object-cover ${thumb.isVideo ? 'blur-[2px]' : ''}`}
                  />
                  {thumb.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-black/20">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}
                      >
                        play_circle
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info & CTA ── */}
          <div className="md:col-span-5 flex flex-col gap-lg sticky top-32 self-start pt-md md:pt-0">
            {/* Headers */}
            <div className="flex flex-col gap-sm">
              {/* Category Badge */}
              <div className="inline-flex w-max items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm shadow-level-1">
                {product.category}
              </div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                {product.name}
              </h1>
              <div className="font-headline-md text-headline-md text-primary">
                {product.price}{' '}
                <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                  / paket
                </span>
              </div>
            </div>

            <hr className="border-outline-variant/30" />

            {/* Description */}
            <div className="flex flex-col gap-xs">
              <h3 className="font-label-md text-label-md text-on-surface">Deskripsi Produk</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Origin Info */}
            <div className="bg-surface-container-low p-md rounded-xl flex items-start gap-md shadow-level-1">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface">Asal Produk</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Kelompok Tani Makmur Jaya, Desa Kliwonan, Jawa Tengah.
                </p>
              </div>
            </div>

            {/* Primary CTA — Desktop */}
            <div className="mt-auto pt-lg hidden md:block">
              <a
                id="btn-whatsapp-desktop"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-md px-lg rounded-2xl flex items-center justify-center gap-2 transition-all shadow-level-2 hover:shadow-level-3 active:scale-[0.98]"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat
                </span>
                <span className="font-label-md text-label-md">Pesan via WhatsApp</span>
              </a>
              <p className="text-center mt-2 font-label-sm text-label-sm text-on-surface-variant">
                Respon cepat selama jam kerja (08:00 – 17:00)
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="simple" />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant p-md z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <a
          id="btn-whatsapp-mobile"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-level-2"
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="font-label-md text-label-md">Pesan via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
