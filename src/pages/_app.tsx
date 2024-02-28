import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { initializeApp } from "firebase/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: "memorieshub-257e7.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  initializeApp(firebaseConfig);
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
