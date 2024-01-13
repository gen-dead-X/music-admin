import { InputHTMLAttributes, useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import './_AnimatedInputLabel.scoped.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export default function AnimatedInputLabel({
  label,
  ...inputProps
}: FormInputProps) {
  const id = useId();
  const { register, control } = useFormContext();
  const { fieldState } = useController({
    control,
    name: inputProps.name,
  });

  return (
    <div className='relative'>
      <div className='input-container '>
        <input
          {...inputProps}
          className={
            inputProps.className +
            (fieldState.error?.message ? ' border-red-500 ' : '')
          }
          {...register(inputProps.name)}
          name={inputProps.name}
          placeholder=''
          autoComplete='on'
          id={id}
        />
        <label
          htmlFor={id}
          className='bg-white text-black dark:bg-[rgb(29,29,29)]  dark:text-white'
        >
          {label ?? 'Type Here'}
        </label>
      </div>
      {fieldState.error?.message && (
        <p className='absolute text-red-500'>{fieldState.error?.message}</p>
      )}
    </div>
  );
}
