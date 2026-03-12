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
 *                     <thead> — visually identical to the highlighted version but
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
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="word"
      title="Tables"
      subtitle="Word Documents"
    >
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

      <SH id="example-missing-headers">Example: Table Without Column Headers</SH>
      <P>
        This table has data that clearly belongs under column headers, but
        no header row is designated. All three automated checkers flag this.
      </P>
      <SampleTable
        caption="Events table without designated column headers"
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
        caption="Events table with designated column headers"
        headers={["Date", "Event", "Venue"]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
        highlightHeaders
      />

      <SH id="example-row-headers">Example: Table With Row and Column Headers</SH>
      <P>
        This schedule table has content in the top row that should be column
        headers <em>and</em> content in the first column that should be row
        headers. The column headers are marked up programmatically per the
        visual affordances, but the first column (time slots) is not marked
        as row headers. No automated tool catches this.
      </P>
      <SampleTable
        caption="Schedule table where row headers are not programmatically marked"
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

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Designating a header row</H3>
      <Step number="1">Click anywhere inside the table.</Step>
      <Step number="2">Go to the <strong>Table Design</strong> tab on the ribbon (or <strong>Table Tools &rarr; Design</strong> in older versions).</Step>
      <Step number="3">In the <strong>Table Style Options</strong> group, check <strong>Header Row</strong>.</Step>
      <Step number="4">Verify the first row contains descriptive text for each column &mdash; do not leave header cells blank.</Step>

      <H3>Adding row headers</H3>
      <P>
        Word does not have a one-click &quot;row header&quot; option the way
        it has &quot;Header Row.&quot; For tables where the first column
        contains row headers (like the schedule above), the best approach is
        to ensure the first column is marked as a header column in the
        Table Design tab (&quot;First Column&quot; option). When exporting
        to PDF, verify the tag structure preserves both header types.
      </P>

      <H3>Empty header cells</H3>
      <P>
        If you have a header row designated but the cells are blank, Ally
        will flag it as &quot;table headers that are missing content.&quot;
        Every header cell must have visible text describing the purpose of
        its column or row.
      </P>

      <H3>Layout tables</H3>
      <P>
        If the &quot;table&quot; is only used for layout (e.g. two columns
        of text side by side), consider replacing it with Word&apos;s column
        feature or removing the table entirely. Layout tables confuse screen
        readers, which treat them as data tables and try to announce header
        associations that do not exist.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without a designated header row; table headers that exist but contain no visible text"
        misses="Layout tables misused for formatting, row headers not designated, complex tables with merged cells, whether a table is the right format for the content"
      />

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
        ["Ally error", "This document contains tables that are missing headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix (header row)", "Table Design \u2192 Header Row; first row = column titles"],
        ["Fix (row headers)", "Table Design \u2192 First Column; verify in PDF export"],
        ["Fix (empty headers)", "Type descriptive text into every header cell"],
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
      <ResourceLink
        title="WebAIM: Creating Accessible Tables"
        href="https://webaim.org/techniques/tables/data.htm"
        description="Data table accessibility techniques applicable to Word and HTML"
      />
    </ContentPageLayout>
  );
}
