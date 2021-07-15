import { useContext } from 'react';
import { Context } from '../../../../../../Context/authcontext';

function ExitMobile() {
  const { logout } = useContext(Context);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="py-6 px-5 space-y-6">
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent
          rounded-md shadow-sm text-base font-medium text-white bg-green-900 hover:bg-green-700"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default ExitMobile;
