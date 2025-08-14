import { StatsCard } from '@/components/StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity,
  Plus,
  ArrowRight
} from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      description: 'Active patient records',
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: 'primary' as const
    },
    {
      title: 'Today\'s Appointments',
      value: '24',
      description: '3 cancelled, 2 rescheduled',
      icon: Calendar,
      trend: { value: 8, isPositive: true },
      color: 'accent' as const
    },
    {
      title: 'Monthly Revenue',
      value: '$48,392',
      description: 'Current month earnings',
      icon: DollarSign,
      trend: { value: 15, isPositive: true },
      color: 'success' as const
    },
    {
      title: 'Treatment Success',
      value: '94.2%',
      description: 'Patient satisfaction rate',
      icon: Activity,
      trend: { value: 2, isPositive: true },
      color: 'warning' as const
    }
  ];

  const recentActivities = [
    {
      patient: 'Sarah Johnson',
      action: 'Dental cleaning completed',
      time: '2 hours ago',
      type: 'treatment'
    },
    {
      patient: 'Mike Chen',
      action: 'Appointment scheduled',
      time: '4 hours ago',
      type: 'appointment'
    },
    {
      patient: 'Emma Davis',
      action: 'Treatment plan updated',
      time: '6 hours ago',
      type: 'update'
    },
    {
      patient: 'John Smith',
      action: 'Payment received',
      time: '8 hours ago',
      type: 'payment'
    }
  ];

  const upcomingAppointments = [
    {
      time: '9:00 AM',
      patient: 'Alice Brown',
      treatment: 'Dental Consultation',
      duration: '30 min'
    },
    {
      time: '10:30 AM',
      patient: 'Robert Wilson',
      treatment: 'Root Canal Treatment',
      duration: '90 min'
    },
    {
      time: '2:00 PM',
      patient: 'Lisa Anderson',
      treatment: 'Teeth Whitening',
      duration: '45 min'
    },
    {
      time: '3:30 PM',
      patient: 'David Miller',
      treatment: 'Dental Cleaning',
      duration: '30 min'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-auto p-4 bg-primary hover:bg-primary-hover">
            <div className="flex flex-col items-center space-y-2">
              <Plus className="w-6 h-6" />
              <span>New Patient</span>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 border-border hover:bg-muted">
            <div className="flex flex-col items-center space-y-2 text-foreground">
              <Calendar className="w-6 h-6" />
              <span>Schedule Appointment</span>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 border-border hover:bg-muted">
            <div className="flex flex-col items-center space-y-2 text-foreground">
              <Users className="w-6 h-6" />
              <span>View Patients</span>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 border-border hover:bg-muted">
            <div className="flex flex-col items-center space-y-2 text-foreground">
              <Activity className="w-6 h-6" />
              <span>Reports</span>
            </div>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.patient}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View Calendar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {appointment.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">{appointment.treatment}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {appointment.duration}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};