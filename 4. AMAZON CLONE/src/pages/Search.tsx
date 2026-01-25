import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useApp } from '@/contexts/AppContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Sort products based on selected sort option
  useEffect(() => {
    let sorted = [...searchResults];
    
    switch (sortBy) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, sort by ID (assuming higher ID = newer)
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Relevance - keep original order
        break;
    }
    
    setFilteredProducts(sorted);
  }, [searchResults, sortBy]);

  // Update search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, [searchParams, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search Amazon.in"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="amazon-search-button">
                <SearchIcon className="w-4 h-4" />
              </Button>
            </div>
          </form>
          
          {searchQuery && (
            <div className="mt-4 text-center">
              <p className="text-muted-foreground">
                {filteredProducts.length} results for{' '}
                <span className="font-medium text-foreground">"{searchQuery}"</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      {searchQuery && (
        <div className="bg-muted/20 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">Home</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Search results for "{searchQuery}"</span>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {!searchQuery ? (
          // No search query - show popular categories or suggestions
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">What are you looking for?</h2>
            <p className="text-muted-foreground mb-8">
              Search for products, brands, and more...
            </p>
            
            {/* Popular Search Terms */}
            <div className="max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {['iPhone', 'Samsung Galaxy', 'MacBook', 'Headphones', 'Jeans', 'Books'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      setSearchParams({ q: term });
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          // No results found
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">No results found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find any products matching "{searchQuery}". Try:
            </p>
            
            <div className="max-w-md mx-auto space-y-2 text-left">
              <p className="text-sm text-muted-foreground">• Check your spelling</p>
              <p className="text-sm text-muted-foreground">• Use more general terms</p>
              <p className="text-sm text-muted-foreground">• Try different keywords</p>
            </div>
            
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                Clear search
              </Button>
            </div>
          </div>
        ) : (
          // Search results
          <div className="space-y-6">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search Results */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  className={viewMode === 'list' ? 'flex flex-row gap-4 items-start' : ''}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Search;
