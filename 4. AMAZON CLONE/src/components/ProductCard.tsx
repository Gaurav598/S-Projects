import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { dispatch } = useApp();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'fill-amazon-rating text-amazon-rating'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Link to={`/product/${product.slug || product.id}`}>
      <div className={`amazon-card amazon-card-hover group ${className}`}>
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded mb-3 bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Brand */}
          <p className="text-sm text-muted-foreground">{product.brand}</p>

          {/* Product Name */}
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {renderStars(product.rating)}
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="amazon-price text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="amazon-price-strike">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-sm text-amazon-deal-red font-medium">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Prime Badge */}
          {product.primeEligible && (
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-medium">
                Prime
              </span>
              {product.freeDelivery && (
                <span className="text-xs amazon-delivery">FREE Delivery</span>
              )}
            </div>
          )}

          {/* Delivery Info */}
          {product.deliveryDate && (
            <p className="text-xs amazon-delivery">
              Get it by {product.deliveryDate}
            </p>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full amazon-button mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;