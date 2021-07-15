import { Popover } from '@headlessui/react';
import MenuMobile from './components/MenuMobile';
import MenuWeb from './components/MenuWeb';

function NewMenu() {
  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <MenuWeb />
          <MenuMobile open={open} />
        </>
      )}
    </Popover>
  );
}

export default NewMenu;
