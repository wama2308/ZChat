import { DocumentDirectoryPath, exists, mkdir, moveFile } from "@dr.pogodin/react-native-fs";

export const moveImageContact = async (image: string, folder: "contacts"): Promise<string | null> => {
  if (!image) {
    console.warn("No image path provided");
    return null;
  }

  try {
    const filename = image.split("/").pop() || `photo-${Date.now()}.jpg`;
    const destDir = `${DocumentDirectoryPath}/images/${folder}`;
    const destPath = `${destDir}/${filename}`;

    // Crear carpeta si no existe
    const dirExists = await exists(destDir);
    if (!dirExists) {
      await mkdir(destDir);
    }

    // Mover imagen a ruta persistente
    await moveFile(image, destPath);
    return destPath;
  } catch (err) {
    console.error("Error moviendo imagen:", err);
    return null; // detenemos si falla la imagen
  }
};
