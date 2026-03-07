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

export default function ColorPdfPage() {
  return (
    <ContentPageLayout
      categorySlug="color"
      fileTypeSlug="pdf"
      title="Color"
      subtitle="PDF"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF has contrast issues"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <P>
        Ally reports when text in the PDF does not meet the minimum
        contrast ratio (4.5:1 for normal text, 3:1 for large text). PDFs
        exported from Word, PowerPoint, or design tools often carry over
        low-contrast colors from the source.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Students who rely on high contrast to read effectively cannot
        access content that fails this check. Fixing contrast in the
        source document before exporting to PDF is the most reliable
        approach.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Fix in the source document</H3>
      <P>
        The best approach is to correct contrast in Word or PowerPoint
        before exporting to PDF. Change text and background colors to
        meet 4.5:1, then re-export.
      </P>
      <Step number="1">Open the original Word or PowerPoint file.</Step>
      <Step number="2">Adjust font and background colors so all text meets 4.5:1 (or 3:1 for large text).</Step>
      <Step number="3">Export or Save As PDF again and re-upload to your LMS.</Step>

      <H3>Fixing in Acrobat (if you have access)</H3>
      <P>
        Adobe Acrobat Pro can sometimes be used to edit text appearance,
        but editing contrast in a finished PDF is limited and can
        affect tagging. Prefer fixing the source.
      </P>
      <Placeholder label="Screenshot: PDF with contrast issue and Acrobat accessibility tools (if applicable)" />

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        Ally does not flag when color alone conveys information in a PDF.
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.1</a> requires other cues. Fix in the source document: add text
        labels, legends, or patterns so that charts, rubrics, and
        color-coded content are understandable in grayscale or without
        relying on color. Then re-export to PDF.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text) in PDF text"
        misses="Color as sole indicator, contrast in images/vector graphics, scanned pages"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not flag every text layer or annotation. Color-used-alone
        and contrast inside embedded images or charts are not covered.
        Scanned PDFs without real text are a separate accessibility
        concern.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "PDF has contrast issues"],
        ["WCAG", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
        ["Fix", "Fix in Word/PowerPoint, then re-export to PDF"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Contrast (Minimum)"
        href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
        description="WCAG 1.4.3 explained"
      />
      <ResourceLink
        title="WebAIM: Contrast Checker"
        href="https://webaim.org/resources/contrastchecker/"
        description="Check color combinations"
      />
    </ContentPageLayout>
  );
}
