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

const tocSections = [
  { id: "ally-error", label: "The Ally Error" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "how-to-fix", label: "How to Fix It" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
  { id: "quick-ref", label: "Quick Reference" },
  { id: "resources", label: "Resources" },
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

function H3({ children }) {
  const { t } = useTheme();
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
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

export default function TextContrastCanvasPage() {
  return (
    <ContentPageLayout
      categorySlug="text-contrast"
      fileTypeSlug="canvas"
      title="DRAFT — Text Contrast"
      subtitle="Canvas editor"
      tocSections={tocSections}
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Text must have sufficient color contrast"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <P>
        Ally flags text in Canvas Rich Content Editor (RCE) content that
        does not meet the minimum contrast ratio: 4.5:1 for normal text,
        3:1 for large text. This often happens when you change text or
        highlight colors in the RCE.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Canvas pages, announcements, and assignments are read by students
        with a wide range of vision. Low-contrast text excludes those who
        need clear separation between text and background.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Changing text color in the RCE</H3>
      <Step number="1">Select the low-contrast text in the Canvas RCE.</Step>
      <Step number="2">Use the <strong>Text color</strong> (font color) control in the toolbar to choose a color that meets 4.5:1 against the background (typically white or light gray). Black or dark gray (#333 or darker) on white is safe.</Step>
      <Step number="3">If you use background or highlight color, ensure the combination of text plus background still meets 4.5:1.</Step>
      <Step number="4">Avoid light gray, yellow, or pastel text on white.</Step>
      <Placeholder label="Screenshot: Canvas RCE text color picker with a contrast-safe option" />

      <H3>Pasted content</H3>
      <P>
        Content pasted from Word or the web sometimes brings in
        low-contrast styling. After pasting, select the text and
        re-apply a high-contrast color from the RCE toolbar.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text) in RCE text"
        misses="Color as sole indicator, contrast in embedded images, CSS-driven styling"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not catch every inline style or custom CSS. Relying on
        color alone to convey meaning (e.g. &quot;see the red items&quot;)
        is not flagged. Use the Canvas Accessibility Checker and manual
        review for critical content.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Text must have sufficient color contrast"],
        ["WCAG", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
        ["Fix", "Select text → Text color in RCE toolbar → choose dark on light"],
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
