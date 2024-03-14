'use client';

import React from 'react';
import { match } from 'ts-pattern';
import clsx from 'clsx';

import { SeePasswordIcon } from '@/icons';

import Tooltip from './Tooltip';

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  labelName?: string;
  placeholder?: string;
  type: string;
  id: string;
  error?: string;
};

const InputForm: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { labelName, placeholder, type, id, className, error, onBlur, ...restProps },
  ref
) => {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isError = typeof error !== 'undefined';

  return (
    <label htmlFor={id} className="flex text-sm relative flex-col">
      {labelName}
      <input
        {...restProps}
        ref={ref}
        onBlur={onBlur}
        placeholder={placeholder}
        type={
          type === 'password'
            ? !isPasswordVisible
              ? 'password'
              : 'text'
            : type
        }
        className={clsx(
          'border-b-grayishBlue border-b-2 h-12 w-80 pl-4 rounded-t focus-visible:outline-none bg-transparent focus-visible:border-b-turquoise',
          {
            'border-b-red-600 focus:border-b-red': error,
          },
          className
        )}
        id={id}
      />
      {match(isError)
        .with(
          true,
          () => id !== 'secondName' && id !== 'number',
          () => <Tooltip error={error} side="left" />
        )
        .with(
          true,
          () => id === 'secondName' || id === 'number',
          () => <Tooltip error={error} side="right" />
        )
        .otherwise(() => null)}
      {match(type)
        .with('password', () => (
          <button
            onClick={(event) => {
              event.preventDefault();
              handleToggleVisibility();
            }}
            className={
              'absolute top-2/3 right-4 transform -translate-y-1/2 bg-transparent border-none w-5 h-5'
            }
          >
            <SeePasswordIcon />
          </button>
        ))
        .otherwise(() => null)}
    </label>
  );
};

export default React.forwardRef(InputForm);
