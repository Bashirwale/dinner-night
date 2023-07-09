import { useState } from "react";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";



const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { name, email, password, phone } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber:phone,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
      toast.success('user successfully created');
    } catch (error) {
      toast.error("something went wrong with registeration");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600)' }}>
      <div className="bg-white p-8 rounded-md shadow-md w-3/4">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
            className="w-full py-2 px-4 mb-4 outline-none border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-md"
          />
          <input
            type="email"
            placeholder="email"            
            id="email"
            value={email}
            onChange={onChange}
            className="w-full py-2 px-4 mb-4 outline-none border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-md"
          />
          <input
            type="number"
            placeholder="phone number"            
            id="phone"
            value={phone}
            onChange={onChange}
            className="w-full py-2 px-4 mb-4 outline-none border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={onChange}
            className="w-full py-2 px-4 mb-4 outline-none border focus:ring-2 focus:ring-orange-500 focus:border-orange-500  rounded-md"
          />
          <button
            type="submit"
            className="w-3/4 md:w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-500">Or sign up with:</p>
        <GoogleAuth/>
        <p className="mt-4">
          click here to <Link to='/sign-in' className="italic text-orange-500">sigin-in...</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
