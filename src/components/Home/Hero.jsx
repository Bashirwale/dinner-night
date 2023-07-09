import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-6">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900 text-5xl tracking-tight lg:text-6xl">
              <span className="">Find your perfect</span>
              <span className="text-orange-600 text-4xl "> dining experience...</span>
            </h2>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Reserve a table at your favorite restaurant or explore new
              culinary destinations. Book now to indulge in exquisite cuisine
              and exceptional service.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Hero
