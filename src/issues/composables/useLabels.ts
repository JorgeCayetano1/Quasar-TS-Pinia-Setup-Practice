import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Label } from 'src/issues/interfaces/labels';
import { useIssuesStore } from '../../stores/issues';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi<Label[]>('labels?per_page=100');
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();

  const {
    isLoading,
    isError,
    data: labelsQuery,
  } = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // one hour
  });

  return {
    // State
    isError,
    isLoading,
    labelsQuery,

    // Getters
    selectedLabels: computed(() => issuesStore.labels),

    // Methods
    toggleLabel: issuesStore.toggleLabel,
  };
};

export default useLabels;
