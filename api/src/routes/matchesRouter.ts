import { Router } from 'express';
import * as fs from 'fs';
import MatchesController, { Match } from '../controllers/matchesController';
const router = Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../matches.json', 'utf8', (err, data: string) => {
        if (err) throw err;
        const matches: Match[] = JSON.parse(data);
        res.send(JSON.stringify(MatchesController.getRounds(matches)));
    });
});

export default router;