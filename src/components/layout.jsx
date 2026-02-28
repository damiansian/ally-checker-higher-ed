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
                style={{ color: t.textTertiary, fontSize: 13, userSelect: "none" }}
              >
                /
              </span>
            )}
            {item.current ? (
              <span
                aria-current="page"
                style={{
                  fontSize: 13,
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
                  fontSize: 13,
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
          fontSize: 13,
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
              fontSize: 13,
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

// ── Sidebar Table of Contents ───────────────────────────────
export function TableOfContents({ sections }) {
  const { t } = useTheme();
  const [activeId, setActiveId] = useState(sections[0]?.id || "");

  useEffect(() => {
    const scrollOffset = 100;

    function updateActive() {
      let currentId = sections[0]?.id || "";
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

  return (
    <nav aria-label="On this page" style={{ position: "sticky", top: 80 }}>
      <div
        style={{
          fontSize: 10,
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
                  fontSize: 13,
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

// ── Top Navigation ──────────────────────────────────────────
export function TopNav({ activeCategorySlug }) {
  const { t } = useTheme();
  return (
    <header
      className="top-nav-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: t.navBg,
        borderBottom: `1px solid ${t.border}`,
        padding: "0 32px",
      }}
    >
      <div
        className="top-nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        <div className="top-nav-brand-nav" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            href="/"
            style={{
              fontSize: 16,
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
          <nav
            className="top-nav-nav"
            style={{ display: "flex", gap: 4 }}
            aria-label="Categories"
          >
            <a
              href="/"
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color:
                  activeCategorySlug === "home"
                    ? t.accent
                    : t.textSecondary,
                backgroundColor:
                  activeCategorySlug === "home"
                    ? t.accentBg
                    : "transparent",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                transition: "background-color 0.15s ease",
              }}
            >
              Home
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.slug}/`}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color:
                    cat.slug === activeCategorySlug
                      ? t.accent
                      : t.textSecondary,
                  backgroundColor:
                    cat.slug === activeCategorySlug
                      ? t.accentBg
                      : "transparent",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  transition: "background-color 0.15s ease",
                }}
              >
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

// ── Content Page Layout ─────────────────────────────────────
export function ContentPageLayout({
  categorySlug,
  fileTypeSlug,
  title,
  subtitle,
  tocSections,
  children,
}) {
  const { t } = useTheme();
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
      style={{
        minHeight: "100vh",
        backgroundColor: t.bg,
        color: t.text,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <TopNav activeCategorySlug={categorySlug} />

      <div
        className="content-layout-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 32px 80px",
          display: "grid",
          gridTemplateColumns: tocSections ? "1fr 200px" : "1fr",
          gap: 48,
        }}
      >
        <main className="content-layout-main" style={{ maxWidth: 760, minWidth: 0 }}>
          <Breadcrumb items={breadcrumbItems} />

          <h1
            className="content-page-h1"
            style={{
              fontSize: 36,
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
                fontSize: 18,
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

        {tocSections && (
          <aside className="content-layout-toc" style={{ minWidth: 0 }}>
            <TableOfContents sections={tocSections} />
          </aside>
        )}
      </div>

      <footer
        className="content-page-footer"
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "24px 32px",
          textAlign: "center",
          fontSize: 12,
          color: t.textTertiary,
          fontFamily: "var(--font-display)",
        }}
      >
        Canvas LMS Accessibility &middot; Damian Sian
      </footer>
    </div>
  );
}
