import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

const Cart = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = state.cart.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );

  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryCharges;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="amazon-button">
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {state.cart.map((item) => (
                <div key={item.product.id} className="amazon-card">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-32 h-32 object-contain bg-gray-50 rounded"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-lg font-medium hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          by {item.product.brand}
                        </p>
                        {item.product.inStock ? (
                          <p className="text-sm text-amazon-delivery font-medium">In Stock</p>
                        ) : (
                          <p className="text-sm text-destructive">Out of Stock</p>
                        )}
                        {item.product.primeEligible && (
                          <p className="text-sm text-accent">Prime Eligible</p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="amazon-price text-xl">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="amazon-price-strike">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 border-x min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>

                        <Button variant="ghost" size="sm">
                          Save for later
                        </Button>
                      </div>

                      {/* Delivery Info */}
                      {item.product.deliveryDate && (
                        <p className="text-sm text-amazon-delivery">
                          Get it by {item.product.deliveryDate}
                        </p>
                      )}
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="amazon-price text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="amazon-card sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({state.cart.length} items):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className={deliveryCharges === 0 ? 'text-amazon-delivery' : ''}>
                    {deliveryCharges === 0 ? 'FREE' : formatPrice(deliveryCharges)}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="amazon-price">{formatPrice(total)}</span>
                </div>

                {deliveryCharges > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add items worth {formatPrice(500 - subtotal)} to get FREE delivery
                  </p>
                )}
              </div>

              <Button className="w-full mt-6 amazon-button" size="lg">
                Proceed to Buy ({state.cart.length} items)
              </Button>

              <div className="mt-4 p-4 bg-muted/50 rounded">
                <div className="flex items-start gap-2">
                  <ShoppingBag className="w-5 h-5 text-amazon-delivery flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amazon-delivery">FREE Delivery</p>
                    <p className="text-muted-foreground">
                      Your order qualifies for FREE Delivery. Choose this option at checkout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Payment Options:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Credit/Debit Cards</p>
                  <p>• Net Banking</p>
                  <p>• UPI</p>
                  <p>• Cash on Delivery</p>
                  <p>• EMI available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;