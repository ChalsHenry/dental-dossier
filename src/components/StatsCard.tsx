import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'accent';
}

export const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = 'primary'
}: StatsCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'from-success to-success/80';
      case 'warning':
        return 'from-warning to-warning/80';
      case 'accent':
        return 'from-accent to-accent/80';
      default:
        return 'from-primary to-primary/80';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted border border-border hover:shadow-medium transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(color)} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${
            trend.isPositive ? 'text-success' : 'text-destructive'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm font-medium text-foreground mb-1">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </Card>
  );
};