import express from 'express';
import controller from '../controllers/authentication';
import { asyncWrap, auth, guest } from '../middleware';

const router = express.Router();

router.post('/register', guest, controller.register);
router.post('/login', guest, asyncWrap(controller.login));
router.post('/logout', auth, controller.logout);

export = router;
