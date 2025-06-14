import useDebounce from "@hooks/config/useDebounce";
import useListContacts from "@hooks/contacts/useListContacts";
import useSearchContacts from "@hooks/contacts/useSearchContacts";
import { useCallback, useState } from "react";

export default function useContactsScreen() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { value: inputValueDebounce } = useDebounce(searchValue);
  const isSeeker = inputValueDebounce.trim().length >= 3;

  const handleSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const {
    data: allContacts,
    isFetching: isFetchingAllContacts,
    isError: isErrorAllContacts,
  } = useListContacts({ enabled: !isSeeker });

  const {
    data: seekerContacts,
    isFetching: isFetchingSeekerContacts,
    isError: isErrorSeekerContacts,
  } = useSearchContacts({ textSeeker: inputValueDebounce });

  const dataContactsZChatAll = isSeeker ? seekerContacts : allContacts;
  const isErrorDataContactsZChatAll = isSeeker ? isErrorSeekerContacts : isErrorAllContacts;

  return {
    searchValue,
    handleSearchValue,
    isSeeker,
    dataContactsZChatAll,
    isFetchingAllContacts,
    isFetchingSeekerContacts,
    isErrorDataContactsZChatAll,
  };
}
