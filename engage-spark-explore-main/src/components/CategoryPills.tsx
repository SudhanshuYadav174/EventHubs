import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Desktop, 
  MusicNote, 
  Briefcase, 
  Trophy,
  Heart,
  GraduationCap,
  Palette,
  GameController
} from '@phosphor-icons/react';

const categories = [
  {
    id: 'trending',
    name: 'Trending',
    icon: Trophy,
    color: 'from-primary to-primary-light',
    count: 12
  },
  {
    id: 'tech',
    name: 'Tech Events',
    icon: Desktop,
    color: 'from-blue-500 to-blue-600',
    count: 8
  },
  {
    id: 'music',
    name: 'Music & Art',
    icon: MusicNote,
    color: 'from-purple-500 to-purple-600',
    count: 15
  },
  {
    id: 'business',
    name: 'Business',
    icon: Briefcase,
    color: 'from-green-500 to-green-600',
    count: 6
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Trophy,
    color: 'from-orange-500 to-orange-600',
    count: 4
  },
  {
    id: 'wellness',
    name: 'Health & Wellness',
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    count: 9
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    color: 'from-indigo-500 to-indigo-600',
    count: 7
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: GameController,
    color: 'from-red-500 to-red-600',
    count: 3
  }
];

interface CategoryPillsProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryPills({ selectedCategory, onCategorySelect }: CategoryPillsProps) {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Popular Categories</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Find your next experience</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 lg:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    h-auto p-2 sm:p-3 lg:p-4 flex flex-col items-center space-y-1 sm:space-y-2 transition-smooth group
                    ${isSelected 
                      ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-glow' 
                      : 'glass-card border-white/20 hover:border-primary/50 hover:bg-white/10 hover:glow-effect'
                    }
                  `}
                  onClick={() => onCategorySelect(category.id)}
                >
                  <Icon size={20} className={`sm:w-6 sm:h-6 lg:w-6 lg:h-6 ${isSelected ? 'text-white' : 'text-primary'}`} />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">{category.name}</span>
                  <Badge 
                    variant={isSelected ? "secondary" : "outline"}
                    className={`text-xs ${
                      isSelected 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}