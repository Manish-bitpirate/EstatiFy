import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
//from firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../app/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  //global user redux state
  const { currentUser, loading, error } = useSelector((state) => state.user);
  //helper states
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [deleteUserListingError, setDeleteUserListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  //saves the image inbetween renders
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //saves and changes made to form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //handles user image upload in firebase storage
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  //handles update user function
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        //dispatching redux failure fn
        dispatch(updateUserFailure(data.message));
        return;
      }
      //dispatching redux success fn
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      console.log("User credentials updated successfully 🌌");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //handles delete user function
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        //dispatching redux failure fn
        dispatch(deleteUserFailure(data.message));
        return;
      }
      //dispatching redux success fn
      dispatch(deleteUserSuccess(data));
      console.log("User deleted successfully 🌊");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //handles signout user function
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        //dispatching redux failure fn
        dispatch(signOutFailure(data.message));
        return;
      }
      //dispatching redux success fn
      dispatch(signOutSuccess(data));
      console.log("User logged out successfully 🚀");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      setDeleteUserListingError(false);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleteUserListingError(true);
        console.log(data.message);
        return;
      }
      // setDeleteUserListingError(false);
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      console.log("Listing deleted successfully 🌊");
    } catch (error) {
      console.log(error.message);
      setDeleteUserListingError(true);
    }
  };

  //profile page components
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className="text-sm self-center ">
          {fileUploadError ? (
            <span className="text-red-600">
              Error Image Upload(Image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600 ">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500 ">
              {" "}
              Image successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-2 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="email"
          className="border p-2 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
        font-mono hover:text-orange-300"
        >
          {loading ? `Loading...` : `Update`}
        </button>

        <Link
          to={"/create-listing"}
          className="bg-green-600 text-white text-center text-1xl p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60
            font-mono hover:text-orange-300"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-progress"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-progress">
          Sign Out
        </span>
      </div>

      <p className="text-red-700 mt-5 text-center">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 text-center">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <button
        onClick={handleShowListings}
        className=" text-green-600 w-full text-center"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-5 text-center">
        {showListingsError ? `Error in showing listings` : ``}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold text-orange-600">
            Your Listings
          </h1>

          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>

              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
             
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
             
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
             
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-red-700 mt-5 text-center">
        {deleteUserListingError ? `Error in deleting listings` : ``}
      </p>
    </div>
  );
};

export default Profile;
