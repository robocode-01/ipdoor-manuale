// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "@/styles/global.scss";
import "@/styles/docs.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
