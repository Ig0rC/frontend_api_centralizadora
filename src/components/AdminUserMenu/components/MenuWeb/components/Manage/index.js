import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import {
  HomeIcon,
  DeviceMobileIcon,
} from '@heroicons/react/outline';

const options = [
  {
    name: 'Empresa Cliente',
    description: 'Gerenciar Empresas App SoftVendedor',
    href: '/gerenciar-empresas',
    icon: HomeIcon,
  },
  {
    name: 'Empresa Revenda',
    description: 'Gerenciar Empresa para administração do App SoftVendedor.',
    href: '/gerenciar-empresa-revenda',
    icon: HomeIcon,
  },
  {
    name: 'Tipo App',
    description: 'Gerenciar Tipo App.',
    href: '/gerenciar-app',
    icon: DeviceMobileIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Manage() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-green-900' : 'text-green-900',
              `group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-green-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900`,
            )}
          >
            <span>Gerenciar</span>
            <ChevronDownIcon
              className={classNames(
                open ? 'text-gray-600' : 'text-gray-400',
                'ml-2 h-5 w-5 group-hover:text-gray-500',
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {options.map((item) => (
                    <Link
                      key={item.name}
                      to={{ pathname: item.href }}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default Manage;
