import { ForwardRefRenderFunction, forwardRef } from 'react';
import {
  Checkbox as CheckboxNextUi,
  CheckboxProps as CheckboxPropsNextUi,
  Tooltip,
} from '@nextui-org/react';

type CheckboxProps = CheckboxPropsNextUi & { errorMessage: string | undefined };

const Checkbox: ForwardRefRenderFunction<HTMLLabelElement, CheckboxProps> = (
  { name, errorMessage, id, ...rest },
  ref
) => {
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
      <span>
        <CheckboxNextUi
          ref={ref}
          {...rest}
          classNames={{
            label: 'text-sm',
          }}
        >
          {name}
        </CheckboxNextUi>
      </span>
    </Tooltip>
  );
};

export default forwardRef(Checkbox);
