import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState, useEffect } from "react";

export function UseFirebaseImage(filename: string) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const firebaseApp = getApp();
        const storage = getStorage(firebaseApp);
        const spaceRef = ref(storage, `/${filename}`);
        const url = await getDownloadURL(spaceRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage().catch((error) => console.error("Error in fetchImage:", error));
  }, [filename]);

  return imageUrl;
}
