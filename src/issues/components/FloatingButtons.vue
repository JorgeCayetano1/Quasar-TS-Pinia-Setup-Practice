<script setup lang="ts">
import { toRef } from 'vue';

interface Props {
  buttons: button[];
}

interface button {
  icon: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  action: () => void;
}

const props = defineProps<Props>();
const buttons = toRef(props, 'buttons');
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="(item, index) of buttons"
      :key="index"
      class="q-mr-sm"
      round
      :color="item.color"
      :icon="item.icon"
      :size="item.size"
      @click="item.action()"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
