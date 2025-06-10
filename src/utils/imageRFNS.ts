import { DocumentDirectoryPath, exists, mkdir, moveFile } from "@dr.pogodin/react-native-fs";

export const moveImageContact = async (image: string, folder: "contacts"): Promise<string | null> => {
  if (!image) {
    console.warn("No image path provided");
    return null;
  }

  try {
    const filename = image.split("/").pop() || `photo-${Date.now()}.jpg`;
    const relativePath = `images/${folder}/${filename}`;
    const destPath = `${DocumentDirectoryPath}/${relativePath}`;

    const dirExists = await exists(`${DocumentDirectoryPath}/images/${folder}`);
    if (!dirExists) {
      await mkdir(`${DocumentDirectoryPath}/images/${folder}`);
    }

    await moveFile(image, destPath);

    // ⛳️ DEVUELVE SOLO LA RUTA RELATIVA
    return relativePath;
  } catch (err) {
    console.error("Error moviendo imagen:", err);
    return null;
  }
};
