import React, { useState, useEffect } from 'react';
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate} from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function EditProfile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
 
  useEffect(() => {
    const fetchUserDetails = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const { name,email, phone, address, age } = docSnap.data();
          setName(name);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
          setAge(age);
          
        } else {
          navigate("/");
          console.log('User document not found');
        }

        setLoading(false);

    };

    fetchUserDetails();
  }, [auth.currentUser.uid, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        email,
        phone,
        address,
        age,
      });

      navigate('/profile');
      toast.success('successfully edited profile');
    } catch (error) {
      toast.error('Error updating user details:', error);
    }
  };

  if (loading) {
    return <Spinner/>;
  }

  if (!auth.currentUser) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-orange-500" htmlFor="name">
            Name
          </label>
          <input
            className="border border-orange-500 rounded px-3 py-2 w-full focus:outline-none"
            type="text"
            id="name"
            value={auth.currentUser.displayName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-orange-500" htmlFor="email">
            Email
          </label>
          <input
            className="border border-orange-500 rounded px-3 py-2 w-full focus:outline-none"
            type="email"
            id="email"
            value={auth.currentUser.email}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-orange-500" htmlFor="phone">
            Phone
          </label>
          <input
            className="border border-orange-500 rounded px-3 py-2 w-full focus:outline-none"
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-orange-500" htmlFor="address">
            Address
          </label>
          <input
            className="border border-orange-500 rounded px-3 py-2 w-full focus:outline-none"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-orange-500" htmlFor="age">
            Age
          </label>
          <input
            className="border border-orange-500 rounded px-3 py-2 w-full focus:outline-none"
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
