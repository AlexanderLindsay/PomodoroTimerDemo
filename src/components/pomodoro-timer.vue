<template>
    <div>
        <h1>{{ label }}</h1>
        <template v-if="isRunning()">
            <display-seconds v-bind:total-seconds="remainingSeconds"></display-seconds> remaining
        </template>
        <template v-else>
            <button type="button" v-on:click="start">Start</button>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DisplaySeconds from './display-seconds.vue';

enum TimerState {
    NotStarted,
    Running
}

enum TimerType {
    Work,
    Break
}

class PomodoroSection {

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

const pomodoroMethod = [
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(15)
]

@Component({
    name: 'pomodoro-timer',
    components: {
        DisplaySeconds
    }
})
export default class PomodoroTimer extends Vue {
  @Prop() private label!: string;

  remainingSeconds: number = 0;
  state: TimerState = TimerState.NotStarted;
  methodIndex: number = 0;

  isRunning () {
      return this.state === TimerState.Running;
  }

  start () {
      const section = pomodoroMethod[this.methodIndex];
      if (section) {
        this.state = TimerState.Running;
        this.remainingSeconds = section.seconds;
        window.setInterval(this.tick, 1000);
      }
  }

  private tick () {
      this.remainingSeconds--;
  }
}
</script>