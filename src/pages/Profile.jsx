import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { FiEdit2 } from 'react-icons/fi';
import Spinner from '../components/Spinner';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

    useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserDetails({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("User document not found");
        }

        setLoading(false);
      }
    };

    fetchUserDetails();
    }, [auth.currentUser]);
  
  const handleSignOut = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const handleEditProfile = () => {
    navigate(`/edit-profile/${auth.currentUser.uid}`);
  };


  if (loading) {
    return <Spinner/>;
  }
  console.log(userDetails)
  if (!auth.currentUser) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="border rounded p-4 mb-6 bg-gray-200">
       <div className="flex justify-end mb-4">
        <button
          className="bg-transparent border-0 text-orange-600 hover:text-orange-800"
          onClick={handleEditProfile}
        >
          <FiEdit2/>
        </button>
        </div>
        <h2 className="text-orange-600 text-xl font-bold mb-4">User Information</h2>
        <div className="flex flex-col mb-4">
          <label className="text-orange-600 mb-1">Name</label>
          <p className="text-gray-800">{auth.currentUser.displayName}</p>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-orange-600 mb-1">Email</label>
          <p className="text-gray-800">{auth.currentUser.email}</p>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-orange-600 mb-1">Phone</label>
          <p className="text-gray-800">{userDetails?.phone}</p>
        </div>
        {/* Add additional user information here */}
        <div className="flex flex-col mb-4">
          <label className="text-orange-600 mb-1">Address</label>
          <p className="text-gray-800">{userDetails?.address}</p>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-orange-600 mb-1">Age</label>
          <p className="text-gray-800">{userDetails?.age}</p>
        </div>
        {/* Add more user details as needed */}
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
