import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
} from "@/components/content.jsx";

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
      title="DRAFT - Tables"
      subtitle="Overview"
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

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Wording varies by file type:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.75, color: "inherit" }}>
        <li><strong>Word:</strong> &ldquo;Document tables don&apos;t have headers&rdquo;</li>
        <li><strong>PowerPoint:</strong> &ldquo;Presentation tables don&apos;t have headers&rdquo;</li>
        <li><strong>PDF:</strong> &ldquo;PDF tables don&apos;t have headers&rdquo;</li>
        <li><strong>Canvas:</strong> &ldquo;Table cells (3x3+) must have associated headers&rdquo;</li>
      </ul>
      <P>
        Severity is typically <strong>Major</strong>. Use the file-type
        pages for fix steps.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without designated header rows"
        misses="Layout tables misused for formatting, overly complex structures, whether a table is the right format at all"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally focuses on whether data tables have header cells marked. It
        does not distinguish <strong>data tables</strong> from
        <strong> layout tables</strong> used for visual alignment (e.g.
        two columns of text). Layout tables should ideally be avoided or
        marked so screen readers do not treat them as data; Ally may not
        flag misuse.
      </P>
      <P>
        <strong>Complex tables</strong> (multiple header rows, merged
        cells, scope) may not be fully validated. Whether a table is the
        right way to present the information at all is a design question
        Ally does not address. Manual review is recommended for any
        non-simple grid.
      </P>

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
