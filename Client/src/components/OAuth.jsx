import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signInSuccess} from '../redux/user/userSlice';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    
    try{
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, Provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(data);
      navigate('/');
      }catch(error){  
      console.log("couldn't sign in to google account!" ,error);
  }
}

  return (
    <button onClick={handleGoogleClick} type='button' className='p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-95'>continue with google</button>
  )
}