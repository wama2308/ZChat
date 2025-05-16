import { SPACES, type AppTheme } from "@config/themes/themes";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { getHeaderStyles } from "@styles/contacts/HeaderContacts.styles";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, Platform, TouchableOpacity, View } from "react-native";
import { Button, Searchbar, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderContacts = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();
  const insets = useSafeAreaInsets();
  const marginTop = Platform.OS === "ios" ? insets.top : insets.top + SPACES.m1;

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const headerHeight = useRef(new Animated.Value(60)).current;
  const searchMarginTop = useRef(new Animated.Value(0)).current; // Valor inicial: 0
  const searchBarRef = useRef<any>(null); // Referencia para el SearchBar

  const styles = useMemo(
    () => getHeaderStyles(colors, marginTop),
    [colors, marginTop] // Solo recalcula si cambian
  );

  const toggleHeader = (focused: boolean) => {
    setIsSearchFocused(focused);
    Animated.parallel([
      Animated.timing(headerHeight, {
        toValue: focused ? 0 : 60,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(searchMarginTop, {
        toValue: focused ? SPACES.m2 : 0, // 16 cuando está enfocado, 0 cuando no
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleCancelSearch = () => {
    setSearchQuery("");
    searchBarRef.current?.blur();
    toggleHeader(false);
  };

  return (
    <View style={[styles.viewContainer]}>
      <Animated.View style={[styles.viewHeader, { height: headerHeight }]}>
        <TouchableOpacity style={styles.touchableText} onPress={() => {}}>
          <Text style={styles.text}>{t("contacts.classify")}</Text>
        </TouchableOpacity>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>{t("tabs.label-contacts")}</Text>
        </View>
        <Icon
          name="add-outline"
          size={24}
          color={colors.brightBlue}
          style={{ marginHorizontal: SPACES.m2 }}
          onPress={() => navigation.navigate("NewContact")}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.searchContainer,
          {
            marginTop: searchMarginTop, // Animación aplicada aquí
          },
        ]}
      >
        <Searchbar
          ref={searchBarRef}
          placeholder={`${t("common.label-search")}...`}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onFocus={() => toggleHeader(true)}
          onBlur={() => !searchQuery && toggleHeader(false)}
          style={styles.searchBar}
          icon={() => <Icon name="search-outline" size={22} color={colors.onBackground} />}
          clearIcon={
            searchQuery
              ? () => <Icon name="close-outline" size={22} color={colors.onBackground} />
              : undefined
          }
        />
        {isSearchFocused && (
          <Button onPress={handleCancelSearch} textColor={colors.brightBlue} style={styles.cancelButton}>
            {t("common.label-cancel")}
          </Button>
        )}
      </Animated.View>
    </View>
  );
};

export default HeaderContacts;
