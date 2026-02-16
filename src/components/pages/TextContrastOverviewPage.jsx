import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  Callout,
  Placeholder,
} from "@/components/content.jsx";

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "ally-errors", label: "Ally Error Messages" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
  { id: "quick-ref", label: "Quick Reference" },
];

function SH({ id, children }) {
  const { t } = useTheme();
  return (
    <h2 id={id} style={{
      fontSize: 22, fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      letterSpacing: "-0.01em",
      marginTop: 56, marginBottom: 16,
      paddingTop: 20, scrollMarginTop: 80,
    }}>{children}</h2>
  );
}

function P({ children }) {
  const { t } = useTheme();
  return (
    <p style={{
      fontSize: 15.5, lineHeight: 1.75, color: t.text,
      fontFamily: "var(--font-body)",
      margin: "0 0 18px",
    }}>{children}</p>
  );
}

export default function TextContrastOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="text-contrast"
      fileTypeSlug="overview"
      title="Text Contrast"
      subtitle="Overview"
      tocSections={tocSections}
    >
      <SH id="overview">Overview</SH>
      <P>
        Text must have sufficient contrast against its background so that
        students with low vision or color vision deficiencies can read it.
        WCAG requires a minimum contrast ratio of 4.5:1 for normal text and
        3:1 for large text (18pt or 14pt bold). Color alone cannot be the
        only way to convey information.
      </P>
      <P>
        Ally checks for contrast issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files. Image files are not applicable for
        this check.
      </P>
      <Callout type="info">
        Detailed file-type pages with testing results, fix instructions, and
        screenshots are coming soon.
      </Callout>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document has text with insufficient contrast"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <Placeholder label="Detailed error messages and testing results by file type coming soon" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text)"
        misses="Color as sole indicator, contrast in images/charts, branded templates"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <Placeholder label="Detailed analysis of Ally's contrast detection gaps coming soon" />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "1 check"],
        ["WCAG criterion", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Likelihood", "4 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
      ]} />
    </ContentPageLayout>
  );
}
