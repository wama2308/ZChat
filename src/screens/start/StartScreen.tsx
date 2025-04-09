import TextLogo from '@components/TextLogo';
import { SPACES } from '@config/themes/themes';
import { RootStackParamList } from '@navigation/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <Surface style={styles.surface} elevation={0}>
          <Text variant="titleMedium">{t('register-start')}</Text>
          <Button
            mode="contained"
            theme={{ roundness: 1 }}
            accessibilityLabel="Botón para registrarse"
            onPress={() => navigation.navigate('Register')}
            style={{ width: '90%' }}
          >
            {t('register')}
          </Button>
          <View style={styles.viewTexts}>
            <Text variant="titleMedium">{t('have-an-account')}</Text>
            <Text variant="titleMedium">{t('log-in-you')}</Text>
          </View>
          <Text
            style={[styles.textLink, { color: colors.primary }]}
            variant="titleMedium"
            onPress={() => navigation.navigate('Login')}
          >
            {t('login')}
          </Text>
        </Surface>
      </View>
      <TextLogo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between', // Esto distribuye entre el centro y el fondo
    alignItems: 'center',
    padding: SPACES.p2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  surface: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACES.p3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTexts: {
    display: 'flex',
    alignItems: 'center',
  },
  textLink: {
    textDecorationLine: 'underline',
  },
});

export default StartScreen;
