import React from 'react';
import './LeagueTableRow.css';
export interface LeagueTableRowProps {    
    position: number;
    isSelected: boolean;
    updateSelectedTeamsCallback: (teamName: string) => void;
    stats: TeamStats;
    currentRoundNum: number;
}

export interface TeamStats {
    team: string;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

const LeagueTableRow: React.FC<LeagueTableRowProps> = (props: LeagueTableRowProps) => {
    return (
        <tr 
            className={`league-table-row${!props.isSelected ? ' greyed-out' : ''}`} 
        >
            <td>{props.position}. </td>
            <td 
                className="league-table-row-name-col"
                onClick={(): void => props.updateSelectedTeamsCallback(props.stats.team)}>{props.stats.team}
            </td>
            <td>{props.currentRoundNum + 1}</td>
            <td>{props.stats.goalsFor}</td>
            <td>{props.stats.goalsAgainst}</td>
            <td>{props.stats.goalDifference}</td>
            <td>{props.stats.points}</td>
        </tr>
    );
};
    
export default LeagueTableRow;