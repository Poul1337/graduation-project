import {
  Select as SelectNextUi,
  SelectProps as SelectPropsNextUi,
  Tooltip,
} from '@nextui-org/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

type SelectProps = SelectPropsNextUi;

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { children, errorMessage, ...rest },
  ref
) => {
  return (
    <Tooltip
      content={errorMessage as string}
      isDisabled={!errorMessage}
      isOpen={!!errorMessage}
      placement="left"
      showArrow={true}
      color="danger"
      offset={350}
      crossOffset={15}
    >
      <SelectNextUi
        {...rest}
        ref={ref}
        classNames={{
          listbox: 'text-white',
          trigger:
            'border-grayishBlue after:bg-turquoise hover:border-grayishBlue',
        }}
      >
        {children}
      </SelectNextUi>
    </Tooltip>
  );
};

export default forwardRef(Select);
