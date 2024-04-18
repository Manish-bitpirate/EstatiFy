import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  //various useStates to handle different functions
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  
  //form handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })  
  };

  //form submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } 
    
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="text-center my-auto p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 ">
        SignIn
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" onChange={handleChange} />
        <input type="text" placeholder="password" className="border p-2 rounded-lg" id="password" onChange={handleChange} />
        
        <button disabled={loading} className="bg-blue-950 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
        font-mono hover:text-orange-300" >
          {loading ? 'Loading ⏳': 'Sign In 🚀'}
        </button>
      
      </form>
      
      <div className="flex my-3 gap-2">
        <p>Dont have an acount ?🤔</p>
        
        <Link to={"/sign-up"}>
          <span className="text-blue-500 font-bold hover:font-extrabold">SignUp</span>
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">{error}</p> }
    
    </div>
  );
}

export default SignUp;
