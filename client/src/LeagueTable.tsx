import React, { useState } from 'react';
import { Round } from './App';
import LeagueTableRow, { TeamStats, Team } from './LeagueTableRow';
import './LeagueTable.css';
type LeagueTableProps = {
    rounds: Round[];
    currentRoundNum: number;
}

const LeagueTable: React.FC<LeagueTableProps> = (props: LeagueTableProps) => {
    const teamNames = Object.keys(props.rounds[0]);
    const [selectedTeams, setSelectedTeams] = useState<String[]>([]);

    const updateSelectedTeams = (teamName: string): void => {
        setSelectedTeams((prevSelectedTeams) => {
            return prevSelectedTeams.indexOf(teamName) !==  -1 ? prevSelectedTeams.filter((name) => name !== teamName)
                : [...prevSelectedTeams, teamName];
        });
    };
    
    const tableRows = teamNames
        .map((name): Team => {
            const stats = getCurrentStats(name, props.rounds, props.currentRoundNum);
            return {
                name,
                stats,
            };
        })
        .sort((a: Team, b: Team) => {
            if (a.stats.points < b.stats.points) {
                return 1;
            } else if (a.stats.points > b.stats.points) {
                return -1;
            }
            return 0;
        })
        .map((team: Team, i: number) => {
            return (
                <LeagueTableRow
                    key={team.name}
                    name={team.name}
                    stats={team.stats}
                    position={i + 1}
                    isSelected={selectedTeams.length === 0 || selectedTeams.indexOf(team.name) !== -1}
                    updateSelectedTeamsCallback={updateSelectedTeams}
                />
            );
        });

    return (

        <div className="league-table-wrapper">
            <table className="league-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Lag</th>
                        <th>M</th>
                        <th>GM</th>
                        <th>IM</th>
                        <th>+/-</th>
                        <th>P</th>
                    </tr>
                </thead>
                <tbody>
                    { tableRows }
                </tbody>
            </table>
        </div>
    );
};


function getCurrentStats(teamName: string, rounds: Round[], currentRoundNum: number): TeamStats  {
    const initialStats: TeamStats = {
        goalsScored: 0,
        goalsConceded: 0,
        goalDifference: 0,
        points: 0,
        matchesPlayed: 0,
    };

    return rounds.slice(0, currentRoundNum)
        .reduce((prev: TeamStats, curr: Round) => {
            const teamRoundStats = curr[teamName];
            const goalDifference = teamRoundStats.goalsFor - teamRoundStats.goalsAgainst;
            return {
                goalsScored: prev.goalsScored + teamRoundStats.goalsFor,
                goalsConceded: prev.goalsConceded + teamRoundStats.goalsAgainst,
                goalDifference: prev.goalDifference + goalDifference,
                points: prev.points + getPoints(goalDifference),
                matchesPlayed: prev.matchesPlayed + 1,
            };

        }, initialStats);
}

function getPoints(goalDifference: number): number { 
    if (goalDifference > 0) {
        return 3;
    } else if (goalDifference < 0) {
        return 0;
    }
    return 1;
}

export default LeagueTable;