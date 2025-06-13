import { DocumentDirectoryPath, exists, mkdir, moveFile, unlink } from "@dr.pogodin/react-native-fs";

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

    const imageExists = await exists(destPath);
    if (imageExists) {
      console.log(55555);
      return relativePath;
    }

    await moveFile(image, destPath);

    // ⛳️ DEVUELVE SOLO LA RUTA RELATIVA
    return relativePath;
  } catch (err) {
    console.error("Error moviendo imagen:", err);
    return null;
  }
};

export const getImageUri = (path?: string) =>
  path?.startsWith("file://") || path?.startsWith("http") ? path : `file://${DocumentDirectoryPath}/${path}`;

export const deleteImageIfExists = async (imageName: string): Promise<void> => {
  try {
    const imageAbsolutePath = `${DocumentDirectoryPath}/${imageName}`;
    const fileExists = await exists(imageAbsolutePath);

    if (fileExists) {
      await unlink(imageAbsolutePath);
    }
  } catch (err) {
    console.error("Error al eliminar imagen:", err);
  }
};
