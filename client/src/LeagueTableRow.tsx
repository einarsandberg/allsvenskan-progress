import React from 'react';
import './LeagueTableRow.css';
export interface LeagueTableRowProps extends Team {    
    position: number;
    isSelected: boolean;
    updateSelectedTeamsCallback: (teamName: string) => void;
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
        <tr 
            className={`league-table-row${!props.isSelected ? ' greyed-out' : ''}`} 
        >
            <td>{props.position}. </td>
            <td 
                className="league-table-row-name-col"
                onClick={(): void => props.updateSelectedTeamsCallback(props.name)}>{props.name}
            </td>
            <td>{props.stats.matchesPlayed}</td>
            <td>{props.stats.goalsScored}</td>
            <td>{props.stats.goalsConceded}</td>
            <td>{props.stats.goalDifference}</td>
            <td>{props.stats.points}</td>
        </tr>
    );
};
    
export default LeagueTableRow;