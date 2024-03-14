import React from 'react';
import { match } from 'ts-pattern';

import Tooltip from './Tooltip';

type CheckboxProps = React.HTMLAttributes<HTMLInputElement> & {
  label: string;
  error: string | undefined;
};

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ label, onBlur, error, ...restProps }, ref) => {
  const isError = typeof error !== 'undefined';

  return (
    <label className="flex text-xs gap-2 items-center text-turquoise mt-5 relative">
      <input
        {...restProps}
        ref={ref}
        onBlur={onBlur}
        type="checkbox"
        className="w-4 h-4"
      />
      {match(isError)
        .with(true, () => (
          <Tooltip error={error} side="left" className="-top-2" />
        ))
        .otherwise(() => null)}
      {label}
    </label>
  );
};

export default React.forwardRef(Checkbox);
