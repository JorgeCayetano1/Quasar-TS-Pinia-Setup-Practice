<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from 'src/issues/composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;
const { issueQuery, issueCommentsQuery } = useIssue(+id);
</script>

<template>
  <RouterLink class="text-white" to="/">Go Back</RouterLink>

  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
    color="white"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>Issue with ID {{ id }} not found</p>

  <span class="text-h3 q-mb-md"
    >Comments ({{ issueCommentsQuery.data.value?.length }})</span
  >
  <div v-for="comment of issueCommentsQuery.data.value" :key="comment.id">
    <!-- Comentarios -->
    <LoaderSpinner
      v-if="issueCommentsQuery.isLoading.value"
      :thickness="1"
      size="1.5rem"
      :show-text="false"
    />
    <IssueCard v-else-if="comment" :issue="comment" />
    <p v-else>Comment with ID {{ '0' }} not found</p>
  </div>
</template>

<style scoped></style>
