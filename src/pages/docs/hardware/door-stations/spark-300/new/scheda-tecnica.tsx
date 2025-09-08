import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";

export default function SchedaTecnicaSpark300() {
  return (
    <DocsLayout title="SPARK 300 — Scheda Tecnica">
      <h1 className="title">Scheda Tecnica — SPARK 300</h1>

      <div className="box">
        <h2 className="title is-5">Generali</h2>
        <table className="table is-fullwidth">
          <tbody>
            <tr><th>Alimentazione</th><td>PoE 802.3af</td></tr>
            <tr><th>Rete</th><td>Ethernet 10/100 (DHCP/Static)</td></tr>
            <tr><th>Montaggio</th><td>Incasso / Parete (accessori dedicati)</td></tr>
            <tr><th>Integrazione</th><td>Cloud IpDoor, App Mobile</td></tr>
          </tbody>
        </table>
      </div>

      <div className="box">
        <h2 className="title is-5">Video/Audio</h2>
        <table className="table is-fullwidth">
          <tbody>
            <tr><th>Camera</th><td>Integrata con illuminatore</td></tr>
            <tr><th>Audio</th><td>Viva-voce, riduzione rumore</td></tr>
          </tbody>
        </table>
      </div>

      <div className="box">
        <h2 className="title is-5">I/O e controllo</h2>
        <table className="table is-fullwidth">
          <tbody>
            <tr><th>Relè</th><td>Uscita per serratura (parametrizzabile)</td></tr>
            <tr><th>Ingressi</th><td>Ingresso pulsante (se previsto)</td></tr>
          </tbody>
        </table>
      </div>

      <p className="has-text-grey is-size-7">
        Nota: i valori possono variare per revisione hardware/firmware. Fare sempre riferimento al datasheet ufficiale.
      </p>

      <div className="content" style={{ marginTop: "1rem" }}>
        <a className="button is-link is-light" href="/media/door-stations/spark-300/DS-IT-300.pdf" target="_blank" rel="noreferrer">
          Apri Datasheet ufficiale (PDF)
        </a>
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
