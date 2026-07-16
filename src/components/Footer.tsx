import type { FooterVariant } from '../types';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: FooterVariant;
}

export default function Footer({ variant = 'full' }: FooterProps) {
  if (variant === 'simple') {
    return (
      <footer className="mt-auto bg-surface-container-lowest border-t border-outline-variant w-full">
        <div className="px-mobile-margin md:px-desktop-margin py-lg flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary mb-4 md:mb-0">
            Lapak Kliwonan
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-right">
            © Lapak Kliwonan by KKN PPM UGM Swakarsa Banyuurip 2026
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full">
      <div className="px-container-margin py-xxl flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-lg">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" data-fill="1">
              spa
            </span>
            Lapak Kliwonan
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">
            © Lapak Kliwonan by KKN PPM UGM Swakarsa Banyuurip 2026
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-md md:gap-lg">
          <Link
            to="/tentang-kami"
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary underline transition-all focus:ring-2 focus:ring-primary rounded-sm outline-none"
          >
            Tentang Kami
          </Link>
          <Link
            to="/mitra-umkm"
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary underline transition-all focus:ring-2 focus:ring-primary rounded-sm outline-none"
          >
            Mitra UMKM
          </Link>
        </nav>
      </div>
    </footer>
  );
}
