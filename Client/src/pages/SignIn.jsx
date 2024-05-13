import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../app/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  //useStates to handle form data
  const [formData, setFormData] = useState({});

  //importing from global redux values
  const { loading, error } = useSelector((state) => state.user)

  //using navigate and dispatch from react-router and react-redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };

  //form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //starting the async loading... using redux start fn
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        //dispatching redux failure fn
        dispatch(signInFailure(data.message));
        return;
      }
      //dispatching redux success fn
      dispatch(signInSuccess(data));
      navigate("/");
    }

    catch (error) {
      //dispatching redux failure fn
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg m-auto text-center">
      <h1 className="text-3xl font-semibold my-7 ">
        SignIn
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" onChange={handleChange} />
        <input type="text" placeholder="password" className="border p-2 rounded-lg" id="password" onChange={handleChange} />

        <button disabled={loading} className="bg-blue-950 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
        font-mono hover:text-orange-300" >
          {loading ? 'Loading ⏳' : 'Sign In 🚀'}
        </button>
        <OAuth />
      </form>

      <div className="flex my-3 gap-2">
        <p>Dont have an acount ?🤔</p>

        <Link to={"/sign-up"}>
          <span className="text-blue-500 font-bold hover:font-extrabold">SignUp</span>
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">{error}</p>}

    </div>
  );
}

export default SignIn;
