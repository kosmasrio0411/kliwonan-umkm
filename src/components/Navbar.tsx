import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';

interface NavbarProps {
  categories: readonly string[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ categories, activeCategory, onCategoryChange, searchQuery = '', onSearchChange }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      {/* Main bar */}
      <div className="flex justify-between items-center w-full px-container-margin py-md max-w-7xl mx-auto">
        {/* Logo */}
        <div className="font-headline-lg text-headline-lg font-bold text-primary flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            data-fill="1"
            style={{ fontSize: '32px' }}
          >
            spa
          </span>
          <span className="hidden sm:inline">Lapak Kliwonan</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-lg items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`nav-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onCategoryChange(cat as Category)}
              className={
                activeCategory === cat
                  ? 'category-btn text-primary border-b-2 border-primary pb-1 font-bold font-label-md text-label-md hover:bg-surface-container-high transition-colors px-2 py-1 rounded-t-sm'
                  : 'category-btn text-on-surface-variant hover:text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors px-2 py-1 rounded-sm'
              }
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-md">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[20px] pointer-events-none">search</span>
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-32 md:w-48 pl-9 pr-3 py-1.5 bg-surface-container border border-outline-variant rounded-full text-label-md font-label-md focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder:text-on-surface-variant transition-all"
            />
          </div>
          <button
            id="btn-basket"
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
            aria-label="Keranjang belanja"
          >
            <span className="material-symbols-outlined">shopping_basket</span>
          </button>
          <button
            id="btn-account"
            onClick={() => navigate('/admin')}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
            aria-label="Akun saya"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>

      {/* Mobile Category Scroll */}
      <div className="md:hidden flex overflow-x-auto px-container-margin py-sm gap-md border-t border-outline-variant/30 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`mob-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => onCategoryChange(cat as Category)}
            className={
              activeCategory === cat
                ? 'category-btn text-primary border-b-2 border-primary pb-1 font-bold font-label-md text-label-md whitespace-nowrap'
                : 'category-btn text-on-surface-variant font-label-md text-label-md whitespace-nowrap'
            }
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}
