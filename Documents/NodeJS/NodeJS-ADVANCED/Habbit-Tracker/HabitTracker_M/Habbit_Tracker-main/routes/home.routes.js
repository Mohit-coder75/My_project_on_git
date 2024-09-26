import { Router } from 'express';

const router = Router();
import  HomeController from '../controller/home.controller.js';
// Create an instance of HomeController
const homeController = new HomeController();
console.log('In router');

router.get('/', homeController.home);
router.get('/404', homeController.notFound)




export default router;