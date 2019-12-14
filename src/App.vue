<template>
  <div id="app">
    <pomodoro-timer label="My Task"></pomodoro-timer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PomodoroTimer from './components/pomodoro-timer.vue';

@Component({
  components: {
    PomodoroTimer
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
