import express from 'express';  
import {test, userUpdate} from '../controllers/user.controller.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();    

router.get('/test', test);
router.get('/user:id', verifyToken, userUpdate);

export default router;  