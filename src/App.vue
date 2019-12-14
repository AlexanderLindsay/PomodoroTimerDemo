<template>
  <div id="app">
    <h1>Pomodoro Timer</h1>
    <div class="field">
      <label>Task
        <input v-model="task">
      </label>
    </div>
    <pomodoro-timer v-bind:label="task" v-bind:sections="pomodoroSections"></pomodoro-timer>
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
  task: string = "a task";
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
  padding: 4px;
  height: 100%;
}

.field {
  margin-bottom: 1em;
}
</style>
