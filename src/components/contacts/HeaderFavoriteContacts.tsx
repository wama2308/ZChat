import HeaderSearchBar from "@components/ui/HeaderSearchBar";
import { type AppTheme } from "@config/themes/themes";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

const HeaderFavoriteContacts = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const handleActionSearchBar = (value: string) => {
    console.log("searchbaraaaqa ", value);
  };

  return (
    <HeaderSearchBar
      left={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.blueBootstrap }}>{t("common.label-cancel")}</Text>
        </TouchableOpacity>
      }
      textCenter={t("tabs.label-contacts")}
      right={
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: colors.blueBootstrap }}>{t("common.label-ok")}</Text>
        </TouchableOpacity>
      }
      actionSearchBar={handleActionSearchBar}
    />
  );
};

export default HeaderFavoriteContacts;
