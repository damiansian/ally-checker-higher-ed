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

function SampleTable({ headers, rows, caption, highlightHeaders = false }) {
  const { t } = useTheme();
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
          <thead>
            <tr style={{ borderBottom: `2px solid ${t.border}` }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    padding: "10px 16px",
                    fontWeight: 700,
                    color: highlightHeaders ? t.green : t.textSecondary,
                    textAlign: "left",
                    fontFamily: "var(--font-display)",
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
                  <td
                    key={j}
                    style={{
                      padding: "10px 16px",
                      color: t.text,
                      verticalAlign: "top",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function TablesPowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="powerpoint"
      title="Tables"
      subtitle="PowerPoint Presentations"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Presentation tables don't have headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags tables in PowerPoint that do not have a designated
        header row. Slide tables used for data &mdash; grades, schedules,
        comparisons &mdash; need a clear first row marked as headers for
        screen reader users.
      </P>

      <SH id="example-missing-headers">Example: Table Without Column Headers</SH>
      <P>
        A common pattern in slides: a table of events or data where the
        first row looks like it contains headers visually (because of
        formatting), but the header row is not designated in the table
        properties. All three checkers flag this.
      </P>
      <SampleTable
        caption="Events table on a slide without designated column headers"
        headers={["", "", ""]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
      />
      <CheckerComparisonTable
        caption="Detection results for a PowerPoint table missing column headers"
        rows={[
          { testType: "No designated header row", ally: "Detected", msOffice: "Detected", acrobat: "N/A" },
        ]}
      />

      <SH id="example-row-headers">Example: Schedule With Unmarked Row Headers</SH>
      <P>
        This schedule has column headers in the top row and time slots in
        the first column that function as row headers. PowerPoint&apos;s
        header row option covers the column headers, but the time slots
        in the first column are not marked as row headers. No automated
        tool catches this.
      </P>
      <SampleTable
        caption="Schedule table where row headers (time slots) are not designated"
        headers={["Time", "Monday", "Wednesday", "Friday"]}
        rows={[
          [<strong key="r1">8:00 &ndash; 9:00 AM</strong>, "Closed", "Open", "Open"],
          [<strong key="r2">9:00 &ndash; 10:00 AM</strong>, "Open", "Closed", "Open"],
          [<strong key="r3">10:00 &ndash; 11:00 AM</strong>, "Open", "Open", "Closed"],
        ]}
      />
      <Callout type="warning">
        <strong>Manual review required.</strong> PowerPoint&apos;s
        &quot;First Column&quot; option applies visual formatting but does
        not expose those cells as row headers to assistive technology
        in the same way &quot;Header Row&quot; does for columns. A screen
        reader user navigating this table would hear the day but not the
        time slot.
      </Callout>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Designating a header row</H3>
      <Step number="1">Click anywhere inside the table on your slide.</Step>
      <Step number="2">Go to the <strong>Table Design</strong> tab on the ribbon.</Step>
      <Step number="3">In the <strong>Table Style Options</strong> group, check <strong>Header Row</strong>.</Step>
      <Step number="4">Verify the first row contains descriptive column titles &mdash; do not leave header cells blank.</Step>

      <H3>First column headers</H3>
      <P>
        If the first column also contains headers (like time slots), check
        <strong> First Column</strong> in the Table Style Options. While
        PowerPoint&apos;s support for exposing row headers to assistive
        technology is limited, this is the best available option within the
        application.
      </P>

      <H3>Keep tables simple on slides</H3>
      <P>
        Slides are already constrained for space. Avoid merged cells,
        complex multi-row headers, or tables that span multiple slides.
        If the data is complex, consider linking to a separate document
        where the full table can be properly structured, or presenting
        the data as a chart with descriptive alt text.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without a designated header row in slides"
        misses="Layout tables, row headers not designated, complex tables, whether the table is the right format for slides"
      />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Presentation tables don\u2019t have headers"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Table Design \u2192 Header Row; first row = column titles"],
        ["First column", "Table Design \u2192 First Column (limited AT support)"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and tables"
      />
      <ResourceLink
        title="Microsoft: Make slides accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="PowerPoint accessibility including table headers"
      />
    </ContentPageLayout>
  );
}
