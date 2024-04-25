import { useSelector } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>

        <input type="text" placeholder="username" className="border p-2 rounded-lg" id="username" />
        <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" />
        <input type="text" placeholder="password" className="border p-2 rounded-lg" id="password" />
        
        <button className="bg-blue-600 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
        font-mono hover:text-orange-300" >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-progress">Delete Account</span>
        <span className="text-red-700 cursor-progress">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
