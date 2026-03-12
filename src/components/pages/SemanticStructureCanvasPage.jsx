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

export default function SemanticStructureCanvasPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="canvas"
      title="Semantic Structure"
      subtitle="Canvas editor"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Headings should be present"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags Canvas Rich Content Editor (RCE) content that has no
        heading structure. Pages, announcements, and assignments should
        use proper heading levels (Heading 1, 2, 3) so screen reader users
        can navigate by section.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        In web content, headings define the page outline. Without them,
        assistive technology cannot offer a list of sections or jump
        between them. Bold or large text that is not marked as a heading
        does not provide that structure.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding headings in the RCE</H3>
      <Step number="1">Select the text that should be a heading (e.g. the page title or a section title).</Step>
      <Step number="2">In the RCE toolbar, open the <strong>Paragraph format</strong> or <strong>Format</strong> dropdown (often labeled &quot;Paragraph&quot; or shows &quot;Normal&quot;).</Step>
      <Step number="3">Choose <strong>Heading 1</strong> for the main title, <strong>Heading 2</strong> for major sections, <strong>Heading 3</strong> for subsections. Do not skip levels.</Step>
      <Step number="4">Avoid using bold or font size instead of heading styles.</Step>
      <Placeholder label="Screenshot: Canvas RCE Paragraph/Format dropdown with Heading 1, 2, 3" />

      <SH id="lists">Lists</SH>
      <P>
        Ally flags <strong>faked lists</strong> in Canvas content - lines that
        look like a list but are plain paragraphs with typed bullets or
        numbers. Use the RCE <strong>list tool</strong> (bullet or numbered
        list button in the toolbar) to create real <code>&lt;ul&gt;</code> or{" "}
        <code>&lt;ol&gt;</code> structure. Screen readers can then announce
        &quot;list of X items.&quot; The list error may appear in the
        editor&apos;s Accessibility Checker but not always on the Course
        Dashboard; fix in the RCE before publishing.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Content with no headings, missing or flat structure, faked lists in RCE"
        misses="Meaningful heading text, logical level order, reading order of blocks, list nesting"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not check whether heading text is descriptive or whether
        levels are used in a logical order. Reading order in complex layouts
        may need manual verification.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally errors", "Headings should be present; lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Headings", "Paragraph/Format dropdown → Heading 1, 2, 3; do not skip levels"],
        ["Lists", "Use RCE list tool (bullets/numbering), not typed characters"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained"
      />
    </ContentPageLayout>
  );
}
