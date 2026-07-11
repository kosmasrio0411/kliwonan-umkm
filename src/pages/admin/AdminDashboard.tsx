import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 md:px-[80px] max-w-7xl mx-auto w-full flex-1 flex flex-col gap-xxl mt-lg">
      {/* Page Header */}
      <section>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-2">
          Dashboard Overview
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Ringkasan performa katalog dan aktivitas harian Anda.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        {/* Total Produk */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-[32px]">inventory_2</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
              +12% Bulan ini
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Total Produk</p>
          <p className="font-display-lg text-display-lg text-on-surface">24</p>
        </div>

        {/* Kategori Aktif */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container/20 rounded-lg text-secondary">
              <span className="material-symbols-outlined text-[32px]">category</span>
            </div>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Kategori Aktif</p>
          <p className="font-display-lg text-display-lg text-on-surface">3</p>
        </div>

        {/* Media Terunggah */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-container/20 rounded-lg text-tertiary">
              <span className="material-symbols-outlined text-[32px]">perm_media</span>
            </div>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Media Terunggah</p>
          <p className="font-display-lg text-display-lg text-on-surface">86</p>
        </div>

        {/* WhatsApp Clicks */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#25D366]/10 rounded-lg text-[#25D366]">
              {/* WhatsApp SVG extracted from product-catalog.html */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
              +5% Hari ini
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Klik WhatsApp</p>
          <p className="font-display-lg text-display-lg text-on-surface">142</p>
        </div>
      </section>

      {/* Visual Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-md md:gap-lg">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20 lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Distribusi Produk</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="h-64 flex flex-col justify-center gap-6">
            {/* Custom bar chart simulation */}
            <div className="w-full">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-2">
                <span>Hasil Pertanian (45%)</span>
                <span>11 Produk</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-2">
                <span>Makanan Ringan (35%)</span>
                <span>8 Produk</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-2">
                <span>Rempah &amp; Herbal (20%)</span>
                <span>5 Produk</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions / Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-md md:gap-lg mb-xxl">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg shadow-level-2 border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Aktivitas Terbaru</h3>
            <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">
              Lihat Semua
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {/* Activity 1 */}
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/20">
              <img
                className="w-12 h-12 rounded-md object-cover shadow-level-1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6L5mQ-hiu8-yG4r7au4Wx-VCVKUsxI-z31sNTcjRlkVVuK5qkenzZbM8JH1YgBlW6Mf_BxNr06NjeOuBIvuBNF5dW1TF07nC8H4L0qkV4JG1NDA-3pgAHN4meGmHklgmkPMpc1X7rLJjcJnQdo0lO-xRzrU3bno6qG4JhQfkS8ITWtZ0efSDx8xcWF0bGu9-kpoeXLyEI41oIQ4NpY3UsO_AZwsjUTWlRI56d3kO1rISM2jIDtzbG"
                alt="Activity Thumbnail"
              />
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
                  Bayam Organik Segar
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Ditambahkan ke Hasil Pertanian
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-outline">2 jam yang lalu</span>
            </div>
            <hr className="border-outline-variant/20" />
            {/* Activity 2 */}
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/20">
              <div className="w-12 h-12 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant shadow-level-1">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
                  Keripik Singkong Balado
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Harga dan stok diperbarui
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Kemarin, 14:30</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-md">
          <button
            onClick={() => navigate('/admin/products?action=add')}
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-on-primary rounded-xl shadow-level-2 hover:shadow-level-3 hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:scale-110">
              add_circle
            </span>
            <span className="font-label-md text-label-md">Tambah Produk Baru</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-4 bg-surface-container-highest text-on-surface rounded-xl shadow-level-1 hover:shadow-level-2 hover:bg-surface-dim transition-all duration-300 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:scale-110">
              visibility
            </span>
            <span className="font-label-md text-label-md">Lihat Katalog Publik</span>
          </button>
        </div>
      </section>
    </div>
  );
}
