import { useState } from 'react';
import { PatientCard } from '@/components/PatientCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

// Mock data - will be replaced with Supabase integration
const mockPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'female' as const,
    lastVisit: '2024-01-10',
    isActive: true,
    totalVisits: 12
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1985-11-22',
    gender: 'male' as const,
    lastVisit: '2024-01-08',
    isActive: true,
    totalVisits: 8
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1992-03-08',
    gender: 'female' as const,
    lastVisit: '2023-12-15',
    isActive: true,
    totalVisits: 15
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1978-09-12',
    gender: 'male' as const,
    lastVisit: '2024-01-05',
    isActive: true,
    totalVisits: 25
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1995-07-20',
    gender: 'female' as const,
    lastVisit: '2023-11-28',
    isActive: false,
    totalVisits: 6
  },
  {
    id: '6',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '(555) 678-9012',
    dateOfBirth: '1983-12-03',
    gender: 'male' as const,
    lastVisit: '2024-01-12',
    isActive: true,
    totalVisits: 18
  }
];

export const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPatients(mockPatients);
      return;
    }

    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.email.toLowerCase().includes(query.toLowerCase()) ||
      patient.phone.includes(query)
    );
    setFilteredPatients(filtered);
  };

  const handleFilter = () => {
    // TODO: Implement advanced filters
    console.log('Opening filters...');
  };

  const handleViewPatient = (id: string) => {
    console.log('Viewing patient:', id);
  };

  const handleEditPatient = (id: string) => {
    console.log('Editing patient:', id);
  };

  const handleDeletePatient = (id: string) => {
    console.log('Deleting patient:', id);
  };

  const handleAddPatient = () => {
    console.log('Adding new patient...');
  };

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <SearchBar
            onSearch={handleSearch}
            onFilter={handleFilter}
            placeholder="Search patients by name, email, or phone..."
          />
        </div>
        <Button
          onClick={handleAddPatient}
          className="bg-primary hover:bg-primary-hover shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Results summary */}
      <div className="text-sm text-muted-foreground">
        {searchQuery ? (
          <>Showing {filteredPatients.length} results for "{searchQuery}"</>
        ) : (
          <>Showing {filteredPatients.length} patients</>
        )}
      </div>

      {/* Patient grid */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onView={handleViewPatient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
              userRole="admin" // This will come from auth context
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchQuery ? 'No patients found' : 'No patients yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? 'Try adjusting your search terms or filters.'
              : 'Get started by adding your first patient record.'
            }
          </p>
          {!searchQuery && (
            <Button onClick={handleAddPatient} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add First Patient
            </Button>
          )}
        </div>
      )}
    </div>
  );
};