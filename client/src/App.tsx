import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import LeagueTable from './LeagueTable';
import RoundSlider from './RoundSlider';
export interface Round {
    [key: string]: number;
}
const App: React.FC = () => {
    const [rounds, setRounds] = useState<Round[]>([]);
    const [currentRoundNum, setCurrentRoundNum] = useState<number>(0);
    useEffect(() => { 
        async function fetchData(): Promise<any> {
            const res = await fetch('/api/rounds');
            res.json()
                .then((r: Round[]) => {
                    setRounds(r);
                });
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <div className="table-container">
                { rounds.length > 0 ? (
                    <LeagueTable currentRoundNum={currentRoundNum} rounds={rounds} />
                ) : null
                }
                <RoundSlider setCurrentRoundNumCallback={setCurrentRoundNum}/>
            </div>
        </div>
    );
};

export default App;