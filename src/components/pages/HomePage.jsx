import { useState } from "react";
import { useTheme } from "@/components/theme.jsx";
import { SideNav, MobileHeader } from "@/components/layout.jsx";
import { categories, fileTypeMeta, stateInfo } from "@/components/data";

// ── Metric Bar ──────────────────────────────────────────────
function MetricBar({ value, label, color }) {
  const { t } = useTheme();
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: t.textTertiary,
        marginBottom: 6, fontFamily: "var(--font-display)",
      }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map(i => {
          const filled = i <= value;
          return (
            <div key={i} style={{
              width: 24, height: 10, borderRadius: 3,
              backgroundColor: filled ? color : t.surfaceAlt,
              border: filled ? "none" : `1.5px solid ${color}`,
              boxSizing: "border-box",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }} />
          );
        })}
      </div>
    </div>
  );
}

// ── File Type Tile ──────────────────────────────────────────
function FileTypeTile({ type, state, categorySlug }) {
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
      </svg>
    );
  }

  const inner = (
    <div style={{
      padding: "16px 12px 14px",
      borderRadius: 10,
      backgroundColor: tileBg,
      border: `1.5px ${isGap || isNA ? "dashed" : "solid"} ${tileBorder}`,
      textAlign: "center",
      flex: 1,
      minWidth: 0,
      transition: "all 0.2s ease",
      cursor: isNA ? "default" : "pointer",
    }}>
      <div style={{
        fontSize: "var(--fs-base)", fontWeight: 700, color: labelColor,
        fontFamily: "var(--font-display)", marginBottom: 10,
      }}>{meta.label}</div>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        backgroundColor: statusBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 8px",
      }}>{iconEl}</div>
      <div style={{
        fontSize: "var(--fs-xs)", fontWeight: 700, color: statusColor,
        fontFamily: "var(--font-display)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}>{si.short}</div>
    </div>
  );

  if (isNA) return inner;

  return (
    <a href={`/${categorySlug}/${meta.slug}`} style={{ textDecoration: "none", flex: 1, minWidth: 0, display: "flex" }}>
      {inner}
    </a>
  );
}

// ── Category Card ───────────────────────────────────────────
function CategoryCard({ category }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTheme();

  return (
    <div className="category-card" style={{
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
            fontSize: "var(--fs-2xl)", fontWeight: 800, color: t.text,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em", margin: 0,
          }}>{category.name}</h2>
          <span style={{
            fontSize: "var(--fs-xs)", color: t.textTertiary,
            fontFamily: "var(--font-mono)", fontWeight: 500,
          }}>WCAG {category.wcag}</span>
        </div>
        <p style={{
          fontSize: "var(--fs-base)", lineHeight: 1.55, color: t.textSecondary,
          fontFamily: "var(--font-body)", margin: 0,
        }}>{category.description}</p>
      </div>

      {/* Metrics */}
      <div className="category-card-metrics" style={{ display: "flex", gap: 28, marginBottom: 20 }}>
        <MetricBar
          value={category.likelihood}
          label="Likelihood"
          color={t.likelihoodColor}
        />
        <MetricBar
          value={category.impact}
          label="Impact"
          color={t.impactColor}
        />
      </div>

      {/* File Type Tiles */}
      <div style={{
        fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: t.textTertiary,
        fontFamily: "var(--font-display)",
        marginBottom: 10,
      }}>File Types</div>
      <div className="category-card-file-types" style={{
        display: "flex", gap: 10, marginBottom: expanded ? 20 : 0,
      }}>
        {Object.entries(category.fileTypes).map(([type, state]) => (
          <FileTypeTile
            key={type}
            type={type}
            state={state}
            categorySlug={category.slug}
          />
        ))}
      </div>

      {/* Expand toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse category detail" : "Expand category detail"}
        style={{
          marginTop: 14, background: "none", border: "none",
          color: t.textTertiary, cursor: "pointer",
          fontSize: "var(--fs-xs)", fontWeight: 600,
          fontFamily: "var(--font-display)",
          padding: "4px 0",
        }}
      >
        {expanded ? "Less detail \u25B2" : "More detail \u25BC"}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="category-card-expanded-detail" style={{
          marginTop: 14,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
        }}>
          <div style={{
            padding: "16px 18px", borderRadius: 10,
            backgroundColor: t.greenBg,
            border: `1px solid ${t.greenBorder}`,
          }}>
            <div style={{
              fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", color: t.green,
              marginBottom: 8, fontFamily: "var(--font-display)",
            }}>Ally catches</div>
            <div style={{
              fontSize: "var(--fs-base)", lineHeight: 1.55, color: t.text,
              fontFamily: "var(--font-body)",
            }}>{category.allyCatches}</div>
          </div>
          <div style={{
            padding: "16px 18px", borderRadius: 10,
            backgroundColor: t.amberBg,
            border: `1px solid ${t.amberBorder}`,
          }}>
            <div style={{
              fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", color: t.amber,
              marginBottom: 8, fontFamily: "var(--font-display)",
            }}>Ally misses</div>
            <div style={{
              fontSize: "var(--fs-base)", lineHeight: 1.55, color: t.text,
              fontFamily: "var(--font-body)",
            }}>{category.allyMisses}</div>
          </div>
          {category.caveat && (
            <div style={{
              gridColumn: "1 / -1",
              padding: "12px 18px", borderRadius: 10,
              backgroundColor: t.cyanBg,
              border: `1px solid ${t.cyanBorder}`,
              fontSize: "var(--fs-base)", lineHeight: 1.5, color: t.text,
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
function Legend() {
  const { t } = useTheme();
  const states = [
    {
      key: "checked",
      color: t.tileCheckedStatus,
      label: "Ally checks",
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      ),
    },
    {
      key: "gap",
      color: t.tileGapStatus,
      label: "Gap \u2013 exists but unchecked",
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
        </svg>
      ),
    },
    {
      key: "unreliable",
      color: t.tileUnreliableStatus,
      label: "Unreliable detection",
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 9v4"/><path d="M12 17h.01"/>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
      ),
    },
    {
      key: "na",
      color: t.tileNaStatus,
      label: "Not applicable",
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
        </svg>
      ),
    },
  ];
  return (
    <div className="legend-bar" style={{
      display: "flex", gap: 20, flexWrap: "wrap",
      padding: "16px 20px", borderRadius: 10,
      backgroundColor: t.surface,
      border: `1px solid ${t.border}`,
      marginBottom: 32,
    }}>
      {states.map(s => (
        <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {s.icon(s.color)}
          <span style={{
            fontSize: "var(--fs-sm)", color: t.textSecondary,
            fontFamily: "var(--font-display)",
          }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Home Page ───────────────────────────────────────────────
export default function HomePage() {
  const { t } = useTheme();
  const [sortBy, setSortBy] = useState("impact");
  const [menuOpen, setMenuOpen] = useState(false);

  const sorted = [...categories].sort((a, b) =>
    sortBy === "impact"
      ? b.impact - a.impact || b.likelihood - a.likelihood
      : b.likelihood - a.likelihood || b.impact - a.impact
  );

  return (
    <div
      className="app-layout"
      style={{
        minHeight: "100vh",
        backgroundColor: t.bg,
        transition: "background-color 0.3s ease",
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SideNav activeCategorySlug="home" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="main-area">
        <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main
          id="main-content"
          className="home-main"
          tabIndex={-1}
          style={{ maxWidth: 960, padding: "40px 48px 80px" }}
        >
        {/* Title */}
        <h1 className="home-title" style={{
          fontSize: "var(--fs-4xl)", fontWeight: 800, color: t.text,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          margin: "0 0 12px", lineHeight: 1.1,
        }}>
          Canvas LMS <span style={{ color: t.accent }}>Accessibility</span>
        </h1>
        <p className="home-intro" style={{
          fontSize: "var(--fs-xl)", lineHeight: 1.6, color: t.textSecondary,
          fontFamily: "var(--font-body)",
          maxWidth: 600, margin: "0 0 40px",
        }}>
          Fixing your Ally accessibility errors. A practical reference for higher education instructors -- what Ally catches, what it misses, and how to fix it.
        </p>

        {/* Sort + Legend */}
        <div className="home-sort-legend" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12,
        }}>
          <div style={{
            fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: t.textTertiary,
            fontFamily: "var(--font-display)",
          }}>
            {sorted.length} categories
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["impact", "likelihood"].map(s => (
              <button key={s} type="button" onClick={() => setSortBy(s)} style={{
                padding: "5px 12px", borderRadius: 6,
                border: `1px solid ${sortBy === s ? t.accent : t.border}`,
                backgroundColor: sortBy === s ? t.accentBg : t.surface,
                color: sortBy === s ? t.accent : t.textSecondary,
                cursor: "pointer", fontSize: "var(--fs-xs)", fontWeight: 600,
                fontFamily: "var(--font-display)",
                textTransform: "capitalize",
              }}>{s}</button>
            ))}
          </div>
        </div>

        <Legend />

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {sorted.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Ally Alternative Formats Guidance */}
        <div style={{
          marginTop: 48, padding: "28px 28px 24px", borderRadius: 14,
          backgroundColor: t.amberBg,
          border: `1px solid ${t.amberBorder}`,
        }}>
          <h2 style={{
            fontSize: "var(--fs-xl)", fontWeight: 800, color: t.text,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
            margin: "0 0 12px",
          }}>
            Ally Alternative Formats: Tagged PDF Reliability
          </h2>
          <p style={{
            fontSize: "var(--fs-base)", lineHeight: 1.65, color: t.text,
            fontFamily: "var(--font-body)",
            margin: "0 0 14px",
          }}>
            Ally generates alternative formats (HTML, ePub, braille, audio, Tagged PDF) for uploaded files. The reliability of Tagged PDF output is source-format dependent, not just source-quality dependent. Direct testing of fully accessible source files confirmed the following:
          </p>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontSize: "var(--fs-base)", fontFamily: "var(--font-display)",
            margin: "0 0 16px",
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${t.amberBorder}` }}>
                <th scope="col" style={{ padding: "10px 14px 10px 0", fontWeight: 700, color: t.text, textAlign: "left" }}>Source Format</th>
                <th scope="col" style={{ padding: "10px 14px", fontWeight: 700, color: t.text, textAlign: "left" }}>Tagged PDF Reliability</th>
                <th scope="col" style={{ padding: "10px 14px", fontWeight: 700, color: t.text, textAlign: "left" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${t.amberBorder}` }}>
                <td style={{ padding: "10px 14px 10px 0", color: t.text }}>Word (.docx)</td>
                <td style={{ padding: "10px 14px", color: t.text, fontWeight: 600 }}>Acceptable</td>
                <td style={{ padding: "10px 14px", color: t.textSecondary }}>Document model transfers cleanly</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${t.amberBorder}` }}>
                <td style={{ padding: "10px 14px 10px 0", color: t.text }}>PowerPoint (.pptx)</td>
                <td style={{ padding: "10px 14px", color: t.amber, fontWeight: 700 }}>Poor</td>
                <td style={{ padding: "10px 14px", color: t.textSecondary }}>Multiple conversion failures even from fully accessible sources</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px 10px 0", color: t.text }}>PDF</td>
                <td style={{ padding: "10px 14px", color: t.textSecondary, fontWeight: 600 }}>No value</td>
                <td style={{ padding: "10px 14px", color: t.textSecondary }}>No richer source data to work from</td>
              </tr>
            </tbody>
          </table>
          <div style={{
            fontSize: "var(--fs-base)", lineHeight: 1.65, color: t.text,
            fontFamily: "var(--font-body)",
          }}>
            <p style={{ margin: "0 0 10px" }}>
              <strong style={{ fontFamily: "var(--font-display)" }}>Practitioner guidance:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25em" }}>
              <li style={{ marginBottom: 6 }}>Tagged PDF is only a reliable alternative format workflow when the source is a Word document.</li>
              <li style={{ marginBottom: 6 }}>PowerPoint instructors should not rely on Tagged PDF as an accessibility fallback for students. The conversion can introduce inaccessible content not present in the source, including raw SVG path data exposed as text, empty Figure tags, and inconsistent heading structure.</li>
              <li style={{ marginBottom: 6 }}>PDF-to-tagged-PDF conversion has no value as an alternative format workflow.</li>
              <li style={{ marginBottom: 6 }}>For PowerPoint content, instructors should fix the source file directly. If an alternative format is needed, Semantic HTML or ePub may be worth evaluating as options with better structural fidelity than Tagged PDF.</li>
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 24, padding: "20px 24px", borderRadius: 10,
          backgroundColor: t.surfaceAlt,
          border: `1px solid ${t.border}`,
          fontSize: "var(--fs-base)", lineHeight: 1.6, color: t.textSecondary,
          fontFamily: "var(--font-body)",
        }}>
          Getting to 100% in Ally is the starting line, not the finish. Automated tools catch only a fraction of accessibility issues (<a href="https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>roughly 57%, per Deque research</a>). The rest requires human judgment. This reference covers what Ally finds, what it misses, and what to do about both.
        </div>
        </main>

        <footer className="home-footer" style={{
          borderTop: `1px solid ${t.border}`,
          padding: "24px 32px",
          textAlign: "center",
          fontSize: "var(--fs-xs)", color: t.textTertiary,
          fontFamily: "var(--font-display)",
        }}>
          Canvas LMS Accessibility &middot; Damian Sian
        </footer>
      </div>
    </div>
  );
}
