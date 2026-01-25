import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { dispatch } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock user data
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };

      dispatch({ type: 'SET_USER', payload: mockUser });
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Amazon.in
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Amazon Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="text-3xl font-bold text-foreground">
                amazon<span className="text-primary">.in</span>
              </div>
            </Link>
          </div>

          {/* Login Form */}
          <div className="amazon-card">
            <h1 className="text-2xl font-bold mb-6">Sign In</h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or mobile phone number</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-accent hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full amazon-button" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-xs text-muted-foreground">
              <p>
                By continuing, you agree to Amazon's{' '}
                <Link to="/conditions" className="text-accent hover:underline">
                  Conditions of Use
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Notice
                </Link>
                .
              </p>
            </div>

            <Separator className="my-6" />

            {/* Create Account */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">New to Amazon?</p>
              <Button 
                asChild 
                variant="outline" 
                className="w-full amazon-button-secondary"
                size="lg"
              >
                <Link to="/register">Create your Amazon account</Link>
              </Button>
            </div>
          </div>

          {/* Business Account */}
          <div className="mt-8 text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">New to Amazon?</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            
            <Button variant="outline" className="w-full" size="lg">
              Create a business account
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-12 text-center space-y-2">
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <Link to="/conditions" className="hover:underline">Conditions of Use</Link>
              <Link to="/privacy" className="hover:underline">Privacy Notice</Link>
              <Link to="/help" className="hover:underline">Help</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © 1996-2024, Amazon.com, Inc. or its affiliates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;