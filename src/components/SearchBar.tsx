import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from '../lib/router';

export function SearchBar({
  initial = '',
  placeholder = 'Search by business, modality, category, or neighborhood',
  variant = 'default',
}: {
  initial?: string;
  placeholder?: string;
  variant?: 'default' | 'ghost';
}) {
  const { navigate } = useRouter();
  const [value, setValue] = useState(initial);

  return (
    <form
      className={variant === 'ghost' ? 'search-bar ghost' : 'search-bar'}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore');
      }}
    >
      <Search size={18} />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search the directory"
      />
      <button className="button gold" type="submit">
        Search
      </button>
    </form>
  );
}
