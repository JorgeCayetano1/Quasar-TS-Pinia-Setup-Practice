import { Issue } from 'src/issues/interfaces/issue';
import { githubApi } from '../../api/githubApi';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { Comment } from '../interfaces/comment';
import { computed } from 'vue';

const sleep = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
};

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep();

  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Comment[]> => {
  await sleep();

  const { data } = await githubApi.get<Comment[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

interface Options {
  // Autoload issue and comments
  autoload?: boolean;
}

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
    }
  );

  const issueCommentsQuery = useQuery(
    ['issueComments', issueNumber],
    () => getIssueComments(issueNumber),
    // () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
      // enabled: computed(() => !!issueQuery.data.value),
    }
  );

  const prefetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );

    queryClient.prefetchQuery(
      ['issueComments', issueNumber],
      () => getIssueComments(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    issueQuery,
    issueCommentsQuery,

    // Methods
    prefetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
