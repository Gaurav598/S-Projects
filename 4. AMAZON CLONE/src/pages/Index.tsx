import HeroCarousel from '@/components/HeroCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import DealsSection from '@/components/DealsSection';
import CategoryGrid from '@/components/CategoryGrid';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const Index = () => {
  const electronicsProducts = products.filter(p => p.category === 'Electronics' || p.category === 'Mobiles');
  const fashionProducts = products.filter(p => p.category === 'Fashion');
  const bestSellers = products.slice().sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroCarousel />

      {/* Deals Section */}
      <DealsSection />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Product Carousels */}
      <div className="py-8 bg-muted/30 space-y-8">
        <div className="container mx-auto px-4">
          <ProductCarousel 
            title="Electronics & Mobiles"
            products={electronicsProducts}
          />
          
          <ProductCarousel 
            title="Fashion Deals"
            products={fashionProducts}
          />
          
          <ProductCarousel 
            title="Best Sellers"
            products={bestSellers}
          />
        </div>
      </div>

      {/* Today's Deals Banner */}
      <section className="py-12 bg-gradient-to-r from-amazon-orange to-amazon-light-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Today's Deals</h2>
          <p className="text-lg md:text-xl mb-8">Don't miss out on limited-time offers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Up to 70% off</h3>
              <p className="text-lg">Electronics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Up to 60% off</h3>
              <p className="text-lg">Fashion</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Up to 50% off</h3>
              <p className="text-lg">Home & Kitchen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
