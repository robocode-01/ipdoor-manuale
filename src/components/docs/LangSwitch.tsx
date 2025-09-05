import { useRouter } from "next/router";
import Link from "next/link";

const LOCALES = [
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "nl", label: "NL" },
  { code: "fr", label: "FR" }
];

export default function LangSwitch() {
  const { asPath, locale } = useRouter();
  return (
    <div className="lang-switch">
      {LOCALES.map(l => (
        <Link
          key={l.code}
          href={asPath}
          locale={l.code}
          className={`lang-button ${locale === l.code ? "active" : ""}`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
