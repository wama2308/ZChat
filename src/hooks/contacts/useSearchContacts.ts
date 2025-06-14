import { QueryKey } from "@constants/queriesAndMutations";
import { searchContacts } from "@database/actions/contacts";
import { useQuery } from "@tanstack/react-query";

interface Props {
  textSeeker: string;
}

const useSearchContacts = ({ textSeeker }: Props) => {
  return useQuery({
    queryKey: [QueryKey.contact.contactAll, textSeeker],
    queryFn: () => searchContacts(textSeeker),
    enabled: textSeeker.length >= 3,
    staleTime: 6000 * 5,
  });
};

export default useSearchContacts;
