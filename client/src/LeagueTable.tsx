import React, { useState } from 'react';
import { Round } from './App';
import LeagueTableRow, { TeamStats } from './LeagueTableRow';
import './LeagueTable.css';
type LeagueTableProps = {
    rounds: Round[];
    currentRoundNum: number;
}

const LeagueTable: React.FC<LeagueTableProps> = (props: LeagueTableProps) => {
    const [selectedTeams, setSelectedTeams] = useState<String[]>([]);
    
    const updateSelectedTeams = (teamName: string): void => {
        setSelectedTeams((prevSelectedTeams) => {
            return prevSelectedTeams.indexOf(teamName) !==  -1 ? prevSelectedTeams.filter((name) => name !== teamName)
                : [...prevSelectedTeams, teamName];
        });
    };
    
    const currentTable = props.rounds[props.currentRoundNum];
    const rows = currentTable.map((team: TeamStats, i: number) => {
        return (
            <LeagueTableRow
                key={team.team}
                stats={team}
                position={i + 1}
                isSelected={selectedTeams.length === 0 || selectedTeams.indexOf(team.team) !== -1}
                updateSelectedTeamsCallback={updateSelectedTeams}
                currentRoundNum={props.currentRoundNum}
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
                    { rows }
                </tbody>
            </table>
        </div>
    );
};

export default LeagueTable;