import { FiFacebook,FiTwitter,FiInstagram} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-orange-600 text-gray-300 py-6 mt-6">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between border-b-2 py-4">
          <div className="">
            <h3 className="text-2xl font-bold text-gray-900">About Us</h3>
            <p className=" text-gray-300 p-2">
              We are dedicated to providing you with the best dining experience
              by connecting you with top-rated restaurants and offering a simple
              booking process.
            </p>
          </div>
          <div className="">
            <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
            <p className="text-gray-300">Email:info@dinnernight.com</p>
            <p className='text-gray-300'>Phone: +1 123-456-7890</p>
            <p className='text-gray-300'>Address: 123 Main Street, City, Country</p>  
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
               <FiFacebook className='text-base'/>
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FiTwitter className='text-base'/>
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FiInstagram/>
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Your Restaurant Booking. All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
