import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amazon-header-dark text-white">
      {/* Back to Top */}
      <div className="bg-amazon-header-light">
        <div className="container mx-auto px-4">
          <Button
            onClick={scrollToTop}
            className="w-full py-4 bg-transparent hover:bg-white/10 text-white text-sm font-medium"
          >
            <ChevronUp className="w-4 h-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-white mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Amazon</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press Releases</Link></li>
              <li><Link to="/science" className="hover:text-white transition-colors">Amazon Science</Link></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="font-bold text-white mb-4">Connect with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/facebook" className="hover:text-white transition-colors">Facebook</Link></li>
              <li><Link to="/twitter" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link to="/instagram" className="hover:text-white transition-colors">Instagram</Link></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-white mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell on Amazon</Link></li>
              <li><Link to="/business" className="hover:text-white transition-colors">Sell under Amazon Accelerator</Link></li>
              <li><Link to="/associates" className="hover:text-white transition-colors">Amazon Associates</Link></li>
              <li><Link to="/fulfillment" className="hover:text-white transition-colors">Fulfillment by Amazon</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold text-white mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/covid" className="hover:text-white transition-colors">COVID-19 and Amazon</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Your Account</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns Centre</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-white">
                <div className="text-2xl font-bold">amazon</div>
                <div className="text-sm">.in</div>
              </div>
            </Link>

            {/* Language and Country */}
            <div className="flex gap-4 text-sm">
              <button className="border border-gray-500 px-3 py-1 rounded hover:bg-white/10 transition-colors">
                English
              </button>
              <button className="border border-gray-500 px-3 py-1 rounded hover:bg-white/10 transition-colors">
                🇮🇳 India
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-xs text-gray-400">
            <p>© 2024 Amazon.com, Inc. or its affiliates. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;