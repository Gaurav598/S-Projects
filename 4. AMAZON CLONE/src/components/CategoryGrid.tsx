import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoryGrid = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group"
            >
              <div className="amazon-card amazon-card-hover text-center p-4 min-h-[120px] flex flex-col justify-center">
                {/* Category Icon Placeholder - You can add actual icons here */}
                <div className="w-12 h-12 bg-amazon-orange/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amazon-orange/20 transition-colors">
                  <span className="text-amazon-orange font-bold text-lg">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-sm font-medium group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;