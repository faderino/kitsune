import * as colors from '@/styles/colors';

const btnColor = {
  primary: '#1446A0',
};

type Icon = React.ReactNode;
interface ButtonProps {
  color: string;
  icon?: Icon;
  prependIcon?: Icon;
  appendIcon?: Icon;
  children: React.ReactNode;
}
function Button({
  color = btnColor.primary,
  icon,
  prependIcon,
  appendIcon,
  children,
}: ButtonProps) {
  return <button>{children}</button>;
}

export { Button };
