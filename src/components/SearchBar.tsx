import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter,
  X
} from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  placeholder?: string;
  showFilter?: boolean;
}

export const SearchBar = ({ 
  onSearch, 
  onFilter, 
  placeholder = "Search patients...",
  showFilter = true 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-background border-border focus:border-primary"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {showFilter && (
        <Button
          type="button"
          variant="outline"
          onClick={onFilter}
          className="shrink-0 border-border hover:bg-muted"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      )}
      
      <Button 
        type="submit"
        className="shrink-0 bg-primary hover:bg-primary-hover"
      >
        <Search className="w-4 h-4" />
      </Button>
    </form>
  );
};