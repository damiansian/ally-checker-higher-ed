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

export default function TablesPdfPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="pdf"
      title="DRAFT — Tables"
      subtitle="PDF"
      tocSections={tocSections}
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags PDFs that contain tables without proper header
        structure. In tagged PDFs, table header cells must be marked so
        assistive technology can associate each cell with its column or
        row header.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Without header markup, screen reader users get a flat list of
        cell contents. Fixing table structure in the source document
        before exporting to PDF is the most reliable approach.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Fix in the source document</H3>
      <P>
        In Word, designate the header row (Table Design → Header Row)
        before exporting to PDF. The PDF export should preserve table
        structure when tagging is enabled.
      </P>
      <Step number="1">In Word, select the table and enable Header Row (Table Design tab).</Step>
      <Step number="2">Export to PDF with accessibility options enabled if available.</Step>
      <Step number="3">Re-upload the PDF to your LMS.</Step>

      <H3>Fixing in Acrobat Pro</H3>
      <P>
        In Adobe Acrobat Pro you can use the Accessibility tool to
        assign table header cells. This is useful when the source is not
        available.
      </P>
      <Placeholder label="Screenshot: Acrobat Pro table structure or Accessibility panel for table headers" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="PDF tables without marked header rows/cells"
        misses="Layout tables, complex table scope, correct association"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Complex tables with multiple header rows or merged cells may need
        manual verification in Acrobat or a screen reader.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "PDF tables don't have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Header row in Word before export; or tag in Acrobat Pro"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and tables"
      />
      <ResourceLink
        title="Adobe: Creating accessible PDFs"
        href="https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html"
        description="Acrobat accessibility"
      />
    </ContentPageLayout>
  );
}
