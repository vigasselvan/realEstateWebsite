import { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);                           //file is undefined at first, but when the user upload the file, it will be changed to the file that user uploaded.
  const[filePerc, setFilePerc] = useState(0);   
  const [fileUploadError, setFileUploadError] = useState(false);            //fileUploadError is the error message that is shown when the file is not uploaded to the firebase storage. It is empty at first, but when the file is not uploaded, it will be changed to the error message that is shown when the file is not uploaded.
  const [formData, setFormData] = useState({});                            //formData is the data that the user input in the form. It is empty at first, but when the user input the data in the form, it will be changed to the data that the user input in the form.


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
    });
    (error)=>{
      setFileUploadError(true);                                                  //this is the error message that is shown when the file is not uploaded to the storage.
    };
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {            //this is the method that gets the download url of the file that is uploaded to the storage.
        setFormData({...formData, avatar: downloadURL});                          //formData is the data that the user input in the form. It is empty at first, but when the user input the data in the form, it will be changed to the data that the user input in the form.
      });
    }
  }
      // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type='file' onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />        {/* this tag is hidden and ref to below img tag, so when the img is clicked, this tag become clicked and seems like img tag works like file upload tag.*/}
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className= 'rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />        {/* when the img is clicked, the file upload tag is clicked.*/}
        <p className='text-sm self-center'>
        {fileUploadError ? (
          <span className='text-red-700'>file upload ERROR(image less than 2 mb)</span>
        ): filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'>{`uploading ${filePerc}`}</span>
        ) : filePerc === 100 ? (
          <span className='text-green-700'>Image uploaded!</span>
        ) : (
          ''
        )}
        </p>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}
