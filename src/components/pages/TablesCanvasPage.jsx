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

function CodeBlock({ children }) {
  const { t } = useTheme();
  return (
    <pre style={{
      padding: "16px 20px",
      borderRadius: 10,
      backgroundColor: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      margin: "16px 0 24px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-sm)",
      lineHeight: 1.7,
      color: t.textSecondary,
      overflowX: "auto",
      whiteSpace: "pre",
    }}>
      <code>{children}</code>
    </pre>
  );
}

export default function TablesCanvasPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="canvas"
      title="Tables"
      subtitle="Canvas Editor"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="This item contains table headers that are missing content"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        In Canvas, Ally uses axe-core to check tables in Rich Content
        Editor (RCE) content. It flags two issues: tables of 3&times;3 or
        larger without header cells associated, and tables where header
        cells (<code>&lt;th&gt;</code>) exist but contain no visible text.
        The second error &mdash; empty headers &mdash; is unique to Canvas
        HTML tables and is not caught by other tools.
      </P>

      <figure style={{ margin: "24px 0" }}>
        <img
          src="/assets/ally-dashboard-table-empty-headers.png"
          alt="Ally accessibility score panel showing 99% for a Tables item. Ally reports: This item contains table headers that are missing content. Table header elements should have visible text that describes the purpose of the row or column."
          style={{
            width: "100%",
            maxWidth: 340,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary,
          fontFamily: "var(--font-body)",
          marginTop: 10, lineHeight: 1.5,
        }}>
          Ally flags table headers that exist but contain no visible text
        </figcaption>
      </figure>

      <SH id="example-missing-headers">Example: Table Without Headers in RCE</SH>
      <P>
        When you insert a table in the Canvas RCE and do not set a header
        row, all cells render as <code>&lt;td&gt;</code> elements. Ally
        flags this for tables 3&times;3 or larger.
      </P>
      <SampleTable
        caption="Events table in Canvas without header cells"
        headers={["", "", ""]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
      />

      <H3>The HTML before</H3>
      <CodeBlock>{`<table>
  <tbody>
    <tr><td>12 February</td><td>Waltz with Strauss</td><td>Main Hall</td></tr>
    <tr><td>24 March</td><td>The Obelisks</td><td>West Wing</td></tr>
    <tr><td>14 April</td><td>The What</td><td>Main Hall</td></tr>
  </tbody>
</table>`}</CodeBlock>

      <H3>The HTML after</H3>
      <CodeBlock>{`<table>
  <thead>
    <tr><th scope="col">Date</th><th scope="col">Event</th><th scope="col">Venue</th></tr>
  </thead>
  <tbody>
    <tr><td>12 February</td><td>Waltz with Strauss</td><td>Main Hall</td></tr>
    <tr><td>24 March</td><td>The Obelisks</td><td>West Wing</td></tr>
    <tr><td>14 April</td><td>The What</td><td>Main Hall</td></tr>
  </tbody>
</table>`}</CodeBlock>

      <SampleTable
        caption="Events table in Canvas with proper header cells"
        headers={["Date", "Event", "Venue"]}
        rows={[
          ["12 February", "Waltz with Strauss", "Main Hall"],
          ["24 March", "The Obelisks", "West Wing"],
          ["14 April", "The What", "Main Hall"],
        ]}
        highlightHeaders
      />

      <SH id="example-empty-headers">Example: Empty Header Cells</SH>
      <P>
        This is the error unique to Canvas. A table has{" "}
        <code>&lt;th&gt;</code> elements in the first row, but they contain
        no text. The screen reader announces &quot;column header: blank&quot;
        or skips the association entirely. Ally catches this; no other tool
        does.
      </P>
      <CheckerComparisonTable
        caption="Detection of empty table headers across tools"
        rows={[
          { testType: "Header cells present but empty", ally: "Detected", msOffice: "Not detected", acrobat: "Not detected" },
        ]}
      />
      <Callout type="warning">
        <strong>Common cause:</strong> empty headers often happen when a
        table is inserted with a header row but the header text is never
        filled in, or when the first row is used for spacing above the
        actual data.
      </Callout>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Using the RCE table properties</H3>
      <Step number="1">Click inside the table in the Rich Content Editor.</Step>
      <Step number="2">Click the <strong>table icon</strong> in the toolbar and select <strong>Table properties</strong>.</Step>
      <Step number="3">Under <strong>Header</strong>, select <strong>Header row</strong> (or <strong>Header column</strong> if the table uses row headers).</Step>
      <Step number="4">Click <strong>Save</strong>. Then type descriptive text into every header cell.</Step>

      <H3>Editing HTML directly</H3>
      <P>
        If you need more control, switch to the HTML editor in the RCE.
        Change the first row&apos;s <code>&lt;td&gt;</code> elements to{" "}
        <code>&lt;th scope=&quot;col&quot;&gt;</code>. For tables with row
        headers, add <code>scope=&quot;row&quot;</code> to the first cell of
        each data row.
      </P>

      <H3>Schedule tables with row headers</H3>
      <P>
        For a schedule with time slots in the first column (like the example
        in the overview), the HTML should use{" "}
        <code>&lt;th scope=&quot;row&quot;&gt;</code> for each time cell:
      </P>
      <CodeBlock>{`<tr>
  <th scope="row">9:00 – 10:00 AM</th>
  <td>Open</td>
  <td>Closed</td>
  <td>Open</td>
</tr>`}</CodeBlock>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables 3×3 or larger without associated headers; header cells that exist but contain no visible text"
        misses="Layout tables, complex tables with merged cells, correct scope for multi-level headers, row headers not designated"
      />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error (missing)", "Table cells (3x3+) must have associated headers"],
        ["Ally error (empty)", "This item contains table headers that are missing content"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix (RCE)", "Table icon \u2192 Table properties \u2192 Header row"],
        ["Fix (HTML)", "Change <td> to <th scope=\"col\"> or <th scope=\"row\">"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Table Concepts"
        href="https://www.w3.org/WAI/tutorials/tables/"
        description="Accessible table markup patterns including scope and headers"
      />
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 and tables"
      />
      <ResourceLink
        title="Canvas: Rich Content Editor Accessibility"
        href="https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-use-the-Accessibility-Checker-in-the-Rich-Content/ta-p/34"
        description="Using the RCE accessibility checker"
      />
    </ContentPageLayout>
  );
}
