<script setup lang="ts">
import { useIssuesStore } from 'src/stores/issues';

const issuesStore = useIssuesStore();
</script>

<template>
  <div>
    <q-btn-toggle
      v-model="issuesStore.state"
      toggle-color="primary"
      push
      spread
      :options="[
        { label: 'All', value: '' },
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ]"
    />
  </div>
</template>

<style scoped></style>
