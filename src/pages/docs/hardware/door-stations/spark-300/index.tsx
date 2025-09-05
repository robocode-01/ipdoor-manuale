import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import ProductOverview from "@/components/docs/ProductOverview";
import data from "@/data/products/spark-300.json";

export default function Spark300Overview() {
  return (
    <DocsLayout title="SPARK 300">
      {/* Rimosso ProductTabs */}
      <ProductOverview data={data} />
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "it", ["common"]))
  }
});
