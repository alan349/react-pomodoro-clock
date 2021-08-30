import React from "react";

const workTime = 0.2;
const breakTime = 0.1;

class PomodoroClock extends React.Component {


    constructor(props) {
        super(props);
        this.workTimer = workTime * 60;
        this.breakTimer = breakTime * 60;
        this.state = { clock: this.workTimer, clockName: 'work', stopped: false }
        this.handleStartStop = this.handleStartStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.clock === 0 && this.state.stopped != true) {
            this.pauseClock();
            this.changeClock();
        }
    }

    startClock() {
        this.setState({
            stopped: false
        });
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    pauseClock() {
        this.setState({
            stopped: true
        });
        clearInterval(this.timerID);
    }

    resetClock() {
        this.setState({
            clock: this.state.clockName === 'work'
                ? this.workTimer
                : this.breakTimer
        })
    }

    changeClock() {
        this.setState({
            clock: this.state.clockName === 'work'
                ? this.breakTimer
                : this.workTimer,
            clockName: this.state.clockName === 'work'
                ? 'break'
                : 'work'
        })
        this.startClock();
    }

    tick() {
        this.setState((state) => {
            return { clock: state.clock - 1 }
        });
    }

    getClock() {
        const timeLeft = this.state.clock;
        const minTimeLeft = Math.floor(timeLeft / 60);
        const secTimeLeft = timeLeft - minTimeLeft * 60;
        return minTimeLeft + ":" + secTimeLeft.toString().padStart("2", "0");
    }

    handleStartStop() {
        if (this.state.stopped !== false) {
            this.startClock();
        } else {
            this.pauseClock();
        }
    }

    handleReset() {
        this.resetClock();
    }

    render() {
        return (
            <div>
                <h1>{this.state.clockName.toUpperCase()}</h1>
                <h2>{this.getClock()}</h2>
                <button onClick={this.handleStartStop}>{this.state.stopped ? "Start" : "Stop"}</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }

}

export default PomodoroClock;