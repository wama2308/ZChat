import HeaderSearchBar from "@components/ui/HeaderSearchBar";
import { type AppTheme } from "@config/themes/themes";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  searchValue?: string;
  handleSearchValue: (value: string) => void;
  handleOpenClassify: (value: boolean) => void;
}

const HeaderContacts = ({ searchValue = "", handleSearchValue, handleOpenClassify }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const handleActionSearchBar = (value: string) => {
    handleSearchValue(value);
  };

  return (
    <HeaderSearchBar
      left={
        <TouchableOpacity style={{}} onPress={() => handleOpenClassify(true)}>
          <Text style={{ color: colors.blueBootstrap }}>{t("contacts.classify")}</Text>
        </TouchableOpacity>
      }
      textCenter={t("tabs.label-contacts")}
      right={
        <Icon
          name="add-outline"
          size={24}
          color={colors.brightBlue}
          style={{}}
          onPress={() => navigation.navigate("NewContact")}
        />
      }
      valueSearchBar={searchValue}
      actionSearchBar={handleActionSearchBar}
    />
  );
};

export default HeaderContacts;
