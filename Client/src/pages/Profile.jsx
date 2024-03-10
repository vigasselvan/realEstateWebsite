import { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import {updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutUserStart, signoutUserSuccess, signoutUserFailure  } from '../redux/user/userSlice'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { getUserListings } from '../../../api/controllers/user.controller'

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, error, loading} = useSelector((state) => state.user);          //currentUser is the data of the user that is logged in. It is empty at first, but when the user is logged in, it will be changed to the data of the user that is logged in.
  const [file, setFile] = useState(undefined);                           //file is undefined at first, but when the user upload the file, it will be changed to the file that user uploaded.
  const [filePerc, setFilePerc] = useState(0);   
  const [fileUploadError, setFileUploadError] = useState(false);            //fileUploadError is the error message that is shown when the file is not uploaded to the firebase storage. It is empty at first, but when the file is not uploaded, it will be changed to the error message that is shown when the file is not uploaded.
  const [formData, setFormData] = useState({});                            //formData is the data that the user input in the form. It is empty at first, but when the user input the data in the form, it will be changed to the data that the user input in the form.
  const [updateSuccess, setUpdateSuccess] = useState(false);      
  const [showListingsError, setShowListingsError] = useState(false);        //updateSuccess is the message that is shown when the user is updated. It is empty at first, but when the user is updated, it will be changed to the message that is shown when the user is updated.
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);                        //ref(storage, filename) is the path of the file in the storage.
    const uploadTask = uploadBytesResumable(storageRef, file);                        //put(file) is the method that uploads the file to the storage.

    uploadTask.on('state_changed', (snapshot) => {                     //this method is called when the file is uploaded to the storage.
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;            //this is the percentage of the file that is uploaded to the storage.                                                             
      setFilePerc(Math.round(progress));                                                     //rounded to the nearest integer of percentage file uploaded.
    },
    (error)=>{
     setFileUploadError(true);                                                  //this is the error message that is shown when the file is not uploaded to the storage.
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>            //this is the method that gets the download url of the file that is uploaded to the storage.
        setFormData({...formData, avatar: downloadURL})                      //formData is the data that the user input in the form. It is empty at first, but when the user input the data in the form, it will be changed to the data that the user input in the form.
      );
    }
    );
  };
      // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async () => {
    try{
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    }catch(error){
      dispatch(signoutUserFailure(error.message));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {

    try{
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    }catch(error){
      setShowListingsError(true);
    }

  }

  const handleListingDelete = async (listingId) => {
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings(userListings.filter((listing) => listing._id !== listingId));
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type='file' onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />        {/* this tag is hidden and ref to below img tag, so when the img is clicked, this tag become clicked and seems like img tag works like file upload tag.*/}
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />                                                                   {/* when the img is clicked, the file upload tag is clicked.*/}
        <p className='text-sm self-center'>
        {fileUploadError ? (
          <span className='text-red-700'>file upload ERROR(image less than 2 mb)</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'>{`uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className='text-green-700'>Image uploaded!</span>
        ) : (
          ''
        )}
        </p>
        <input type="text" placeholder='username' id='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' defaultValue={currentUser.email} onChange={handleChange} />
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Update'}</button>
        <Link  className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 text-center' to={"/create-listing"}> 
          Create Listing 
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser} >Delete</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout} >Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='bg-blue-300 text-white rounded-lg p-3 hover:opacity-95 text-center w-full text-xl' >Show Listings</button>
      <p className='text-red-700 mt-5' >{showListingsError ? 'Error showing listings' : ''}</p>
      
      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button className='text-red-700 uppercase' onClick={()=> handleListingDelete(listing._id)}>Delete</button>
                <button className='text-green-700 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>
      }

    </div>
  );
}
