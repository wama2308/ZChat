import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useLanguageStore } from '@store/config/useLanguageStore';
import { useThemeStore } from '@store/config/useThemeStore';
import { useTheme } from 'react-native-paper'; // Para acceder al tema actual
import { Button, Text as TextPaper } from 'react-native-paper'; // Componente Surface

const StartScreen = () => {
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const { toggleTheme } = useThemeStore();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <TextPaper variant="displayLarge" style={{ marginBottom: 20 }}>
          Test Language
        </TextPaper>
        <TextPaper variant="titleLarge">{t('welcome')}</TextPaper>
        <TextPaper style={{ marginBottom: 20 }} variant="titleLarge">
          {t('login')}
        </TextPaper>
        <Button mode="contained" onPress={() => setLanguage('es')}>
          Spanish
        </Button>
        <View style={{ marginVertical: 20 }}>
          <Button mode="contained" onPress={() => setLanguage('en')}>
            English
          </Button>
        </View>
        <Button mode="contained" onPress={() => setLanguage('system')}>
          System
        </Button>
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextPaper variant="displayLarge">Test themes</TextPaper>
        <TextPaper variant="labelLarge">Prueba de cambio de tema</TextPaper>
        <View style={{ marginVertical: 20 }}>
          <Button mode="contained" onPress={() => toggleTheme()}>
            Oscuro
          </Button>
        </View>
        <Button mode="outlined" onPress={() => toggleTheme()}>
          Claro
        </Button>
      </View>
    </View>
  );
};

export default StartScreen;
