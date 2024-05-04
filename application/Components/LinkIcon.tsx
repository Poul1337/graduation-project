'use client';

import { FC, ReactElement, ReactNode, cloneElement } from 'react';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/react';

type LinkIconProps = {
  children: ReactNode;
  href: String;
  size?: Number;
  color?: String;
  toolTipContent: String;
};

const LinkIcon: FC<LinkIconProps> = ({
  children,
  href,
  size = 24,
  color = 'white',
  toolTipContent,
}) => {
  return (
    <Tooltip
      content={toolTipContent}
      placement="right"
      showArrow={true}
      color="primary"
      offset={20}
      disableAnimation={true}
      closeDelay={0}
    >
      <Link href={`${href}`}>
        {cloneElement(children as ReactElement<LinkIconProps>, {
          size,
          color,
        })}
      </Link>
    </Tooltip>
  );
};

export default LinkIcon;
