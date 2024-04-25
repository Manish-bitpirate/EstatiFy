import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import {useDispatch} from "react-redux";
import { signInSuccess } from "../app/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
              })
              const data = await res.json();
              dispatch(signInSuccess(data));
              navigate("/");
        } 
        catch (error) {
            console.log("Could'nt sign in with google", error);
        }
    }
    return (
        <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
    font-mono hover:text-green-500">
            Continue with google 🤠
        </button>
    );
}

export default OAuth;
