import { useTheme } from "./theme";

// WCAG 2.2 Understanding doc slug lookup
const WCAG_SLUGS = {
  "1.1.1": "non-text-content",
  "1.3.1": "info-and-relationships",
  "1.4.1": "use-of-color",
  "1.4.3": "contrast-minimum",
  "1.4.6": "contrast-enhanced",
  "1.4.11": "non-text-contrast",
  "2.3.1": "three-flashes-or-below-threshold",
  "2.4.1": "bypass-blocks",
  "2.4.6": "headings-and-labels",
  "3.1.1": "language-of-page",
  "3.1.2": "language-of-parts",
};

export function wcagUrl(scNumber) {
  const slug = WCAG_SLUGS[scNumber];
  return slug
    ? `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`
    : null;
}

function WcagLink({ text }) {
  const match = typeof text === "string" && text.match(/^(\d+\.\d+\.\d+)/);
  const url = match && wcagUrl(match[1]);
  if (!url) return <>WCAG {text}</>;
  return (
    <>WCAG <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{text}</a></>
  );
}

// ── Ally Error Callout ──────────────────────────────────────
export function AllyErrorBox({ message, severity, wcag }) {
  const { t } = useTheme();
  return (
    <div
      className="ally-error-box"
      style={{
        padding: "20px 24px",
        borderRadius: 10,
        backgroundColor: t.accentBg,
        border: `1px solid ${t.accentBorder}`,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: t.accent,
          marginBottom: 8,
          fontFamily: "var(--font-display)",
        }}
      >
        Ally Error Message
      </div>
      <div
        className="ally-error-box-message"
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        &ldquo;{message}&rdquo;
      </div>
      {(severity || wcag) && (
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: t.textSecondary,
            fontFamily: "var(--font-display)",
          }}
        >
          {severity && (
            <>
              Severity: <strong>{severity}</strong>
            </>
          )}
          {severity && wcag && " · "}
          {wcag && <WcagLink text={wcag} />}
        </div>
      )}
    </div>
  );
}

// ── Numbered Step ───────────────────────────────────────────
export function Step({ number, children }) {
  const { t } = useTheme();
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          flexShrink: 0,
          backgroundColor: t.surfaceAlt,
          border: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color: t.textSecondary,
          fontFamily: "var(--font-display)",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 15.5,
          lineHeight: 1.7,
          color: t.text,
          fontFamily: "var(--font-body)",
          paddingTop: 3,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Compare Boxes (Catches vs Misses) ───────────────────────
export function CompareBoxes({ catches, misses }) {
  const { t } = useTheme();
  return (
    <div className="compare-boxes" style={{ display: "flex", gap: 14, margin: "20px 0", flexWrap: "wrap" }}>
      <div
        style={{
          padding: "18px 22px",
          borderRadius: 10,
          backgroundColor: t.greenBg,
          border: `1px solid ${t.greenBorder}`,
          flex: 1,
          minWidth: 240,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: t.green,
            marginBottom: 10,
            fontFamily: "var(--font-display)",
          }}
        >
          &#10003; Ally catches
        </div>
        <div
          style={{
            fontSize: 14.5,
            lineHeight: 1.65,
            color: t.text,
            fontFamily: "var(--font-body)",
          }}
        >
          {catches}
        </div>
      </div>
      <div
        style={{
          padding: "18px 22px",
          borderRadius: 10,
          backgroundColor: t.amberBg,
          border: `1px solid ${t.amberBorder}`,
          flex: 1,
          minWidth: 240,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: t.amber,
            marginBottom: 10,
            fontFamily: "var(--font-display)",
          }}
        >
          &#9888; Ally misses
        </div>
        <div
          style={{
            fontSize: 14.5,
            lineHeight: 1.65,
            color: t.text,
            fontFamily: "var(--font-body)",
          }}
        >
          {misses}
        </div>
      </div>
    </div>
  );
}

// ── Placeholder Block ───────────────────────────────────────
export function Placeholder({ label }) {
  const { t } = useTheme();
  return (
    <div
      style={{
        padding: "28px 24px",
        borderRadius: 10,
        border: `2px dashed ${t.border}`,
        backgroundColor: t.surfaceAlt,
        textAlign: "center",
        color: t.textTertiary,
        fontSize: 13,
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        margin: "24px 0",
      }}
    >
      {label}
    </div>
  );
}

// ── Quick Reference Table ───────────────────────────────────
export function RefTable({ rows }) {
  const { t } = useTheme();
  return (
    <table
      className="ref-table"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 14,
        fontFamily: "var(--font-display)",
        margin: "20px 0",
      }}
    >
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
            <td
              style={{
                padding: "12px 16px 12px 0",
                fontWeight: 600,
                color: t.textSecondary,
                width: "40%",
                verticalAlign: "top",
              }}
            >
              {label}
            </td>
            <td style={{ padding: "12px 0", color: t.text }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Checker detection comparison table ───────────────────────
// rows: array of { testType, ally, msOffice, acrobat, rce, fileUpload }
// Use for "Type of test" vs detection by checker / context.
export function CheckerComparisonTable({ caption, rows }) {
  const { t } = useTheme();
  const columns = [
    { key: "ally", label: "Ally" },
    { key: "msOffice", label: "MS Office" },
    { key: "acrobat", label: "Acrobat" },
  ];
  return (
    <figure
      className="table-scroll-wrapper"
      style={{ margin: "24px 0" }}
    >
      <div
        className="table-scroll-region"
        tabIndex={0}
        role="region"
        aria-label={caption || "Scrollable comparison table"}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            minWidth: 600,
          }}
          aria-label={caption || "Checker detection comparison"}
        >
        {caption && (
          <caption
            style={{
              textAlign: "left",
              fontSize: 13,
              color: t.textTertiary,
              fontFamily: "var(--font-display)",
              marginBottom: 10,
            }}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr style={{ borderBottom: `2px solid ${t.border}` }}>
            <th
              scope="col"
              style={{
                padding: "12px 16px 12px 0",
                fontWeight: 700,
                color: t.textSecondary,
                textAlign: "left",
                fontFamily: "var(--font-display)",
              }}
            >
              Type of test
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{
                  padding: "12px 16px",
                  fontWeight: 700,
                  color: t.textSecondary,
                  textAlign: "left",
                  fontFamily: "var(--font-display)",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: `1px solid ${t.borderLight}` }}
            >
              <td
                style={{
                  padding: "12px 16px 12px 0",
                  fontWeight: 600,
                  color: t.text,
                  verticalAlign: "top",
                }}
              >
                {row.testType}
              </td>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "12px 16px",
                    color: t.textSecondary,
                    verticalAlign: "top",
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </figure>
  );
}

// ── Resource Link Card ──────────────────────────────────────
export function ResourceLink({ title, href, description }) {
  const { t } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        padding: "14px 18px",
        borderRadius: 10,
        backgroundColor: t.surface,
        border: `1px solid ${t.border}`,
        textDecoration: "none",
        marginBottom: 10,
        transition: "border-color 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.border)}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: t.link,
          fontFamily: "var(--font-display)",
          marginBottom: 3,
        }}
      >
        {title} &rarr;
      </div>
      {description && (
        <div
          style={{
            fontSize: 13,
            color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}
        >
          {description}
        </div>
      )}
    </a>
  );
}

// ── Callout Box ─────────────────────────────────────────────
export function Callout({ type = "info", children }) {
  const { t } = useTheme();
  const colors = {
    info: { bg: t.surfaceAlt, border: t.border, text: t.textSecondary },
    warning: { bg: t.amberBg, border: t.amberBorder, text: t.amber },
    tip: { bg: t.greenBg, border: t.greenBorder, text: t.green },
  };
  const c = colors[type] || colors.info;
  return (
    <div
      style={{
        padding: "16px 22px",
        borderRadius: 10,
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        margin: "20px 0",
        fontSize: 14.5,
        lineHeight: 1.65,
        color: t.text,
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </div>
  );
}
