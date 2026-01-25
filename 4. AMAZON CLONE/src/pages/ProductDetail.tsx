import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share, MapPin, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import ProductCarousel from '@/components/ProductCarousel';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id || p.slug === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
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
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amazon-rating text-amazon-rating'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 8);

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-accent">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-gray-50 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="amazon-price text-3xl">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="amazon-price-strike text-lg">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="bg-amazon-deal-red">
                      -{product.discount}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Prime Badge */}
              {product.primeEligible && (
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-accent text-accent-foreground">
                    Prime
                  </Badge>
                  {product.freeDelivery && (
                    <span className="text-sm amazon-delivery">FREE Delivery</span>
                  )}
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <span className="text-amazon-delivery font-medium">In Stock</span>
                ) : (
                  <span className="text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              {/* Delivery Check */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Deliver to</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="outline">Check</Button>
                </div>
                {product.deliveryDate && (
                  <div className="flex items-center gap-2 text-sm text-amazon-delivery">
                    <Truck className="w-4 h-4" />
                    <span>Get it by {product.deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 border-x min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 amazon-button-secondary"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 amazon-button"
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Wishlist and Share */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Security Features */}
              <div className="flex items-center gap-2 mt-6 p-4 bg-muted/50 rounded">
                <Shield className="w-5 h-5 text-amazon-delivery" />
                <div className="text-sm">
                  <p className="font-medium">Secure transaction</p>
                  <p className="text-muted-foreground">Your payment information is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                {product.features && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Specifications not available.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{product.rating}</div>
                      {renderStars(product.rating)}
                      <div className="text-sm text-muted-foreground mt-1">
                        {product.reviewCount.toLocaleString()} reviews
                      </div>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm w-4">{star}</span>
                          <Star className="w-4 h-4 fill-amazon-rating text-amazon-rating" />
                          <div className="flex-1 h-2 bg-muted rounded">
                            <div 
                              className="h-full bg-amazon-rating rounded" 
                              style={{ 
                                width: `${star === Math.floor(product.rating) ? 80 : 
                                        star < product.rating ? 60 : 20}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {star === Math.floor(product.rating) ? '80%' : 
                             star < product.rating ? '60%' : '20%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    <div className="border rounded p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">Verified Purchase</div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(5)}
                            <span className="text-sm text-muted-foreground">5.0</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellent product! Great quality and fast delivery. Highly recommended.
                      </p>
                    </div>
                    
                    <div className="border rounded p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">Verified Purchase</div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(4)}
                            <span className="text-sm text-muted-foreground">4.0</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Good value for money. Some minor issues but overall satisfied with the purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <ProductCarousel
              title="Related Products"
              products={relatedProducts}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;