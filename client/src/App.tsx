import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import LeagueTable from './LeagueTable';
export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeGoals: string;
    awayGoals: string;
}

const App: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [teams, setTeams] = useState<string[]>([]);

    async function fetchData(): Promise<any> {
        const res = await fetch('/api/matches');
        res.json()
            .then((matches: Match[]) => {
                setMatches(matches);
                setTeams(getTeams(matches));
            });
    }

    useEffect(() => { 
        fetchData();
    }, []);

    return (
        <div className="App">
            <LeagueTable matches={matches} teams={teams}/>
        </div>
    );
};

// Get unique teams sorted alpabetically
function getTeams(matches: Match[]): string[] {
    return matches
        .map((match) => match.homeTeam)
        .filter((team, i, arr) => arr.indexOf(team) === i)
        .sort();
}

export default App;