import { useState} from 'react';
import Logo from './Logo';
import MobileNavLinks from './MobileNavLinks';
import NavLinks from './NavLinks';
import { FiMenu } from 'react-icons/fi';



const NavBar = () => {
  const [openMenu,setOpenMenu] = useState(false);

  
  return (
    <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className="flex items-center justify-between h-16">
        <Logo/>
        <NavLinks/>
        <MobileNavLinks openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <FiMenu className="bg-orange-600 text-gray-100 text-3xl font-black md:hidden cursor-pointer" onClick={() => setOpenMenu(true)}/>
      </div>
    </nav>
  );
};

export default NavBar;
