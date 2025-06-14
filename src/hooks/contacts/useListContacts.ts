import { QueryKey } from "@constants/queriesAndMutations";
import { getAllContacts } from "@database/actions/contacts";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
}

const useListContacts = ({ enabled }: Props) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [QueryKey.contact.contactAll],
    queryFn: getAllContacts,
    staleTime: 6000 * 5,
    enabled: enabled,
  });

  return { data, isFetching, isError, error };
};

export default useListContacts;
