import express from 'express';
import controller from '../controllers/project';

const router = express.Router();

router.post('/', controller.createProject);
router.get('/test', controller.getAllProjects);

export = router;
