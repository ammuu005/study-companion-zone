import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Book, Youtube, MapPin } from 'lucide-react';

interface DepartmentCardProps {
  department: {
    id: string;
    name: string;
    fullName: string;
    logo: string;
    color: string;
    bgColor: string;
    resources: {
      youtube: string;
      ebooks: string;
      notes: string;
      internships: string;
    };
  };
  onViewDetails: (department: any) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ 
  department, 
  onViewDetails 
}) => {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow overflow-hidden border-0`}
      style={{ backgroundColor: department.bgColor }}
      onClick={() => onViewDetails(department)}
    >
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <img 
            src={department.logo} 
            alt={`${department.name} Logo`}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
          />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
          {department.name}
        </h3>
        
        <p className="text-white/80 text-sm mb-4">
          {department.fullName}
        </p>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-1 text-white/90 text-xs">
              <Youtube className="w-3 h-3" />
              <span>Videos</span>
            </div>
            <div className="flex items-center gap-1 text-white/90 text-xs">
              <Book className="w-3 h-3" />
              <span>E-Books</span>
            </div>
            <div className="flex items-center gap-1 text-white/90 text-xs">
              <MapPin className="w-3 h-3" />
              <span>Internships</span>
            </div>
          </div>
          
          <Button 
            variant="department" 
            size="sm" 
            className="mt-4 bg-white/20 hover:bg-white/30"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Explore Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};