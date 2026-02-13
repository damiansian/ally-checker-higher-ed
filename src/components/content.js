"use client";
import { useTheme } from "./theme";

// ── Ally Error Callout ──────────────────────────────────────
export function AllyErrorBox({ message, severity, wcag }) {
  const { t } = useTheme();
  return (
    <div
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
          {wcag && <>WCAG {wcag}</>}
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
    <div style={{ display: "flex", gap: 14, margin: "20px 0", flexWrap: "wrap" }}>
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
