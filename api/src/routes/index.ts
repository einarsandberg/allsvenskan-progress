import { Router } from 'express';
import MatchesRouter from './matches';
// Init router and path
const router = Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.use('/matches', MatchesRouter);
// Export the base-router
export default router;