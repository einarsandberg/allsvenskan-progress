import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeGoals: string;
  awayGoals: string;
}

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    fetch('/api/matches')
      .then((res: Response) => res.json())
      .then((data: Match[]) => {
        setMatches(data);
      });
  });
  return (
    <div className="App">
    </div>
  );
};

export default App;