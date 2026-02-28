import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
} from "@/components/content.jsx";

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "ally-errors", label: "Ally Error Messages" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
  { id: "quick-ref", label: "Quick Reference" },
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

export default function SemanticStructureOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="overview"
      title="DRAFT — Semantic Structure"
      subtitle="Overview"
      tocSections={tocSections}
    >
      <SH id="overview">Overview</SH>
      <P>
        Headings, titles, and document structure let students navigate and
        understand content organization. Without them, a 20-page document is
        a wall of text. Screen reader users rely on headings to jump between
        sections the way sighted users scan for bold headings.
      </P>
      <P>
        This category covers WCAG 1.3.1 (Info and Relationships), 2.4.1
        (Bypass Blocks), and 2.4.6 (Headings and Labels). Ally checks for
        structural issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files.
      </P>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document does not have any headings"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally runs multiple structure checks; wording varies by file type:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.75, color: "inherit" }}>
        <li><strong>Word:</strong> &ldquo;Document does not have any headings&rdquo;</li>
        <li><strong>PowerPoint:</strong> &ldquo;Presentation does not have slide titles&rdquo;</li>
        <li><strong>PDF:</strong> &ldquo;PDF does not have any headings&rdquo;</li>
        <li><strong>Canvas:</strong> &ldquo;Headings should be present&rdquo;</li>
      </ul>
      <P>
        Severity is typically <strong>Major</strong>. Use the file-type
        pages for fix steps and testing notes.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing headings, skipped levels, missing slide/page titles, untagged PDFs"
        misses="Whether heading text is meaningful, logical content order, reading sequence"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally checks for the <em>presence</em> of headings and titles, not
        whether they are meaningful or in a logical order. A document with
        &quot;Heading 1&quot; style on every paragraph may pass even though
        it gives no real structure. Skipped levels (e.g. H1 to H4) are
        sometimes caught, but not always.
      </P>
      <P>
        <strong>Reading order</strong> and <strong>content order</strong>
        in complex layouts (multi-column, text boxes, sidebars) are not
        fully evaluated. Screen reader users may encounter content in an
        illogical sequence that Ally does not flag. Manual testing with a
        screen reader is the only way to verify structure and order.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "7 checks"],
        ["WCAG criteria", "1.3.1 / 2.4.1 / 2.4.6"],
        ["Likelihood", "5 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
      ]} />
    </ContentPageLayout>
  );
}
