import { FC } from 'react';
import {
  Button as ButtonNextUi,
  ButtonProps as ButtonPropsNextUi,
} from '@nextui-org/react';

type ButtonProps = ButtonPropsNextUi;

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <ButtonNextUi {...rest}>{children}</ButtonNextUi>;
};

export default Button;
