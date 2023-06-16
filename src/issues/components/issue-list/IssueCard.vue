<script setup lang="ts">
import { Issue, State } from 'src/issues/interfaces/issue';
import { toRef } from 'vue';
import { timeSince } from 'src/shared/helpers/time-since';
import VueMarkDown from 'vue-markdown-render';
import { Comment } from 'src/issues/interfaces/comment';
import useIssue from '../../composables/useIssue';

interface Props {
  issue: Issue | Comment;
  //comment?: Comment;
}

const props = defineProps<Props>();
const issue = toRef(props, 'issue');
// const comment = toRef(props, 'comment');

const { setIssueCacheData } = useIssue(
  'number' in issue.value ? issue.value.number : 0,
  { autoload: false }
);
</script>

<template>
  <q-card
    @mouseenter="'number' in issue ? setIssueCacheData(issue) : null"
    class="text-black col-12 q-mb-md"
    flat
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User Avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${'number' in issue ? issue.number : 0}`">{{
            'title' in issue ? issue.title : issue.user.login
          }}</router-link>
        </q-item-label>
        <q-item-label caption>
          {{ timeSince(issue.created_at) }}
          ago
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ 'comments' in issue ? issue.comments : 0 }}
          </q-item-label>
          <q-chip
            v-if="
              'state' in issue
                ? issue.state === State.Closed
                : 'closed' === State.Closed
            "
            color="positive"
            text-color="white"
            icon="check"
          >
            Closed
          </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report">
            Open
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown-css">
      <vue-mark-down :source="issue.body" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip
          v-for="label of 'labels' in issue ? issue.labels : []"
          :key="label.id"
          :style="`color: #${label.color};`"
          outline
        >
          {{ label.name }}
        </q-chip>
      </div>
    </q-item-section>
  </q-card>
</template>

<style scoped>
.markdown-css img {
  width: 250px !important;
}
</style>
