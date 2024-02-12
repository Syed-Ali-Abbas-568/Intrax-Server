import express from 'express';
import cors from 'cors';
import { test, registerAdmin, loginAdmin } from '../controllers/authController.js';

const adminRouter = express.Router();

// Middleware creation using cors
// Here the origin is the frontend from which the request is coming from


// You can use req, res over here, but to create clean code, we will use a function that does that for us

adminRouter.get('/', test);

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);

// adminRouter.post('/logout', logOutUser);
// adminRouter.get('/profile', getProfile);
// adminRouter.get('/:id', getUserInfo);

// Always export when creating routes 
export default adminRouter;
