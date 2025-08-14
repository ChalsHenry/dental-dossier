import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  lastVisit?: string;
  isActive: boolean;
  totalVisits: number;
}

interface PatientCardProps {
  patient: Patient;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  userRole: 'admin' | 'staff';
}

export const PatientCard = ({ 
  patient, 
  onView, 
  onEdit, 
  onDelete, 
  userRole 
}: PatientCardProps) => {
  const getAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-200 border border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {getAge(patient.dateOfBirth)} years old • {patient.gender}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={patient.isActive ? 'default' : 'secondary'}>
            {patient.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{patient.email}</span>
        </div>
        {patient.lastVisit && (
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Last visit: {formatDate(patient.lastVisit)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {patient.totalVisits} visit{patient.totalVisits !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(patient.id)}
            className="hover:bg-medical-light"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(patient.id)}
            className="hover:bg-medical-light"
          >
            <Edit className="w-4 h-4" />
          </Button>
          {userRole === 'admin' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(patient.id)}
              className="hover:bg-destructive/10 text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};