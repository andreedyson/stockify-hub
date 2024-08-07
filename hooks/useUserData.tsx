import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser(userId: string) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
