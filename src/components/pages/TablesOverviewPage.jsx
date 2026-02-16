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

export default function TablesOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="overview"
      title="Tables"
      subtitle="Overview"
      tocSections={tocSections}
    >
      <SH id="overview">Overview</SH>
      <P>
        Data tables need marked header rows so screen readers can announce
        column context as students navigate cells. Without headers, a screen
        reader user hears a stream of cell values with no idea what column
        they belong to.
      </P>
      <P>
        This category covers WCAG 1.3.1 (Info and Relationships, Level A).
        Ally checks for table header issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files.
      </P>
      <Callout type="info">
        Detailed file-type pages with testing results, fix instructions, and
        screenshots are coming soon.
      </Callout>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <Placeholder label="Detailed error messages and testing results by file type coming soon" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without designated header rows"
        misses="Layout tables misused for formatting, overly complex structures, whether a table is the right format at all"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <Placeholder label="Detailed analysis of Ally's table detection gaps coming soon" />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "1 check"],
        ["WCAG criterion", "1.3.1 Info and Relationships (Level A)"],
        ["Likelihood", "3 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
      ]} />
    </ContentPageLayout>
  );
}
