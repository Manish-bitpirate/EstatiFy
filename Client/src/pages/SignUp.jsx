import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="text-center my-auto p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 ">
        SignUp
      </h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="username" className="border p-2 rounded-lg" id="username" />
        <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" />
        <input type="text" placeholder="password" className="border p-2 rounded-lg" id="password" />
        <button className="bg-blue-950 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
        font-mono hover:text-orange-300" >Sign Up</button>
      </form>
      <div className="flex my-3 gap-2">
        <p>Already have an acount ?🤔</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 font-bold hover:font-extrabold">SignIn</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
