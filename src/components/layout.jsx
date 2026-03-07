import { useState, useEffect } from "react";
import { useTheme } from "./theme";
import { categories, fileTypeMeta } from "./data";

// ── Breadcrumb ──────────────────────────────────────────────
export function Breadcrumb({ items }) {
  const { t } = useTheme();
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && (
              <span
                style={{ color: t.textTertiary, fontSize: "var(--fs-sm)", userSelect: "none" }}
              >
                /
              </span>
            )}
            {item.current ? (
              <span
                aria-current="page"
                style={{
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  color: t.text,
                  fontFamily: "var(--font-display)",
                }}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href || "#"}
                style={{
                  fontSize: "var(--fs-sm)",
                  color: t.textSecondary,
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ── File Type Pills ─────────────────────────────────────────
export function FileTypePills({ categorySlug, activeSlug }) {
  const { t } = useTheme();
  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return null;

  const overviewActive = activeSlug === "overview";

  return (
    <div className="file-type-pills" style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
      <a
        href={`/${categorySlug}/`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "5px 14px",
          borderRadius: 6,
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          backgroundColor: overviewActive ? t.accent : t.surfaceAlt,
          color: overviewActive ? t.accentContrast : t.textSecondary,
          border: `1px solid ${overviewActive ? t.accent : t.border}`,
          textDecoration: "none",
          transition: "all 0.2s ease",
        }}
      >
        Overview
      </a>
      {Object.entries(fileTypeMeta).map(([key, meta]) => {
        const state = cat.fileTypes[key];
        if (state === "na") return null;
        const active = meta.slug === activeSlug;
        return (
          <a
            key={key}
            href={`/${categorySlug}/${meta.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 14px",
              borderRadius: 6,
              fontSize: "var(--fs-sm)",
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              backgroundColor: active ? t.accent : t.surfaceAlt,
              color: active ? t.accentContrast : t.textSecondary,
              border: `1px solid ${active ? t.accent : t.border}`,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {meta.label}
          </a>
        );
      })}
    </div>
  );
}

// ── Sidebar Table of Contents (auto-detects h2 elements) ────
export function TableOfContents() {
  const { t } = useTheme();
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const mainEl = document.querySelector(".content-layout-main");
    if (!mainEl) return;

    function collectHeadings() {
      const h2s = mainEl.querySelectorAll("h2[id]");
      return Array.from(h2s).map((h) => ({ id: h.id, label: h.textContent }));
    }

    setSections(collectHeadings());

    // eslint-disable-next-line no-undef
    const observer = new MutationObserver(() => setSections(collectHeadings()));
    observer.observe(mainEl, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sections.length) return;
    const scrollOffset = 100;

    function updateActive() {
      let currentId = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= scrollOffset) {
          currentId = s.id;
        }
      }
      setActiveId(currentId);
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [sections]);

  if (!sections.length) return null;

  return (
    <nav aria-label="On this page" style={{ position: "sticky", top: 80 }}>
      <div
        style={{
          fontSize: "var(--fs-xs)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: t.textTertiary,
          marginBottom: 14,
          fontFamily: "var(--font-display)",
        }}
      >
        On this page
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? "true" : undefined}
                style={{
                  display: "block",
                  padding: "6px 12px",
                  fontSize: "var(--fs-sm)",
                  fontWeight: active ? 600 : 400,
                  color: active ? t.tocActive : t.textSecondary,
                  textDecoration: "none",
                  borderLeft: `2px solid ${active ? t.tocActive : "transparent"}`,
                  backgroundColor: active ? t.tocHover : "transparent",
                  fontFamily: "var(--font-display)",
                  transition: "all 0.15s ease",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── Mobile Header Bar (hamburger toggle, shown only on small screens) ──
export function MobileHeader({ menuOpen, setMenuOpen }) {
  const { t } = useTheme();
  return (
    <div
      className="mobile-header"
      style={{
        backgroundColor: t.navBg,
        borderBottom: `1px solid ${t.border}`,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 48,
      }}
    >
      <a
        href="/"
        style={{
          fontSize: "var(--fs-base)",
          fontWeight: 800,
          color: t.text,
          textDecoration: "none",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        Canvas LMS Accessibility
      </a>
      <button
        className="hamburger-btn"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        onClick={() => setMenuOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          color: t.text,
          cursor: "pointer",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
        <span className="sr-only">{menuOpen ? "Close menu" : "Menu"}</span>
      </button>
    </div>
  );
}

// ── Side Navigation ─────────────────────────────────────────
export function SideNav({ activeCategorySlug, menuOpen, setMenuOpen }) {
  const { t } = useTheme();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const linkStyle = (active) => ({
    display: "block",
    padding: "8px 16px",
    borderRadius: 6,
    fontSize: "var(--fs-sm)",
    fontWeight: active ? 600 : 500,
    color: active ? t.accent : t.textSecondary,
    backgroundColor: active ? t.accentBg : "transparent",
    textDecoration: "none",
    fontFamily: "var(--font-display)",
    transition: "background-color 0.15s ease",
  });

  return (
    <>
      {menuOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />
      )}
      <div
        className={`sidebar${menuOpen ? " menu-open" : ""}`}
        style={{
          backgroundColor: t.navBg,
          borderRight: `1px solid ${t.border}`,
        }}
      >
        <a
          href="/"
          className="sidebar-logo"
          style={{
            display: "block",
            padding: "20px 20px 16px",
            fontSize: "var(--fs-lg)",
            fontWeight: 800,
            color: t.text,
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          Canvas LMS Accessibility
        </a>

        <nav id="main-nav">
          <div className="sidebar-links" style={{ padding: "0 8px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
            <a href="/" onClick={() => setMenuOpen(false)} style={linkStyle(activeCategorySlug === "home")}>Home</a>
            <a href="/guide/" onClick={() => setMenuOpen(false)} style={linkStyle(activeCategorySlug === "guide")}>Guide</a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.slug}/`}
                onClick={() => setMenuOpen(false)}
                style={linkStyle(cat.slug === activeCategorySlug)}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

// ── Content Page Layout ─────────────────────────────────────
export function ContentPageLayout({
  categorySlug,
  fileTypeSlug,
  title,
  subtitle,
  children,
}) {
  const { t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const cat = categories.find((c) => c.slug === categorySlug);
  const ftMeta = Object.values(fileTypeMeta).find((m) => m.slug === fileTypeSlug);
  const isOverview = fileTypeSlug === "overview";

  const breadcrumbItems = isOverview
    ? [
        { label: "Home", href: "/" },
        { label: cat?.name || categorySlug, current: true },
      ]
    : [
        { label: "Home", href: "/" },
        { label: cat?.name || categorySlug, href: `/${categorySlug}/` },
        { label: ftMeta?.label || fileTypeSlug, current: true },
      ];

  return (
    <div
      className="app-layout"
      style={{
        minHeight: "100vh",
        backgroundColor: t.bg,
        color: t.text,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SideNav activeCategorySlug={categorySlug} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="main-area">
        <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div
          className="content-layout-grid"
          style={{
            maxWidth: 960,
            padding: "32px 48px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 200px",
            gap: 48,
          }}
        >
          <main
            id="main-content"
            className="content-layout-main"
            tabIndex={-1}
            style={{ minWidth: 0 }}
          >
            <Breadcrumb items={breadcrumbItems} />

            <h1
              className="content-page-h1"
              style={{
                fontSize: "var(--fs-3xl)",
                fontWeight: 800,
                color: t.text,
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.025em",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}
            >
              {title || cat?.name}
            </h1>
            {subtitle && (
              <div
                className="content-page-subtitle"
                style={{
                  fontSize: "var(--fs-xl)",
                  color: t.textSecondary,
                  fontFamily: "var(--font-body)",
                  marginBottom: 24,
                }}
              >
                {subtitle}
              </div>
            )}

            <FileTypePills categorySlug={categorySlug} activeSlug={fileTypeSlug} />

            {children}
          </main>

          <aside className="content-layout-toc" style={{ minWidth: 0 }}>
            <TableOfContents />
          </aside>
        </div>

        <footer
          className="content-page-footer"
          style={{
            borderTop: `1px solid ${t.border}`,
            padding: "24px 32px",
            textAlign: "center",
            fontSize: "var(--fs-sm)",
            color: t.textTertiary,
            fontFamily: "var(--font-display)",
          }}
        >
          Canvas LMS Accessibility &middot; Damian Sian
        </footer>
      </div>
    </div>
  );
}
