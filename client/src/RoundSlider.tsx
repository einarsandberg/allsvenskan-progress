import React, { SetStateAction, Dispatch, ChangeEvent } from 'react';
import './LeagueTable.css';
type RoundSliderProps = {
    setCurrentRoundNumCallback: Dispatch<SetStateAction<number>>;
}

const RoundSlider: React.FC<RoundSliderProps> = (props: RoundSliderProps) => {
    return (
        <div className="round-slider">
            <input 
                type="range"
                name="round-slider" 
                min="0" 
                max="29" 
                step="1"
                onChange={ (e: ChangeEvent<HTMLInputElement>): void => props.setCurrentRoundNumCallback(parseInt(e.target.value)) }
            ></input>
            <label htmlFor="round-slider">Round</label>
        </div>
    );
};
    
export default RoundSlider;