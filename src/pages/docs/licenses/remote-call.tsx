import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});


import DocsLayout from "@/components/docs/DocsLayout";
export default function RemoteCallLicense(){
  return (
    <DocsLayout title="Remote call license">
      <h1 className="title">Remote call license</h1>
      <p className="content">Abilita chiamate da remoto verso app/PC client. Seleziona piano annuale o illimitato.</p>
    </DocsLayout>
  );
}