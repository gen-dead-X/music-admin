import { ButtonHTMLAttributes } from 'react';
import './_GradientButton.scoped.scss';

export default function GradientButton({
  ...buttonProps
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...buttonProps}
      className={'popup-button ' + buttonProps.className}
    ></button>
  );
}
