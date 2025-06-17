"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading or auth check then redirect
    // In a real app, you might check auth status here
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1000); // Short delay to show loading state

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Welcome to ProDash Admin</h1>
      <p className="text-muted-foreground">Redirecting to your dashboard...</p>
    </div>
  );
}
