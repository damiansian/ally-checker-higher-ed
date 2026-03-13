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

export default function TablesWordPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="word"
      title="Tables"
      subtitle="Word Documents"
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="This document contains tables that are missing headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags Word tables that do not have a designated header row.
        Data tables need a clear first row marked as headers so screen
        readers can announce column context when navigating cells. Without
        headers, a student hears raw cell values with no indication of what
        each value represents.
      </P>
      <AllyErrorBox
        message="This item contains table headers that are missing content"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        This is a separate Ally error for tables where header cells exist but are empty.
        Every header cell must have visible text describing its column or row.
      </P>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        When a screen reader encounters a table without designated headers, the student gets
        raw data with no context. A student hears &quot;85&quot; but does not know which column
        or row it belongs to. That number could be a grade, an enrollment count, or a page
        reference. Without header associations, data tables become grids of meaningless values.
      </P>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <figure style={{ flex: 1, minWidth: 200, margin: 0 }}>
          <img
            src="/assets/ally-dashboard-table-missing-headers.png"
            alt="Screenshot of the Ally accessibility score panel for Course Content Accessibility.docx. The score is 98% with a yellow-green gauge. Below, Ally reports This document contains tables that are missing headers with What this means and How to set table headers buttons. At the bottom, Upload a version with table headers prompt."
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              border: `1px solid ${t.border}`,
            }}
          />
          <figcaption style={{
            fontSize: "var(--fs-base)",
            color: t.textTertiary,
            fontFamily: "var(--font-body)",
            marginTop: 10,
            lineHeight: 1.5,
          }}>
            Ally flags the document at 98% for tables without designated headers
          </figcaption>
        </figure>
        <figure style={{ flex: 1, minWidth: 200, margin: 0 }}>
          <img
            src="/assets/ally-dashboard-table-empty-headers.png"
            alt="Screenshot of the Ally accessibility score panel for a Tables item. The score is 99% with a yellow-green gauge. Below, Ally reports This item contains table headers that are missing content. Explanation reads: Table header elements should have visible text that describes the purpose of the row or column."
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              border: `1px solid ${t.border}`,
            }}
          />
          <figcaption style={{
            fontSize: "var(--fs-base)",
            color: t.textTertiary,
            fontFamily: "var(--font-body)",
            marginTop: 10,
            lineHeight: 1.5,
          }}>
            Ally flags table headers that exist but contain no visible text
          </figcaption>
        </figure>
      </div>
      <Callout type="warning">
        <strong>Tool gap: empty table headers.</strong> Ally is the only tool that detects
        table headers with missing content. The Microsoft Accessibility Checker and Acrobat
        verify that a header row is designated but do not check whether the header cells
        actually contain text. A table with blank header cells passes both tools.
      </Callout>

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
          { testType: "No designated header row", ally: "Detected", msOffice: "Detected", acrobat: "Detected" },
        ]}
      />
      <P>
        The fix is straightforward: designate the first row as a header row
        and fill it with descriptive column titles.
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
          [<strong key="r1">8:00 &ndash; 9:00 AM</strong>, "Closed", "Open", "Open"],
          [<strong key="r2">9:00 &ndash; 10:00 AM</strong>, "Open", "Closed", "Open"],
          [<strong key="r3">10:00 &ndash; 11:00 AM</strong>, "Open", "Open", "Closed"],
        ]}
      />
      <CheckerComparisonTable
        caption="Detection results for missing row headers"
        rows={[
          { testType: "Row headers not designated", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
        ]}
      />
      <Callout type="warning">
        <strong>This is a manual review issue.</strong> When your table has
        both column headers (top row) and row headers (first column), you
        need to verify both are properly marked. A screen reader user
        navigating this table would hear &quot;Open&quot; and know it is
        Wednesday (column header) but not that it is the 9:00 &ndash; 10:00
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
            { testType: "Complex table (merged cells)", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
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
          Split the complex table into two separate Word tables, one per group, placed
          side by side using a two-column section layout. Each split table has its Header
          Row checkbox checked on the Table Design tab.
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
            { testType: "Repeated header rows mid-table", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
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
          In Word, the merged table must be split into two separate tables. Place the cursor
          in the row where the second section begins, then use Table Tools to split the table.
          Designate the first row of each new table as a header row using the Header Row
          checkbox on the Table Design tab.
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
            { testType: "Layout table used for positioning", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
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
          Corrected: Use tab stops instead
        </div>
        <P style={{ marginBottom: 8, fontSize: "var(--fs-sm)" }}>
          In Word, use tab stops instead of a table. In the ruler, set a left tab stop at the
          position where values should begin (for example, 1.5 inches). Type the label, press
          Tab, then type the value. Repeat for each row. This creates the same two-column visual
          appearance using paragraph formatting rather than a table, so no tabular semantics are
          applied.
        </P>
      </div>

      <SH id="how-to-fix">How to Fix It</SH>

      <H3>Designating a header row in Word</H3>
      <Step number="1">Click anywhere inside the table.</Step>
      <Step number="2">Go to the <strong>Table Design</strong> tab on the ribbon (or <strong>Table Tools &rarr; Design</strong> in older versions).</Step>
      <Step number="3">In the <strong>Table Style Options</strong> group, check <strong>Header Row</strong>.</Step>
      <Step number="4">Verify the first row contains descriptive text for each column. Do not leave header cells blank.</Step>

      {/* SCREENSHOT NEEDED: Word Table Design tab with Header Row checkbox checked */}
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
        Screenshot needed: Word Table Design tab showing Header Row checkbox checked
      </div>

      <P>
        This option also works for repeat header rows across page breaks. If your table spans
        multiple pages and you want the header row to repeat at the top of each page, check
        both Header Row and the Repeat Header Rows option in Table Properties.
      </P>

      <H3>Adding row headers</H3>
      <P>
        Word does not have a one-click &quot;row header&quot; option the way
        it has Header Row. For tables where the first column contains row headers
        (like the schedule in Scenario 2), use the <strong>First Column</strong> option
        in the Table Design tab. This applies special formatting to the first column.
      </P>

      {/* SCREENSHOT NEEDED: Word Table Design tab with First Column checkbox checked */}
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
        Screenshot needed: Word Table Design tab showing First Column checkbox checked
      </div>

      <P>
        <strong>Note the limitation:</strong> Word&apos;s First Column option does not have
        full row-header semantics. When exporting to PDF, verify the tag structure preserves
        both header types. You may need to manually tag the PDF in Acrobat Pro to ensure row
        headers are correctly designated.
      </P>

      <H3>Fixing empty header cells</H3>
      <P>
        If you have a header row designated but the cells are blank, Ally
        will flag it as &quot;table headers that are missing content.&quot;
        Every header cell must have visible text describing the purpose of
        its column or row. This is Ally&apos;s unique check. The Microsoft
        Accessibility Checker and Acrobat do not detect empty header cells.
      </P>

      <H3>Fixing layout tables</H3>
      <P>
        If the &quot;table&quot; is only used for layout (for example, two columns
        of text side by side, or label/value pairs), replace it with Word&apos;s
        column feature or remove the table entirely. Layout tables confuse screen
        readers, which treat them as data tables and try to announce header
        associations that do not exist.
      </P>
      <P>
        For label/value pairs like the example in Scenario 5, use tab stops instead.
        Set a left tab stop in the ruler at the position where values should begin,
        then type label + Tab + value for each row.
      </P>

      <H3>Fixing complex/merged tables</H3>
      <P>
        For tables with merged cells or multi-level headers (Scenarios 3 and 4),
        the recommendation is to simplify by splitting into multiple smaller tables.
        Word does not provide controls for marking cells as column-group headers.
        No automated tool catches these issues, so they pass Ally but remain
        inaccessible to screen reader users.
      </P>

      {/* ── What Ally Catches / What Ally Misses ── */}
      <SH id="ally-catches">What Ally Catches / What Ally Misses</SH>
      <CompareBoxes
        catches="Tables without a designated header row (all file types); table headers that exist but contain no visible text (Ally only, not MS Office or Acrobat)"
        misses="Layout tables misused for formatting, row headers not designated, complex tables with merged cells or multi-level headers, repeated header rows mid-table, whether a table is the right format for the content"
      />
      <P>
        Ally&apos;s unique strength is detecting empty header cells. The Microsoft Accessibility
        Checker and Acrobat only verify that a header row is designated but do not check whether
        the header cells actually contain text.
      </P>
      <P>
        The significant gaps are layout tables, row headers, and complex table structures. These
        require manual review because automated tools cannot reliably distinguish data tables from
        layout tables, or determine whether a table has both row and column headers that need to
        be programmatically marked.
      </P>

      <SH id="student-side">The Student Side</SH>
      <P>
        Students build tables in reports, lab write-ups, and discussion posts.
        A table without a header row is just a grid of unlabeled values to a
        screen reader user. Consider noting in assignment instructions:
        &ldquo;If your submission includes a table, designate the first row as
        a header row so each column has a label.&rdquo;
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error #1", "This document contains tables that are missing headers"],
        ["Ally error #2", "This item contains table headers that are missing content"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix (header row)", "Table Design → Header Row; first row = column titles"],
        ["Fix (row headers)", "Table Design → First Column; verify in PDF export"],
        ["Fix (empty headers)", "Type descriptive text into every header cell"],
        ["Fix (layout tables)", "Replace with tab stops or Word columns; do not use tables for positioning"],
        ["Fix (complex tables)", "Split merged/stacked tables into multiple simple tables"],
        ["Ally unique detection", "Empty header cells (MS Office and Acrobat do not detect)"],
        ["Manual review required", "Layout tables, row headers, complex structures with merged cells"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and table structure requirements"
      />
      <ResourceLink
        title="WebAIM: Creating Accessible Tables"
        href="https://webaim.org/techniques/tables/data.htm"
        description="Data table accessibility techniques applicable to Word and HTML"
      />
      <ResourceLink
        title="Microsoft: Create accessible tables in Word"
        href="https://support.microsoft.com/en-us/office/create-accessible-tables-in-word-a0633bd2-ecb3-4e0a-9f6e-bf6a96c0358f"
        description="Official documentation for Word table accessibility"
      />
      <ResourceLink
        title="W3C: Tables Tutorial"
        href="https://www.w3.org/WAI/tutorials/tables/"
        description="Comprehensive guide to accessible table structures"
      />
    </ContentPageLayout>
  );
}
