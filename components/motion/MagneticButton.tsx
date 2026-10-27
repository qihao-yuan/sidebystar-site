'use client';

import { ReactNode } from 'react';
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
  const cls = cn(
    variant === 'primary' ? 'btn-primary' : 'btn-ghost',
    disabled && 'pointer-events-none opacity-60',
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cls}
    >
      {children}
    </button>
  );
}
