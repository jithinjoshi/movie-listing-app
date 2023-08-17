import { Router } from "express";
import * as controller from '../controllers/moviesController.js';
import { verifyJwt } from "../middlewares/verifyJwt.js";
const router = Router();
//middleware 
router.use(verifyJwt);
router.route('/').get(controller.getMovies);
router.route('/create').post(controller.insertMovies);
router.route('/getmoviesCount').get(controller.movieCount);
router.route('/genresCount').get(controller.genresCount);
router.route('/genrePercentage').get(controller.genrePercentage);
export default router;
//# sourceMappingURL=movies.js.map