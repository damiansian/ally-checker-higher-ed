import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
} from "@/components/content.jsx";

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

export default function ColorOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="color"
      fileTypeSlug="overview"
      title="DRAFT - Color"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        This category covers two related WCAG criteria. <strong>1.4.3 Contrast
        (Minimum)</strong> requires text to have sufficient contrast against its
        background (4.5:1 for normal text, 3:1 for large text) so students with
        low vision or color vision deficiencies can read it. <strong>1.4.1 Use
        of Color</strong> requires that color not be the only way to convey
        information, indicate actions, or distinguish elements - students who
        cannot perceive color need other cues (text, icons, patterns).
      </P>
      <P>
        Ally checks for contrast issues in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files. Ally does <em>not</em> check for color
        as sole means; that requires manual review. Image files are not
        applicable for these checks.
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

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        WCAG <strong>1.4.1 Use of Color</strong> (Level A) says color must
        not be the only way to convey information, indicate an action, or
        distinguish an element. Automated tools like Ally do not check this;
        it is entirely manual review.
      </P>
      <P>
        Common course-content problems: rubrics that use only red/yellow/green
        with no text labels; charts where series are distinguished only by
        color (no patterns or labels); feedback that marks wrong answers in
        red with no other cue (icon, text, or symbol); schedules with
        color-coded categories and no legend or text.
      </P>
      <P>
        <strong>Quick check:</strong> Would meaning be lost if the content
        were viewed in grayscale? Use the grayscale test. Ensure charts use
        patterns, labels, or shapes in addition to color; rubrics include
        text labels; and feedback uses icons or text alongside color.
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
        ["Ally checks", "1 check (contrast only; 1.4.1 not checked)"],
        ["WCAG criteria", "1.4.1 Use of Color (A), 1.4.3 Contrast (Minimum) (AA)"],
        ["Likelihood", "4 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
        ["Contrast ratio", "4.5:1 normal text, 3:1 large text"],
        ["Color as sole means", "Manual review; grayscale test; add patterns/labels/icons"],
      ]} />
    </ContentPageLayout>
  );
}
