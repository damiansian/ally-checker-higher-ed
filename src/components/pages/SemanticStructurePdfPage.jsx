import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
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

export default function SemanticStructurePdfPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="pdf"
      title="Semantic Structure"
      subtitle="PDF"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF does not have any headings"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags PDFs that lack tagged headings. Many PDFs exported from
        Word or other tools are &quot;untagged&quot; or have poor tagging,
        so headings are not exposed to assistive technology.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        In a tagged PDF, headings form the document outline. Screen reader
        users can jump by heading and understand the structure. Untagged or
        image-only PDFs appear as one block of content or as images,
        making navigation impossible.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Fix in the source document</H3>
      <P>
        The most reliable approach is to use proper heading styles in Word
        (or your authoring tool) before exporting. Export to PDF with
        &quot;Create bookmarks from headings&quot; or equivalent so the PDF
        is tagged.
      </P>
      <Step number="1">In Word, apply Heading 1, 2, 3 to all section titles.</Step>
      <Step number="2">When exporting to PDF, use <strong>File → Save As → PDF</strong> and ensure options for document structure or accessibility are enabled if available.</Step>
      <Step number="3">Re-upload the new PDF to your LMS.</Step>

      <H3>Tagging in Acrobat Pro</H3>
      <P>
        In Adobe Acrobat Pro you can add or fix tags via the Accessibility
        panel. This is more involved and may be needed when the source is
        not available.
      </P>

      <SH id="lists">Lists</SH>
      <P>
        Lists in PDFs must be tagged so screen readers can announce list
        structure. Use proper list styles in the <strong>source document</strong> (Word
        or PowerPoint) before exporting - Bullets and Numbering, not typed
        characters - so the PDF export preserves list tags. Ally flags faked
        lists in PDFs; the Microsoft Accessibility Checker and Acrobat
        often do not. If the source used list styles, the PDF is more
        likely to have correct list tags.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Untagged PDFs, PDFs with no heading tags, faked lists (no list tags)"
        misses="Incorrect heading level order, meaningful heading text, reading order, list nesting"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not flag every tagging error (e.g. wrong level, missing
        H1). Complex PDFs with multiple columns or non-linear reading order
        need manual review.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally errors", "No headings; lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Use heading and list styles in Word, then export; or tag in Acrobat Pro"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained"
      />
      <ResourceLink
        title="Adobe: Creating accessible PDFs"
        href="https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html"
        description="Acrobat accessibility"
      />
    </ContentPageLayout>
  );
}
