import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import DocsLayout from "@/components/docs/DocsLayout";
import InstallationGuide from "@/components/docs/InstallationGuide";
import data from "@/data/installations/spark-300.json";

export default function Spark300Install() {
  return (
    <DocsLayout title="Installazione SPARK 300">
      <InstallationGuide data={data} />
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "it", ["common"]))
  }
});
