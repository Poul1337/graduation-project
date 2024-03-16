'use client';

import React from 'react';
import clsx from 'clsx';

type TooltipProps = React.HTMLAttributes<HTMLInputElement> & {
  error: string | undefined;
  side: 'right' | 'left';
};

const Tooltip: React.FC<TooltipProps> = ({ error, side, className }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={clsx(
        'absolute top-7 bg-red-600 rounded-lg p-2 text-white shadow-lg transform flex-wrap w-40 flex justify-center transition-opacity duration-500',
        {
          '-left-44': side === 'left',
          '-right-44': side === 'right',
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        },
        className
      )}
    >
      <div
        className={clsx('absolute w-3 h-3 bg-red-600 rotate-45 top-3  -z-10', {
          '-right-1': side === 'left',
          '-left-1': side === 'right',
        })}
      ></div>
      {error}
    </div>
  );
};

export default Tooltip;
