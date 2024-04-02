import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

const useCounter = (initialValue, ms) => {
    const [count, setCount] = useState(initialValue);
    const intervalRef = useRef(null);
    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, ms);
    }, []);
    const stop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);
    const reset = useCallback(() => {
        setCount(0);
        stop()
    }, []);
    return { count, start, stop, reset };
}

export default function SetTimer() {
    const [currentHours, setCurrentHours] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const { count, start, stop, reset } = useCounter(0, 1000);

    const timer = () => {
        const checkMinutes = Math.floor(count / 60);
        const hours = Math.floor(count / 3600);
        const minutes = checkMinutes % 60;
        const seconds = count % 60;
        setCurrentHours(hours)
        setCurrentSeconds(seconds)
        setCurrentMinutes(minutes)
    }
    
    useEffect(timer, [count]);
    return (
        <div className="timer-container">
            <div className="timer">
                {currentHours < 10 ? `0${currentHours}` : currentHours}:
                {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
                {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
            </div>
            <div className="button-container">
                <button className="button" onClick={start}>Start</button>
                <button className="button" onClick={stop}>Stop</button>
                <button className="button" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}
