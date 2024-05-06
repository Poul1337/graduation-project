/* eslint-disable react/no-children-prop */
'use client';

import {
  FaCalendarCheck,
  FaRegRectangleList,
  FaCartShopping,
  FaBars,
  FaUserGear,
  FaPowerOff,
} from 'react-icons/fa6';
import LinkIcon from './LinkIcon';
import { useTranslations } from 'next-intl';
import { Tooltip } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

const TopIconsArr = [
  {
    children: <FaBars />,
    href: '/ordersList',
    toolTipContent: 'ordersList',
  },
  {
    children: <FaCalendarCheck />,
    href: '/calendar',
    toolTipContent: 'calendar',
  },
  {
    children: <FaRegRectangleList />,
    href: '/tasks',
    toolTipContent: 'taskList',
  },
  {
    children: <FaCartShopping />,
    href: '/shoppingList',
    toolTipContent: 'shoppingList',
  },
];

const SideBar = () => {
  const t = useTranslations('sideBar');
  return (
    <main className="flex flex-col w-20 bg-bluishGray h-screen border-r-2 border-r-black items-center justify-between">
      <div className="flex flex-col mt-20 gap-7">
        {TopIconsArr.map(({ children, href, toolTipContent }, index) => (
          <span key={index} className="hover:scale-150 duration-200">
            <LinkIcon href={href} toolTipContent={t(toolTipContent)}>
              {children}
            </LinkIcon>
          </span>
        ))}
      </div>
      <div className="flex flex-col mb-20 gap-7">
        <span className="hover:scale-150 duration-200">
          <LinkIcon
            children={<FaUserGear />}
            href="/settings"
            toolTipContent={t('settings')}
          />
        </span>
        <Tooltip
          content={t('logout')}
          placement="right"
          showArrow={true}
          color="primary"
          offset={20}
          disableAnimation={true}
          closeDelay={0}
        >
          <button
            onClick={() => signOut()}
            className="hover:scale-150 duration-200"
          >
            <FaPowerOff size={24} color="white" />
          </button>
        </Tooltip>
      </div>
    </main>
  );
};

export default SideBar;
