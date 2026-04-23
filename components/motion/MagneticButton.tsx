'use client';

import { useRef, MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function MagneticButton({
  children,
  href,
  className,
  variant = 'primary',
  onClick,
  ariaLabel,
  type = 'submit',
  disabled = false,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  ariaLabel?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  const cls = cn(
    variant === 'primary' ? 'btn-primary' : 'btn-ghost',
    'transition-transform duration-300 ease-apple-out',
    disabled && 'pointer-events-none opacity-60',
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={cls}
    >
      {children}
    </button>
  );
}
