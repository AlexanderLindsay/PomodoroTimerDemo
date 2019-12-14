export enum TimerType {
    Work,
    Break
}

export class PomodoroSection {

    public timerType: TimerType;
    public seconds: number;

    private constructor(
        timerType: TimerType,
        seconds: number) {
            this.timerType = timerType;
            this.seconds = seconds;
    }

    public static work(minutes: number) {
        return new PomodoroSection(TimerType.Work, minutes * 60);
    }

    public static break(minutes: number) {
        return new PomodoroSection(TimerType.Break, minutes * 60);
    }
}