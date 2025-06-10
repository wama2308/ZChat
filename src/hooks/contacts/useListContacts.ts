import { QueryKey } from "@constants/queriesAndMutations";
import { getAllContacts } from "@database/actions/contacts";
import { useQuery } from "@tanstack/react-query";

const useListContacts = () => {
  const {
    data: dataContactsZChatAll,
    isFetching: isFetchingDataContactsZChatAll,
    isError: isErrorDataContactsZChatAll,
  } = useQuery({
    queryKey: [QueryKey.contact.contactAll],
    queryFn: getAllContacts,
    staleTime: 6000 * 5,
    enabled: true,
  });

  return { dataContactsZChatAll, isFetchingDataContactsZChatAll, isErrorDataContactsZChatAll };
};

export default useListContacts;
