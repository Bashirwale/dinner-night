import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Splide, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
// or only core styles
import '@splidejs/react-splide/css/core';
import Spinner from '../Spinner';

const FeaturedRestaurant = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const restaurantsRef = collection(db, 'restaurants');
      const q = query(restaurantsRef, limit(6));
      const querySnap = await getDocs(q);

      let restaurants = [];

      querySnap.forEach((doc) => {
        return restaurants.push({
          data: doc.data(),
          id: doc.id,
        });
      });

      setRestaurants(restaurants);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Featured Dishes</h2>
      <p className="mt-4 max-w-2xl text-xl text-gray-500">
        Experience culinary excellence with our handpicked selection of dishes from top-rated restaurants around the world.
      </p>
      <div className="mt-10">
        <Splide options={{ type: 'fade', interval: 2000, arrows:false, loop: true, pagination: true}} >
          {restaurants.map(({ data, id }) => (
            <SplideSlide key={id}>
              <div className="group relative bg-orange-300 rounded-lg overflow-hidden shadow-lg">
                <img src={data.image} alt="" className="w-full h-96 object-center object-cover" />
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full h-full flex flex-col justify-center items-center text-center px-4">
                  <h3 className="text-3xl font-bold text-white mb-4">{data.name}</h3>
                  <p className="text-lg font-bold text-gray-300 mt-4">{data.cities[0]}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default FeaturedRestaurant;
