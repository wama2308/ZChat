import { Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { SPACES } from '@config/themes/themes';
import TextLogo from './TextLogo';

interface Props {
  children: React.ReactNode;
  contentCenter?: boolean;
}
const AuthLayout = ({ children, contentCenter = true }: Props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.contentContainer,
          { justifyContent: contentCenter ? 'center' : 'flex-start' },
        ]}
      >
        <Surface style={styles.surface} elevation={0}>
          {children}
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
    padding: SPACES.p3,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  surface: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACES.g3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLayout;
