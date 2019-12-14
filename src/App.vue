<template>
  <div id="app">
    <pomodoro-timer label="a Task" v-bind:sections="pomodoroSections"></pomodoro-timer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PomodoroTimer from './components/pomodoro-timer.vue';
import {TimerType, PomodoroSection} from './types/PomodoroSection';

@Component({
  components: {
    PomodoroTimer
  },
})
export default class App extends Vue {
  pomodoroSections = [
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(5),
    PomodoroSection.work(25),
    PomodoroSection.break(15)
  ];
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #96CCFF;
  height: 100%;
}
</style>
