import { Router } from 'express';
import * as fs from 'fs';

export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeGoals: string;
    awayGoals: string;
}

const router = Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../matches.json', 'utf8', (err, data: string) => {
        if (err) throw err;
        const obj: Match[] = JSON.parse(data);
        res.send(JSON.stringify(obj));
    });
});

export default router;