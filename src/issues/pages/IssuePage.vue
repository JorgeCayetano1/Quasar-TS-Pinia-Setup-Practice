<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';

const route = useRoute();
const { id = '' } = route.params;
</script>

<template>
  <LoaderSpinner color="white" />

  <RouterLink class="text-white" to="/">Go Back</RouterLink>

  <!-- Header -->
  <IssueCard />

  <!-- Comentarios -->
  <LoaderSpinner :thickness="1" size="1.5rem" :show-text="false" />

  <div>
    <span class="text-h3 q-mb-md">Comments (5)</span>
    <IssueCard v-for="comments of 5" :key="comments" />
  </div>
</template>

<style scoped></style>
