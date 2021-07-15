import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import ExitMobile from './components/ExitMobile';
import OptionsMobile from './components/OptionsMobile';
import CloseMenuMobile from './components/CloseMenuMobile';
import Images from '../../../../images/icone.png';

function MenuMobile({ open }) {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-100 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        static
        className="absolute z-40 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <Link to="/perfil">
                <img
                  className="h-10 w-auto"
                  src={Images}
                  alt="Workflow"
                />
              </Link>
              <CloseMenuMobile />
            </div>
            <OptionsMobile />
          </div>
          <ExitMobile />
        </div>
      </Popover.Panel>
    </Transition>
  );
}

export default MenuMobile;
