import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/signin')
    .post(authCtrl.signIn);
router.route('/auth/singOut')
    .get(authCtrl.signOut);

export default router;