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

export default function ColorWordPage() {
  return (
    <ContentPageLayout
      categorySlug="color"
      fileTypeSlug="word"
      title="Color"
      subtitle="Word Documents"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Document has text with insufficient contrast"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <P>
        Ally flags text in your Word document that does not meet the minimum
        contrast ratio required by WCAG: 4.5:1 for normal text, 3:1 for large
        text (18pt or 14pt bold). Low-contrast text is hard to read for
        students with low vision or in bright environments.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Insufficient contrast makes content exhausting or impossible to read
        for many users. Relying on light gray text on white, or colored text
        on a similar background, excludes students who rely on clear
        distinction between text and background.         <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.3</a> is Level AA
        because of its broad impact.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adjusting text and highlight colors</H3>
      <Step number="1">Select the text that Ally flagged (or that you know has low contrast).</Step>
      <Step number="2">On the <strong>Home</strong> tab, use <strong>Font Color</strong> to choose a darker color for text (or lighter on dark backgrounds).</Step>
      <Step number="3">Avoid using the default &quot;Automatic&quot; or very light grays on white; aim for black or dark gray (#333 or darker) on white for body text.</Step>
      <Step number="4">If you use highlighting, ensure the combination of highlight + text still meets 4.5:1.</Step>

      <H3>Using the Accessibility Checker</H3>
      <P>
        Word&apos;s built-in <strong>Review → Check Accessibility</strong>
        reports contrast issues and can help you locate problem passages
        before uploading to your LMS. For exact contrast ratios, use a free
        desktop tool such as the Colour Contrast Analyser (CCA).
      </P>
      <div style={{ display: "flex", gap: "1.5em", flexWrap: "wrap", margin: "1em 0" }}>
        <figure style={{ flex: 1, minWidth: 200, margin: 0 }}>
          <img
            src="/assets/ms-checker-contrast-overview.png"
            alt="Screenshot of Microsoft's Accessibility Assistant showing a Keep going! message and the Color and Contrast category listing Hard-to-read text contrast with a count of 1."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: 13, color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            The Accessibility Assistant flags contrast under Color and Contrast.
          </figcaption>
        </figure>
        <figure style={{ flex: 1, minWidth: 200, margin: 0 }}>
          <img
            src="/assets/ms-checker-contrast-detail.png"
            alt="Screenshot of Microsoft's Accessibility Assistant detail view for Hard-to-read text contrast with suggested replacement colors, More font colors, and Text shading buttons."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: 13, color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            The detail view offers suggested replacement colors and text shading.
          </figcaption>
        </figure>
      </div>

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        Ally does not flag when <strong>color alone</strong> conveys meaning
        (e.g. &quot;items in red are required&quot; with no other cue).
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.1</a> requires that information not rely on color only. Ask:
        would meaning be lost if the document were printed in grayscale? In
        Word, add text labels, icons, or patterns alongside color - for
        example, in rubrics use &quot;Needs work&quot; or a symbol in
        addition to red.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text) in Word document text"
        misses="Color as sole indicator, contrast in images/charts, branded templates, text inside shapes or SmartArt"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not flag when color alone conveys meaning (e.g. &quot;red
        items are required&quot;). It also may not evaluate every text box,
        shape, or table cell. Use Word&apos;s Accessibility Checker for
        additional coverage.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Document has text with insufficient contrast"],
        ["WCAG", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
        ["Fix", "Home → Font Color / highlight; avoid light gray on white"],
        ["Check before upload", "Review → Check Accessibility"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Contrast (Minimum)"
        href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
        description="WCAG 1.4.3 explained with examples"
      />
      <ResourceLink
        title="WebAIM: Contrast Checker"
        href="https://webaim.org/resources/contrastchecker/"
        description="Check foreground/background color combinations"
      />
      <ResourceLink
        title="Microsoft: Improve accessibility with the Accessibility Checker"
        href="https://support.microsoft.com/en-us/office/improve-accessibility-with-the-accessibility-checker-a16f6de0-2f39-4a2b-8bd8-5ad3274267a2"
        description="Use Word's built-in checker"
      />
    </ContentPageLayout>
  );
}
