import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
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

export default function TablesOverviewPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="tables"
      fileTypeSlug="overview"
      title="Tables"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        Data tables need marked header rows so screen readers can announce
        column context as students navigate cells. Without headers, a screen
        reader user hears a stream of cell values with no idea what column
        or row they belong to. A student hears &quot;85&quot; without knowing
        whether that is a quiz score, a page number, or a room assignment.
      </P>
      <P>
        This category covers WCAG{" "}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" target="_blank" rel="noopener noreferrer">
          1.3.1 Info and Relationships
        </a>{" "}
        (Level A). Ally checks for table header issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files.
      </P>

      <SH id="ally-errors">Ally Error Messages</SH>
      <P>
        Ally distinguishes two separate table header issues. The first is a
        table with no designated header row at all. The second is a table
        where header cells exist but are empty &mdash; the header markup is
        present but contains no visible text describing the purpose of the
        row or column. Both reduce the document&apos;s accessibility score.
      </P>
      <AllyErrorBox
        message="This document contains tables that are missing headers"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <AllyErrorBox
        message="This item contains table headers that are missing content"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, margin: "24px 0" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ally-dashboard-table-missing-headers.png"
            alt="Ally accessibility score panel for Course Content Accessibility.docx showing 98%. Ally reports: This document contains tables that are missing headers, with What this means and How to set table headers buttons."
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
            Ally flags the document at 98% for tables without designated headers
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ally-dashboard-table-empty-headers.png"
            alt="Ally accessibility score panel for a Tables item showing 99%. Ally reports: This item contains table headers that are missing content. Table header elements should have visible text that describes the purpose of the row or column."
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
      </div>

      <P>
        Wording varies by file type:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" }}>
        <li><strong>Word:</strong> &ldquo;This document contains tables that are missing headers&rdquo;</li>
        <li><strong>PowerPoint:</strong> &ldquo;Presentation tables don&apos;t have headers&rdquo;</li>
        <li><strong>PDF:</strong> &ldquo;PDF tables don&apos;t have headers&rdquo;</li>
        <li><strong>Canvas:</strong> &ldquo;This item contains table headers that are missing content&rdquo;</li>
      </ul>

      <SH id="what-tools-detect">What Automated Tools Detect</SH>
      <CheckerComparisonTable
        caption="Table accessibility detection across Ally, Microsoft Office, and Acrobat"
        rows={[
          { testType: "No designated header row", ally: "Detected", msOffice: "Detected", acrobat: "Detected" },
          { testType: "Table headers with no visible text", ally: "Detected", msOffice: "Not detected", acrobat: "Not detected" },
          { testType: "Layout table used for positioning", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
          { testType: "Complex table (merged cells, multiple headers)", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
        ]}
      />
      <RefTable
        rows={[
          ["Scenario 1: Missing header row", "Ally · MS · Acrobat all flag"],
          ["Scenario 2: Empty header cells", "Ally flags; MS and Acrobat pass"],
          ["Scenario 3: Missing row headers (schedule)", "All pass; manual verification required"],
          ["Scenario 4: Layout table", "All pass; manual verification required"],
        ]}
      />
      <Callout type="warning">
        <strong>Tool gap: empty table headers.</strong> Ally is the only tool
        that detects table headers with missing content. The Microsoft
        Accessibility Checker and Acrobat verify that a header row is
        designated but do not check whether the header cells actually contain
        text. A table with blank header cells passes both tools. A screen
        reader will announce &quot;column header: blank&quot; or silently skip
        the header association, leaving the student without context for the
        data that follows.
      </Callout>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Tables without designated header rows; table headers that exist but contain no visible text (Ally only)"
        misses="Layout tables misused for formatting, complex tables with merged cells or multiple header rows, row headers not designated when first column contains headers, whether a table is the right format at all"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        <strong>Layout tables.</strong> Tables used for visual alignment rather
        than data presentation create confusing screen reader experiences.
        Automated tools do not reliably distinguish layout tables from data
        tables.
      </P>
      <P>
        <strong>Complex tables.</strong> Merged cells, multiple header rows,
        and nested tables require manual verification. For tables with both
        column headers (top row) and row headers (first column), use{" "}
        <code>&lt;th scope=&quot;col&quot;&gt;</code> for the top row and{" "}
        <code>&lt;th scope=&quot;row&quot;&gt;</code> for the first column.
        The <code>scope</code> attribute (HTML) or tagged structure (PDF)
        must correctly associate each data cell with its headers.
      </P>
      <P>
        <strong>Row headers.</strong> When a table has both column headers
        (top row) and row headers (first column), automated tools typically
        only verify the column header row. The first column may contain data
        that should be marked as row headers but is not &mdash; no automated
        tool tested catches this.
      </P>
      <P>
        <strong>Appropriateness.</strong> Some content presented in tables
        would be more accessible as lists or paragraphs. A &quot;table&quot;
        with one column and one row per item is really a list. This is a
        design question Ally does not address.
      </P>

      <SH id="complex-scenarios">Complex Table Scenarios</SH>
      <P>
        The following scenarios all produce a table that passes Ally with a
        100% score. Each is genuinely inaccessible.
      </P>

      {[
        {
          title: "Column and row headers",
          detail: "A schedule table with course names in the first column and days of the week across the top row. The top row is marked as the header row, but the first column is not marked with row header scope. A screen reader announces cell values without associating them to the row label. Fix: mark the first column cells with scope=\"row\" (HTML) or configure the column as a header column in Word or PowerPoint.",
        },
        {
          title: "Merged cells and spanning headers",
          detail: "A grade breakdown table where a single cell spans three columns to label a group (e.g., \"Quizzes\" spanning Q1, Q2, Q3). No automated tool detects that the spanning header requires proper association for screen readers to announce the grouping correctly. Fix: use explicit id and headers attributes in HTML, or restructure the table to avoid nested header groups.",
        },
        {
          title: "Repeated header rows",
          detail: "A long table where the header row is manually typed again mid-table to help sighted readers. The repeated row lacks header markup, so screen readers either skip it or read it as data. Fix: remove repeated header rows and rely on the properly marked header row at the top.",
        },
        {
          title: "Layout table used for visual alignment",
          detail: "A table used to place two content blocks side by side. Screen readers read the table as if it were data, announcing row and column context that does not apply. Fix: use columns, flexbox, or side-by-side frames in the application; do not use tables for layout.",
        },
      ].map((item, i) => (
        <div key={i} style={{
          padding: "18px 22px", borderRadius: 8,
          border: `1px solid ${t.border}`,
          backgroundColor: t.surfaceAlt,
          marginBottom: 14,
        }}>
          <div style={{
            fontSize: "var(--fs-base)", fontWeight: 700, color: t.text,
            fontFamily: "var(--font-display)", marginBottom: 6,
          }}>{item.title}</div>
          <div style={{
            fontSize: "var(--fs-base)", lineHeight: 1.7, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>{item.detail}</div>
        </div>
      ))}
      <Callout type="warning">
        <strong>These scenarios score 100% in Ally.</strong> The four complex
        scenarios above all pass automated tools. Manual review (tab through the
        table with a screen reader or use the keyboard navigation commands) is
        the only reliable way to verify that header associations are
        announced correctly.
      </Callout>

      <SH id="false-positive">False Positive: Table Captions</SH>
      <P>
        The Canvas Rich Content Editor (RCE) flags tables without a{" "}
        <code>&lt;caption&gt;</code> element as an accessibility warning. This
        warning does <strong>not</strong> appear on the Accessibility Dashboard
        and has no effect on the document&apos;s accessibility score.
      </P>
      <P>
        Table captions are not required by WCAG. The relevant criterion, WCAG
        1.3.1, requires that structural relationships be programmatically
        determinable, but a <code>&lt;caption&gt;</code> element is not part of
        that requirement for basic data tables. The Canvas RCE is applying a
        stricter standard than WCAG demands.
      </P>
      <Callout type="info">
        A caption may be added when it genuinely helps users understand the
        table&apos;s purpose, particularly for complex tables where surrounding
        context does not make the subject clear. For simple tables in a
        well-structured document, a caption is not necessary. Do not add
        captions solely to clear the Canvas RCE warning.
      </Callout>

      <SH id="quick-check">Quick Check</SH>
      <div style={{
        padding: "20px 24px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "20px 0",
      }}>
        {[
          "Does every data table have a designated header row?",
          "Do all table header cells contain visible, descriptive text?",
          "Are tables used only for data, not for visual layout?",
          "If the table has both column and row headers, are both sets marked?",
          "Do complex tables (merged cells, multiple headers) read correctly in a screen reader?",
          "Would any table be clearer as a list or structured text?",
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "baseline", gap: 10,
            padding: "6px 0",
            fontSize: "var(--fs-base)", lineHeight: 1.65,
            fontFamily: "var(--font-body)", color: t.text,
          }}>
            <span style={{
              display: "inline-block", width: 18, height: 18, minWidth: 18,
              borderRadius: 4, border: `2px solid ${t.textTertiary}`,
              position: "relative", top: 2,
            }} />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "2 (missing headers; empty header text)"],
        ["WCAG criterion", "1.3.1 Info and Relationships (Level A)"],
        ["Likelihood", "3 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
      ]} />
    </ContentPageLayout>
  );
}
