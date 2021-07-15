import { Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';
import Registers from './components/Register';
import Manage from './components/Manage';
import Logo from './components/Logo';
import Hamburguer from './components/Hamburguer';
import Exit from './components/Exit';

function MenuWeb() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-green-900 py-6 md:justify-start md:space-x-10">
        <Logo />
        <Hamburguer />
        <Popover.Group as="nav" className="hidden md:flex space-x-10">
          <Link
            to={{ pathname: '/perfil/' }}
            className="text-base font-medium text-green-900 hover:text-gray-900"
          >
            Perfil
          </Link>
          <Registers />
          <Manage />

        </Popover.Group>
        <Exit />
      </div>
    </div>

  );
}

export default MenuWeb;
