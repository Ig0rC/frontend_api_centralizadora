import { Popover } from '@headlessui/react';

import { MenuIcon } from '@heroicons/react/outline';

function Hamburguer() {
  return (
    <div className="-mr-2 -my-2 md:hidden">
      <Popover.Button
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-green-900 hover:text-gray-500
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-900"
      >
        <span className="sr-only">Abrir Menu</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
    </div>
  );
}

export default Hamburguer;
