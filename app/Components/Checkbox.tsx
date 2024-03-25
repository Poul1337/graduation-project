import {
  ForwardRefRenderFunction,
  HTMLAttributes,
  forwardRef,
  useEffect,
} from 'react';
import {
  Checkbox as CheckboxNextUi,
  CheckboxProps as CheckboxPropsNextUi,
  Tooltip,
} from '@nextui-org/react';

type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
  errorMessage?: string | undefined;
  label: string;
};

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { label, errorMessage, id, ...rest },
  ref
) => {
  return (
    <div className="flex items-center gap-3 text-xs">
      <Tooltip
        content={errorMessage as string}
        isDisabled={!errorMessage}
        isOpen={!!errorMessage}
        placement={id !== 'secondName' && id !== 'number' ? 'left' : 'right'}
        showArrow={true}
        color="danger"
        offset={15}
      >
        <input
          ref={ref}
          {...rest}
          type="checkbox"
          className="h-4 w-4 rounded border border-gray-600 bg-gray-700 focus:border-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
        />
      </Tooltip>
      <label>{label}</label>
    </div>
  );
};

export default forwardRef(Checkbox);
