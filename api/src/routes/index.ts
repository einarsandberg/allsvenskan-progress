import { Router } from 'express';

// Init router and path
const router = Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});
// Export the base-router
export default router;