import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { FiUser } from 'react-icons/fi';

const MobileNavLinks = ({ openMenu,setOpenMenu}) => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const openMenuRef = useRef(null);
  const navigate = useNavigate()
  
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (e) => {
    if (openMenuRef.current && !openMenuRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/')
  };

  return (
    <div
      className={
        openMenu
          ? 'md:hidden absolute z-40 right-0 top-1 bg-orange-600 px-4 py-16 h-screen  w-3/4'
          : 'hidden absolute z-40 right-0 top-1 bg-orange-600 px-4 py-16 h-screen  w-3/4'
      }
      ref={openMenuRef}
    >
      <ul className="text-orange-600 flex flex-col items-left justify-between gap-16">
        <span onClick={() => setOpenMenu(false)} className='absolute top-1 left-2 text-gray-100 text-base font-black cursor-pointer'>X</span>
        <li>
          <NavLink to="/" className="text-gray-100 font-bold text-xl">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="text-gray-100 font-bold text-xl">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/how-to-use" className="text-gray-100 font-bold text-xl">
            How to Use
          </NavLink>
        </li>
        {user ? (
          <li>
            <div
              className="absolute top-1 right-2 w-8 h-8 text-orange-500 flex items-center cursor-pointer"
              onClick={handleDropdownToggle}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <FiUser className="text-3xl rounded-full" />
              )}
            </div>
            {showDropdown && (
              <ul className="absolute top-10 right-2 bg-white rounded-md shadow-md py-2 z-10">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-orange-600 hover:bg-orange-100"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-orange-600 hover:bg-orange-100"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <NavLink
                    to="/reservation"
                    className="block px-4 py-2 text-orange-600 hover:bg-orange-100"
                  >
                    Reservation
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <NavLink
              to="/sign-in"
              className="text-orange-600 bg-gray-100 p-2 rounded-md font-bold text-xl"
            >
              Sign-in
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileNavLinks;
