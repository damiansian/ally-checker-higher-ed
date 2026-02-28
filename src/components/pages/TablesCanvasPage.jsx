import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Placeholder,
} from "@/components/content.jsx";

const tocSections = [
  { id: "ally-error", label: "The Ally Error" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "how-to-fix", label: "How to Fix It" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
  { id: "quick-ref", label: "Quick Reference" },
  { id: "resources", label: "Resources" },
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

function H3({ children }) {
  const { t } = useTheme();
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
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

export default function TablesCanvasPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="canvas"
      title="DRAFT — Tables"
      subtitle="Canvas editor"
      tocSections={tocSections}
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Table cells (3x3+) must have associated headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags tables in Canvas Rich Content Editor (RCE) content when
        tables of 3×3 or larger do not have header cells associated. In
        HTML, that means using <code>&lt;th&gt;</code> for header cells
        and proper scope or headers attributes where needed.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Screen readers use table headers to announce context for each
        cell. Without <code>&lt;th&gt;</code> or correct associations,
        users hear a stream of cell values with no column or row context.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Using the RCE table tool</H3>
      <P>
        When you insert a table in the Canvas RCE, the first row is often
        rendered as a header row. If you create a table and then change
        its structure, headers can be lost.
      </P>
      <Step number="1">Insert a table via the RCE table menu. When prompted, specify header row (or header column) if the option is offered.</Step>
      <Step number="2">Put column titles in the first row (or row titles in the first column). Do not use the first row for data only.</Step>
      <Step number="3">If you need to fix an existing table, switch to the HTML editor and ensure the first row uses <code>&lt;th&gt;</code> instead of <code>&lt;td&gt;</code> for header cells.</Step>
      <Placeholder label="Screenshot: Canvas RCE table insert with header option or HTML showing th elements" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables 3×3 or larger without associated headers in RCE content"
        misses="Layout tables, complex tables, correct scope for multi-level headers"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not catch every scope or association error in complex
        tables. Layout tables used for visual alignment may be flagged or
        not depending on structure.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Table cells (3x3+) must have associated headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "First row (or column) as header; use th in HTML if needed"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and tables"
      />
      <ResourceLink
        title="W3C: Table Concepts"
        href="https://www.w3.org/WAI/tutorials/tables/"
        description="Accessible table markup"
      />
    </ContentPageLayout>
  );
}
