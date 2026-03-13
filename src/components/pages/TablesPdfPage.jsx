import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
  CheckerComparisonTable,
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

/**
 * SampleTable renders an accessible or intentionally broken table for demo purposes.
 *
 * Props:
 *   headers         – Array of header label strings shown in the first row.
 *   rows            – 2-D array of cell content.
 *   caption         – Visible caption text (also used as aria-label).
 *   highlightHeaders – When true, renders the header row with green styling (correct version).
 *   broken          – When true, the "header" row uses <td> cells inside <tbody> with no
 *                     <thead>, visually identical to the highlighted version but
 *                     programmatically incorrect (no <th> or scope attributes).
 */
function SampleTable({ headers, rows, caption, highlightHeaders = false, broken = false }) {
  const { t } = useTheme();

  const headerCellStyle = {
    padding: "10px 16px",
    fontWeight: 700,
    color: t.green,
    textAlign: "left",
    fontFamily: "var(--font-display)",
    backgroundColor: t.greenBg,
  };

  const dataCellStyle = {
    padding: "10px 16px",
    color: t.text,
    verticalAlign: "top",
  };

  return (
    <figure style={{ margin: "24px 0" }}>
      <div
        className="table-scroll-region"
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        role="region"
        aria-label={caption || "Sample table"}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--fs-base)",
            fontFamily: "var(--font-body)",
            minWidth: 400,
          }}
          aria-label={caption}
        >
          {caption && (
            <caption style={{
              textAlign: "left",
              fontSize: "var(--fs-sm)",
              color: t.textTertiary,
              fontFamily: "var(--font-display)",
              marginBottom: 10,
            }}>
              {caption}
            </caption>
          )}

          {broken ? (
            /* Broken: the "header" row is plain <td> cells inside <tbody>.
               No <thead>, no <th>, no scope attribute.
               Looks identical to the corrected version but has zero semantic header markup. */
            <tbody>
              <tr style={{ borderBottom: `2px solid ${t.border}` }}>
                {headers.map((h, i) => (
                  <td key={i} style={headerCellStyle}>{h}</td>
                ))}
              </tr>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                  {row.map((cell, j) => (
                    <td key={j} style={dataCellStyle}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            /* Correct: proper <thead> with <th scope="col"> for each column header. */
            <>
              <thead>
                <tr style={{ borderBottom: `2px solid ${t.border}` }}>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      style={{
                        ...headerCellStyle,
                        color: highlightHeaders ? t.green : t.textSecondary,
                        backgroundColor: highlightHeaders ? t.greenBg : "transparent",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                    {row.map((cell, j) => (
                      <td key={j} style={dataCellStyle}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </figure>
  );
}

export default function TablesPdfPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="pdf"
      title="Tables"
      subtitle="PDF"
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags PDFs that contain tables without proper header
        structure. In tagged PDFs, table header cells must be marked as{" "}
        <code>&lt;TH&gt;</code> (not <code>&lt;TD&gt;</code>) with{" "}
        <code>scope</code> attributes so assistive technology can associate
        each data cell with its column or row header.
      </P>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        PDF tables inherit their accessibility from the source document.
        If the Word or PowerPoint file had proper header rows, the PDF
        export usually preserves them. If the source had no headers, the
        PDF will not have them either. Fixing table structure in the
        source before exporting is always the most reliable approach.
      </P>
      <P>
        When a screen reader encounters a PDF table without designated headers, the student gets
        raw data with no context. A student hears &quot;85&quot; but does not know which column
        or row it belongs to. Without header associations, data tables become grids of meaningless values.
      </P>

      {/* ── Example Scenarios ── */}
      <SH id="example-scenarios">Example Scenarios</SH>

      <H3>Scenario 1: Missing column headers (Ally catches)</H3>
      <P>
        This table has data that clearly belongs under column headers, but
        no header row is designated. All three automated checkers flag this.
      </P>
      <SampleTable
        caption="Broken: Events table without designated column headers"
        headers={["Date", "Event", "Venue"]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
        broken
      />
      <CheckerComparisonTable
        caption="Detection results for a table missing column headers"
        rows={[
          { testType: "No designated header row", ally: "Detected", msOffice: "N/A (source doc only)", acrobat: "Detected" },
        ]}
      />
      <P>
        The fix is straightforward: designate the first row as a header row
        in the source document before export, or fix the PDF tag structure in Acrobat Pro.
      </P>
      <SampleTable
        caption="Corrected: Events table with designated column headers"
        headers={["Date", "Event", "Venue"]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
        highlightHeaders
      />

      <H3>Scenario 2: Row and column headers (Ally misses)</H3>
      <P>
        This schedule table has content in the top row that should be column
        headers <em>and</em> content in the first column that should be row
        headers. The column headers are marked up correctly, but the first column
        (time slots) is not marked as row headers. No automated tool catches this.
      </P>
      <SampleTable
        caption="Broken: Schedule table where row headers are not programmatically marked"
        headers={["Time", "Monday", "Wednesday", "Friday"]}
        rows={[
          [<strong key="r1">8:00 – 9:00 AM</strong>, "Closed", "Open", "Open"],
          [<strong key="r2">9:00 – 10:00 AM</strong>, "Open", "Closed", "Open"],
          [<strong key="r3">10:00 – 11:00 AM</strong>, "Open", "Open", "Closed"],
        ]}
      />
      <CheckerComparisonTable
        caption="Detection results for missing row headers"
        rows={[
          { testType: "Row headers not designated", ally: "Not detected", msOffice: "N/A", acrobat: "Not detected" },
        ]}
      />
      <Callout type="warning">
        <strong>This is a manual review issue.</strong> When your table has
        both column headers (top row) and row headers (first column), you
        need to verify both are properly marked. A screen reader user
        navigating this table would hear &quot;Open&quot; and know it is
        Wednesday (column header) but not that it is the 9:00 – 10:00
        AM slot (missing row header).
      </Callout>

      <H3>Scenario 3: Merged/irregular headers (Ally misses)</H3>
      <P>
        This table uses merged cells to group columns under two planet headers.
        No automated tool flags it, but a screen reader cannot reliably associate
        each data cell with both its column group header (Mars or Venus) and its
        sub-header (Produced or Sold). The fix is to simplify: split the table into
        two smaller, straightforward tables.
      </P>
      <Callout type="info">
        <strong>No automated tool catches this.</strong> Screen readers handle multi-level
        column headers inconsistently. The fix is to simplify by splitting.
      </Callout>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.accentBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Broken: Merged header table
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          This example uses colspan to span Mars and Venus across two sub-columns each.
          Even with proper scope attributes, screen readers handle multi-level column
          headers inconsistently.
        </P>
        <div style={{
          fontSize: "var(--fs-xs)",
          fontStyle: "italic",
          color: t.textSecondary,
          marginBottom: 12,
        }}>
          (Visual representation of a table with Mars and Venus as group headers, each
          spanning Produced and Sold sub-columns, with Teddy Bears and Board Games as row data)
        </div>
        <CheckerComparisonTable
          caption="Detection results for complex merged tables"
          rows={[
            { testType: "Complex table (merged cells)", ally: "Not detected", msOffice: "N/A", acrobat: "Not detected" },
          ]}
        />
      </div>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.greenBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Corrected: Split into two simple tables
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          Fix in the source document and re-export. Split the complex table into two separate
          tables, one per group. Each table has its own header row properly designated.
        </P>
      </div>

      <H3>Scenario 4: Repeated header rows mid-table (Ally misses)</H3>
      <P>
        This table combines two logical data sets into one table by repeating the header
        row mid-table. Visually it looks organized, but a screen reader cannot associate
        the second set of column headers with the rows below them. No automated tool
        detects this.
      </P>
      <Callout type="warning">
        <strong>Ally may score this 100%.</strong> The document is still inaccessible.
      </Callout>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.accentBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Broken: Stacked table with repeated headers
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          The first section&apos;s column headers are in the proper thead and work correctly.
          The second section&apos;s header row is in tbody using plain td elements styled
          to look like headers. A screen reader has no way to associate Example 3 Ltd or
          Example 4 Inc with the rows below them.
        </P>
        <CheckerComparisonTable
          caption="Detection results for repeated mid-table headers"
          rows={[
            { testType: "Repeated header rows mid-table", ally: "Not detected", msOffice: "N/A", acrobat: "Not detected" },
          ]}
        />
      </div>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.greenBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Corrected: Split into two separate tables
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          Fix in the source document and re-export. Split the stacked table into two separate
          tables, each with its own proper thead and th elements.
        </P>
      </div>

      <H3>Scenario 5: Layout table (Ally misses)</H3>
      <P>
        Tables are for data, not for positioning content on a page. A table used purely for
        visual layout carries false semantic meaning: a screen reader announces row and column
        counts, navigates cell by cell, and may announce &quot;row 1, column 1&quot; for content
        that has no tabular relationship. No automated tool reliably detects layout tables.
      </P>
      <Callout type="info">
        <strong>No automated tool can determine if a table is being used for layout.</strong> This
        requires human judgment.
      </Callout>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.accentBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Broken: Table used for layout
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          This example uses a two-column table to align labels and values (First name: Damian,
          Last name: Sian, etc.). Even though the first column uses proper th elements with
          scope=&quot;row&quot;, which satisfies automated checkers, a screen reader still
          announces &quot;table with 5 rows and 2 columns&quot; and navigates cell by cell,
          creating unnecessary overhead.
        </P>
        <CheckerComparisonTable
          caption="Detection results for layout tables"
          rows={[
            { testType: "Layout table used for positioning", ally: "Not detected", msOffice: "N/A", acrobat: "Not detected" },
          ]}
        />
      </div>
      <div style={{
        padding: "18px 22px",
        borderRadius: 10,
        backgroundColor: t.greenBg,
        border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        <div style={{
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: t.text,
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Corrected: Remove table structure
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          Fix in the source document and re-export. In Word, use tab stops instead of a table.
          In Acrobat, change the table tag to an Artifact (so it&apos;s ignored by screen readers)
          or restructure as paragraph tags.
        </P>
      </div>

      <SH id="how-to-fix">How to Fix It</SH>

      <H3>Best practice: Fix in the source document</H3>
      <P>
        The best fix is upstream. Designate header rows in Word or
        PowerPoint before exporting to PDF.
      </P>
      <Step number="1">In Word or PowerPoint, click inside the table and enable <strong>Header Row</strong> on the Table Design tab.</Step>
      <Step number="2">Export to PDF with accessibility options enabled (&quot;Best for electronic distribution and accessibility&quot; or tags/structure checkbox).</Step>
      <Step number="3">Re-upload the PDF to your LMS.</Step>

      <H3>Fixing in Acrobat Pro (when source is unavailable)</H3>
      <P>
        When the source document is not available, you can fix table
        headers directly in Adobe Acrobat Pro using the Tags panel.
      </P>
      <Step number="1">Open the <strong>Tags</strong> panel (View → Show/Hide → Navigation Panes → Tags).</Step>
      <Step number="2">Locate the <code>&lt;Table&gt;</code> tag in the tag tree.</Step>
      <Step number="3">Expand the first <code>&lt;TR&gt;</code> (table row).</Step>
      <Step number="4">If the header cells are tagged as <code>&lt;TD&gt;</code>, right-click each and select <strong>Properties</strong>.</Step>
      <Step number="5">Change the <strong>Type</strong> from <code>&lt;TD&gt;</code> to <code>&lt;TH&gt;</code>.</Step>
      <Step number="6">Set the <strong>Scope</strong> attribute to &quot;Column&quot; for column headers.</Step>

      {/* SCREENSHOT NEEDED: Acrobat Tags panel showing TH vs TD in a table */}
      <div style={{
        padding: "28px 24px",
        borderRadius: 10,
        border: `2px dashed ${t.border}`,
        backgroundColor: t.surfaceAlt,
        textAlign: "center",
        color: t.textTertiary,
        fontSize: "var(--fs-sm)",
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        margin: "24px 0",
      }}>
        Screenshot needed: Acrobat Tags panel showing table with TH vs TD tags visible
      </div>

      <H3>Adding row headers in PDF</H3>
      <P>
        If your table has both column and row headers (like a schedule with time slots in the first
        column), you need to tag <em>both</em> sets in the Tags panel.
      </P>
      <Step number="1">For column headers in the top row: change cells to <code>&lt;TH&gt;</code> with <code>scope=&quot;Column&quot;</code>.</Step>
      <Step number="2">For row headers in the first column: change cells to <code>&lt;TH&gt;</code> with <code>scope=&quot;Row&quot;</code>.</Step>
      <P>
        This is a manual process in Acrobat. Automated tools do not verify that both
        row and column headers are correctly designated.
      </P>

      {/* SCREENSHOT NEEDED: Acrobat Tags panel showing row header scope attributes */}
      <div style={{
        padding: "28px 24px",
        borderRadius: 10,
        border: `2px dashed ${t.border}`,
        backgroundColor: t.surfaceAlt,
        textAlign: "center",
        color: t.textTertiary,
        fontSize: "var(--fs-sm)",
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        margin: "24px 0",
      }}>
        Screenshot needed: Acrobat Tags panel showing row header scope attributes
      </div>

      <H3>Fixing complex/merged tables</H3>
      <P>
        For tables with merged cells or multi-level headers (Scenarios 3 and 4),
        the recommendation is to fix in the source document and re-export. Restructuring
        merged tables in the PDF tag tree is complex and error-prone. Split the merged
        table into multiple simple tables in the source document, then re-export to PDF.
      </P>

      <H3>Fixing layout tables</H3>
      <P>
        In Acrobat, change the <code>&lt;Table&gt;</code> tag to an <code>&lt;Artifact&gt;</code>
        (so it&apos;s ignored by screen readers) or restructure as <code>&lt;P&gt;</code> tags. But this
        is labor-intensive. The better approach is to fix the source document by removing the
        table and using appropriate formatting (tab stops in Word, text boxes in PowerPoint),
        then re-export.
      </P>

      {/* ── What Ally Catches / What Ally Misses ── */}
      <SH id="ally-catches">What Ally Catches / What Ally Misses</SH>
      <CompareBoxes
        catches="PDF tables without designated header rows (TH tags with scope attributes)"
        misses="Layout tables misused for formatting, row headers not designated, complex tables with merged cells or multi-level headers, repeated header rows mid-table, whether a table is the right format for the content"
      />
      <P>
        The significant gaps are layout tables, row headers, and complex table structures. These
        require manual review because automated tools cannot reliably distinguish data tables from
        layout tables, or determine whether a table has both row and column headers that need to
        be programmatically marked.
      </P>

      <SH id="student-side">The Student Side</SH>
      <P>
        Students upload PDF submissions: lab reports, research papers, portfolios. If a student
        includes tables in their PDF and does not designate headers in the source document,
        those tables are inaccessible to classmates, peer reviewers, and group members who use
        screen readers. Consider noting in assignment instructions: &quot;If your submission includes
        a table, designate the first row as a header row in Word before exporting to PDF.&quot;
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "PDF tables don't have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Best fix", "Header row in Word/PowerPoint before export"],
        ["Acrobat fix", "Tags panel → change TD to TH → set Scope attribute"],
        ["Fix (row headers)", "Change first-column cells to TH with scope=&quot;Row&quot; in Tags panel"],
        ["Fix (complex tables)", "Split merged/stacked tables in source doc, then re-export"],
        ["Fix (layout tables)", "Change Table tag to Artifact, or restructure as P tags"],
        ["Manual review required", "Layout tables, row headers, complex structures with merged cells"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and table structure requirements"
      />
      <ResourceLink
        title="Adobe: Creating accessible PDFs"
        href="https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html"
        description="Acrobat accessibility including table tagging"
      />
      <ResourceLink
        title="WebAIM: PDF Accessibility"
        href="https://webaim.org/techniques/acrobat/"
        description="Techniques for creating accessible PDFs including table structure"
      />
      <ResourceLink
        title="PAC: PDF Accessibility Checker"
        href="https://pdfua.foundation/en/pdf-accessibility-checker-pac/"
        description="Free tool for checking PDF/UA conformance including table tags"
      />
    </ContentPageLayout>
  );
}
