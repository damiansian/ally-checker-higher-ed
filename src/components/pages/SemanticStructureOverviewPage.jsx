import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  Callout,
  Placeholder,
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
      title="Semantic Structure"
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
      <Callout type="info">
        Detailed file-type pages with testing results, fix instructions, and
        screenshots are coming soon.
      </Callout>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document does not have any headings"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <Placeholder label="Detailed error messages and testing results by file type coming soon" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing headings, skipped levels, missing slide/page titles, untagged PDFs"
        misses="Whether heading text is meaningful, logical content order, reading sequence"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <Placeholder label="Detailed analysis of Ally's structure detection gaps coming soon" />

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
