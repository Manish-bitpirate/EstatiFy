import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
//from firebase
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase";

import {updateUserStart, updateUserSuccess, updateUserFailure} from "../app/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true);
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=>{
            setFormData({...formData, avatar:downloadURL});
          }
        )
      },
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        //dispatching redux failure fn
        dispatch(updateUserFailure(data.message));
        return;
      }
      //dispatching redux success fn
      dispatch(updateUserSuccess(data));
      console.log("User credentials updated successfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />

        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>

        <p className="text-sm self-center ">
          {fileUploadError? (
            <span className="text-red-600">Error Image Upload(Image must be less than 2MB)</span>
          ): filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600 ">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500 "> Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input type="text" placeholder="username" className="border p-2 rounded-lg" id="username" defaultValue={currentUser.username} onChange={handleChange}/>
        
        <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" defaultValue={currentUser.email} onChange={handleChange}/>
        
        <input type="password" placeholder="password" className="border p-2 rounded-lg" id="password" onChange={handleChange}/>
        
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
