const minuteArr = [];
for (let i = 0; i <= 30; i++) {
    minuteArr.push(i);
};

const secArr = [];
for (let i = 0; i <= 60; i+=5) {
    secArr.push(i);
};

const SetTimes = ({ minId, secId }) => {
    return (
        <div>
            <select id={minId} defaultValue={0}>
                {minuteArr.map((num) => {
                    return <option key={num + "_min"} value={num}>{num}</option>
                })}
            </select>
            <select id={secId} defaultValue={0}>
                {secArr.map((sec) => {
                    return <option key={sec + "_sec"} value={sec}>{sec}</option>
                })}
            </select>
        </div>
    );
};

export default SetTimes;
