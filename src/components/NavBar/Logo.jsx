import { Link } from 'react-router-dom';
import { FiCloudLightning } from 'react-icons/fi';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to='/' className='flex items-center'>
        <span className="text-gray-900 font-bold lg::text-3xl md:text-2xl text-2xl italic">Dinner</span>
        <FiCloudLightning className="text-orange-500 lg:text-3xl md:text-2xl text-2xl " />
        <span className="text-gray-900 font-bold lg:text-3xl md:text-2xl text-2xl italic">Night...</span>
      </Link>
    </div>
  )
}

export default Logo
