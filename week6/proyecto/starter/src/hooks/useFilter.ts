import { useState, useMemo } from 'react';

export function useFilter<T>(
  items: T[],
  filterFn: (item: T, searchTerm: string) => boolean
) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    return items.filter(item => filterFn(item, searchTerm));
  }, [items, searchTerm, filterFn]);

  return { filteredItems, searchTerm, setSearchTerm };
}