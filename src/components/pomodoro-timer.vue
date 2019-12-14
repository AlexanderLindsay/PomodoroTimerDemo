<template>
    <div class="container">
        <div class="content" v-bind:class="contentClass">
            <template v-if="isRunning()">
                <div>
                    {{ activity }} {{ label }}
                </div>
                <div>
                    <display-seconds v-bind:total-seconds="remainingSeconds"></display-seconds>
                    remaining
                </div>
            </template>
            <template v-else-if="isStopped()">
                <div>
                    Just finished {{ activity }}.
                </div>
                <div>
                    Press `Continue` to begin to {{ nextActivity }}.
                </div>
                <button type="button" v-on:click="start">Continue</button>
            </template>
            <template v-else>
                <button type="button" v-on:click="start">Start</button>
            </template>
        </div>
        <div class="counts">
            <div>
                Full Cycles Completed: {{ cycles }}
            </div>
            <div>
                Current Cycle Progress: {{ currentCycle.work }}
            </div>
        </div>
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
  nextActivity: string = "";
  contentClass: any = {};
  remainingSeconds: number = 0;
  state: TimerState = TimerState.NotStarted;
  cycles: number = 0;
  currentCycle: { work: number, break: number} = { work: 0, break: 0};
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
            this.contentClass = { working: true };
            this.activity = 'Working on ';
        } else if (section.timerType === TimerType.Break) {
            this.contentClass = { break: true };
            this.activity = 'Taking a Break from ';
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

      this.activity = '';
      this.nextActivity = '';

      const section = this.sections[this.methodIndex];
      if(section) {
        this.state = TimerState.Stopped;
        this.contentClass = { paused: true };
        if (section.timerType === TimerType.Work) {
            this.activity = 'some work';
            this.nextActivity = 'take a break';
            this.currentCycle.work++;
        } else if (section.timerType === TimerType.Break) {
            this.activity = 'taking a break';
            this.nextActivity = 'start work';
            this.currentCycle.break++;
        }

        this.methodIndex = (this.methodIndex + 1) % this.sections.length;
        if(this.methodIndex === 0) {
            this.reset();
        }
      }
  }

  private reset () {
      this.currentCycle = { work: 0, break: 0 };
      this.state = TimerState.NotStarted;
      this.cycles++;
  }
}
</script>

<style>
    .container {
        display: grid;
        grid-template-areas:
            "content"
            "counts";
    }
    .counts {
        grid-area: counts;
    }

    .working {
        --content-background: #A463F2;
    }

    .onbreak {
        --content-background: #9EEBCF;
    }

    .paused {
        --content-background: ##FFDFDF;
    }

    .content {
        background-color: var(--content-background);
        grid-area: content;
        font-size: 5em;
    }

    button {
        padding: 1em;
        border-radius: 3px;
    }
</style>