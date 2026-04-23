import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-section-lg">
      <div className="text-center">
        <div className="font-mono text-caption text-brand-halo">404</div>
        <h1 className="mt-4 text-display-xl text-white">Page not found</h1>
        <p className="mt-3 text-body-lg text-ink-300">The page you are looking for has moved or no longer exists.</p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft size={16} /> Back home
        </Link>
      </div>
    </section>
  );
}
