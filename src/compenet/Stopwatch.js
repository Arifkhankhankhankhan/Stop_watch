import React, { useState, useEffect } from 'react';
import './Stopwatch.css'; // Import your CSS file

function Stopwatch() {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        return () => clearInterval(intervalId); // Cleanup function to clear interval
    }, [intervalId]);

    const startStopwatch = () => {
        setIsActive(prev => !prev); // Toggle isActive state
    };

    const resetStopwatch = () => {
        clearInterval(intervalId); // Clear interval
        setTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset time
        setIsActive(false); // Set isActive to false
    };

    useEffect(() => {
        if (isActive) {
            const id = setInterval(() => {
                setTime(prevTime => {
                    let { hours, minutes, seconds } = prevTime;
                    seconds++;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                    }
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                    return { hours, minutes, seconds };
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [isActive]); // Run effect when isActive changes

    return (
        <div className="container">
            <div className="header">
                <h2>Stopwatch</h2>
            </div>
            <div className="display">
                <h2>{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</h2>
            </div>
            <div className="buttons">
                <button onClick={startStopwatch}>{isActive ? 'Stop' : 'Start'}</button>
                <button onClick={resetStopwatch}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;
