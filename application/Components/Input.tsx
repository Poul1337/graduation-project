'use client';

import { ForwardRefRenderFunction, forwardRef, useState } from 'react';
import {
  Input as NextuiInput,
  InputProps as NextuiInputProps,
  Tooltip,
} from '@nextui-org/react';
import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';

type InputProps = NextuiInputProps;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { errorMessage, id, ...rest },
  ref
) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Tooltip
      content={errorMessage as string}
      isDisabled={!errorMessage}
      isOpen={!!errorMessage}
      placement={id !== 'secondName' && id !== 'number' ? 'left' : 'right'}
      showArrow={true}
      color="danger"
      offset={15}
    >
      <NextuiInput
        {...rest}
        ref={ref}
        variant="underlined"
        type={
          id === 'password' || id === 'passwordConfirmation'
            ? !isVisible
              ? 'password'
              : 'text'
            : 'text'
        }
        endContent={
          id === 'password' || id === 'passwordConfirmation' ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                toggleVisibility();
              }}
            >
              {!isVisible ? (
                <IoEye color="white" />
              ) : (
                <IoEyeOff color="white" />
              )}
            </button>
          ) : null
        }
        classNames={
          !errorMessage
            ? {
                inputWrapper:
                  'border-grayishBlue after:bg-turquoise hover:border-grayishBlue',
              }
            : {
                inputWrapper:
                  'border-danger after:bg-turquoise hover:border-danger',
              }
        }
      />
    </Tooltip>
  );
};
export default forwardRef(Input);
