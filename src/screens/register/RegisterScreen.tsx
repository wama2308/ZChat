// import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

// import { Asset } from 'react-native-image-picker';

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
      <Image source={require('../../assets/images/user-select.jpg')} style={styles.image} />
      <View style={{ width: '100%', gap: SPACES.g1 }}>
        <TextInput label={t('label-name')} value={''} onChangeText={() => {}} />
        <TextInput label={t('label-lastname')} value={''} onChangeText={() => {}} />
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 16,
  },
});

export default RegisterScreen;
