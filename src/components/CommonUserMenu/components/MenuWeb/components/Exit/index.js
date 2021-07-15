import { useContext } from 'react';
import { Context } from '../../../../../../Context/authcontext';

function Exit() {
  const { logout } = useContext(Context);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <button
        type="button"
        onClick={() => handleLogout()}
        className="
          ml-8 whitespace-nowrap inline-flex
          items-center justify-center px-4 py-2
          border border-transparent rounded-md
          shadow-sm text-base font-medium text-white bg-green-900 hover:bg-green-700"
      >
        Sair
      </button>
    </div>
  );
}

export default Exit;
