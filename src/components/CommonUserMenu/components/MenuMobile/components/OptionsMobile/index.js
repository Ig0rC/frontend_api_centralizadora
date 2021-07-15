import {
  UserIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import {
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/solid';

const options = [
  {
    name: 'Perfil',
    href: '/perfil',
    icon: UserIcon,
  },
  {
    name: 'Cadastrar Empresa Cliente',
    href: '/cadastrar-empresa-cliente',
    icon: HomeIconSolid,
  },
  {
    name: 'Gerenciar Empresa Cliente',
    href: '/gerenciar-empresas',
    icon: HomeIconSolid,
  },
];

function OptionsMobile() {
  return (
    <div className="mt-6">
      <nav className="grid gap-y-8">
        {options.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
          >
            <item.icon
              className="flex-shrink-0 h-6 w-6 text-green-900"
              aria-hidden="true"
            />
            <span className="ml-3 text-base font-medium text-gray-900">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default OptionsMobile;
