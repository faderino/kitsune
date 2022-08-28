import * as colors from '@/styles/colors';

type Icon = React.ReactNode;
interface ButtonProps {
  color?: string;
  icon?: Icon;
  prependIcon?: Icon;
  appendIcon?: Icon;
  children?: React.ReactNode;
}
function Button({
  color = colors.primary,
  icon,
  prependIcon,
  appendIcon,
  children,
}: ButtonProps) {
  return (
    <button
      css={{
        background: color,
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
        color: colors.white,
      }}
    >
      {children}
    </button>
  );
}

export { Button };
