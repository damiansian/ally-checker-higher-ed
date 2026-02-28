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

export default function TextContrastOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="text-contrast"
      fileTypeSlug="overview"
      title="DRAFT — Text Contrast"
      subtitle="Overview"
      tocSections={tocSections}
    >
      <SH id="overview">Overview</SH>
      <P>
        Text must have sufficient contrast against its background so that
        students with low vision or color vision deficiencies can read it.
        WCAG requires a minimum contrast ratio of 4.5:1 for normal text and
        3:1 for large text (18pt or 14pt bold). Color alone cannot be the
        only way to convey information.
      </P>
      <P>
        Ally checks for contrast issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files. Image files are not applicable for
        this check.
      </P>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document has text with insufficient contrast"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <P>
        Ally surfaces one primary contrast check across document types. The
        wording varies by file type:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.75, color: "inherit" }}>
        <li><strong>Word:</strong> &ldquo;Document has text with insufficient contrast&rdquo;</li>
        <li><strong>PowerPoint:</strong> &ldquo;Presentation has text with insufficient contrast&rdquo;</li>
        <li><strong>PDF:</strong> &ldquo;PDF has contrast issues&rdquo;</li>
        <li><strong>Canvas:</strong> &ldquo;Text must have sufficient color contrast&rdquo;</li>
      </ul>
      <P>
        Severity is typically <strong>Minor</strong>. Use the file-type
        pages (Word, PowerPoint, PDF, Canvas) for fix steps and testing
        notes.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text)"
        misses="Color as sole indicator, contrast in images/charts, branded templates"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally focuses on measurable contrast ratios for body text. It does
        not flag when <strong>color alone</strong> conveys meaning (e.g.
        &ldquo;items in red are required&rdquo; with no other cue). That
        overlaps with WCAG 1.4.1 Use of Color; manual review is needed.
      </P>
      <P>
        Contrast inside <strong>images, charts, and diagrams</strong> is
        generally not evaluated the same way as editable text. Light gray
        labels on a chart may fail human evaluation but not trigger Ally.
        Branded slide decks or PDFs with institutional colors that fall
        just under 4.5:1 can also slip through if Ally&apos;s sampling
        misses the specific combination.
      </P>
      <P>
        Use the Accessibility Checker in each authoring tool where
        available, and consider a dedicated contrast checker (e.g. Colour
        Contrast Analyser) for critical materials.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "1 check"],
        ["WCAG criterion", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Likelihood", "4 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
      ]} />
    </ContentPageLayout>
  );
}
