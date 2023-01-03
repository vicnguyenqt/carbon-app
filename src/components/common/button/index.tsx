import {
  AriaAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
} from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonStyles } from 'components/common/button/buttonStyles';
import { m } from 'libs/motion';

type ButtonHTMLProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  AriaAttributes;

type ButtonProps = ButtonHTMLProps & VariantProps<typeof buttonStyles>;

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  fullWidth,
  className,
  ...props
}) => {
  return (
    // @ts-ignore
    <m.button
      className={buttonStyles({ variant, size, fullWidth, class: className })}
      {...props}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 0.98 }}
    />
  );
};