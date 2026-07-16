import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
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
              Tentang Lapak Kliwonan
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Menghubungkan Anda langsung dengan hasil bumi terbaik dan produk UMKM unggulan dari Desa Kliwonan.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-xxl px-container-margin max-w-4xl mx-auto">
          <div className="space-y-xl">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Cerita Kami</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Desa Kliwonan dianugerahi tanah yang subur dan masyarakat yang gemar berinovasi. Selama bertahun-tahun, petani dan pelaku UMKM kami telah menghasilkan produk berkualitas tinggi, mulai dari biji kopi pilihan, sayuran organik, hingga olahan makanan ringan tradisional.
                <br /><br />
                Lapak Kliwonan lahir dari inisiatif mahasiswa KKN PPM UGM Swakarsa Banyuurip 2026. Berawal dari sebuah gagasan sederhana: bagaimana kami bisa membawa kebaikan alam Desa Kliwonan langsung ke tangan Anda, tanpa perantara yang panjang? Melalui platform ini, program KKN kami mewujudkan gagasan tersebut dengan menciptakan jembatan digital yang memberdayakan komunitas lokal.
              </p>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Visi & Misi</h2>
              <ul className="list-disc list-inside font-body-md text-body-md text-on-surface-variant space-y-2">
                <li><strong className="text-on-background">Mensejahterakan Petani:</strong> Memastikan petani mendapatkan harga yang adil untuk kerja keras mereka.</li>
                <li><strong className="text-on-background">Kualitas Terjamin:</strong> Menyediakan produk segar dan berkualitas tinggi langsung dari sumbernya.</li>
                <li><strong className="text-on-background">Mendukung UMKM:</strong> Menjadi wadah promosi dan penjualan bagi produk-produk olahan rumahan di Desa Kliwonan.</li>
                <li><strong className="text-on-background">Keberlanjutan Lingkungan:</strong> Mendorong praktik pertanian organik dan ramah lingkungan.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Dampak Sosial</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Setiap transaksi yang Anda lakukan di Lapak Kliwonan berdampak langsung pada perekonomian desa. Anda tidak hanya berbelanja, tetapi juga ikut berkontribusi dalam memajukan kesejahteraan keluarga petani, memberikan akses pendidikan yang lebih baik bagi anak-anak mereka, dan melestarikan budaya agraris lokal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
