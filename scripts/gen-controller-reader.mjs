// scripts/gen-controller-reader.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";

const root = process.cwd();
const mediaDir = path.join(root, "public", "media", "controller-reader");
const dataFile = path.join(root, "src", "data", "hardware.json");
const pagesRoot = path.join(root, "src", "pages", "docs", "hardware", "controller-reader");

// Utility: capitalizza con spazi da slug
function niceName(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

// Template della pagina index.tsx per ogni prodotto
function productPageTemplate(id) {
  const NAME = niceName(id);
  return `import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import Image from "next/image";
import data from "@/data/hardware.json";

type Item = { id: string; name: string; image?: string };

export default function Page() {
  const list: Item[] = Array.isArray((data as any)?.controllerReader)
    ? ((data as any).controllerReader as Item[])
    : [];
  const item = list.find((x) => x.id === "${id}");

  return (
    <DocsLayout title="${NAME} — Controller & Reader">
      <h1 className="title">${NAME}</h1>

      {item?.image && (
        <div style={{ maxWidth: 460, marginBottom: "1rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 80vw, 460px"
            />
          </div>
        </div>
      )}

      <div className="content">
        <p>Scheda in preparazione.</p>
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
`;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function readJsonSafe(file) {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return {};
  }
}

async function writeJsonPretty(file, obj) {
  const txt = JSON.stringify(obj, null, 2) + "\n";
  await fs.writeFile(file, txt, "utf8");
}

async function main() {
  // 1) Leggi le sottocartelle in public/media/controller-reader
  let entries = [];
  try {
    const dirents = await fs.readdir(mediaDir, { withFileTypes: true });
    entries = dirents.filter(d => d.isDirectory()).map(d => d.name);
  } catch (e) {
    console.error("❌ Non trovo la cartella:", mediaDir);
    console.error("Dettagli:", e.message);
    process.exit(1);
  }

  if (entries.length === 0) {
    console.warn("⚠ Nessuna sottocartella trovata in", mediaDir);
    process.exit(0);
  }

  // 2) Prepara i record da inserire in hardware.json
  const items = entries.map(id => ({
    id,
    name: niceName(id),
    href: `/docs/hardware/controller-reader/${id}`,
    image: `/media/controller-reader/${id}/hero.png`
  }));

  // 3) Aggiorna/merge src/data/hardware.json
  const data = await readJsonSafe(dataFile);
  data.controllerReader = items;
  await ensureDir(path.dirname(dataFile));
  await writeJsonPretty(dataFile, data);
  console.log(`✅ Aggiornato ${path.relative(root, dataFile)} con ${items.length} item`);

  // 4) Crea le pagine index.tsx per ogni prodotto
  for (const id of entries) {
    const pageDir = path.join(pagesRoot, id);
    const pageFile = path.join(pageDir, "index.tsx");
    await ensureDir(pageDir);
    // non sovrascrivere se già esiste
    try {
      await fs.access(pageFile);
      console.log(`↷ Esiste già: ${path.relative(root, pageFile)} (skip)`);
    } catch {
      await fs.writeFile(pageFile, productPageTemplate(id), "utf8");
      console.log(`✅ Creato: ${path.relative(root, pageFile)}`);
    }
  }

  console.log("🎉 Fatto. Avvia dev o fai build per verificare le route.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
