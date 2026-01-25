import { Link } from 'react-router-dom';
import { Clock, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { deals } from '@/data/products';

const DealsSection = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lightning':
        return <Zap className="w-5 h-5" />;
      case 'deal-of-day':
        return <Clock className="w-5 h-5" />;
      case 'best-seller':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white amazon-card">
              {/* Deal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amazon-deal-red/10 rounded-full text-amazon-deal-red">
                    {getIcon(deal.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{deal.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Up to {deal.discount}% off
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline" className="amazon-button-secondary">
                  <Link to="/deals">See all deals</Link>
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-4">
                {deal.products.slice(0, 4).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className="p-3"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;