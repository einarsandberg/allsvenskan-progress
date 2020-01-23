import React from 'react';
interface TeamProps  {
    name: string;
    points: number;
}

const Team: React.FC<TeamProps> = (props: TeamProps) => {
    return (
        <div className="team">
            {props.name}
            {props.points}
        </div>
    );
};
    
export default Team;