import { Router } from 'express';
import MatchesRouter from './matchesRouter';
// Init router and path
const router = Router();

router.get('/', function(req, res) {
    res.send('API is working properly');
});

router.use('/rounds', MatchesRouter);
// Export the base-router
export default router;