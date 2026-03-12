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
        Branded slide templates are the most common source of contrast
        failures in higher education PowerPoint files. Your institution&apos;s
        template may use colors that look fine on the designer&apos;s
        calibrated monitor but fail contrast checks on a student&apos;s
        laptop in a bright room. Body text in light gold, teal, or maroon on
        a white background frequently falls below 4.5:1.
      </P>
      <P>
        Low-contrast slides are also harder to read when projected in a
        washed-out room, when students view them at reduced size on a phone,
        or when they are exported to PDF and viewed outside of PowerPoint.
        Students with low vision or color vision differences are
        disproportionately affected.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Changing text and background colors</H3>
      <Step number="1">Select the text or placeholder that has low contrast.</Step>
      <Step number="2">Use <strong>Home → Font Color</strong> to choose a color that meets 4.5:1 against the slide background (e.g. dark gray or black on white).</Step>
      <Step number="3">If the slide background is dark, use light or white text and ensure 4.5:1.</Step>
      <Step number="4">For title and body placeholders, consider updating the slide master so new slides inherit accessible colors.</Step>

      <H3>Updating the Slide Master for institution-wide fixes</H3>
      <P>
        Per-slide overrides work but are fragile. For a lasting fix, update
        the Slide Master: go to <strong>View → Slide Master</strong>, select
        the master layout, and change the text and background colors in the
        theme. New slides will inherit the accessible colors, and existing
        slides using that layout will update automatically.
      </P>
      <P>
        If your institution&apos;s template uses colors that fail contrast,
        either override text color on each slide or work with your
        accessibility or design team to get an updated template. The{" "}
        <a href="https://www.tpgi.com/color-contrast-checker/" target="_blank" rel="noopener noreferrer">Colour Contrast Analyser</a>{" "}
        is a free desktop tool you can use to verify that proposed replacement
        colors meet WCAG AA before committing to a template update.
      </P>

      <SH id="check-tools">Check It With Other Tools</SH>
      <H3>Microsoft Accessibility Checker</H3>
      <P>
        PowerPoint&apos;s built-in checker (<strong>Review → Check
        Accessibility</strong>) flags text contrast issues and offers
        suggested replacement colors. Run it before uploading to your LMS.
        It also catches missing alt text, missing slide titles, and reading
        order issues.
      </P>

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        Ally does not flag when color alone conveys meaning.{" "}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.1</a>{" "}
        requires other cues. Ask: would meaning be lost in grayscale?
      </P>
      <P>
        Charts on slides commonly use color-only series differentiation: a
        bar chart where the three data series are blue, orange, and gray with
        no data labels, patterns, or legend text visible on the slide. A
        student who cannot distinguish those colors cannot identify which bar
        represents which category. Add data labels directly on bars, use
        patterns or textures instead of solid fills, or include a text-based
        legend so the information is clear without relying on color.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Contrast ratio below 4.5:1 (or 3:1 for large text) in slide text"
        misses="Color as sole indicator, contrast in embedded images/charts, some text in shapes or notes"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally may not evaluate every text box, shape, or note. Color-used-alone
        is not flagged. Use PowerPoint&apos;s Accessibility Checker for
        additional coverage.
      </P>

      <SH id="student-side">The Student Side</SH>
      <P>
        Students create content with color too, in discussion posts,
        presentations, and group projects. If a student uses light gray text on
        white or relies on red and green to convey meaning, their peers may not
        be able to read or interpret it. Consider noting in assignment
        instructions: &ldquo;Use high-contrast text colors. If you use color to
        convey meaning, add a text label or icon so the information is clear
        without color.&rdquo;
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
        title="Microsoft: Make your PowerPoint presentations accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="Comprehensive guide to PowerPoint accessibility including contrast and color"
      />
      <ResourceLink
        title="Colour Contrast Analyser (CCA)"
        href="https://www.tpgi.com/color-contrast-checker/"
        description="Free desktop tool for checking exact contrast ratios against WCAG thresholds"
      />
    </ContentPageLayout>
  );
}
