import { Router } from 'express';
import * as fs from 'fs';

export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeGoals: string;
    awayGoals: string;
}

export interface Round {
    teams: [{[key: string]: number;} ];
}

const router = Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../matches.json', 'utf8', (err, data: string) => {
        if (err) throw err;
        const matches: Match[] = JSON.parse(data);
        res.send(JSON.stringify(getPointsPerRound(matches)));

    });
});

function getPointsPerRound(matches: Match[]) : any {
    const res: any = [];
    let i = 0;
    let j = 0;
    matches.forEach((match: Match) => {
        if (!res[j]) {
            res[j] = {};
        }
        res[j][match.awayTeam] = getPoints(parseInt(match.awayGoals), parseInt(match.homeGoals));
        res[j][match.homeTeam] = getPoints(parseInt(match.homeGoals), parseInt(match.awayGoals));
        i++;
        if (i === 8) {
            i = 0;
            j++;
        }
    });
    return res;
}

function getPoints(teamGoals: number, opponentGoals: number): number {
    if (teamGoals > opponentGoals) {
        return 3;
    } else if (teamGoals < opponentGoals) {
        return 0;
    }
    return 1;
}

export default router;