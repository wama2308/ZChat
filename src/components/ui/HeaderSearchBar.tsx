import { SPACES, type AppTheme } from "@config/themes/themes";
import Icon from "@react-native-vector-icons/ionicons";
import { getHeaderStyles } from "@styles/contacts/HeaderContacts.styles";
import { memo, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Platform, View, type StyleProp, type ViewStyle } from "react-native";
import { Button, Searchbar, Text, useTheme } from "react-native-paper";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  left: ReactNode;
  textCenter?: string;
  contentCenter?: ReactNode;
  right?: ReactNode;
  valueSearchBar: string;
  actionSearchBar: (value: string) => void;
  stylesContainer?: StyleProp<ViewStyle>;
}

const HeaderSearchBar = ({
  left,
  textCenter,
  contentCenter,
  right,
  actionSearchBar,
  valueSearchBar,
}: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const marginTop = Platform.OS === "ios" ? insets.top : insets.top + SPACES.m1;
  const searchBarRef = useRef<React.ComponentRef<typeof Searchbar>>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const height = useSharedValue(60);
  const searchMarginTop = useSharedValue(0);

  const styles = useMemo(
    () => getHeaderStyles(colors, marginTop),
    [colors, marginTop] // Solo recalcula si cambian
  );

  const toggleHeader = (focused: boolean) => {
    if (isSearchFocused === focused) return;
    const animationConfig = {
      duration: Platform.OS === "ios" ? 250 : 150,
    };

    height.value = withTiming(focused ? 0 : 60, animationConfig);
    searchMarginTop.value = withTiming(focused ? SPACES.m2 : 0, animationConfig);
    setIsSearchFocused(focused);
  };

  const handleCancelSearch = () => {
    actionSearchBar("");
    toggleHeader(false);
    requestAnimationFrame(() => {
      searchBarRef.current?.blur();
      Keyboard.dismiss();
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: Platform.OS === "ios" ? "hidden" : "visible",
    };
  });

  const animatedStylesMarginTop = useAnimatedStyle(() => {
    return {
      marginTop: searchMarginTop.value,
    };
  });

  return (
    <View style={[styles.viewContainer]}>
      <Animated.View
        style={[styles.viewHeader, animatedStyles, Platform.OS === "android" && { elevation: 2 }]}
      >
        {left}
        <View style={styles.viewTitle}>
          {textCenter ? <Text style={styles.textTitle}>{textCenter}</Text> : contentCenter}
        </View>
        {right}
      </Animated.View>

      <Animated.View
        style={[
          styles.searchContainer,
          animatedStylesMarginTop,
          Platform.OS === "android" && { elevation: 2 },
        ]}
      >
        <Searchbar
          ref={searchBarRef}
          placeholder={`${t("common.label-search")}...`}
          onChangeText={actionSearchBar}
          value={valueSearchBar}
          onFocus={() => toggleHeader(true)}
          onBlur={() => {
            // solo colapsar si no hay texto real
            if (!valueSearchBar?.trim()) {
              toggleHeader(false);
            }
          }}
          style={styles.searchBar}
          icon={() => <Icon name="search-outline" size={22} color={colors.onBackground} />}
          clearIcon={
            valueSearchBar
              ? () => <Icon name="close-outline" size={22} color={colors.onBackground} />
              : undefined
          }
          autoCorrect={false}
          autoComplete="off"
          importantForAutofill="no"
          keyboardType="default"
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

export default memo(HeaderSearchBar);
