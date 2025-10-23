import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export function SearchBar({
  value,
  onChange
}: SearchBarProps) {
  return <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Search coins..." className="pl-10" />
    </div>;
}