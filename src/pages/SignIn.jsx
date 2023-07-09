import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "../components/GoogleAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        toast.success('successfully logged in')
        navigate("/profile");
      }
    } catch (error) {
      toast.error("bad user credentials");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600)' }}>
      <div className="bg-white p-8 rounded shadow-md w-3/4">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              className="w-full border border-gray-300 rounded py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              onChange={onChange}
              className="w-full border border-gray-300 rounded py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-gray-500">Or sign in with:</p>
        <GoogleAuth/>
        <p className="mt-4">
            click here to <Link to='/sign-up' className="italic text-orange-500">sigin up...</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
