"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme";
import { categories, fileTypeMeta, stateInfo } from "@/components/data";

// ── Metric Bar ──────────────────────────────────────────────
function MetricBar({ value, label, color, darkMode }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: darkMode ? "#94a3b8" : "#64748b",
        marginBottom: 6, fontFamily: "var(--font-display)",
      }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{
            width: 24, height: 10, borderRadius: 3,
            backgroundColor: i <= value ? color : (darkMode ? "#1e293b" : "#e2e8f0"),
            transition: "background-color 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── File Type Tile ──────────────────────────────────────────
function FileTypeTile({ type, state, darkMode, categorySlug }) {
  const { t } = useTheme();
  const meta = fileTypeMeta[type];
  const si = stateInfo[state];

  const isActive = state === "checked";
  const isGap = state === "gap";
  const isUnreliable = state === "unreliable";
  const isNA = state === "na";

  let tileBg, tileBorder, labelColor, statusColor, statusBg, iconEl;

  if (isActive) {
    tileBg = t.tileCheckedBg;
    tileBorder = t.tileCheckedBorder;
    labelColor = t.tileCheckedText;
    statusColor = t.tileCheckedStatus;
    statusBg = t.tileCheckedStatusBg;
    iconEl = (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    );
  } else if (isGap) {
    tileBg = t.tileGapBg;
    tileBorder = t.tileGapBorder;
    labelColor = t.tileGapText;
    statusColor = t.tileGapStatus;
    statusBg = t.tileGapStatusBg;
    iconEl = (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
      </svg>
    );
  } else if (isUnreliable) {
    tileBg = t.tileUnreliableBg;
    tileBorder = t.tileUnreliableBorder;
    labelColor = t.tileUnreliableText;
    statusColor = t.tileUnreliableStatus;
    statusBg = t.tileUnreliableStatusBg;
    iconEl = (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4"/><path d="M12 17h.01"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    );
  } else {
    tileBg = t.tileNaBg;
    tileBorder = t.tileNaBorder;
    labelColor = t.tileNaText;
    statusColor = t.tileNaStatus;
    statusBg = "transparent";
    iconEl = (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2" strokeLinecap="round">
        <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
      </svg>
    );
  }

  const inner = (
    <div style={{
      padding: "10px 8px 8px",
      borderRadius: 8,
      backgroundColor: tileBg,
      border: `1.5px ${isGap ? "dashed" : "solid"} ${tileBorder}`,
      textAlign: "center",
      minWidth: 72,
      transition: "all 0.2s ease",
      cursor: isNA ? "default" : "pointer",
      opacity: isNA ? 0.5 : 1,
    }}>
      <div style={{
        fontSize: 14, fontWeight: 600, color: labelColor,
        fontFamily: "var(--font-display)", marginBottom: 6,
      }}>{meta.label}</div>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        backgroundColor: statusBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 4px",
      }}>{iconEl}</div>
      <div style={{
        fontSize: 11, fontWeight: 600, color: statusColor,
        fontFamily: "var(--font-display)",
      }}>{si.short}</div>
    </div>
  );

  if (isNA) return inner;

  return (
    <Link href={`/${categorySlug}/${meta.slug}`} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  );
}

// ── Category Card ───────────────────────────────────────────
function CategoryCard({ category, darkMode }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTheme();

  return (
    <div style={{
      backgroundColor: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: 28,
      transition: "all 0.3s ease",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 800, color: t.text,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em", margin: 0,
          }}>{category.name}</h2>
          <span style={{
            fontSize: 11, color: t.textTertiary,
            fontFamily: "var(--font-mono)", fontWeight: 500,
          }}>WCAG {category.wcag}</span>
        </div>
        <p style={{
          fontSize: 14, lineHeight: 1.55, color: t.textSecondary,
          fontFamily: "var(--font-body)", margin: 0,
        }}>{category.description}</p>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 28, marginBottom: 20 }}>
        <MetricBar
          value={category.likelihood}
          label="Likelihood"
          color={t.likelihoodColor}
          darkMode={darkMode}
        />
        <MetricBar
          value={category.impact}
          label="Impact"
          color={category.impact >= 5 ? t.impactCriticalColor : t.impactColor}
          darkMode={darkMode}
        />
      </div>

      {/* File Type Tiles */}
      <div style={{
        display: "flex", gap: 8, marginBottom: expanded ? 20 : 0,
        flexWrap: "wrap",
      }}>
        {Object.entries(category.fileTypes).map(([type, state]) => (
          <FileTypeTile
            key={type}
            type={type}
            state={state}
            darkMode={darkMode}
            categorySlug={category.slug}
          />
        ))}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: 14, background: "none", border: "none",
          color: t.textTertiary, cursor: "pointer",
          fontSize: 12, fontWeight: 600,
          fontFamily: "var(--font-display)",
          padding: "4px 0",
        }}
      >
        {expanded ? "Less detail \u25B2" : "More detail \u25BC"}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          marginTop: 14,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
        }}>
          <div style={{
            padding: "16px 18px", borderRadius: 10,
            backgroundColor: t.greenBg,
            border: `1px solid ${t.greenBorder}`,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", color: t.green,
              marginBottom: 8, fontFamily: "var(--font-display)",
            }}>Ally catches</div>
            <div style={{
              fontSize: 13.5, lineHeight: 1.55, color: t.text,
              fontFamily: "var(--font-body)",
            }}>{category.allyCatches}</div>
          </div>
          <div style={{
            padding: "16px 18px", borderRadius: 10,
            backgroundColor: t.amberBg,
            border: `1px solid ${t.amberBorder}`,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", color: t.amber,
              marginBottom: 8, fontFamily: "var(--font-display)",
            }}>Ally misses</div>
            <div style={{
              fontSize: 13.5, lineHeight: 1.55, color: t.text,
              fontFamily: "var(--font-body)",
            }}>{category.allyMisses}</div>
          </div>
          {category.caveat && (
            <div style={{
              gridColumn: "1 / -1",
              padding: "12px 18px", borderRadius: 10,
              backgroundColor: t.cyanBg,
              border: `1px solid ${t.cyanBorder}`,
              fontSize: 13, lineHeight: 1.5, color: t.text,
              fontFamily: "var(--font-body)", fontStyle: "italic",
            }}>
              <strong style={{ fontFamily: "var(--font-display)", fontStyle: "normal" }}>Note: </strong>
              {category.caveat}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Legend ───────────────────────────────────────────────────
function Legend({ darkMode }) {
  const { t } = useTheme();
  const states = [
    { key: "checked", color: t.tileCheckedStatus, label: "Ally checks this" },
    { key: "gap", color: t.tileGapStatus, label: "Exists but unchecked" },
    { key: "unreliable", color: t.tileUnreliableStatus, label: "Unreliable detection" },
    { key: "na", color: t.tileNaStatus, label: "Not applicable" },
  ];
  return (
    <div style={{
      display: "flex", gap: 20, flexWrap: "wrap",
      padding: "16px 20px", borderRadius: 10,
      backgroundColor: t.surface,
      border: `1px solid ${t.border}`,
      marginBottom: 32,
    }}>
      {states.map(s => (
        <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 3,
            backgroundColor: s.color,
          }} />
          <span style={{
            fontSize: 13, color: t.textSecondary,
            fontFamily: "var(--font-display)",
          }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Home Page ───────────────────────────────────────────────
export default function HomePage() {
  const { dark, setDark, t } = useTheme();
  const [sortBy, setSortBy] = useState("impact");

  const sorted = [...categories].sort((a, b) =>
    sortBy === "impact"
      ? b.impact - a.impact || b.likelihood - a.likelihood
      : b.likelihood - a.likelihood || b.impact - a.impact
  );

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: t.bg,
      transition: "background-color 0.3s ease",
    }}>
      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${t.border}`,
        padding: "0 32px",
        backgroundColor: t.surface,
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: 56,
        }}>
          <span style={{
            fontSize: 16, fontWeight: 800, color: t.text,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}>Getting to 100</span>
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "6px 14px", borderRadius: 6,
              border: `1px solid ${t.border}`,
              backgroundColor: t.surface, color: t.textSecondary,
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              fontFamily: "var(--font-display)",
            }}
          >{dark ? "\u2600 Light" : "\u25CF Dark"}</button>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 32px 80px" }}>
        {/* Title */}
        <h1 style={{
          fontSize: 40, fontWeight: 800, color: t.text,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          margin: "0 0 12px", lineHeight: 1.1,
        }}>
          Getting to <span style={{ color: t.accent }}>100</span>%
        </h1>
        <p style={{
          fontSize: 18, lineHeight: 1.6, color: t.textSecondary,
          fontFamily: "var(--font-body)",
          maxWidth: 600, margin: "0 0 40px",
        }}>
          Fixing your Ally accessibility errors. A practical reference for higher education instructors -- what Ally catches, what it misses, and how to fix it.
        </p>

        {/* Sort + Legend */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: t.textTertiary,
            fontFamily: "var(--font-display)",
          }}>
            {sorted.length} categories
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["impact", "likelihood"].map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                padding: "5px 12px", borderRadius: 6,
                border: `1px solid ${sortBy === s ? t.accent : t.border}`,
                backgroundColor: sortBy === s ? t.accentBg : t.surface,
                color: sortBy === s ? t.accent : t.textSecondary,
                cursor: "pointer", fontSize: 12, fontWeight: 600,
                fontFamily: "var(--font-display)",
                textTransform: "capitalize",
              }}>{s}</button>
            ))}
          </div>
        </div>

        <Legend darkMode={dark} />

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {sorted.map(cat => (
            <CategoryCard key={cat.id} category={cat} darkMode={dark} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 48, padding: "20px 24px", borderRadius: 10,
          backgroundColor: t.surfaceAlt,
          border: `1px solid ${t.border}`,
          fontSize: 14, lineHeight: 1.6, color: t.textSecondary,
          fontFamily: "var(--font-body)",
        }}>
          Getting to 100% in Ally is the starting line, not the finish. Automated tools catch roughly 57% of accessibility issues. The rest requires human judgment. This site covers what Ally finds, what it misses, and what to do about both.
        </div>
      </main>

      <footer style={{
        borderTop: `1px solid ${t.border}`,
        padding: "24px 32px",
        textAlign: "center",
        fontSize: 12, color: t.textTertiary,
        fontFamily: "var(--font-display)",
      }}>
        Getting to 100 &middot; RUOnlineCon 2026 &middot; Damian Sian
      </footer>
    </div>
  );
}
