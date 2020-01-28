import React from 'react';
import './LeagueTableRow.css';
export interface LeagueTableRowProps extends Team {    
    position: number;
}

export interface Team {
    name: string;
    stats: TeamStats;
}

export interface TeamStats {
    points: number;
    matchesPlayed: number;
    goalsScored: number;
    goalsConceded: number;
    goalDifference: number;
}

const LeagueTableRow: React.FC<LeagueTableRowProps> = (props: LeagueTableRowProps) => {
    return (
        <tr className="league-table-row">
            <td>{props.position}. </td>
            <td>{props.name}</td>
            <td>{props.stats.matchesPlayed}</td>
            <td>{props.stats.goalsScored}</td>
            <td>{props.stats.goalsConceded}</td>
            <td>{props.stats.goalDifference}</td>
            <td>{props.stats.points}</td>
        </tr>
    );
};
    
export default LeagueTableRow;