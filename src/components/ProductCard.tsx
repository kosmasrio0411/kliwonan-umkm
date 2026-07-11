import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const waLink = `https://wa.me/${product.phone}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`;

  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-surface-variant/50 relative"
    >
      {/* Thumbnail */}
      <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Category Badge Overlay */}
        <div className="absolute top-sm left-sm bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-full border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-label-sm text-primary font-semibold">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-md flex flex-col flex-grow">
        <h3 className="font-label-md text-label-md text-on-background mb-xs line-clamp-1">
          {product.name}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2 mb-md flex-grow">
          {product.description}
        </p>

        <div className="font-headline-md text-[20px] font-bold text-primary mb-md">
          Rp {Number(product.price).toLocaleString('id-ID')}
        </div>

        {/* Actions */}
        <div className="flex gap-sm mt-auto">
          <button
            id={`btn-detail-${product.id}`}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-1 flex justify-center items-center py-2 px-4 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors text-center"
          >
            Detail
          </button>
          <a
            id={`btn-wa-${product.id}`}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-1 py-2 px-4 rounded-lg bg-whatsapp text-white font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm text-center"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              chat
            </span>
            Hubungi
          </a>
        </div>
      </div>
    </article>
  );
}
