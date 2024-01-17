import { HTMLAttributes } from 'react';
import './_SubmitButton.scoped.scss';

export default function SubmitButton({
  ...divProps
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...divProps}
      className={'submit-popup-button ' + divProps.className}
    ></div>
  );
}
