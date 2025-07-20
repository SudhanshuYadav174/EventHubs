import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  EnvelopeSimple, 
  MapPin, 
  Phone, 
  InstagramLogo, 
  TwitterLogo, 
  LinkedinLogo, 
  FacebookLogo 
} from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover and create extraordinary events. Connect with like-minded people and build unforgettable experiences.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold">Stay updated</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email"
                  className="glass-card border-white/20 focus:border-primary"
                />
                <Button className="glass-button border-primary/30 hover:bg-primary/20 text-primary hover:text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-fast">Explore Events</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Create Event</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Premium</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-fast">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">Global Events Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeSimple size={16} />
                <span className="text-sm">hello@eventhub.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-8 h-8 hover:bg-white/10 hover:text-primary"
              >
                <InstagramLogo size={18} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-8 h-8 hover:bg-white/10 hover:text-primary"
              >
                <TwitterLogo size={18} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-8 h-8 hover:bg-white/10 hover:text-primary"
              >
                <LinkedinLogo size={18} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-8 h-8 hover:bg-white/10 hover:text-primary"
              >
                <FacebookLogo size={18} />
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>&copy; 2025 EventHub. All rights reserved. Made with ❤️ for amazing events.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}