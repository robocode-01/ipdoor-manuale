import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});
//