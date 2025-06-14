import HeaderSearchBar from "@components/ui/HeaderSearchBar";
import { type AppTheme } from "@config/themes/themes";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

const HeaderInviteContacts = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const handleActionSearchBar = (value: string) => {
    console.log("searchbaraaaqa ", value);
  };

  return (
    <HeaderSearchBar
      left={<HeaderBackButton onPress={() => navigation.goBack()} tintColor={colors.backButtonHeader} />}
      textCenter={t("tabs.label-contacts")}
      right={<></>}
      valueSearchBar=""
      actionSearchBar={handleActionSearchBar}
    />
  );
};

export default HeaderInviteContacts;
