import React, { SetStateAction, Dispatch, ChangeEvent } from 'react';
import './RoundSlider.css';
type RoundSliderProps = {
    setCurrentRoundNumCallback: Dispatch<SetStateAction<number>>;
    currentValue: number;
}

const RoundSlider: React.FC<RoundSliderProps> = (props: RoundSliderProps) => {
    
    return (
        <div className="round-slider-container">
            <input
                className="round-slider"
                type="range"
                name="round-slider" 
                min="0" 
                max="30" 
                step="1"
                value={props.currentValue}
                onChange={ (e: ChangeEvent<HTMLInputElement>): void => props.setCurrentRoundNumCallback(parseInt(e.target.value)) }
            ></input>
            <label htmlFor="round-slider">Round {props.currentValue}</label>
        </div>
    );
};
    
export default RoundSlider;