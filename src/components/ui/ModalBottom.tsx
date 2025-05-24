import { type AppTheme } from "@config/themes/themes";
import { getMarginBottomStyles } from "@styles/ui/ModalBottom.styles";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Portal, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalBottomProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const ModalBottom = ({ visible, onDismiss, children }: ModalBottomProps) => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(1)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () => getMarginBottomStyles(colors),
    [colors] // Solo recalcula si cambian
  );

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Keyboard.dismiss();
      slideAnim.setValue(1);
      backdropAnim.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        onDismiss();
      });
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get("window").height],
  });

  const backdropOpacity = backdropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={() => onDismiss()}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY }],
            },
            {
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.viewChildrens}>{children}</View>
          <TouchableRipple style={styles.viewCancel} onPressIn={() => onDismiss()}>
            <Text variant="titleLarge" style={{ color: colors.blueBootstrap }}>
              {t("common.label-cancel")}
            </Text>
          </TouchableRipple>
        </Animated.View>
      </View>
    </Portal>
  );
};

export default ModalBottom;
