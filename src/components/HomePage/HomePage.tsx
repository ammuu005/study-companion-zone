import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentDetails } from './DepartmentDetails';
import { ContactPage } from './ContactPage';

// Import department logos
import cseLogo from '@/assets/cse-logo.jpg';
import eceLogo from '@/assets/ece-logo.png';
import eeeLogo from '@/assets/eee-logo.jpeg';
import civilLogo from '@/assets/civil-logo.jpg';
import mechLogo from '@/assets/mech-logo.jpg';
import itLogo from '@/assets/it-logo.jpg';
import ceLogo from '@/assets/ce-logo.webp';

type ViewMode = 'home' | 'department' | 'contact';

const departments = [
  {
    id: 'cse',
    name: 'CSE',
    fullName: 'Computer Science Engineering',
    logo: cseLogo,
    color: '#EAB308',
    bgColor: 'hsl(var(--cse-primary))',
    resources: {
      youtube: 'https://m.youtube.com/channel/UCJbPGzawDH1njbqV-D5HqKw',
      ebooks: 'https://libguides.nyit.edu/c.php?g=61879&p=398311',
      notes: 'https://csus.libguides.com/computers/books',
      internships: 'https://www.google.com/maps?q=best+offline+internship+places+maps+for+cse+students+in+chennai'
    }
  },
  {
    id: 'ece',
    name: 'ECE',
    fullName: 'Electronics & Communication Engineering',
    logo: eceLogo,
    color: '#059669',
    bgColor: 'hsl(var(--ece-primary))',
    resources: {
      youtube: 'https://edurev.in/course/videos/14/Electronics-and-Communication-Engineering--ECE-',
      ebooks: 'https://sites.google.com/view/ece-educational-club/home',
      notes: 'https://saividya.ac.in/study-material-ece.html',
      internships: 'https://www.google.com/maps?q=best+ece+department+offline+internship+in+coimbatore'
    }
  },
  {
    id: 'eee',
    name: 'EEE',
    fullName: 'Electrical & Electronics Engineering',
    logo: eeeLogo,
    color: '#4B5563',
    bgColor: 'hsl(var(--eee-primary))',
    resources: {
      youtube: 'https://www.youtube.com/channel/UCx-a6EwvngunGWWUJKHKzbg?app=desktop',
      ebooks: 'https://lit.libguides.com/electrical-electronic-engineering/books-ebooks',
      notes: 'https://saividya.ac.in/study-material-eee.html',
      internships: 'https://www.google.com/maps?q=best+eee+department+offline+internship+in+coimbatore'
    }
  },
  {
    id: 'civil',
    name: 'CIVIL',
    fullName: 'Civil Engineering',
    logo: civilLogo,
    color: '#3B82F6',
    bgColor: 'hsl(var(--civil-primary))',
    resources: {
      youtube: 'https://www.engineering.com/?s=Civil+engineering+subjects+',
      ebooks: 'https://guides.libraries.psu.edu/c.php?g=375828&p=2543361',
      notes: 'https://www.engineeringcivil.com/',
      internships: 'https://www.google.com/maps?q=best+civil+department+offline+internship+in+coimbatore'
    }
  },
  {
    id: 'mech',
    name: 'MECH',
    fullName: 'Mechanical Engineering',
    logo: mechLogo,
    color: '#1F2937',
    bgColor: 'hsl(var(--mech-primary))',
    resources: {
      youtube: 'https://nbcc.libguides.com/mechaniclengineeringtechnology/filmsvideos',
      ebooks: 'https://nbcc.libguides.com/mechaniclengineeringtechnology/ebooks',
      notes: 'https://www.engineeringtoolbox.com/material-properties-t_24.html',
      internships: 'https://www.google.com/maps?q=best+offline+internship+places+for+mechanical+students+in+chennai'
    }
  },
  {
    id: 'it',
    name: 'IT',
    fullName: 'Information Technology',
    logo: itLogo,
    color: '#166534',
    bgColor: 'hsl(var(--it-primary))',
    resources: {
      youtube: 'https://www.youtube.com/@khanacademy/search?query=IT%20department',
      ebooks: 'https://search.worldcat.org/search?q=Infromation+technology+books&offset=1',
      notes: 'https://www.studydrive.net/',
      internships: 'https://www.google.com/maps?q=best+offline+internship+places+for+IT+students+in+chennai'
    }
  },
  {
    id: 'ce',
    name: 'CE',
    fullName: 'Chemical Engineering',
    logo: ceLogo,
    color: '#0F766E',
    bgColor: 'hsl(var(--ce-primary))',
    resources: {
      youtube: 'https://www.youtube.com/watch?v=WgWNQVdhE9A',
      ebooks: 'https://www.aiche.org/publications/books',
      notes: 'https://csus.libguides.com/chemistry/Chem200',
      internships: 'https://www.google.com/maps?q=best+Chemical+Engineering+department+offline+internship+in+coimbatore'
    }
  }
];

export const HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const handleDepartmentClick = (department: any) => {
    setSelectedDepartment(department);
    setCurrentView('department');
  };

  const handleContactClick = () => {
    setCurrentView('contact');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDepartment(null);
  };

  if (currentView === 'contact') {
    return <ContactPage onBack={handleBackToHome} />;
  }

  if (currentView === 'department' && selectedDepartment) {
    return (
      <DepartmentDetails 
        department={selectedDepartment} 
        onBack={handleBackToHome} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={handleContactClick} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Description Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Welcome to Your Personal Learning Companion!
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            This platform is designed to support students and educators by offering easy access to learning resources and communication options. 
            Whether you're reviewing concepts, reaching out for help, or simply organizing your study plan, Study Buddy is here to guide your academic journey. 
            Navigate through our site using the quick-access links, and make the most of your learning time!
          </p>
        </section>

        {/* Departments Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Choose Your Department
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                onViewDetails={handleDepartmentClick}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};