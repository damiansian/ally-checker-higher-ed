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

export default function TablesPowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="powerpoint"
      title="DRAFT — Tables"
      subtitle="PowerPoint Presentations"
      tocSections={tocSections}
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Presentation tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags tables in PowerPoint that do not have a designated
        header row. Slide tables used for data need a clear first row
        (or column) marked as headers for screen reader users.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Without headers, screen reader users hear cell content without
        column or row context. Tables in slides are often used for
        grades, schedules, or comparisons; header structure is essential.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Designating a header row</H3>
      <Step number="1">Select the table.</Step>
      <Step number="2">On the <strong>Table Design</strong> tab, check <strong>Header Row</strong> so the first row is formatted and exposed as the header.</Step>
      <Step number="3">Ensure the first row contains the column titles. If your table has row headers instead, use the first column and check for a &quot;First Column&quot; or equivalent option where available.</Step>
      <Placeholder label="Screenshot: PowerPoint Table Design with Header Row option" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without a designated header row in slides"
        misses="Layout tables, complex tables, whether table is the right format"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not distinguish data tables from layout tables. Complex
        tables may need manual review.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Presentation tables don't have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Table Design → Header Row; first row = column titles"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and tables"
      />
      <ResourceLink
        title="Microsoft: Make slides more accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="PowerPoint accessibility"
      />
    </ContentPageLayout>
  );
}
