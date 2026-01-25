import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { dispatch } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock user data
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
      };

      dispatch({ type: 'SET_USER', payload: mockUser });
      toast({
        title: "Welcome to Amazon!",
        description: "Your account has been created successfully.",
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

          {/* Register Form */}
          <div className="amazon-card">
            <h1 className="text-2xl font-bold mb-6">Create Account</h1>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First and last name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
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
                <p className="text-xs text-muted-foreground">
                  Passwords must be at least 6 characters.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Re-enter password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                {isLoading ? 'Creating Account...' : 'Create your Amazon account'}
              </Button>
            </form>

            <div className="mt-6 text-xs text-muted-foreground">
              <p>
                By creating an account, you agree to Amazon's{' '}
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

            {/* Already have account */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Business Account */}
          <div className="mt-8 text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">Buying for work?</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            
            <Button variant="outline" className="w-full" size="lg">
              Create a free business account
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

export default Register;