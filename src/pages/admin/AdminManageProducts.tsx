import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Product, ProductMedia } from '../../types';
import { PRODUCTS as initialProducts } from '../../data/products';
import ProductFormModal from '../../components/admin/ProductFormModal';

export default function AdminManageProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>((location.state as any)?.successMessage || null);
  
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<{id: string, username: string}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products/manage', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setProductsList(data.data);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (userRole === 'admin' || userRole === 'admin_desa') {
      fetchOwners();
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchOwners = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/owners', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setOwners(data.data);
      }
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsModalOpen(true);
      setEditingProduct(null);
    }
  }, [searchParams]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
    setSearchParams({ action: 'add' });
  };

  const handleOpenEditPage = (product: Product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    searchParams.delete('action');
    setSearchParams(searchParams);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchProducts();
        } else {
          const data = await response.json();
          alert(`Gagal menghapus: ${data.message}`);
        }
      } catch (error) {
        alert('Terjadi kesalahan saat menghapus.');
      }
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>, mediaRows: Array<{ media_url: string; media_type: 'image' | 'video'; file?: File | null }>, thumbnailFile: File | null) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}` 
        : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }
      
      const existingMedia: any[] = [];
      mediaRows.forEach((media) => {
        if (media.file) {
          formData.append('gallery', media.file);
          // Backend needs to know type (since file input doesn't distinguish between image/video for type field)
          formData.append('galleryTypes', media.media_type);
        } else if (media.media_url) {
          existingMedia.push({ media_url: media.media_url, media_type: media.media_type });
        }
      });
      
      if (existingMedia.length > 0) {
        formData.append('existingMedia', JSON.stringify(existingMedia));
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        fetchProducts();
        handleCloseModal();
        setSuccessMessage(editingProduct ? 'Produk berhasil diperbarui!' : 'Produk baru berhasil ditambahkan!');
      } else {
        const data = await response.json();
        alert(`Gagal menyimpan: ${data.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan produk.');
    }
  };

  // Filter products based on search query and category
  let filteredProducts = productsList.filter(product => {
    const searchTarget = `${product.name || ''} ${product.short_description || product.description || ''} ${product.long_description || ''}`;
    const matchesSearch = searchTarget.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortOrder === 'price-low') {
    filteredProducts.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  } else if (sortOrder === 'price-high') {
    filteredProducts.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  } else {
    // Default newest (assuming higher id means newer)
    filteredProducts.sort((a, b) => {
      const idA = typeof a.id === 'string' ? a.id : String(a.id);
      const idB = typeof b.id === 'string' ? b.id : String(b.id);
      return idB.localeCompare(idA);
    });
  }

  return (
    <div className="p-4 md:p-8 md:px-[80px] max-w-7xl mx-auto w-full flex-1 flex flex-col gap-lg mt-lg">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container px-6 py-3 rounded-full shadow-level-2 border border-primary/20 flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-label-md font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-background">Manajemen Produk</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Kelola inventaris hasil tani dan produk lokal Anda.
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg flex items-center gap-sm hover:opacity-90 transition-opacity shadow-level-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tambah Produk Baru
        </button>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-surface p-md rounded-xl shadow-level-1 flex flex-col sm:flex-row gap-md border border-surface-container-high">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary transition-shadow outline-none" 
            placeholder="Cari produk..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-surface-container-low text-on-surface border border-outline-variant font-label-md text-label-md px-md pr-xl py-sm rounded-lg flex items-center gap-sm hover:bg-surface-container transition-colors cursor-pointer"
          >
            <option value="Semua">Kategori: Semua</option>
            <option value="UMKM">UMKM</option>
            <option value="Hasil Pertanian">Hasil Pertanian</option>
          </select>
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
            expand_more
          </span>
        </div>
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-surface-container-low text-on-surface border border-outline-variant font-label-md text-label-md px-md pr-xl py-sm rounded-lg flex items-center gap-sm hover:bg-surface-container transition-colors cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
          </select>
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface rounded-xl shadow-level-2 border border-surface-container-high overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-surface-container-low border-b border-surface-container-high">
              <tr>
                <th className="p-md font-label-md text-label-md text-on-surface-variant w-24">Foto</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant">Produk</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Kategori</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant">Harga</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high font-body-md text-body-md text-on-surface">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-bright transition-colors group">
                  <td className="p-md">
                    <img 
                      className="w-16 h-16 rounded-lg object-cover border border-surface-container" 
                      src={product.thumbnail_url || product.imageUrl || 'https://via.placeholder.com/150'} 
                      alt={product.name} 
                    />
                  </td>
                  <td className="p-md font-medium text-on-surface">{product.name}</td>
                  <td className="p-md hidden sm:table-cell text-on-surface-variant">
                    <span className={`px-sm py-xs rounded-full font-label-sm text-label-sm ${
                      product.category === 'UMKM' 
                        ? 'bg-secondary-container/20 text-secondary'
                        : 'bg-primary-container/20 text-primary'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="p-md">{product.price}</td>
                  <td className="p-md text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-sm transition-opacity">
                      <button 
                        onClick={() => handleOpenEditPage(product)}
                        className="p-sm text-outline border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors" 
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-sm text-error bg-error-container/50 border border-error/20 rounded-md hover:bg-error-container transition-colors" 
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-xl text-center text-on-surface-variant">
                    {productsList.length === 0 ? 'Belum ada produk yang ditambahkan.' : 'Tidak ada produk yang cocok dengan pencarian Anda.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {filteredProducts.length > 0 && (
          <div className="p-md border-t border-surface-container-high bg-surface-container-lowest flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
            <span>Menampilkan 1-{filteredProducts.length} dari {filteredProducts.length} produk</span>
            <div className="flex gap-xs">
              <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-surface-container disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold">1</button>
              <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-surface-container disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
        userRole={userRole}
        owners={owners}
      />
    </div>
  );
}
