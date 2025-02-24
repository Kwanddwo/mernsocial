import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import multer from 'multer';

const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.requireSignIn, userCtrl.read)
    .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, upload.single('photo'), userCtrl.update)
    .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/users/photo/:userId')
    .get(userCtrl.photo)

router.param('userId', userCtrl.userById)

export default router