import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  CheckerComparisonTable,
  Callout,
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

const listStyle = { margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" };

export default function ColorOverviewPage() {
  const { t } = useTheme();
  return (
    <ContentPageLayout
      categorySlug="color"
      fileTypeSlug="overview"
      title="Color"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        This category covers two related WCAG criteria. <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer"><strong>1.4.3 Contrast
        (Minimum)</strong></a> requires text to have sufficient contrast against its
        background (4.5:1 for normal text, 3:1 for large text) so students with
        low vision or color vision deficiencies can read it. <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer"><strong>1.4.1 Use
        of Color</strong></a> requires that color not be the only way to convey
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
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" }}>
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

      <SH id="example-contrast">Example Contrast Failures</SH>
      <P>
        Three categories of contrast failure, each with the actual ratio and
        whether automated tools detect it.
      </P>

      <H3>Regular text</H3>
      <P><strong>Detected by:</strong> Ally and Microsoft Accessibility Checker.</P>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "1em 0", fontSize: "var(--fs-base)", fontFamily: "var(--font-body)" }} aria-label="Regular text contrast comparison: broken vs corrected">
        <thead>
          <tr>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Broken</th>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Corrected</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              {/* Intentional contrast failure for educational demo */}
              <div data-a11y-demo="intentional-contrast-fail" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: 8 }}>
                <p style={{ color: "#5692FF", background: "#ffffff", fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", margin: 0 }}>
                  This regular sized text fails the 4.5:1 minimum for normal text.
                </p>
              </div>
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                #5692FF on white produces a 3:1 ratio, failing the 4.5:1 minimum. Students with low vision or in bright environments struggle to read this text.
              </p>
              <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>color: #5692FF (3:1 against white)</div>
            </td>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <div style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: 8 }}>
                <p style={{ color: "#2d5a7b", background: "#ffffff", fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", margin: 0 }}>
                  This regular sized text passes the 4.5:1 minimum.
                </p>
              </div>
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                #2d5a7b on white produces a 7.3:1 ratio. Exceeds the 4.5:1 minimum; readable across vision abilities.
              </p>
              <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>color: #2d5a7b (7.3:1 against white)</div>
            </td>
          </tr>
        </tbody>
      </table>

      <H3>Large text</H3>
      <P><strong>Detected by:</strong> Ally and Microsoft Accessibility Checker.</P>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "1em 0", fontSize: "var(--fs-base)", fontFamily: "var(--font-body)" }} aria-label="Large text contrast comparison: broken vs corrected">
        <thead>
          <tr>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Broken</th>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Corrected</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              {/* Intentional contrast failure for educational demo */}
              <div data-a11y-demo="intentional-contrast-fail" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: 8 }}>
                <p style={{ color: "#91BFE1", background: "#ffffff", fontFamily: "var(--font-body)", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                  This large text fails the 3:1 minimum.
                </p>
              </div>
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                #91BFE1 on white produces a 2:1 ratio, failing even the lower threshold for large text (18pt or 14pt bold).
              </p>
              <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>color: #91BFE1 (2:1 against white)</div>
            </td>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <div style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: 8 }}>
                <p style={{ color: "#4A8CAD", background: "#ffffff", fontFamily: "var(--font-body)", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                  This large text passes the 3:1 minimum.
                </p>
              </div>
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                #4A8CAD on white produces a 3.7:1 ratio. Passes the large-text threshold; readable for students with low vision.
              </p>
              <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>color: #4A8CAD (3.7:1 against white)</div>
            </td>
          </tr>
        </tbody>
      </table>

      <H3>Graphic element</H3>
      <P><strong>Detected by:</strong> No automated tool. Neither Ally nor the Microsoft Accessibility Checker flag graphic element contrast failures.</P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5em", margin: "1em 0", alignItems: "start" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/chart-contrast-example.png"
            alt="Line chart with three data series across four categories. Series 1 (light pink, #F1B4A4): 4.3, 2.5, 3.5, 4.5. Series 2 (orange): 2.4, 4.4, 1.8, 2.8. Series 3 (dark brown): 2, 2, 3, 5. The Series 1 line color has a contrast ratio of only 1.8:1 against the white background, failing the 3:1 minimum for non-text graphic elements."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            <strong>Broken.</strong> Series 1 uses #F1B4A4 (1.8:1 against white), failing the 3:1 minimum for non-text graphic elements. The light pink line is nearly invisible for users with low vision.
          </figcaption>
          <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>Series 1 color: #F1B4A4 (1.8:1 against white)</div>
        </figure>
        <figure style={{ margin: 0 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, background: "#F1B4A4", border: "1px solid #ccc", borderRadius: 6, flexShrink: 0 }} role="img" aria-label="Color swatch: #F1B4A4, light salmon, failing contrast" />
            <span style={{ fontFamily: "monospace", fontSize: "var(--fs-sm)", color: "inherit" }}>#F1B4A4 &rarr; 1.8:1 (fail)</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, background: "#C0564B", border: "1px solid #ccc", borderRadius: 6, flexShrink: 0 }} role="img" aria-label="Color swatch: #C0564B, dark red, passing contrast" />
            <span style={{ fontFamily: "monospace", fontSize: "var(--fs-sm)", color: "inherit" }}>#C0564B &rarr; 4.5:1 (pass)</span>
          </div>
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            <strong>Corrected.</strong> Replace with #C0564B (4.5:1). The data series remains visible and distinguishable for all users.
          </figcaption>
          <div style={{ fontSize: "var(--fs-xs)", fontFamily: "monospace", marginTop: 6, color: "inherit" }}>Series 1 color: #C0564B (4.5:1 against white)</div>
        </figure>
      </div>
      <P>
        Both Ally and the Microsoft Accessibility Checker detect text contrast
        failures (regular and large text). Neither detects graphic element
        contrast failures. WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" target="_blank" rel="noopener noreferrer">1.4.11 Non-text Contrast</a> (Level AA) requires
        a minimum 3:1 contrast ratio for meaningful graphic elements such as
        chart lines, bar fills, and icons. The chart above uses #F1B4A4 (a
        light salmon) for one of its data series, producing a ratio of only
        1.8:1 against white. This gap is invisible to automated tools and
        requires manual review.
      </P>
      <Callout type="warning">
        <strong>Key point.</strong> Automated tools catch text contrast but
        miss graphic element contrast entirely. Chart lines, bar fills, icons,
        and other non-text elements that fail the 3:1 minimum are invisible to
        both Ally and the Microsoft Accessibility Checker.
      </Callout>

      <SH id="cca">Colour Contrast Analyser</SH>
      <P>
        The <a href="https://www.tpgi.com/color-contrast-checker/" target="_blank" rel="noopener noreferrer">Colour Contrast Analyser (CCA)</a> is a free desktop tool that
        confirms exact contrast ratios and which WCAG criteria pass or fail.
      </P>
      <figure style={{ maxWidth: 320, margin: "16px 0" }}>
        <img
          src="/assets/cca-contrast-check-91bfe1.png"
          alt="Screenshot of the Colour Contrast Analyser (CCA) desktop application. Foreground color is #91BFE1, background is #FFFFFF (white). The contrast ratio is 2:1. WCAG 2.1 results show: 1.4.3 Contrast (Minimum) AA fails for both regular and large text, 1.4.6 Contrast (Enhanced) AAA fails for both, and 1.4.11 Non-text Contrast AA fails for UI components and graphical objects."
          style={{ width: "100%", height: "auto" }}
        />
        <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
          The Colour Contrast Analyser (CCA) confirms #91BFE1 fails at 2:1.
        </figcaption>
      </figure>

      <SH id="automated-tools">What Automated Tools Detect</SH>
      <P>
        Ally and similar tools measure the contrast ratio between text color
        and background color and flag combinations that fall below the minimum.
        This works well for body text in standard layouts.
      </P>
      <CheckerComparisonTable
        caption="Color and contrast: what each checker detects"
        rows={[
          { testType: "Text contrast below 4.5:1 / 3:1", ally: "Detected", msOffice: "Detected", acrobat: "Detected (PDF)" },
          { testType: "Graphic element contrast below 3:1", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
          { testType: "Color as sole means of information", ally: "Not detected", msOffice: "Not detected", acrobat: "Not detected" },
        ]}
      />
      <P>
        In Canvas, the Rich Content Editor&apos;s built-in Accessibility
        Checker flags text contrast issues and provides a color picker to fix
        them in place. Contrast issues also appear on the Ally Accessibility
        Dashboard, lowering the file&apos;s score with suggested replacement
        colors.
      </P>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5em", margin: "1em 0" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/canvas-rce-contrast-checker.png"
            alt="Screenshot of the Canvas Rich Content Editor Accessibility Checker showing Issue 1 of 1: Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1. A Change text color field shows rgba(145, 191, 225, 1) with a color picker below and Prev, Next, and Apply buttons."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            The Canvas RCE Accessibility Checker flags low-contrast text and offers a color picker to fix it in place.
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ally-dashboard-contrast-warning.png"
            alt="Screenshot of the Ally accessibility score panel for a file with alt text. The score is 81% with a yellow-green gauge. Below, Ally reports This item contains text with insufficient contrast with a What this means button. Four suggested replacement colors are shown with an Apply button."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            Ally flags the contrast issue on the Dashboard, lowering the file score to 81% and suggesting darker replacement colors.
          </figcaption>
        </figure>
      </div>
      <P>
        The Microsoft Accessibility Checker (Review &gt; Check Accessibility)
        also detects text contrast issues in Word, PowerPoint, and Excel. When
        it finds text that is hard to read against its background, the
        Accessibility Assistant flags it under <strong>Color and Contrast</strong> and
        offers specific fix suggestions, including alternative font colors and
        text shading options. Unlike Ally, the Microsoft checker provides
        in-place remediation: clicking a suggested color applies the fix
        immediately.
      </P>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5em", margin: "1em 0" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ms-checker-contrast-overview.png"
            alt="Screenshot of Microsoft's Accessibility Assistant showing a Keep going! message prompting the user to fix remaining issues. Below, the Color and Contrast category lists Hard-to-read text contrast with a count of 1."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            The Accessibility Assistant flags contrast issues under Color and Contrast.
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ms-checker-contrast-detail.png"
            alt="Screenshot of Microsoft's Accessibility Assistant detail view for Hard-to-read text contrast. The message reads Current text color is hard to see. Consider a high contrast color so that the text is clearly visible. Below are three suggested replacement colors, a More font colors button, and a Text shading button."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            The detail view offers suggested replacement colors, a font color picker, and text shading.
          </figcaption>
        </figure>
      </div>

      <SH id="false-positive">Known False Positive: Image Contrast in Photographs</SH>
      <P>
        Ally claims to evaluate contrast within image files, but this feature
        is not working as advertised. When a photograph is uploaded (for
        example, a student&apos;s profile photo posted to a discussion board),
        Ally may flag it with &ldquo;This image has contrast issues&rdquo; and
        a reduced accessibility score. However, Ally cannot make the
        determinations required for a valid <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">WCAG 1.4.3</a> test: it cannot
        distinguish text from non-text graphic content, and it cannot identify
        the font size or weight needed to determine which threshold applies
        (4.5:1 for normal text vs. 3:1 for large text). In the example below,
        a student uploaded a photo to a discussion post. Ally flagged the
        image at 75% with a contrast warning. The likely trigger is the
        framed picture hanging on the wall behind the student, which Ally
        appears to have misidentified as text content.
      </P>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5em", margin: "1em 0" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/student-discussion-photo.png"
            alt="Student used in a Canvas discussion post, wearing a green shirt and standing in front of a gold curtain with a framed item on the wall. Content is based on a real student portrait but has been heavily manipulated with AI to protect privacy."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            Student photo uploaded to a Canvas discussion post. Based on a real student photo, heavily manipulated with AI to protect the student&apos;s privacy.
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/ally-image-contrast-warning.png"
            alt="Ally accessibility score panel for the student upload. The score is 75% with a contrast-issues message. Below, Ally displays Guidance not available yet. We are updating the guidance for this issue."
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)" }}>
            Ally flags the photo at 75% with &ldquo;This image has contrast issues.&rdquo; Guidance reads: &ldquo;Guidance not available yet.&rdquo;
          </figcaption>
        </figure>
      </div>
      <P>
        Ally&apos;s own guidance panel confirms the limitation: it reads
        &ldquo;Guidance not available yet. We are updating the guidance for
        this issue.&rdquo; This suggests the feature is under active
        development, but in its current state it produces false positives on
        photographic content. <strong>Do not take action on image contrast
        warnings in the Accessibility Dashboard.</strong> Until Ally can
        reliably distinguish text from non-text content within images and
        determine the applicable WCAG threshold, these flags should be noted
        but not treated as actionable issues.
      </P>

      <SH id="color-as-sole-means">Color as Sole Means (1.4.1)</SH>
      <P>
        WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer"><strong>1.4.1 Use of Color</strong></a> (Level A) says color must
        not be the only way to convey information, indicate an action, or
        distinguish an element. This is a separate requirement from contrast
        and is <strong>not checked by Ally or any of the standard automated
        tools</strong>. It requires manual review.
      </P>
      <H3>Common examples in course content</H3>
      <ul style={listStyle}>
        <li>A rubric that uses red/yellow/green to indicate performance levels without text labels</li>
        <li>A chart where data series are distinguished only by color without patterns or direct labels</li>
        <li>Feedback that marks incorrect answers in red with no other indicator (icon, text, symbol)</li>
        <li>A schedule where color-coded categories have no legend or text equivalent</li>
      </ul>
      <H3>Color as sole means: Bar chart example</H3>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "1em 0", fontSize: "var(--fs-base)", fontFamily: "var(--font-body)" }} aria-label="Color as sole means bar chart comparison: broken vs corrected">
        <thead>
          <tr>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Broken</th>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Corrected</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-default.png"
                alt="Bar chart titled Performance Status showing four teams. Team A scores 72, Team B scores 95, Team C scores 95, Team D scores 65. Red bars represent below target and green bars represent above target, but no text labels or patterns distinguish the categories. Color is the only indicator of status."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Color alone distinguishes above-target (green) from below-target (red). No text labels, no patterns, no data values on bars.
              </p>
            </td>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-remediated.png"
                alt="Bar chart titled Performance Status showing four teams with data labels. Team A: 75, Below target. Team B: 95, Above target. Team C: 95, Above target. Team D: 65, Below target. Each bar has a score and a text label indicating above or below target, so meaning does not depend on color alone."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Data labels (75, 95, 95, 65) and text labels (&ldquo;Above target&rdquo; / &ldquo;Below target&rdquo;) added to each bar. Meaning is preserved with or without color.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <H3>Color vision simulation</H3>
      <P>
        The following simulations show how the broken and corrected charts
        appear to users with two common types of color vision deficiency.
        These are generated using color blindness simulation tools and
        represent what the chart would look like, not an approximation.
      </P>
      <P>
        <strong>Deuteranopia</strong> (red-green color blindness) affects
        roughly 6% of males and is the most common form of color vision
        deficiency. <strong>Achromatopsia</strong> (total color blindness)
        is rare but represents the extreme case where all color information
        is lost.
      </P>
      <H3>Deuteranopia (red-green color blindness)</H3>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "1em 0", fontSize: "var(--fs-base)", fontFamily: "var(--font-body)" }} aria-label="Deuteranopia simulation comparison: broken vs corrected">
        <thead>
          <tr>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Broken</th>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Corrected</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-default-deuteranopia.png"
                alt="Deuteranopia simulation of the broken chart. All four bars appear as similar olive and dark gold tones. Without the red-green distinction, the bars are nearly indistinguishable. No text labels are present, so the student cannot determine which teams are above or below target."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Red and green collapse to similar olive tones. A student with deuteranopia sees four bars of nearly the same color and has no way to determine status.
              </p>
            </td>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-remediated-deuteranopia.png"
                alt="Deuteranopia simulation of the corrected chart. Bars appear in similar olive and dark gold tones, but each bar has a data label and text label: Team A 75 Below target, Team B 95 Above target, Team C 95 Above target, Team D 65 Below target. The text labels preserve the meaning despite the color shift."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Same color shift, but the text labels make color irrelevant. The student reads &ldquo;75, Below target&rdquo; and &ldquo;95, Above target&rdquo; directly from the chart.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <H3>Achromatopsia (total color blindness)</H3>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "1em 0", fontSize: "var(--fs-base)", fontFamily: "var(--font-body)" }} aria-label="Achromatopsia simulation comparison: broken vs corrected">
        <thead>
          <tr>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Broken</th>
            <th scope="col" style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green, fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-display)", textAlign: "left", width: "50%" }}>Corrected</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-default-achromatopsia.png"
                alt="Achromatopsia simulation of the broken chart. All four bars appear as similar medium gray tones. Without any color distinction and no text labels, the student cannot determine which teams are above or below target. All information encoded in color is completely lost."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Total color loss. Four gray bars of similar brightness. A student with achromatopsia, or anyone viewing a grayscale printout, receives zero status information from this chart.
              </p>
            </td>
            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
              <img
                src="/assets/color-sole-means-remediated-achromatopsia.png"
                alt="Achromatopsia simulation of the corrected chart. All four bars appear as similar gray tones, but each bar has a data label and text label: Team A 75 Below target, Team B 95 Above target, Team C 95 Above target, Team D 65 Below target. Despite total color loss, the text labels preserve the full meaning."
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "var(--fs-base)", color: "inherit", marginTop: 8, fontFamily: "var(--font-body)", margin: "8px 0 0" }}>
                Same grayscale view, but the text labels are unaffected by color loss. &ldquo;75, Below target&rdquo; and &ldquo;95, Above target&rdquo; are as legible in grayscale as in full color.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <H3>What to look for</H3>
      <P>
        Any place where removing color would cause a loss of information. The
        simulation above demonstrates the test: if the chart were printed in
        grayscale, would all the meaning still be present? For the broken
        version, the answer is no. For the corrected version, it is yes.
      </P>
      <P>
        This applies beyond charts. Look for color-coded rubrics, red/green
        feedback indicators, schedules where categories are distinguished only
        by color, and any visual element where a student who cannot perceive
        color would lose information.
      </P>
      <Callout type="warning">
        <strong>Key point.</strong> No automated tool checks for color as
        the sole means of communication. This issue is invisible to Ally, the
        Microsoft checker, and Acrobat. It requires manual review every time.
      </Callout>

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
        overlaps with WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">1.4.1 Use of Color</a>; manual review is needed.
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
        ["WCAG criteria", "1.4.1 Use of Color (A), 1.4.3 Contrast (Minimum) (AA), 1.4.11 Non-text Contrast (AA)"],
        ["Likelihood", "4 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
        ["Contrast ratio", "4.5:1 normal text, 3:1 large text; 3:1 for graphic elements (1.4.11)"],
        ["Color as sole means", "Manual review; grayscale test; add patterns/labels/icons"],
        ["Image contrast in photos", "Often a false positive; do not treat as actionable until Ally guidance is updated"],
      ]} />

      <SH id="quick-check">Quick Check</SH>
      <P><strong>Color Contrast (<a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">1.4.3</a>)</strong></P>
      <ul style={listStyle}>
        <li>Does all body text meet a 4.5:1 contrast ratio against its background?</li>
        <li>Does large text (18pt or 14pt bold) meet at least 3:1?</li>
        <li>Have chart labels, axis text, and legend text been checked manually?</li>
        <li>Are branded templates verified, not assumed to pass?</li>
      </ul>
      <P><strong>Color as Sole Means (<a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noopener noreferrer">1.4.1</a>)</strong></P>
      <ul style={listStyle}>
        <li>If the content were printed in grayscale, would all information still be conveyed?</li>
        <li>Do charts use patterns, labels, or shapes in addition to color?</li>
        <li>Do rubrics and grading scales include text labels alongside color coding?</li>
        <li>Does feedback use icons or text in addition to red/green indicators?</li>
      </ul>
    </ContentPageLayout>
  );
}
