import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Youtube, Book, FileText, MapPin } from 'lucide-react';

interface DepartmentDetailsProps {
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
  onBack: () => void;
}

export const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ 
  department, 
  onBack 
}) => {
  const resourceLinks = [
    {
      title: "YouTube References",
      url: department.resources.youtube,
      icon: Youtube,
      description: "Video lectures and tutorials"
    },
    {
      title: "E-Books",
      url: department.resources.ebooks,
      icon: Book,
      description: "Digital textbooks and references"
    },
    {
      title: "Notes & PDFs",
      url: department.resources.notes,
      icon: FileText,
      description: "Study materials and notes"
    },
    {
      title: "Internship Opportunities",
      url: department.resources.internships,
      icon: MapPin,
      description: "Find internship opportunities near you"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Departments
        </Button>
        
        <Card 
          className="mb-8 border-0 shadow-elegant"
          style={{ backgroundColor: department.bgColor }}
        >
          <CardHeader className="text-center text-white">
            <div className="flex justify-center mb-4">
              <img 
                src={department.logo} 
                alt={`${department.name} Logo`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
            </div>
            <CardTitle className="text-4xl font-bold mb-2">
              {department.name}
            </CardTitle>
            <p className="text-xl text-white/90">
              {department.fullName}
            </p>
          </CardHeader>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          {resourceLinks.map((resource, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full`} style={{ backgroundColor: department.color + '20' }}>
                    <resource.icon className="w-6 h-6" style={{ color: department.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {resource.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Resource
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {department.id === 'cse' && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Internship Locations - Chennai</h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d124376.75414543186!2d80.14292274186815!3d13.050080099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sbest%20offline%20internship%20places%20maps%20for%20cse%20students%20in%20chennai!5e0!3m2!1sen!2sin!4v1751772095852!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CSE Internship Locations"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};