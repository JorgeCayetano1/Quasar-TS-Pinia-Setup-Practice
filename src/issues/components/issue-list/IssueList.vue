<script setup lang="ts">
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
</script>

<template>
  <div v-for="issue of 20" :key="issue" class="row">
    <IssueCard />
  </div>
</template>

<style scoped></style>
