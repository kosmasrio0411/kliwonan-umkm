import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/products';
import type { Category, SortOrder, Product } from '../types';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeCategory = (searchParams.get('category') || 'Semua') as Category;
  const sortOrder = (searchParams.get('sort') || 'newest') as SortOrder;
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (searchQuery) query.append('search', searchQuery);
        if (activeCategory !== 'Semua') query.append('category', activeCategory);
        if (sortOrder !== 'newest') query.append('sort', sortOrder);
        
        const response = await fetch(`http://localhost:8080/api/products?${query.toString()}`);
        const data = await response.json();
        if (data.status === 'success') {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, activeCategory, sortOrder]);

  const handleCategoryChange = (cat: Category) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'Semua') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort === 'newest') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', sort);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-grow">
        {/* Hero / Intro Section */}
        <section className="bg-surface-container-low py-xxl px-container-margin">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-display-lg md:text-display-lg text-[32px] text-primary mb-md">
              Dukung Petani &amp; UMKM Lokal
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Lapak Kliwonan adalah platform yang menghubungkan langsung hasil panen terbaik
              dan produk olahan berkualitas dari Desa Kliwonan.
            </p>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-xxl px-container-margin max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-lg">
            <h2 className="font-headline-md text-headline-md text-on-background">
              Katalog Produk
            </h2>
            {/* Sort Select */}
            <div className="relative">
              <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-transparent border-none font-label-md text-label-md text-on-surface-variant cursor-pointer focus:ring-0 pr-8"
              >
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
              </select>
              <span
                className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ fontSize: '20px' }}
              >
                filter_list
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <div
            id="product-grid"
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              !loading && (
                <div className="col-span-full text-center py-xxl text-on-surface-variant font-body-lg text-body-lg">
                  Tidak ada produk ditemukan.
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
