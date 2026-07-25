import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { PRODUCTS } from '../data/products';
import type { Thumbnail } from '../types';


export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        if (response.ok && data.data) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface-variant font-body-md text-body-md">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-[48px] text-primary">progress_activity</span>
          <p className="mt-4">Memuat produk...</p>
        </div>
      </div>
    );
  }

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

  let thumbnails: Thumbnail[] = [];
  if (product.media && product.media.length > 0) {
    thumbnails = product.media.map((m: any, idx: number) => ({
      src: m.media_url,
      alt: `Media ${idx + 1}`,
      isVideo: m.media_type === 'video'
    }));
  } else {
    thumbnails = [{ src: product.thumbnail_url || product.imageUrl || 'https://via.placeholder.com/600', alt: product.name }];
  }
  
  const currentThumbIndex = activeIndex < thumbnails.length ? activeIndex : 0;
  const activeThumb = thumbnails[currentThumbIndex];
  const waLink = `https://wa.me/${product.whatsapp_number || product.phone}?text=Halo,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`;

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Header — Back Nav */}
      <header className="bg-surface shadow-sm sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center w-full px-container-margin py-md max-w-7xl mx-auto transition-all duration-300">
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
          <div className="font-headline-lg text-headline-lg font-bold text-primary flex items-center gap-2 min-h-[40px]">
            <img src="/logo_kliwonan.png" alt="Logo Kliwonan" className="h-8 md:h-10 w-auto" />
            <span className="hidden sm:inline">Lapak Kliwonan</span>
          </div>
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
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                {product.long_description}
              </p>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="font-label-md text-label-md">Pesan via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
