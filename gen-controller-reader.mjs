// scripts/gen-controller-reader.mjs
// Auto-discovery dei prodotti "Controller & Reader" a partire da public/media/controller-reader/*
// - Aggiorna src/data/hardware.json (chiave: controllerReader)
// - Crea le pagine src/pages/docs/hardware/controller-reader/<id>/index.tsx se mancanti

import { promises as fs } from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const MEDIA_DIR = path.join(REPO_ROOT, "public", "media", "controller-reader");
const DATA_FILE = path.join(REPO_ROOT, "src", "data", "hardware.json");
const PAGES_ROOT = path.join(REPO_ROOT, "src", "pages", "docs", "hardware", "controller-reader");

const IMAGE_CANDIDATES = [
  "hero.png","hero.jpg","hero.jpeg","hero.webp","hero.avif",
  "main.png","main.jpg","main.jpeg","main.webp","main.avif",
  "cover.png","cover.jpg","cover.jpeg","cover.webp","cover.avif"
];
const IMAGE_EXTS = [".png",".jpg",".jpeg",".webp",".avif",".gif"];

function toNiceName(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, m => m.toUpperCase());
}

async function safeJsonRead(file) {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return {};
  }
}

async function safeJsonWrite(file, obj) {
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });
  const txt = JSON.stringify(obj, null, 2) + "\n";
  await fs.writeFile(file, txt, "utf8");
}

async function listControllerReaderSlugs() {
  const dirents = await fs.readdir(MEDIA_DIR, { withFileTypes: true }).catch(() => null);
  if (!dirents) {
    throw new Error(`Cartella non trovata: ${MEDIA_DIR}`);
  }
  return dirents.filter(d => d.isDirectory()).map(d => d.name);
}

async function pickImageFor(slug) {
  const folder = path.join(MEDIA_DIR, slug);
  // 1) preferisci nomi "hero"/"main"/"cover"
  for (const cand of IMAGE_CANDIDATES) {
    try {
      await fs.access(path.join(folder, cand));
      return `/media/controller-reader/${slug}/${cand}`;
    } catch { /* keep looking */ }
  }
  // 2) altrimenti prendi il primo file immagine
  const files = await fs.readdir(folder).catch(() => []);
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (IMAGE_EXTS.includes(ext)) {
      return `/media/controller-reader/${slug}/${f}`;
    }
  }
  // 3) fallback: nessuna immagine
  return undefined;
}

function productPageTemplate(id) {
  const NAME = toNiceName(id);
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
        <div style={{ maxWidth: 520, marginBottom: "1rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 80vw, 520px"
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

async function ensurePageFor(id) {
  const dir = path.join(PAGES_ROOT, id);
  const file = path.join(dir, "index.tsx");
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(file);
    // esiste, non sovrascrivere
    return { created: false, file };
  } catch {
    await fs.writeFile(file, productPageTemplate(id), "utf8");
    return { created: true, file };
  }
}

async function main() {
  const slugs = await listControllerReaderSlugs();
  if (slugs.length === 0) {
    console.log("⚠ Nessuna sottocartella trovata in", MEDIA_DIR);
    return;
  }

  // Prepara gli item
  const items = [];
  for (const id of slugs) {
    const image = await pickImageFor(id);
    items.push({
      id,
      name: toNiceName(id),
      href: `/docs/hardware/controller-reader/${id}`,
      image
    });
  }

  // Aggiorna hardware.json (preserva doorStations/indoorStations)
  const data = await safeJsonRead(DATA_FILE);
  data.controllerReader = items;
  await safeJsonWrite(DATA_FILE, data);
  console.log(`✅ Aggiornato ${path.relative(REPO_ROOT, DATA_FILE)} con ${items.length} elementi`);

  // Crea pagine se mancanti
  let created = 0, skipped = 0;
  for (const { id } of items) {
    const res = await ensurePageFor(id);
    if (res.created) { created++; } else { skipped++; }
  }
  console.log(`✅ Pagine create: ${created}, esistenti: ${skipped}`);
  console.log("🎉 Fatto.");
}

main().catch((err) => {
  console.error("❌ Errore:", err.message);
  process.exit(1);
});
