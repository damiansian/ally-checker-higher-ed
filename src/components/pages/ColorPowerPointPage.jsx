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

export default function ColorPowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="color"
      fileTypeSlug="powerpoint"
      title="Color"
      subtitle="PowerPoint Presentations"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Presentation has text with insufficient contrast"
        severity="Minor"
        wcag="1.4.3 Contrast (Minimum) (Level AA)"
      />
      <P>
        Ally flags text in your PowerPoint file that does not meet the
        minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text.
        Slide designs, especially branded templates, often use light gray or
        colored text that fails this check.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Low-contrast slides are difficult to read in the room and even
        harder when students view them on their own devices or in PDF
        export. Students with low vision or color vision deficiencies are
        disproportionately affected.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Changing text and background colors</H3>
      <Step number="1">Select the text or placeholder that has low contrast.</Step>
      <Step number="2">Use <strong>Home → Font Color</strong> to choose a color that meets 4.5:1 against the slide background (e.g. dark gray or black on white).</Step>
      <Step number="3">If the slide background is dark, use light or white text and ensure 4.5:1.</Step>
      <Step number="4">For title and body placeholders, consider updating the slide master so new slides inherit accessible colors.</Step>
      <Placeholder label="Screenshot: PowerPoint Font Color and slide with contrast-safe text" />

      <H3>Branded templates</H3>
      <P>
        If your institution&apos;s template uses colors that fail contrast,
        either override text color on each slide or work with your
        accessibility or design team to get an updated template.
      </P>

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        Ally does not flag when color alone conveys meaning (e.g. &quot;green
        = go, red = stop&quot; on a slide with no other cue). <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.1</a>
        {" "}requires other cues. Ask: would meaning be lost in grayscale? In
        PowerPoint, add text labels or icons to charts and diagrams - for
        example, label chart series or use patterns in addition to color so
        slide content is understandable without color.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text) in slide text"
        misses="Color as sole indicator, contrast in embedded images/charts, some text in shapes or notes"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not evaluate every text box, shape, or note. Color-used-alone
        (e.g. &quot;green = go, red = stop&quot;) is not flagged. Use
        PowerPoint&apos;s Accessibility Checker for additional coverage.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Presentation has text with insufficient contrast"],
        ["WCAG", "1.4.3 Contrast (Minimum) (Level AA)"],
        ["Minimum ratio", "4.5:1 normal text, 3:1 large text"],
        ["Fix", "Home → Font Color; adjust slide background or text"],
        ["Templates", "Override text color or request accessible template"],
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
      <ResourceLink
        title="Microsoft: Make slides more accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="PowerPoint accessibility guidance"
      />
    </ContentPageLayout>
  );
}
