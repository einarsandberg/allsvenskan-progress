export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeGoals: string;
    awayGoals: string;
}
export interface TeamStats {
    team: string;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

export interface Round extends Array<TeamStats>{}

class MatchesController {
    public static getRounds(matches: Match[]): Round[] {
        const rounds: Round[] = [];
        while (matches.length > 0) {
            // Rounds consist of 8 matches, so get the next 8 until there's no left.
            const matchesInRound = matches.splice(0, 8);
            let roundResults: TeamStats[] = [];
            matchesInRound.forEach((match) => {
                let homeTeam, awayTeam;
                // If it's not the initial round, we need to include previous results in calculation.
                if (rounds.length > 0) {
                    [homeTeam, awayTeam] = this.getNextStandingsForTeamsInMatch(match, rounds[rounds.length - 1]);
                }
                else {
                    homeTeam = this.createRoundStandings(match.homeTeam, match);
                    awayTeam = this.createRoundStandings(match.awayTeam, match);
                }
                roundResults.push(homeTeam);
                roundResults.push(awayTeam);
            });
            roundResults.sort((a, b) => this.compareStandings(a, b));
            rounds.push(roundResults);
        }
        return rounds;
    }

    private static getNextStandingsForTeamsInMatch(match: Match, round: Round): TeamStats[] {
        const previousStandingHomeTeam = this.getPreviousRoundStandings(match.homeTeam, round);
        const previousStandingAwayTeam = this.getPreviousRoundStandings(match.awayTeam, round);
        const currentStandingHomeTeam = this.createRoundStandings(match.homeTeam, match);
        const currentStandingAwayTeam = this.createRoundStandings(match.awayTeam, match);

        const nextStandingHomeTeam = this.mergeStandings(previousStandingHomeTeam, currentStandingHomeTeam);
        const nextStandingAwayTeam = this.mergeStandings(previousStandingAwayTeam, currentStandingAwayTeam);

        return [nextStandingHomeTeam, nextStandingAwayTeam];
    }
    // Get round stats for a given team
    private static createRoundStandings(team: string, match: Match): TeamStats {
        const [goalsFor, goalsAgainst] = this.getTeamGoals(match, team);
        const goalDifference = goalsFor - goalsAgainst;
        return {
            team,
            goalsFor,
            goalsAgainst,
            goalDifference,
            points: this.getPoints(goalDifference),
        };
    }

    private static getTeamGoals(match: Match, team: string): number[] {
        const res = [parseInt(match.homeGoals), parseInt(match.awayGoals)];
        return team === match.homeTeam ? res : res.reverse();
    }

    private static getPreviousRoundStandings(team: string, previousRoundStats: TeamStats[]): TeamStats {
        return previousRoundStats.find((prev) => prev.team === team)!;
    }
    
    private static mergeStandings(a: TeamStats, b: TeamStats): TeamStats {
        return {
            team: a.team,
            goalsFor: a.goalsFor + b.goalsFor,
            goalsAgainst: a.goalsAgainst + b.goalsAgainst,
            goalDifference: a.goalDifference + b.goalDifference,
            points: a.points + b.points,
        };
    }

    private  static getPoints(goalDifference: number): number {
        if (goalDifference > 0) {
            return 3;
        }
        else if (goalDifference < 0) {
            return 0;
        }
        return 1;
    }

    private  static compareStandings(a: TeamStats, b: TeamStats): number {
        if (a.points < b.points) {
            return 1;
        }
        else if (a.points > b.points) {
            return -1;
        }
        return 0;
    }
}

export default MatchesController;