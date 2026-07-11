import type { Product } from '../types';

/**
 * Mock product data – diadaptasi dari data inline di product_catalog_harvest_showcase/code.html
 * Gambar menggunakan URL dari product_detail_harvest_showcase/code.html
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Kopi Arabika Gayo Blend',
    category: 'Makanan Ringan',
    description:
      'Biji kopi pilihan dari dataran tinggi Gayo, disangrai medium untuk aroma maksimal.',
    price: 'Rp 85.000',
    priceNum: 85000,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMEfR0lpC85l91mJXwDmnq9sjpAbEpCDFsv2ZtOJ2ucJeNh9oJbzdR1bYyHL18D35IrUGQT8jhr1NGvHaakIvVswsFtW5WJY31XE69g8qX519URpmK3dGx60qcDZwnhnD2iE8fsxL5kg61WGEDDvOSRI1Nd6K-RRwACMGuuwYrLgNzYjUTieYx6qbG0zL0DdzNFXJxeSmf3bf0WNpCpNnYJs_TrYrclSr6V5AONCSFl3m-uEhTWf-s',
    phone: '6281234567890',
  },
  {
    id: 2,
    name: 'Madu Hutan Liar Murni',
    category: 'Hasil Pertanian',
    description:
      'Madu mentah tanpa proses pemanasan, dipanen langsung dari hutan tropis lokal.',
    price: 'Rp 120.000',
    priceNum: 120000,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArWEJsp-jXG4aqaqELy9Rogb1HDjqBu8KK8xqWVbLnmlkxH0Cvmfi0YZhcmFUCnmzI_gKXYgnlOW0Pat3KKrQc1esxO-ebVToVQSpioF-2VvB3ShwDjF3WfMF98z8aBpyh3IaTheigZhLIQ9OqLGRVkVtz_70l7Zf-sl8LU7DBZAzSgFDTv30BnVBCndq1fx4iuAGNkTAYE1fRhR5xWK3DM0H69wqs8Yy5LwasIV4nHwvvUAhZZxmJ',
    phone: '6281234567890',
  },
  {
    id: 3,
    name: 'Keripik Pisang Kepok Manis',
    category: 'Makanan Ringan',
    description:
      'Cemilan renyah dari pisang kepok pilihan, digoreng dengan minyak kelapa murni.',
    price: 'Rp 25.000',
    priceNum: 25000,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkhWErgBZ7XwffeL6hv9VSyR3cGCqL7fQsRrMZ-LuFlEEA7YJgNOGw-AlgU6os8xjCjndw4X8MyjQFZN9_wEWVGYp0a4rpQxJ5Gjl0Ew3fmJIhY_8xdlcrU6I95SSxMqSojeDcXE0OZZ1l0NzE9-w8HJStihuRhbux3voUIZ1Xa18EgTMapXARiffMA-O-XQmd-3A8hVcoGyykmdKf81JfZBVhLJN8EWZjiW3tjq9autsQTVGGDYlv',
    phone: '6281234567890',
  },
  {
    id: 4,
    name: 'Sayuran Hidroponik Campur',
    category: 'Hasil Pertanian',
    description:
      'Paket sayur segar harian: selada air, bayam, dan kangkung bebas pestisida.',
    price: 'Rp 35.000',
    priceNum: 35000,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDW5dx1f7aB3HTmi9R19yZgY5tvCNmwjwjDXB8f3kr11UmBmsr7aeVNpg2W0kH_7gNnm9nPzMHB4uecVBM8zcJb7l77iW-SMLRtWaVrZ29EHFFsKlkMPWnTbgp0nM0nPK3nhI4aNbLPFQ-2ZT2NQ0wU6JPrZVNItdChYQJq94cW4xRBKPPna8KA6zgE3xMHnGZQRF1OUsmHlpl7SOAPn1uW-S0zy91CCWYeBx7U5gT-90c6J6HhgIEI',
    phone: '6281234567890',
  },
];

export const CATEGORIES = ['Semua', 'Makanan Ringan', 'Hasil Pertanian'] as const;
