<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from 'src/issues/composables/useLabels';

const { isLoading, labelsQuery, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner :size="'50px'" :thickness="1" v-if="isLoading" />

    <q-chip
      v-for="label of labelsQuery"
      :key="label.id"
      :style="`color: #${label.color};`"
      :outline="!selectedLabels.includes(label.name)"
      clickable
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
