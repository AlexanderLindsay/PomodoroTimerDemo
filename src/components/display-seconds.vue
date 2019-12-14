<template>
    <span>{{ minutes }}:{{ seconds }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DisplaySeconds extends Vue {
  @Prop() private totalSeconds!: number;

  private pad(time: number) {
      const str = '' + time;
      return str.padStart(2, '0');
  }

  get minutes() {
      const m = Math.floor(this.totalSeconds / 60);
      return this.pad(m);
  }

  get seconds() {
      const s = this.totalSeconds % 60;
      return this.pad(s);
  }
}
</script>