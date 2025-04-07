import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useLanguageStore} from '@store/config/useLanguageStore';

const StartScreen = () => {
  const {t} = useTranslation();
  const {language, setLanguage} = useLanguageStore();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{t('welcome')}</Text>
      <Text>{t('login')}</Text>
      <Button title="Spanish" onPress={() => setLanguage('es')} />
      <View style={{marginVertical: 20}}>
        <Button title="English" onPress={() => setLanguage('en')} />
      </View>
      <Button title="System" onPress={() => setLanguage('system')} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartScreen;
