import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from './Dashboard';
import { Patients } from './Patients';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <div className="text-center py-12 text-muted-foreground">Appointments page coming soon...</div>;
      case 'settings':
        return <div className="text-center py-12 text-muted-foreground">Settings page coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      userRole="admin"
      userName="Dr. Smith"
    >
      {renderPage()}
    </Layout>
  );
};

export default Index;
