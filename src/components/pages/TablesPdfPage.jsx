import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
} from "@/components/content.jsx";

function SH({ id, children }) {
  const { t } = useTheme();
  return (
    <h2 id={id} style={{
      fontSize: "var(--fs-2xl)", fontWeight: 700, color: t.text,
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
      fontSize: "var(--fs-lg)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
  );
}

function P({ children }) {
  const { t } = useTheme();
  return (
    <p style={{
      fontSize: "var(--fs-md)", lineHeight: 1.75, color: t.text,
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
      title="Tables"
      subtitle="PDF"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags PDFs that contain tables without proper header
        structure. In tagged PDFs, table header cells must be marked as{" "}
        <code>&lt;TH&gt;</code> (not <code>&lt;TD&gt;</code>) so
        assistive technology can associate each data cell with its column
        or row header.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        PDF tables inherit their accessibility from the source document.
        If the Word or PowerPoint file had proper header rows, the PDF
        export usually preserves them. If the source had no headers, the
        PDF will not have them either. Fixing table structure in the
        source before exporting is always the most reliable approach.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Fix in the source document</H3>
      <P>
        The best fix is upstream. Designate header rows in Word or
        PowerPoint before exporting to PDF.
      </P>
      <Step number="1">In Word, click inside the table and enable <strong>Header Row</strong> on the Table Design tab.</Step>
      <Step number="2">Export to PDF with accessibility options enabled (&quot;Best for electronic distribution and accessibility&quot; or tags/structure checkbox).</Step>
      <Step number="3">Re-upload the PDF to your LMS.</Step>

      <H3>Fixing in Acrobat Pro</H3>
      <P>
        When the source document is not available, you can fix table
        headers directly in Adobe Acrobat Pro using the tag tree.
      </P>
      <Step number="1">Open the <strong>Tags</strong> panel (View &rarr; Show/Hide &rarr; Navigation Panes &rarr; Tags).</Step>
      <Step number="2">Locate the <code>&lt;Table&gt;</code> tag.</Step>
      <Step number="3">Expand the first <code>&lt;TR&gt;</code> (table row).</Step>
      <Step number="4">If the header cells are tagged as <code>&lt;TD&gt;</code>, right-click each and select <strong>Properties</strong>.</Step>
      <Step number="5">Change the <strong>Type</strong> from <code>&lt;TD&gt;</code> to <code>&lt;TH&gt;</code>.</Step>
      <Step number="6">Set the <strong>Scope</strong> attribute to &quot;Column&quot; (or &quot;Row&quot; for row headers).</Step>

      <Callout>
        <strong>Row headers in PDF.</strong> If your table has both column
        and row headers (like a schedule with time slots in the first
        column), you need to tag <em>both</em> sets. Set{" "}
        <code>Scope=&quot;Column&quot;</code> for the top row and{" "}
        <code>Scope=&quot;Row&quot;</code> for the first cell of each data
        row. This is a manual process in Acrobat and is not something
        automated tools verify completely.
      </Callout>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="PDF tables without marked header rows/cells"
        misses="Layout tables, complex table scope, row headers, correct cell-to-header association"
      />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "PDF tables don\u2019t have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Best fix", "Header row in Word/PowerPoint before export"],
        ["Acrobat fix", "Tags panel \u2192 change TD to TH \u2192 set Scope"],
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
        description="Acrobat accessibility including table tagging"
      />
    </ContentPageLayout>
  );
}
