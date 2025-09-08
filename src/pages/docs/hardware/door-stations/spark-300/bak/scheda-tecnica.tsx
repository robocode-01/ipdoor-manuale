import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import SpecTable from "@/components/docs/SpecTable";
import data from "@/data/specs/spark-300.json";

export default function Spark300Specs() {
  return (
    <DocsLayout title="Scheda tecnica · SPARK 300">
      <SpecTable groups={data.groups} downloads={data.downloads} />
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "it", ["common"]))
  }
});
