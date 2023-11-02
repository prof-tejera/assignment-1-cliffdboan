import { useEffect, useState } from "react";
import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";

const Tabata = () => {
    const [timerRunning, setTimerRunning] = useState(false);
    const [rounds, setRounds] = useState(1);
    const [workTime, setWorkTime] = useState(0);
    const [restTime, setRestTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(workTime);

    const startTimer = () => {
        if (!timerRunning) {
            setTimerRunning(true);
        };
    };

    const pauseTimer = () => {
        if (timerRunning) {
            setTimerRunning(false);
        };
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setCurrentTime(workTime);
        setRounds(0);
    };

    useEffect(() => {
        let intervalId;

        if (timerRunning && rounds > 0) {
            intervalId = setInterval(() => {
                if (currentTime > 0) {
                    setCurrentTime(currentTime - 1);
                } else if (workTime === currentTime) {
                    setCurrentTime(restTime);
                } else {
                    setCurrentTime(workTime);
                    setRounds(rounds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timerRunning, rounds, currentTime, workTime, restTime])

    useEffect(() => {
        const workSecs = document.getElementById("work-sec");
        const restSecs = document.getElementById("rest-sec");
        const roundSelect = document.getElementById("rounds");
        const startBtn = document.getElementById("tab-start");
        const pauseBtn = document.getElementById("tab-pause");

        const handleWorkSelect = (e) => {
            setWorkTime(parseInt(e.target.value));
        };

        const handleRestSelect = (e) => {
            setRestTime(parseInt(e.target.value));
        };

        const handleRoundSelect = (e) => {
            setRounds(parseInt(e.target.value));
        };

        workSecs.addEventListener("change", handleWorkSelect);
        restSecs.addEventListener("change", handleRestSelect);
        roundSelect.addEventListener("change", handleRoundSelect);
        startBtn.addEventListener("click", startTimer);
        pauseBtn.addEventListener("click", pauseTimer);

        return () => {
            workSecs.removeEventListener("change", handleWorkSelect);
            restSecs.removeEventListener("change", handleRestSelect);
            roundSelect.removeEventListener("change", handleRoundSelect);
            startBtn.removeEventListener("click", startTimer);
            pauseBtn.removeEventListener("click", pauseTimer);
        }
    });

    return (
        <div className="countdown">
            <div className="clockface">
                <span>
                    {currentTime}
                    <br/>
                    Sets Remaining: {rounds}
                </span>
            </div>
            <div className="button-grid">
                <Button id="tab-start" value="Start" onClick={startTimer} />
                <Button id="tab-pause" value="Pause" onClick={pauseTimer} />
                <Button id="tab-reset" value="Reset" onClick={resetTimer} />
            </div>
            <div id="set-times">
                <SetTimes secId="work-sec" hideMins={true} />
                <SetTimes secId="rest-sec" hideMins={true} />
                <select id="rounds">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    )
};

export default Tabata;
