import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function i18nProps(locale?: string, ns: string[] = ["common"]) {
  return { ...(await serverSideTranslations(locale ?? "it", ns)) };
}
