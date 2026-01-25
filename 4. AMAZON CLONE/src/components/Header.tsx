import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, Menu, User, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-amazon-header-dark">
      {/* Main Header */}
      <div className="amazon-header-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-2 text-white">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-white">
                <div className="text-xl font-bold">amazon</div>
                <div className="text-xs">.in</div>
              </div>
            </Link>

            {/* Delivery Location */}
            <div className="hidden md:flex items-center gap-1 text-sm hover:border border-white/20 rounded px-2 py-1 cursor-pointer">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs text-gray-300">Deliver to</div>
                <div className="font-bold">Mumbai 400001</div>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-l-sm rounded-r-none border-r-0 bg-muted hover:bg-muted/80 px-3">
                      All <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuItem>Electronics</DropdownMenuItem>
                    <DropdownMenuItem>Fashion</DropdownMenuItem>
                    <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
                    <DropdownMenuItem>Books</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Input
                  type="text"
                  placeholder="Search Amazon.in"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                
                <Button type="submit" className="amazon-search-button">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-1 text-sm hover:border border-white/20 rounded px-2 py-1 cursor-pointer">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            {/* Account & Lists */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-1 text-sm hover:border border-white/20 rounded px-2 py-1 cursor-pointer">
                  <User className="w-4 h-4" />
                  <div>
                    <div className="text-xs">Hello, {state.user?.name || 'Sign in'}</div>
                    <div className="font-bold flex items-center">
                      Account & Lists <ChevronDown className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {!state.isAuthenticated ? (
                  <>
                    <div className="p-4">
                      <Button asChild className="w-full amazon-button">
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <p className="text-xs text-center mt-2">
                        New customer? <Link to="/register" className="text-accent hover:underline">Start here.</Link>
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Your Account</DropdownMenuItem>
                    <DropdownMenuItem>Your Orders</DropdownMenuItem>
                    <DropdownMenuItem>Your Wish List</DropdownMenuItem>
                    <DropdownMenuItem>Your Recommendations</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Returns & Orders */}
            <Link to="/orders" className="hidden md:flex flex-col text-xs hover:border border-white/20 rounded px-2 py-1">
              <span>Returns</span>
              <span className="font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-1 hover:border border-white/20 rounded px-2 py-1 relative">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:block text-sm font-bold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-amazon-header-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-2 text-white text-sm overflow-x-auto">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex items-center gap-1">
              <Menu className="w-4 h-4" />
              All
            </Button>
            
            <Link to="/category/electronics" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/category/mobiles" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Mobiles
            </Link>
            <Link to="/category/fashion" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Fashion
            </Link>
            <Link to="/category/home-kitchen" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Home & Kitchen
            </Link>
            <Link to="/category/books" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Books
            </Link>
            <Link to="/category/beauty" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Beauty
            </Link>
            <Link to="/category/sports" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Sports
            </Link>
            <Link to="/deals" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Today's Deals
            </Link>
            <Link to="/prime" className="hover:border border-white/20 rounded px-2 py-1 whitespace-nowrap">
              Prime
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;