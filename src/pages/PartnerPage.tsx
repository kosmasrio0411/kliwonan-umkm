import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function PartnerPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      <header className="bg-surface shadow-sm sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center w-full px-container-margin py-md max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors group"
            aria-label="Kembali ke Beranda"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label-md text-label-md">Kembali ke Beranda</span>
          </button>
          <div className="font-headline-lg text-headline-lg font-bold text-primary flex items-center gap-2 min-h-[40px]">
            <img src="/logo_kliwonan.png" alt="Logo Kliwonan" className="h-8 md:h-10 w-auto" />
            <span className="hidden sm:inline">Lapak Kliwonan</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-surface-container-low py-xxl px-container-margin">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display-lg md:text-display-lg text-[32px] text-primary mb-md">
              Bergabung Menjadi Mitra UMKM
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Tingkatkan jangkauan pasar dan kembangkan bisnis Anda bersama Lapak Kliwonan.
            </p>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-xxl px-container-margin max-w-4xl mx-auto">
          <div className="space-y-xl">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Mengapa Bergabung dengan Kami?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-md">
                <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '32px' }}>trending_up</span>
                  <h3 className="font-title-lg text-title-lg mb-2">Jangkauan Lebih Luas</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Produk Anda tidak hanya dikenal di desa, tapi juga bisa diakses oleh pembeli dari berbagai daerah melalui platform kami.</p>
                </div>
                <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '32px' }}>support_agent</span>
                  <h3 className="font-title-lg text-title-lg mb-2">Dukungan Penuh</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Kami membantu dalam proses digitalisasi, mulai dari foto produk yang menarik hingga penulisan deskripsi yang memikat pembeli.</p>
                </div>
                <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '32px' }}>payments</span>
                  <h3 className="font-title-lg text-title-lg mb-2">Tanpa Potongan Penjualan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Keuntungan dari penjualan 100% masuk ke kantong Anda. Transaksi dilakukan secara langsung antara Anda dan pembeli.</p>
                </div>
                <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '32px' }}>diversity_3</span>
                  <h3 className="font-title-lg text-title-lg mb-2">Komunitas Lokal</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Menjadi bagian dari jaringan petani dan pengusaha lokal yang saling mendukung satu sama lain.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Langkah Pendaftaran</h2>
              <ol className="list-decimal list-inside font-body-md text-body-md text-on-surface-variant space-y-4">
                <li><strong className="text-on-background">Siapkan Data:</strong> Siapkan foto produk unggulan, dan detail informasi produk (harga, deskripsi, komposisi).</li>
                <li><strong className="text-on-background">Hubungi Admin:</strong> Hubungi tim Lapak Kliwonan melalui WhatsApp resmi kami di <a href="https://wa.me/6289658077981" className="text-primary hover:underline">0896-5807-7981</a>.</li>
                <li><strong className="text-on-background">Kurasi & Verifikasi:</strong> Tim kami akan meninjau produk Anda untuk memastikan standar kualitas.</li>
                <li><strong className="text-on-background">Mulai Berjualan:</strong> Setelah disetujui, produk Anda akan langsung tampil di etalase website Lapak Kliwonan!</li>
              </ol>
            </div>
            
            <div className="text-center pt-lg">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Lapak%20Kliwonan,%20saya%20ingin%20mendaftar%20sebagai%20mitra%20UMKM." 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-xl py-3 rounded-full font-label-lg hover:bg-[#20bd5a] transition-colors shadow-level-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Daftar Sekarang via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
