import { SPACES, type AppTheme } from "@config/themes/themes";
import Icon from "@react-native-vector-icons/ionicons";
import { useEffect, useImperativeHandle, useRef, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import ItemAddDeleteNumber from "./ItemAddDeleteNumber";

export interface AddDeleteNumberProps {
  value: string[];
  onChange: (phones: string[]) => void;
  ref: RefObject<AddDeleteNumberRef>;
}

// Esta es la interfaz del ref expuesto
export interface AddDeleteNumberRef {
  closeActive: () => void;
}

const AddDeleteNumber = ({ value, onChange, ref }: AddDeleteNumberProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const [numbers, setNumbers] = useState<string[]>(value || []);
  const animations = useRef<Animated.Value[]>([]).current;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Inicializar animaciones
  if (animations.length !== numbers.length) {
    while (animations.length < numbers.length) {
      animations.push(new Animated.Value(0));
    }
    while (animations.length > numbers.length) {
      animations.pop();
    }
  }

  useEffect(() => {
    onChange(numbers);
  }, [numbers]);

  useImperativeHandle(ref, () => ({
    closeActive: () => {
      if (activeIndex !== null) {
        slideOut(activeIndex);
      }
    },
  }));

  const handleAddNumber = () => {
    setNumbers((prev) => [...prev, ""]);
    if (activeIndex !== null) {
      slideOut(activeIndex);
    }
  };

  const handleRemoveNumber = (index: number) => {
    slideOut(index);
    // Esperar un poco más allá de la animación
    setTimeout(() => {
      setNumbers((prev) => prev.filter((_, i) => i !== index));
    }, 200); // 200ms = duración razonable de la animación
  };

  const handleChangeNumber = (text: string, index: number) => {
    const updated = [...numbers];
    updated[index] = text;
    setNumbers(updated);
    if (activeIndex !== null) {
      slideOut(activeIndex);
    }
  };

  const slideIn = (index: number) => {
    setActiveIndex(index);
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const slideOut = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();

    setActiveIndex(null); // ✅ mover fuera del callback también
  };

  const toggleDelete = (index: number) => {
    if (activeIndex === index) {
      slideOut(index);
    } else {
      if (activeIndex !== null) {
        slideOut(activeIndex);
        slideIn(index);
      } else {
        slideIn(index);
      }
    }
  };

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        data={numbers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemAddDeleteNumber
            item={item}
            index={index}
            activeIndex={activeIndex}
            animations={animations}
            toggleDelete={toggleDelete}
            slideOut={slideOut}
            handleChangeNumber={handleChangeNumber}
            handleRemoveNumber={handleRemoveNumber}
          />
        )}
      />
      <TouchableRipple style={styles.touchAddNumber} onPress={handleAddNumber}>
        <>
          <Icon
            name="add-outline"
            size={24}
            color={colors.white}
            style={{ backgroundColor: "#388e3c", borderRadius: 30 }}
          />
          <Text variant="titleMedium" style={{ color: colors.blueBootstrap }}>
            {t("contacts.add-number-zchat")}
          </Text>
        </>
      </TouchableRipple>
    </View>
  );
};

export default AddDeleteNumber;

const styles = StyleSheet.create({
  touchAddNumber: {
    flexDirection: "row",
    gap: SPACES.g2,
    alignItems: "center",
    marginTop: 8,
  },
});
