import { InputHTMLAttributes, useId, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { IoEyeOutline } from 'react-icons/io5';

import './_AnimatedInputLabel.scoped.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  showPasswordButton?: boolean;
  label?: string;
  name: string;
};

export default function AnimatedInputLabel({
  showPasswordButton,
  label,
  ...inputProps
}: FormInputProps) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { register, control } = useFormContext();
  const { fieldState } = useController({
    control,
    name: inputProps.name,
  });

  return (
    <div className="relative">
      <div className="input-container ">
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className={
            (showPasswordButton ? ' block ' : ' hidden ') +
            'absolute right-5 top-[50%] z-50 translate-y-[-50%]'
          }
        >
          <IoEyeOutline className={' '} />
        </button>
        <input
          {...inputProps}
          className={
            inputProps.className +
            (fieldState.error?.message ? ' border-red-500 ' : '')
          }
          {...register(inputProps.name)}
          name={inputProps.name}
          type={
            (showPasswordButton && showPassword
              ? 'text'
              : !inputProps.type && ' password') || inputProps.type
          }
          placeholder=""
          autoComplete="on"
          id={id}
        />
        <label
          htmlFor={id}
          className="bg-white text-black dark:bg-[rgb(29,29,29)]  dark:text-white"
        >
          {label}
        </label>
      </div>
      {fieldState.error?.message && (
        <p className="absolute text-red-500">{fieldState.error?.message}</p>
      )}
    </div>
  );
}
