import AuthLayout from '@components/AuthLayout';
import { SPACES } from '@config/themes/themes';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/ionicons';

const LoginScreen = () => {
  const { t } = useTranslation();
  return (
    <AuthLayout contentCenter={false}>
      <View style={styles.content}>
        <Text style={{ textAlign: 'center' }} variant="displaySmall">
          {t('login')}
        </Text>
        <Text style={{ marginVertical: SPACES.m4, textAlign: 'center' }} variant="titleMedium">
          {t('text-informative-login')}
        </Text>
        <View style={{ gap: SPACES.g1 }}>
          <TextInput
            label={`${t('label-user-name')} / ${t('label-number-zchat')}`}
            value={''}
            onChangeText={() => {}}
          />
          <TextInput
            label={t('label-password')}
            value={''}
            onChangeText={() => {}}
            secureTextEntry={true}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    // name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                    name={'eye-off-outline'}
                    size={24}
                    color="#666"
                  />
                )}
                onPress={() => {}}
              />
            }
            left={
              <TextInput.Icon
                icon={() => <Icon name="lock-closed-outline" size={24} color="#666" />}
              />
            }
          />
          <Button
            theme={{ roundness: 1 }}
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{ width: '100%', marginTop: SPACES.m2 }}
          >
            {t('label-continue')}
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACES.g5,
  },
  content: {
    width: '100%',
    gap: SPACES.g1,
    marginTop: SPACES.m3,
  },
});

export default LoginScreen;
