<template>
    <div>
        <h1>{{ label }}</h1>
        <template v-if="isRunning()">
            <p>
                {{ activity }}
            </p>
            <display-seconds v-bind:total-seconds="remainingSeconds"></display-seconds> remaining
        </template>
        <template v-else-if="isStopped()">
            Just finished {{ activity }}.
            <button type="button" v-on:click="start">Continue</button>
        </template>
        <template v-else>
            <button type="button" v-on:click="start">Start</button>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DisplaySeconds from './display-seconds.vue';
import {TimerType, PomodoroSection} from '../types/PomodoroSection';

enum TimerState {
    NotStarted,
    Running,
    Stopped
}

@Component({
    name: 'pomodoro-timer',
    components: {
        DisplaySeconds
    }
})
export default class PomodoroTimer extends Vue {
  @Prop() private label!: string;
  @Prop() private sections!: PomodoroSection[];

  activity: string = "";
  remainingSeconds: number = 0;
  state: TimerState = TimerState.NotStarted;
  methodIndex: number = 0;
  timerId: number = 0;

  isRunning () {
      return this.state === TimerState.Running;
  }

  isStopped () {
      return this.state === TimerState.Stopped;
  }

  start () {
      const section = this.sections[this.methodIndex];
      if (section) {
        this.state = TimerState.Running;

        this.activity = '';
        if (section.timerType === TimerType.Work) {
            this.activity = 'Working';
        } else if (section.timerType === TimerType.Break) {
            this.activity = 'Taking a Break';
        }

        this.remainingSeconds = section.seconds;
        this.timerId = window.setInterval(this.tick, 1000);
      }
  }

  private tick () {
      this.remainingSeconds--;

      if(this.remainingSeconds === 0) {
          this.finishSection();
      }
  }

  private finishSection () {
      if(this.timerId > 0) {
        window.clearInterval(this.timerId);
      }

      const section = this.sections[this.methodIndex];
      if(section) {
        this.state = TimerState.Stopped;
        this.activity = '';
        if (section.timerType === TimerType.Work) {
            this.activity = 'some work';
        } else if (section.timerType === TimerType.Break) {
            this.activity = 'taking a break';
        }

        this.methodIndex = (this.methodIndex + 1) % this.sections.length;
      }
  }
}
</script>