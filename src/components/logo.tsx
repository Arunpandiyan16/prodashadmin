import Link from 'next/link';
import { Building } from 'lucide-react';

export function Logo({ collapsed } : { collapsed?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-primary font-semibold">
      <Building className="h-6 w-6" />
      {!collapsed && <span className="text-lg font-bold">ProDash</span>}
    </Link>
  );
}
