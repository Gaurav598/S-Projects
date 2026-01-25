import { Product, Category, Deal, Banner } from '@/types';

// Import product images
import iphoneImage from '@/assets/iphone-15-pro-max.jpg';
import samsungImage from '@/assets/samsung-galaxy-s24-ultra.jpg';
import sonyImage from '@/assets/sony-headphones.jpg';
import macbookImage from '@/assets/macbook-air-m3.jpg';
import levisImage from '@/assets/levis-jeans.jpg';

// Import hero banners
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Mobiles', 
    slug: 'mobiles',
    subcategories: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones' },
      { id: '1-2', name: 'Basic Phones', slug: 'basic-phones' },
      { id: '1-3', name: 'Accessories', slug: 'mobile-accessories' }
    ]
  },
  { 
    id: '2', 
    name: 'Electronics', 
    slug: 'electronics',
    subcategories: [
      { id: '2-1', name: 'Laptops', slug: 'laptops' },
      { id: '2-2', name: 'Headphones', slug: 'headphones' },
      { id: '2-3', name: 'Cameras', slug: 'cameras' }
    ]
  },
  { 
    id: '3', 
    name: 'Fashion', 
    slug: 'fashion',
    subcategories: [
      { id: '3-1', name: 'Men\'s Clothing', slug: 'mens-clothing' },
      { id: '3-2', name: 'Women\'s Clothing', slug: 'womens-clothing' },
      { id: '3-3', name: 'Footwear', slug: 'footwear' }
    ]
  },
  { 
    id: '4', 
    name: 'Home & Kitchen', 
    slug: 'home-kitchen',
    subcategories: [
      { id: '4-1', name: 'Furniture', slug: 'furniture' },
      { id: '4-2', name: 'Appliances', slug: 'appliances' },
      { id: '4-3', name: 'Décor', slug: 'home-decor' }
    ]
  },
  { 
    id: '5', 
    name: 'Books', 
    slug: 'books',
    subcategories: [
      { id: '5-1', name: 'Fiction', slug: 'fiction' },
      { id: '5-2', name: 'Non-Fiction', slug: 'non-fiction' },
      { id: '5-3', name: 'Educational', slug: 'educational' }
    ]
  },
  { 
    id: '6', 
    name: 'Beauty & Personal Care', 
    slug: 'beauty',
    subcategories: [
      { id: '6-1', name: 'Skincare', slug: 'skincare' },
      { id: '6-2', name: 'Makeup', slug: 'makeup' },
      { id: '6-3', name: 'Personal Care', slug: 'personal-care' }
    ]
  },
  { 
    id: '7', 
    name: 'Toys & Games', 
    slug: 'toys',
    subcategories: [
      { id: '7-1', name: 'Action Figures', slug: 'action-figures' },
      { id: '7-2', name: 'Board Games', slug: 'board-games' },
      { id: '7-3', name: 'Educational Toys', slug: 'educational-toys' }
    ]
  },
  { 
    id: '8', 
    name: 'Kitchen', 
    slug: 'kitchen',
    subcategories: [
      { id: '8-1', name: 'Appliances', slug: 'kitchen-appliances' },
      { id: '8-2', name: 'Cookware', slug: 'cookware' },
      { id: '8-3', name: 'Storage', slug: 'kitchen-storage' }
    ]
  },
];

export const products: Product[] = [
  {
    id: 'P001',
    name: 'iPhone 15 Pro Max (256GB, Natural Titanium)',
    slug: 'iphone-15-pro-max-256gb-natural-titanium',
    category: 'Mobiles',
    price: 134900,
    originalPrice: 159900,
    discount: 16,
    rating: 4.6,
    reviewCount: 28470,
    image: iphoneImage,
    images: [iphoneImage, iphoneImage, iphoneImage],
    description: 'iPhone 15 Pro Max with A17 Pro chip delivers incredible performance and features. The titanium design makes it our lightest Pro model ever.',
    specifications: {
      'Display': '6.7-inch Super Retina XDR display',
      'Chip': 'A17 Pro chip with 6-core GPU',
      'Storage': '256GB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Video Recording': '4K at 24 fps, 25 fps, 30 fps, or 60 fps',
      'Battery Life': 'Up to 29 hours video playback',
      'Operating System': 'iOS 17',
      'RAM': '8GB',
      'Weight': '221 grams'
    },
    features: [
      '6.7-inch Super Retina XDR display',
      'A17 Pro chip for maximum performance',
      '48MP main camera with advanced computational photography',
      'Action button, USB-C, up to 29 hours video playback'
    ],
    brand: 'Apple',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: 'Tomorrow',
    offers: ['No Cost EMI', 'Bank Offer: 5% Instant Discount', 'Exchange Available']
  },
  {
    id: 'P002',
    name: 'Samsung Galaxy S24 Ultra 5G (512GB, Titanium Black)',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    category: 'Mobiles',
    price: 124999,
    originalPrice: 139999,
    discount: 11,
    rating: 4.4,
    reviewCount: 19320,
    image: samsungImage,
    images: [samsungImage, samsungImage, samsungImage],
    description: 'Galaxy S24 Ultra delivers the ultimate mobile experience with integrated S Pen, advanced AI features, and pro-grade cameras.',
    specifications: {
      'Display': '6.8-inch QHD+ Dynamic AMOLED',
      'Processor': 'Snapdragon 8 Gen 3 / Exynos (region dependent)',
      'Storage': '512GB',
      'RAM': '12GB',
      'Camera': '200MP quad camera, S Pen support',
      'Battery': '5000mAh',
      'Charging': 'Large 5000mAh battery, 45W fast charging',
      'Operating System': 'Android 14'
    },
    features: [
      '6.8-inch QHD+ Dynamic AMOLED',
      'Snapdragon 8 Gen 3 / Exynos (region dependent)',
      '200MP quad camera, S Pen support',
      'Large 5000mAh battery, 45W fast charging'
    ],
    brand: 'Samsung',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: 'Tomorrow',
    offers: ['Exchange Offer', 'Bank EMI Offer']
  },
  {
    id: 'P003',
    name: 'OnePlus 12 (12GB RAM, 256GB Storage, Obsidian Black)',
    slug: 'oneplus-12-12gb-256gb-black',
    category: 'Mobiles',
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    rating: 4.2,
    reviewCount: 8421,
    image: iphoneImage,
    images: [iphoneImage, iphoneImage, iphoneImage],
    description: 'OnePlus 12 with flagship Snapdragon processor and 80W fast charging for ultimate performance.',
    specifications: {
      'Display': '6.82-inch Fluid AMOLED display',
      'Processor': 'Snapdragon high-end chipset',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '50MP main camera + 48MP ultra-wide',
      'Battery': '5200mAh',
      'Charging': '80W wired fast charging',
      'Operating System': 'Android 14'
    },
    features: [
      '6.82-inch Fluid AMOLED display',
      'Snapdragon high-end chipset',
      '50MP main camera + 48MP ultra-wide',
      '80W wired fast charging'
    ],
    brand: 'OnePlus',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: '2 days',
    offers: ['Instant Discount with select cards']
  },
  {
    id: 'P004',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-black',
    category: 'Electronics',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.5,
    reviewCount: 56420,
    image: sonyImage,
    images: [sonyImage, sonyImage, sonyImage],
    description: 'Industry-leading noise canceling with exceptional sound quality. All-day comfort and crystal clear hands-free calling.',
    specifications: {
      'Type': 'Over-ear',
      'Battery': '30 hours',
      'Weight': '250g',
      'Driver Unit': '30mm',
      'Frequency Response': '4 Hz-40,000 Hz',
      'Connectivity': 'Bluetooth 5.2, NFC, 3.5mm jack',
      'Microphones': '8 microphones for calls'
    },
    features: [
      'Industry-leading noise cancellation',
      'Up to 30 hours battery life',
      'Quick charge: 3 min = 3 hours play',
      'Multipoint connection'
    ],
    brand: 'Sony',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: 'Tomorrow',
    offers: ['Bank Offer']
  },
  {
    id: 'P005',
    name: 'MacBook Pro 14-inch (M2 Pro, 16GB RAM, 512GB SSD)',
    slug: 'macbook-pro-14-m2-pro-512gb',
    category: 'Laptops',
    price: 189900,
    originalPrice: 199900,
    discount: 5,
    rating: 4.8,
    reviewCount: 11234,
    image: macbookImage,
    images: [macbookImage, macbookImage, macbookImage],
    description: 'MacBook Pro with M2 Pro chip delivers exceptional performance and all-day battery life in an incredibly powerful design.',
    specifications: {
      'Chip': 'Apple M2 Pro chip',
      'Memory': '16GB unified memory',
      'Storage': '512GB SSD',
      'Display': 'Liquid Retina XDR display',
      'Graphics': '10-core GPU',
      'Battery Life': 'Up to 18 hours',
      'Weight': '1.6 kg'
    },
    features: [
      'Apple M2 Pro chip',
      'Liquid Retina XDR display',
      'Up to 18 hours battery life',
      'Thunderbolt 4 ports'
    ],
    brand: 'Apple',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: '3 days',
    offers: ['Education Discount', 'No Cost EMI']
  },
  {
    id: 'P006',
    name: 'Dell XPS 13 (12th Gen Intel Core i7, 16GB, 512GB SSD)',
    slug: 'dell-xps-13-9520-i7-16gb-512gb',
    category: 'Laptops',
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    rating: 4.4,
    reviewCount: 6210,
    image: macbookImage,
    images: [macbookImage, macbookImage, macbookImage],
    description: 'Ultra-portable laptop with InfinityEdge display and premium build quality. Perfect for professionals and creators.',
    specifications: {
      'Processor': 'Intel Core i7 12th Gen',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '13.3-inch FHD+ display',
      'Graphics': 'Intel Iris Xe',
      'Weight': '1.24 kg'
    },
    features: [
      '13.3-inch FHD+ display',
      'Intel Core i7 12th Gen',
      '16GB RAM, 512GB SSD',
      'Lightweight aluminium chassis'
    ],
    brand: 'Dell',
    inStock: true,
    primeEligible: false,
    freeDelivery: true,
    deliveryDate: '2 days',
    offers: ['Bank Cashback']
  },
  {
    id: 'P007',
    name: 'boAt Rockerz 550 Wireless Headphones',
    slug: 'boat-rockerz-550-wireless',
    category: 'Electronics',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.1,
    reviewCount: 21456,
    image: sonyImage,
    images: [sonyImage, sonyImage, sonyImage],
    description: 'Affordable wireless headphones with great sound quality and long battery life.',
    specifications: {
      'Type': 'On-ear',
      'Battery': '20 hours',
      'Driver': '50mm drivers',
      'Connectivity': 'Bluetooth'
    },
    features: [
      '50mm drivers',
      'Up to 20 hours playback',
      'Cushioned ear cups'
    ],
    brand: 'boAt',
    inStock: true,
    primeEligible: true,
    freeDelivery: false,
    deliveryDate: 'Tomorrow, ₹40',
    offers: ['Bank Offer']
  },
  {
    id: 'P008',
    name: 'Levi\'s Men\'s Slim Fit Jeans - Dark Blue',
    slug: 'levis-mens-slim-fit-jeans-32',
    category: 'Fashion',
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    rating: 4.2,
    reviewCount: 3241,
    image: levisImage,
    images: [levisImage, levisImage, levisImage],
    description: 'Classic slim fit jeans with premium denim construction and comfortable stretch fabric.',
    specifications: {
      'Material': 'Denim',
      'Fit': 'Slim',
      'Care': 'Machine washable',
      'Size Range': '28-42 waist'
    },
    features: [
      'Slim fit, stretchable denim',
      'Machine washable',
      'Multiple sizes available'
    ],
    brand: 'Levi\'s',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: 'Tomorrow',
    offers: ['Combo Offer']
  },
  {
    id: 'P009',
    name: 'The Power of Your Subconscious Mind',
    slug: 'the-power-of-your-subconscious-mind',
    category: 'Books',
    price: 149,
    originalPrice: 299,
    discount: 50,
    rating: 4.6,
    reviewCount: 55230,
    image: macbookImage,
    images: [macbookImage, macbookImage, macbookImage],
    description: 'Self-help classic teaching the power of the mind. Paperback edition by Joseph Murphy.',
    specifications: {
      'Pages': '256',
      'Language': 'English',
      'Author': 'Joseph Murphy',
      'Publisher': 'Penguin'
    },
    features: [
      'Self-help classic teaching the power of the mind',
      'Paperback edition',
      'Author: Joseph Murphy'
    ],
    brand: 'Penguin',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: 'FREE Delivery with Prime',
    offers: ['Buy 2 Get 1 10% off']
  },
  {
    id: 'P010',
    name: 'Mi LED TV 4A 43-inch Full HD Android LED Smart TV',
    slug: 'mi-tv-4a-43-inch-fhd',
    category: 'Home & Kitchen',
    price: 21999,
    originalPrice: 25999,
    discount: 15,
    rating: 4.0,
    reviewCount: 8420,
    image: macbookImage,
    images: [macbookImage, macbookImage, macbookImage],
    description: '43-inch Full HD Smart TV with Android TV and Google Assistant.',
    specifications: {
      'Size': '43 inch',
      'Resolution': 'Full HD',
      'OS': 'Android TV',
      'Connectivity': 'Wi-Fi, HDMI, USB'
    },
    features: [
      '43-inch Full HD display',
      'Android TV with Google Assistant',
      'Multiple HDMI ports'
    ],
    brand: 'Xiaomi',
    inStock: true,
    primeEligible: true,
    freeDelivery: true,
    deliveryDate: '2 days',
    offers: ['Bank Offer']
  }
];

export const banners: Banner[] = [
  {
    id: '1',
    image: heroBanner1,
    title: 'Great Indian Festival',
    subtitle: 'Up to 80% off on Electronics'
  },
  {
    id: '2', 
    image: heroBanner2,
    title: 'Prime Day Deals',
    subtitle: 'Exclusive offers for Prime members'
  },
  {
    id: '3',
    image: heroBanner3, 
    title: 'Fashion Sale',
    subtitle: 'Minimum 50% off on top brands'
  }
];

export const deals: Deal[] = [
  {
    id: '1',
    title: 'Lightning Deals',
    discount: 70,
    type: 'lightning',
    products: products.slice(0, 4)
  },
  {
    id: '2',
    title: 'Deal of the Day',
    discount: 60,
    type: 'deal-of-day',
    products: products.slice(1, 5)
  }
];