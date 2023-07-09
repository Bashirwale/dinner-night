import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FaGoogle } from 'react-icons/fa';


 const  GoogleAuth =() => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for user in the database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      //if user doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/profile");
      }
    } catch (error) {
      toast.error("could not authorize with google");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button className="flex items-center justify-center bg-white border border-gray-300 rounded py-2 px-4 mt-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" onClick={onGoogleClick}>
          <FaGoogle className="mr-2 text-xl text-orange-500" />
      </button>
    </div>
  );
}

export default GoogleAuth;