import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import ChevronIcon from './ChevronIcon';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'black'
  | 'outline'
  | 'outline-dark'
  | 'ghost-white';

type ButtonSize = 'default' | 'sm';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2b0835] text-white hover:bg-[#541460] shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-black hover:bg-gray-100 shadow-xl hover:shadow-2xl',
  black: 'bg-black text-white hover:bg-[#2b0835]',
  outline:
    'border border-white/80 text-white hover:bg-white hover:text-[#2b0835]',
  'outline-dark':
    'border border-[#2b0835]/15 bg-white text-[#2b0835] hover:bg-[#f2e7f4]',
  'ghost-white': 'bg-white text-[#2b0835] hover:bg-white/90 shadow-xl hover:shadow-2xl',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-12 px-8 py-3.5 text-sm',
  sm: 'min-h-10 px-5 py-2.5 text-sm',
};

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showIcon?: boolean;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClassName({
  variant = 'primary',
  size = 'default',
  className = '',
}: Pick<SharedProps, 'variant' | 'size' | 'className'>) {
  return [
    'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide',
    'transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-out',
    'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7028a8]/40 focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className = '',
    variant = 'primary',
    size = 'default',
    showIcon = true,
    ...rest
  } = props;

  const classes = buttonClassName({ variant, size, className });

  if ('href' in props && props.href) {
    const { href, ...linkProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isExternal = href.startsWith('http') || href.startsWith('#');

    if (isExternal) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
          {showIcon && <ChevronIcon />}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
        {showIcon && <ChevronIcon />}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
      {showIcon && <ChevronIcon />}
    </button>
  );
}
