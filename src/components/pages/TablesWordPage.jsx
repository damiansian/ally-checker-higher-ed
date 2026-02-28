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

export default function TablesWordPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="word"
      title="DRAFT — Tables"
      subtitle="Word Documents"
      tocSections={tocSections}
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Document tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags Word tables that do not have a designated header row.
        Data tables need a clear first row (or column) marked as headers so
        screen readers can announce column or row context when reading
        cells.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Without headers, a screen reader user hears cell values in sequence
        with no indication of what each value represents. A table of
        grades, for example, becomes a list of numbers and names with no
        way to know which column is &quot;Quiz 1&quot; vs &quot;Final.&quot;
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Designating a header row</H3>
      <Step number="1">Click inside the table.</Step>
      <Step number="2">On the <strong>Table Design</strong> tab (or <strong>Table Tools → Design</strong>), check <strong>Header Row</strong> so the first row is styled and exposed as the header.</Step>
      <Step number="3">Ensure the first row actually contains the column titles (or row titles if your table is row-based).</Step>
      <Step number="4">If the table has both column and row headers, you may need to use the Accessibility options or repeat header row for long tables.</Step>
      <Placeholder label="Screenshot: Word Table Design with Header Row checked" />

      <H3>Layout tables</H3>
      <P>
        If the &quot;table&quot; is only used for layout (e.g. two columns
        of text), consider using Word&apos;s columns feature or removing
        the table. If you keep a layout table, mark the first row as header
        only if it is semantically a header; otherwise screen reader
        users may get confusing announcements.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without a designated header row"
        misses="Layout tables misused for formatting, complex tables with merged cells, scope"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not distinguish data tables from layout tables. Complex
        tables with multiple header levels may need manual verification.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Document tables don't have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Table Design → Header Row; ensure first row has column titles"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and table structure"
      />
      <ResourceLink
        title="Microsoft: Create accessible tables"
        href="https://support.microsoft.com/en-us/office/create-accessible-tables-in-word-a0633bd2-ecb3-4e0a-9f6e-bf6a96c0358f"
        description="Word table accessibility"
      />
    </ContentPageLayout>
  );
}
