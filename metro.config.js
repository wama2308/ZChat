const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// 1. Obtén la configuración por defecto de Metro
const defaultConfig = getDefaultConfig(__dirname);

// 2. Aplica las modificaciones de Reanimated a la configuración por defecto
const reanimatedConfig = wrapWithReanimatedMetroConfig(defaultConfig);

// 3. Combina con tus configuraciones personalizadas (si las tienes)
const customConfig = {
  // Tus opciones personalizadas aquí (ej: resolver alias, transformers, etc.)
};

// 4. Exporta la configuración final combinada
module.exports = mergeConfig(reanimatedConfig, customConfig);
