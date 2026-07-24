import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, ProductMedia } from '../../types';

export default function AdminEditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role;
  const [owners, setOwners] = useState<{id: string, username: string}[]>([]);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('UMKM');
  const [price, setPrice] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('628');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [mediaRows, setMediaRows] = useState<Array<{ media_url: string; media_type: 'image' | 'video'; file?: File | null }>>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProductDetails();
    if (userRole === 'admin' || userRole === 'admin_desa') {
      fetchOwners();
    }
  }, [id]);

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

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        const productToEdit = data.data;
        setName(productToEdit.name);
        setCategory(productToEdit.category);
        setPrice(productToEdit.priceNum?.toString() || String(productToEdit.price || '').replace(/\D/g, ''));
        setWhatsappNumber(productToEdit.whatsapp_number || productToEdit.phone || '628');
        setShortDescription(productToEdit.short_description || productToEdit.description || '');
        setLongDescription(productToEdit.long_description || '');
        setThumbnailUrl(productToEdit.thumbnail_url || productToEdit.imageUrl || '');
        setUserId(productToEdit.user_id || '');
        
        if (productToEdit.media && productToEdit.media.length > 0) {
          setMediaRows(productToEdit.media.map((m: any) => ({ media_url: m.media_url, media_type: m.media_type })));
        }
      } else {
        setError(data.message || 'Gagal memuat produk');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat memuat data produk.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMediaRow = () => {
    setMediaRows([...mediaRows, { media_url: '', media_type: 'image', file: null }]);
  };

  const handleRemoveMediaRow = (index: number) => {
    setMediaRows(mediaRows.filter((_, i) => i !== index));
  };

  const handleMediaChange = (index: number, field: 'media_url' | 'media_type' | 'file', value: any) => {
    const newMediaRows = [...mediaRows];
    newMediaRows[index] = { ...newMediaRows[index], [field]: value };
    setMediaRows(newMediaRows);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const priceNum = parseInt(String(price).replace(/\D/g, ''), 10) || 0;
    const formattedPrice = `Rp ${priceNum.toLocaleString('id-ID')}`;
    
    const productData = {
      name,
      category,
      price: formattedPrice,
      priceNum,
      phone: whatsappNumber,
      whatsapp_number: whatsappNumber,
      description: shortDescription,
      short_description: shortDescription,
      long_description: longDescription,
      imageUrl: thumbnailUrl,
      thumbnail_url: thumbnailUrl,
      ...((userRole === 'admin' || userRole === 'admin_desa') && { user_id: userId || null })
    };

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
        formData.append('galleryTypes', media.media_type);
      } else if (media.media_url) {
        existingMedia.push({ media_url: media.media_url, media_type: media.media_type });
      }
    });
    
    if (existingMedia.length > 0) {
      formData.append('existingMedia', JSON.stringify(existingMedia));
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        navigate('/admin/products', { state: { successMessage: 'Produk berhasil diperbarui!' } });
      } else {
        const data = await response.json();
        alert(`Gagal menyimpan: ${data.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan produk.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Memuat data produk...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-error">
        <p>{error}</p>
        <button onClick={() => navigate('/admin/products')} className="mt-4 text-primary underline">Kembali</button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 md:px-[80px] max-w-4xl mx-auto w-full flex-1 flex flex-col gap-lg mt-lg animate-fade-in">
      <header className="flex flex-col gap-xs mb-4">
        <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors self-start mb-2">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali
        </button>
        <h1 className="font-headline-lg text-headline-lg text-on-background">Edit Produk</h1>
        <p className="font-body-md text-on-surface-variant">Ubah informasi detail untuk produk ini.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-surface border border-outline-variant/30 rounded-2xl shadow-level-1 p-6 md:p-8 flex flex-col gap-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Nama Produk */}
          <div className="flex flex-col gap-sm md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface">Nama Produk</label>
            <input 
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
          </div>

          {/* Kategori */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface">Kategori</label>
            <div className="relative">
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-lg pl-md pr-xl py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow cursor-pointer"
              >
                <option value="UMKM">UMKM</option>
                <option value="Hasil Pertanian">Hasil Pertanian</option>
              </select>
              <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
            </div>
          </div>

          {/* Owner Selection (Admin only) */}
          {(userRole === 'admin' || userRole === 'admin_desa') && (
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface">Pemilik Produk</label>
              <div className="relative">
                <select 
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-lg pl-md pr-xl py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow cursor-pointer"
                >
                  <option value="">Pilih Pemilik (Opsional / Sendiri)</option>
                  {owners?.map(owner => (
                    <option key={owner.id} value={owner.id}>{owner.username}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
            </div>
          )}

          {/* Harga */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface">Harga (Rp)</label>
            <input 
              required
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-sm md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface">Nomor WhatsApp (dengan kode negara, misal 628...)</label>
            <input 
              required
              type="text"
              value={whatsappNumber}
              onChange={e => setWhatsappNumber(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
          </div>

          {/* Thumbnail URL/File */}
          <div className="flex flex-col gap-sm md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface">Upload Thumbnail Utama</label>
            {thumbnailUrl && !thumbnailFile && (
              <div className="mb-2">
                <img src={thumbnailUrl} alt="Current Thumbnail" className="h-24 w-24 object-cover rounded-lg border border-outline-variant" />
              </div>
            )}
            <input 
              type="file"
              accept="image/*"
              required={!thumbnailUrl}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setThumbnailFile(e.target.files[0]);
                }
              }}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary/20"
            />
          </div>

          {/* Deskripsi Singkat */}
          <div className="flex flex-col gap-sm md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface">Deskripsi Singkat</label>
            <textarea 
              required
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              rows={2}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-y"
            ></textarea>
          </div>

          {/* Deskripsi Lengkap */}
          <div className="flex flex-col gap-sm md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface">Deskripsi Lengkap</label>
            <textarea 
              value={longDescription}
              onChange={e => setLongDescription(e.target.value)}
              rows={4}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-y"
            ></textarea>
          </div>
        </div>

        <hr className="border-outline-variant/30" />

        {/* Advanced Media Section */}
        <div className="flex flex-col gap-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-headline-md text-[18px] text-on-surface">Galeri Media Detail</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Tambahkan foto/video tambahan untuk halaman detail.</p>
            </div>
            <button 
              type="button"
              onClick={handleAddMediaRow}
              className="text-primary font-label-md text-label-md hover:bg-primary-container/20 px-sm py-xs rounded-md transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Media
            </button>
          </div>

          <div className="flex flex-col gap-sm">
            {mediaRows.map((media, index) => (
              <div key={index} className="flex gap-sm items-start bg-surface-container-low p-sm rounded-lg border border-outline-variant/50">
                <div className="flex-1 flex flex-col sm:flex-row gap-sm items-center">
                  {media.media_url && !media.file ? (
                    <div className="flex-1 bg-surface-container-highest border border-outline-variant/50 rounded-md px-2 py-1 flex items-center justify-between">
                      <a href={media.media_url} target="_blank" rel="noopener noreferrer" className="text-sm font-body-md text-primary truncate max-w-[200px] inline-block">
                        {media.media_url}
                      </a>
                      <span className="text-xs text-on-surface-variant font-label-sm">(Media Tersimpan)</span>
                    </div>
                  ) : (
                    <input 
                      type="file"
                      accept="image/*,video/*"
                      required={!media.media_url && !media.file}
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          handleMediaChange(index, 'file', e.target.files[0]);
                        }
                      }}
                      className="flex-1 bg-surface-container-highest border border-outline-variant/50 rounded-md px-2 py-1 font-body-md text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary-container file:text-on-primary-container"
                    />
                  )}
                  
                  <select
                    value={media.media_type}
                    onChange={e => handleMediaChange(index, 'media_type', e.target.value as 'image' | 'video')}
                    className="bg-surface-container-highest border border-outline-variant/50 rounded-md px-2 py-1.5 font-body-md text-sm cursor-pointer"
                  >
                    <option value="image">Gambar</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <button 
                  type="button"
                  onClick={() => handleRemoveMediaRow(index)}
                  className="p-1.5 text-error hover:bg-error-container rounded-md transition-colors mt-0.5"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
            {mediaRows.length === 0 && (
              <div className="text-center py-4 bg-surface-container-lowest border border-dashed border-outline-variant rounded-lg">
                <span className="font-label-sm text-on-surface-variant">Belum ada media tambahan.</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-md pt-md border-t border-surface-container-high mt-4">
          <button 
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-lg py-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors border border-outline-variant"
          >
            Batal
          </button>
          <button 
            type="submit"
            disabled={saving}
            className="px-lg py-sm font-label-md text-label-md text-on-primary bg-primary hover:opacity-90 rounded-lg transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </div>
  );
}
