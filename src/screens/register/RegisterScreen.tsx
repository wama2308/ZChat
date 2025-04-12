// import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// import { Asset } from 'react-native-image-picker';
import Icon from '@react-native-vector-icons/ionicons';

import { SPACES } from '@config/themes/themes';
import { useTranslation } from 'react-i18next';
import { Button, Text, TextInput } from 'react-native-paper';

import AuthLayout from '@components/AuthLayout';

const RegisterScreen = () => {
  const { t } = useTranslation();

  // const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  return (
    <AuthLayout contentCenter={false}>
      {/* {selectedImage?.uri && <Image source={{ uri: selectedImage.uri }} style={styles.image} />} */}
      <Text variant="displaySmall">{t('your-profile')}</Text>
      <View style={styles.content}>
        <TextInput label={t('label-user-name')} value={''} onChangeText={() => {}} />
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
        <TextInput
          label={t('label-confirm-password')}
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
      </View>
      <Button
        theme={{ roundness: 1 }}
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={{ width: '100%' }}
      >
        {t('register')}
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    gap: SPACES.g1,
    marginTop: SPACES.m3,
  },
});

export default RegisterScreen;
