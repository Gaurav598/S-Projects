import { Router } from 'express';
import { getCareers, getCareerById, getScholarships, getColleges } from '../controllers/dataController';

const router = Router();

router.get('/careers', getCareers);
router.get('/careers/:id', getCareerById);
router.get('/scholarships', getScholarships);
router.get('/colleges', getColleges);

export default router;
