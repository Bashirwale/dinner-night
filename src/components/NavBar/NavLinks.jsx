import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { FiUser } from 'react-icons/fi';

const NavLinks = () => {
  const { user, signOut} = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const openMenuRef = useRef(null);
  const navigate = useNavigate();

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
    navigate('/sign-in');
  };



  return (
    <ul className="hidden md:flex gap-8 items-center"  ref={openMenuRef}>
      <li>
        <NavLink to="/" className="text-orange-600 font-bold text-xl">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="text-orange-600 font-bold text-xl">
          About us
        </NavLink>
      </li>
      <li>
        <NavLink to="/how-to-use" className="text-orange-600 font-bold text-xl">
          How to Use
        </NavLink>
      </li>
      {user ? (
        <li className="relative">
          <div
            className="flex items-center cursor-pointer h-8 w-8 border-orange-500 rounded-full bg-orange-500"
            onClick={handleDropdownToggle}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <FiUser className="text-white text-3xl" />
            )}
          </div>
          {showDropdown && (
            <ul className="absolute top-8 right-0 bg-white rounded-md shadow-md py-2 z-10">
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
  );
};

export default NavLinks;
