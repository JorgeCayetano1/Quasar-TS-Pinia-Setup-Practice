import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

interface Arg {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Arg): Promise<Issue> => {
  const newIssueData = {
    title,
    body,
    labels,
  };
  const { data } = await githubApi.post<Issue>('/issues', newIssueData);
  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();

  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.refetchQueries(['issues'], {
        exact: false,
      });

      queryClient.setQueriesData(['issue', issue.number], issue);
      // termina con success
    },
    onSettled: () => {
      // termina con error o success
    },
  });

  return {
    issueMutation,
  };
};

export default useIssueMutation;
