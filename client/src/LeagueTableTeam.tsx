import React from 'react';
import './LeagueTableTeam.css';
export type Team = {
    name: string;
    points: number;
    position?: number;
}

const LeagueTableTeam: React.FC<Team> = (props: Team) => {
    return (
        <div className="team">
            <span>{props.position}. </span>
            <span>{props.name}</span>
            <span> {props.points}</span>
        </div>
    );
};
    
export default LeagueTableTeam;