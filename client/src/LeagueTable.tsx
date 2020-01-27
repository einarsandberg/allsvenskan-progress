import React from 'react';
import { Round } from './App';
import LeagueTableTeam, { Team } from './LeagueTableTeam';
import './LeagueTable.css';
type LeagueTableProps = {
    rounds: Round[];
    currentRoundNum: number;
}


const LeagueTable: React.FC<LeagueTableProps> = (props: LeagueTableProps) => {
    const currentRound = props.rounds[props.currentRoundNum];
    const teamNames = Object.keys(currentRound);
    const teamsWithPoints: Team[] = [];
    teamNames.forEach((team) => {
        teamsWithPoints.push({name: team, points: getCurrentPoints(team, props.rounds, props.currentRoundNum)});
    });

    const table = teamsWithPoints.sort((a: Team, b: Team) => {
        if (a.points < b.points) {
            return 1;
        } else if (a.points >  b.points) {
            return -1;
        }
        return 0;
    }).map((team:  Team, i: number) => {
        return <LeagueTableTeam 
            key={team.name}
            name={team.name}
            points={team.points}
            position={i + 1}
        />;
    });
    return (
        <div className="league-table">
            {table}
        </div>
    );
};


function getCurrentPoints(teamName: string, rounds: Round[] , currentRoundNum: number): number {
    return rounds.slice(0, currentRoundNum)
        .reduce((prev, curr) => {
            return prev + curr[teamName];
        }, 0);
}

export default LeagueTable;