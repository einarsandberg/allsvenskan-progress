import { Router } from 'express';
import * as fs from 'fs';

export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeGoals: string;
    awayGoals: string;
}
export interface TeamRoundStats {
    goalsFor: number;
    goalsAgainst: number;
}

export interface Round {
    [key: string]: TeamRoundStats;
}

const router = Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../matches.json', 'utf8', (err, data: string) => {
        if (err) throw err;
        const matches: Match[] = JSON.parse(data);
        res.send(JSON.stringify(getRounds(matches)));
    });
});

function getRounds(matches: Match[]): Round[] {
    let i = 0;
    let res: Round[] = [{}];

    matches.forEach((match: Match) => {
        res[res.length - 1][match.homeTeam] = createTeamStats(match.homeGoals, match.awayGoals);
        res[res.length - 1][match.awayTeam] = createTeamStats(match.awayGoals, match.homeGoals);
        i++;
        if (i % 8 === 0 && i !== matches.length) {
            res.push({});
        }
    });

    return res;
}

function createTeamStats(goalsFor: string, goalsAgainst: string): TeamRoundStats {
    return {
        goalsFor: parseInt(goalsFor),
        goalsAgainst: parseInt(goalsAgainst),
    };
}

export default router;