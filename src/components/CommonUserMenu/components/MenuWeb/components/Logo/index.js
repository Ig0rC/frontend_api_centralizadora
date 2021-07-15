import { Link } from 'react-router-dom';
import Image from '../../../../../../images/icone.png';

function Logo() {
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <a href="#">
        <span className="sr-only">SoftVendas</span>
        <Link to="/perfil">
          <img
            className="h-12 w-auto sm:h-11"
            src={Image}
            alt=""
          />
        </Link>
      </a>
    </div>
  );
}

export default Logo;
