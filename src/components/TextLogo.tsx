import { View, Text, StyleSheet } from 'react-native';

const TextLogo = () => {
  return (
    <View>
      <Text style={styles.zangiText}>ZChat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  zangiText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default TextLogo;
