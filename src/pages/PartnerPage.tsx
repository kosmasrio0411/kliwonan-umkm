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
            <span className="material-symbols-outlined text-primary" data-fill="1" style={{ fontSize: '32px' }}>spa</span>
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
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-xl py-3 rounded-full font-label-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">chat</span>
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
