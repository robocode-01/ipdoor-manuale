import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";
import LangSwitch from "./LangSwitch"; // <-- AGGIUNTO
import styles from "@/styles/docs.module.scss";

type DocsLayoutProps = { title?: string; children: ReactNode; activePath?: string; };

export default function DocsLayout({ title, children, activePath }: DocsLayoutProps) {
  return (
    <div className={`columns ${styles.docsLayout}`}>
      <aside className={`column is-3 ${styles.sidebar}`}>
        <Sidebar activePath={activePath} />
      </aside>

      <main className={`column ${styles.content}`}>
        <div className="container">
          <LangSwitch />                 {/* <-- AGGIUNTO */}
          <Breadcrumbs />
          {title ? <h1 className="title">{title}</h1> : null}
          {children}
        </div>
      </main>
    </div>
  );
}
