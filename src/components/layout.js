"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
              <Link
                href={item.href || "#"}
                style={{
                  fontSize: 13,
                  color: t.textSecondary,
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                }}
              >
                {item.label}
              </Link>
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

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
      {Object.entries(fileTypeMeta).map(([key, meta]) => {
        const state = cat.fileTypes[key];
        if (state === "na") return null;
        const active = meta.slug === activeSlug;
        return (
          <Link
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
          </Link>
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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              style={{
                display: "block",
                padding: "6px 12px",
                fontSize: 13,
                fontWeight: activeId === s.id ? 600 : 400,
                color: activeId === s.id ? t.tocActive : t.textSecondary,
                textDecoration: "none",
                borderLeft: `2px solid ${activeId === s.id ? t.tocActive : "transparent"}`,
                fontFamily: "var(--font-display)",
                transition: "all 0.15s ease",
                borderRadius: "0 4px 4px 0",
              }}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Top Navigation ──────────────────────────────────────────
export function TopNav({ activeCategorySlug }) {
  const { dark, setDark, t } = useTheme();
  return (
    <header
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
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            href="/"
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: t.text,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Getting to 100
          </Link>
          <nav
            style={{ display: "flex", gap: 4 }}
            aria-label="Categories"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
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
              </Link>
            ))}
          </nav>
        </div>
        <button
          type="button"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: `1px solid ${t.border}`,
            backgroundColor: t.surface,
            color: t.textSecondary,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-display)",
          }}
        >
          {dark ? "\u2600 Light" : "\u25CF Dark"}
        </button>
      </div>
    </header>
  );
}

// ── Content Page Layout ─────────────────────────────────────
// Wraps a content page with top nav, breadcrumb, title, file type
// pills, sidebar TOC, and footer.
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
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 32px 80px",
          display: "grid",
          gridTemplateColumns: tocSections ? "1fr 200px" : "1fr",
          gap: 48,
        }}
      >
        <main style={{ maxWidth: 760, minWidth: 0 }}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: cat?.name || categorySlug, href: `/${categorySlug}` },
              { label: ftMeta?.label || fileTypeSlug, current: true },
            ]}
          />

          <h1
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
          <aside style={{ minWidth: 0 }}>
            <TableOfContents sections={tocSections} />
          </aside>
        )}
      </div>

      <footer
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "24px 32px",
          textAlign: "center",
          fontSize: 12,
          color: t.textTertiary,
          fontFamily: "var(--font-display)",
        }}
      >
        Getting to 100: Fixing Your Ally Accessibility Errors &middot;
        RUOnlineCon 2026 &middot; Damian Sian
      </footer>
    </div>
  );
}
