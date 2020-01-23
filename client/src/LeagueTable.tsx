import React from 'react';
import { Match } from './App';
import Team from './Team';
interface LeagueTableProps  {
    teams: string[];
    matches: Match[];
}

const LeagueTable: React.FC<LeagueTableProps> = (props: LeagueTableProps) => {
    const teams = props.teams.map((team) => <Team key={team} name={team} points={0} />);
    return (
        <div className="league-table">
            {teams}
        </div>
    );
};
    
export default LeagueTable;