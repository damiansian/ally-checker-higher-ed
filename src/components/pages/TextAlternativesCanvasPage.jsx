import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
} from "@/components/content.jsx";

const tocSections = [
  { id: "ally-error", label: "The Ally Error" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "how-to-fix", label: "How to Fix It" },
  { id: "false-positive", label: "A11y False Positive" },
  { id: "writing-alt-text", label: "Writing Good Alt Text" },
  { id: "complex-images", label: "Complex Images" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
  { id: "other-tools", label: "Other Tools" },
  { id: "student-side", label: "The Student Side" },
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

function AltTextExample({ image, poor, better }) {
  const { t } = useTheme();
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
      gap: 1, backgroundColor: t.border,
      overflow: "hidden", margin: "4px 0",
      fontSize: 13.5, fontFamily: "var(--font-body)",
    }}>
      <div style={{ padding: "14px 16px", backgroundColor: t.surface, color: t.textSecondary }}>{image}</div>
      <div style={{ padding: "14px 16px", backgroundColor: t.accentBg, color: t.text }}>{poor}</div>
      <div style={{ padding: "14px 16px", backgroundColor: t.greenBg, color: t.text }}>{better}</div>
    </div>
  );
}

export default function TextAlternativesCanvasPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="text-alternatives"
      fileTypeSlug="canvas"
      title="Text Alternatives"
      subtitle="Canvas Rich Content Editor (RCE)"
      tocSections={tocSections}
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Images must have alternate text description"
        severity="Major"
        wcag="1.1.1 Non-text Content (Level A)"
      />
      <P>
        When you insert an image into the Canvas Rich Content Editor without
        providing alt text, Ally flags it. This is the same fundamental issue
        as in Word or PowerPoint -- a screen reader encounters the image and
        has nothing to announce -- but the Canvas Rich Content Editor (RCE) has its own interface
        for adding and editing alt text, and its own quirks about how it
        handles it.
      </P>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        Canvas pages, assignments, discussions, and announcements are the
        primary way most instructors deliver content. When a screen reader
        encounters an image without alt text in the Rich Content Editor (RCE), the student
        hears &quot;image&quot; and nothing else -- or worse, the image file
        name, which is often something
        like <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>IMG_4392.jpg</code>.
      </P>
      <div style={{
        padding: "2px 0 2px 20px",
        borderLeft: `3px solid ${t.border}`,
        margin: "18px 0 18px 4px",
      }}>
        {[
          ["A decorative header image?", "Probably not a problem -- mark it decorative."],
          ["A chart referenced in the discussion prompt?", "The student cannot participate meaningfully in the discussion."],
          ["A screenshot of instructions for a lab?", "The student cannot complete the assignment."],
        ].map(([bold, rest], i) => (
          <div key={i} style={{
            padding: "8px 0 8px 16px",
            fontSize: 15, lineHeight: 1.65,
            fontFamily: "var(--font-body)", color: t.text,
          }}>
            <strong>{bold}</strong> {rest}
          </div>
        ))}
      </div>
      <P>
        Because Canvas content is HTML under the hood, screen readers interact
        with it directly in the browser. There is no intermediate file format
        to worry about -- what you author in the Rich Content Editor (RCE) is what assistive
        technology reads. That makes getting alt text right especially
        straightforward here.
      </P>

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding alt text when inserting an image</H3>
      <Step number="1">In the Rich Content Editor (RCE) toolbar, click the <strong>Images</strong> icon (or drag an image into the editor).</Step>
      <Step number="2">The image options tray opens on the right side of the editor.</Step>
      <Step number="3">In the <strong>Alt Text</strong> field, type a description that conveys the meaning of the image in context.</Step>
      <Step number="4">If the image is purely decorative, check <strong>Decorative Image</strong> instead. This sets the alt attribute to empty, which tells screen readers to skip it.</Step>
      <Step number="5">Click <strong>Done</strong> or close the tray. The alt text is saved with the image.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-upload-image-alt-text.png"
          alt="Canvas upload dialog showing a drag-and-drop area at top and an Attributes section below with an Alt Text field outlined in red, placeholder text reading Describe the content, and a Decorative media checkbox beneath it."
          width={500}
          height={375}
          style={{
            maxWidth: 500,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Canvas Upload Image dialog with the Alt Text field and
          Decorative Image checkbox
        </figcaption>
      </figure>

      <H3>Editing alt text on an existing image</H3>
      <Step number="1">Click the image in the Rich Content Editor (RCE) to select it.</Step>
      <Step number="2">The image options toolbar appears. Click the <strong>Image Options</strong> button (or double-click the image).</Step>
      <Step number="3">Update the <strong>Alt Text</strong> field or check/uncheck <strong>Decorative Image</strong>.</Step>
      <Step number="4">Click <strong>Done</strong>.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-image-selected.png"
          alt="A grouped bar chart titled Sample data visualization selected in the Canvas Rich Content Editor, with blue selection handles around it and an Options tooltip button visible at the top right of the graphic."
          width={600}
          height={375}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          Clicking an image in the Rich Content Editor (RCE) selects it and reveals the Image
          Options button
        </figcaption>
      </figure>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-image-options-tray.png"
          alt="Canvas Options tray showing an Alt Text field filled in with Grouped bar graph comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%. Below it are a Decorative media checkbox (unchecked) and Display Options set to Embed."
          width={320}
          height={400}
          style={{
            maxWidth: 320,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Image Options tray with alt text describing the chart
        </figcaption>
      </figure>

      <H3>Using the HTML editor</H3>
      <P>
        You can also add or edit alt text directly in the Rich Content Editor&apos;s (RCE) HTML
        editor. Click the <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>&lt;/&gt;</code> button to switch to HTML view and edit
        the <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>alt</code> attribute directly on
        the <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>&lt;img&gt;</code> tag.
      </P>
      <div style={{
        padding: "16px 20px",
        borderRadius: 8,
        backgroundColor: t.codeBg,
        border: `1px solid ${t.border}`,
        margin: "16px 0 20px",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.8,
        color: t.codeText,
        overflowX: "auto",
      }}>
        &lt;img src=&quot;chart.png&quot; <strong style={{ color: t.accent }}>alt=&quot;Grouped bar graph comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%.&quot;</strong> /&gt;
      </div>

      <H3>Canvas&apos;s built-in Accessibility Checker</H3>
      <P>
        The Rich Content Editor (RCE) includes a built-in Accessibility Checker (the person-in-a-circle
        icon in the toolbar). It checks for missing alt text, among other
        things. Run it before saving to catch images you may have missed.
        Unlike Ally, this checker runs <em>before</em> the content is
        published -- giving you a chance to fix issues before students see
        the content.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-accessibility-checker.png"
          alt="Canvas Rich Content Editor showing a grouped bar chart with the Rich Content Editor (RCE) toolbar visible at top. The Ally score indicator in the top right shows a green 100%. The Accessibility Checker icon in the bottom toolbar is circled in red, showing a blue badge with the number 1 indicating one issue detected."
          width={800}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Rich Content Editor&apos;s (RCE) built-in Accessibility Checker (circled) flags an
          issue despite Ally showing 100%
        </figcaption>
      </figure>

      {/* ── A11y False Positive ── */}
      <SH id="false-positive">A11y False Positive</SH>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Alt text character length is not a WCAG requirement
        </div>
        Neither HTML nor WCAG defines character limits for alt text
        attributes. This is a commonly held myth in the accessibility
        industry, one that the Anthropic team appears to have adhered to. One
        should aim to be concise, but there is no reason for any automated
        system to flag this as an actual error. This issue has been brought to
        their attention, and they responded that this should be seen as a best
        practice, not a requirement. But defining it as a best practice is
        also inaccurate. The alt text for the chart above is the exact length
        required to convey the data and fully conforms to WCAG.
      </Callout>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-alt-text-length-flag.png"
          alt="Canvas Accessibility Checker dialog showing Issue 1 of 1: Alt attribute text should not contain more than 120 characters. Below it is a Change alt text field containing the description Grouped bar graph comparing Quiz 1 and Quiz 2 averages across three sections, with Prev, Next, and Apply buttons at the bottom."
          width={320}
          height={400}
          style={{
            maxWidth: 320,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Canvas Accessibility Checker incorrectly flags alt text over
          120 characters
        </figcaption>
      </figure>
      <P>
        The text alternative in question
        reads: &quot;Grouped bar graph of quiz averages across four sections.
        Quiz 1 scores range from 83% to 87%. Quiz 2 scores range from 79% to
        82%.&quot; This is 148 characters, which incorrectly gets flagged by
        Ally IF uploading an image in the Rich Content Editor, but not when
        the same image with the same alt text appears in a Word document.
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        Same alt text in Word <span style={{ color: t.green }}>passes</span><br />
        Same alt text in Canvas Rich Content Editor (RCE) <span style={{ color: t.accent }}>flagged</span> &mdash; incorrectly
      </div>
      <P>
        This inconsistency is a problem. The alt text is not too long. It is
        exactly as long as it needs to be to convey the data in the chart. A
        screen reader user hearing this description gets the same information
        a sighted student gets by looking at the chart. Trimming it to fit an
        arbitrary character limit would strip meaningful data from the
        description.
      </P>
      <P>
        If you encounter this flag, do not shorten your alt text to appease
        the tool. Write the description the image needs. If Ally flags it,
        the flag is wrong -- not your alt text. This does not seem to
        interfere with your overall accessibility score.
      </P>

      {/* ── Writing Good Alt Text ── */}
      <SH id="writing-alt-text">Writing Good Alt Text</SH>
      <P>
        The same principles apply here as in any file format. Alt text is a
        functional replacement for the image -- not a caption, not a title,
        not a file name. Write it as if you are describing the image to someone
        over the phone who needs the same information a sighted student gets by
        looking at it.
      </P>
      <div style={{ margin: "24px 0" }}>
        {[
          { rule: "Keep it concise.", detail: "One to two sentences for most images. If you need more, the image might need a long description (see Complex Images below)." },
          { rule: "Describe function, not appearance.", detail: "\"Bar chart showing enrollment increased 40% between 2020 and 2024\" is useful. \"Colorful bar chart\" is not." },
          { rule: "Match the context.", detail: "The same image might need different alt text on a course home page vs. in an assignment prompt." },
          { rule: "Skip \"image of\" or \"picture of.\"", detail: "Screen readers already announce that the content is an image." },
          { rule: "Don't leave it blank.", detail: "If the image is decorative, check Decorative Image. If it carries meaning, describe it. Do not use the file name as a description." },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "14px 18px",
            backgroundColor: i % 2 === 0 ? t.surfaceAlt : "transparent",
            borderRadius: 8, marginBottom: 2,
          }}>
            <div style={{
              fontSize: 15, fontWeight: 600, color: t.text,
              fontFamily: "var(--font-display)", marginBottom: 4,
            }}>{item.rule}</div>
            <div style={{
              fontSize: 14.5, color: t.textSecondary, lineHeight: 1.6,
              fontFamily: "var(--font-body)",
            }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <H3>Examples</H3>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: 1, backgroundColor: t.border, borderRadius: "10px 10px 0 0",
        overflow: "hidden",
        fontSize: 11, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.06em", fontFamily: "var(--font-display)",
      }}>
        <div style={{ padding: "10px 16px", backgroundColor: t.surfaceAlt, color: t.textTertiary }}>Image</div>
        <div style={{ padding: "10px 16px", backgroundColor: t.accentBg, color: t.accent }}>Poor</div>
        <div style={{ padding: "10px 16px", backgroundColor: t.greenBg, color: t.green }}>Better</div>
      </div>
      <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden", marginBottom: 24 }}>
        <AltTextExample image="Bar chart on a course home page" poor='"chart"' better="Grouped bar graph of quiz averages across four sections. Quiz 1 scores range from 83% to 87%. Quiz 2 scores range from 79% to 82%." />
        <AltTextExample image="Photo in a discussion prompt" poor='"photo"' better="Aerial view of the Amazon River basin showing deforestation along tributary boundaries" />
        <AltTextExample image="Screenshot of Canvas settings" poor='"screenshot"' better="Canvas assignment settings showing Due Date set to March 15 and Available Until set to March 22" />
        <AltTextExample image="Decorative banner at top of module" poor='"Unit 3 banner"' better='Mark as decorative (does not convey course content)' />
      </div>

      {/* ── Complex Images ── */}
      <SH id="complex-images">Complex Images</SH>
      <P>
        Charts, diagrams, flowcharts, and infographics often carry too much
        information for a one-sentence description. These need a long
        description in addition to brief alt text.
      </P>
      <Callout>
        <div style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 10, fontSize: 14 }}>
          The approach:
        </div>
        <Step number="1">
          Write short alt text that identifies the type and topic: &quot;Flowchart of
          the research methodology. Full description below.&quot;
        </Step>
        <Step number="2">
          Provide the complete description in the page text immediately before or
          after the image. In the Canvas Rich Content Editor (RCE), this is just regular text -- no
          special element needed.
        </Step>
      </Callout>
      <P>
        This approach works well in Canvas because the Rich Content Editor (RCE) is HTML. The long
        description lives in the same content flow and is available to all
        students, not just screen reader users. A sighted student skimming the
        page can read the description too.
      </P>
      <P>
        If the long description would disrupt the page layout, you can place
        it in an HTML <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>&lt;details&gt;</code> element using the HTML editor, creating a
        collapsible section that students can expand.
      </P>
      <div style={{
        padding: "16px 20px",
        borderRadius: 8,
        backgroundColor: t.codeBg,
        border: `1px solid ${t.border}`,
        margin: "16px 0 20px",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.8,
        color: t.codeText,
        overflowX: "auto",
      }}>
        &lt;details&gt;<br />
        &nbsp;&nbsp;&lt;summary&gt;Full description of the chart&lt;/summary&gt;<br />
        &nbsp;&nbsp;&lt;p&gt;The grouped bar chart compares quiz averages...&lt;/p&gt;<br />
        &lt;/details&gt;
      </div>

      {/* ── What Ally Catches ── */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        In the Canvas Rich Content Editor (RCE), Ally uses <strong>axe-core</strong> to check
        images. The primary check is whether the <code style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>alt</code> attribute is present and non-empty. If the image has
        any alt text at all, it passes:
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        &quot;asdf&quot; <span style={{ color: t.green }}>passes</span><br />
        &quot;image1.jpg&quot; <span style={{ color: t.accent }}>fails</span><br />
        &quot;TODO add alt text&quot; <span style={{ color: t.green }}>passes</span><br />
        A perfectly written description <span style={{ color: t.green }}>passes</span><br />
        Programmatically marked decorative <span style={{ color: t.green }}>passes</span><br/>
        No alt text entered <span style={{ color: t.accent }}>fails</span>
      </div>
      <P>
        Ally cannot evaluate whether your alt text is accurate, meaningful, or
        appropriate for the context. That is a human judgment call. In Canvas,
        the built-in Accessibility Checker performs the same basic check.
      </P>

      {/* ── What Ally Misses ── */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Presence of alt text on images. Any non-empty alt attribute passes. Also flags images embedded in uploaded files (Word, PowerPoint, PDF) that are linked from Canvas pages."
        misses="Alt text quality, images of text, whether the description matches the image, and incorrectly flags alt text length as an issue (see false positive above)."
      />
      {[
        {
          term: "Alt text quality",
          desc: "The most significant gap. Ally gives a green score for descriptions that are useless to students.",
        },
        {
          term: "Alt text length false positive",
          desc: "Ally flags alt text over a certain character count when the image is uploaded to the Rich Content Editor (RCE), but not when the same alt text appears in a Word document. There is no WCAG basis for a character limit.",
        },
        {
          term: "Images of text",
          desc: "If you paste a screenshot of a text-heavy email or slide into the Rich Content Editor (RCE), Ally flags the missing alt text but does not flag that the image itself is a problem. The fix is usually to present the information as real text.",
        },
        {
          term: "Embedded content",
          desc: "Images inside iframes, embedded media, or LTI tools are outside the scope of Ally's axe-core scan. These are invisible to Ally entirely.",
        },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: t.text,
            fontFamily: "var(--font-display)", marginBottom: 4,
          }}>{item.term}</div>
          <div style={{
            fontSize: 15, lineHeight: 1.7, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>{item.desc}</div>
        </div>
      ))}

      {/* ── Other Tools ── */}
      <SH id="other-tools">Check It With Other Tools</SH>
      {[
        {
          name: "Canvas Accessibility Checker",
          meta: "Built into the Rich Content Editor (RCE) toolbar",
          desc: "The person-in-a-circle icon in the Rich Content Editor (RCE) toolbar. Checks for missing alt text, insufficient contrast, missing table headers, and heading structure. Run it before saving -- it catches issues before students see the content. Does not check alt text quality.",
        },
        {
          name: "axe DevTools (browser extension)",
          meta: "Free \u00b7 Chrome, Firefox, Edge",
          desc: "The same engine Ally uses. Install the extension, open any Canvas page after publishing, and run the scan. Checks for missing alt text and related image accessibility issues. Useful for verifying what Ally will see.",
        },
        {
          name: "WAVE (browser extension)",
          meta: "Free \u00b7 Chrome, Firefox",
          desc: "Visual overlay shows each image's alt text directly on the page, making it easy to review all descriptions at once. Reports missing alt text and can flag suspicious alt text (like file names).",
        },
      ].map((tool, i) => (
        <div key={i} style={{
          padding: "20px 24px", borderRadius: 10,
          backgroundColor: t.surface, border: `1px solid ${t.border}`,
          margin: `0 0 ${i < 2 ? 14 : 20}px`,
        }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: t.text,
            fontFamily: "var(--font-display)", marginBottom: 4,
          }}>{tool.name}</div>
          <div style={{
            fontSize: 13, color: t.textTertiary,
            fontFamily: "var(--font-display)", marginBottom: 12,
          }}>{tool.meta}</div>
          <div style={{
            fontSize: 14.5, lineHeight: 1.65, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>{tool.desc}</div>
        </div>
      ))}

      {/* ── The Student Side ── */}
      <SH id="student-side">The Student Side</SH>
      <P>
        Students use the Canvas Rich Content Editor (RCE) too -- in discussion posts, wiki pages
        they edit, and peer review responses. If a student inserts an image
        without alt text, that image is inaccessible to classmates who use
        screen readers.
      </P>
      <P>
        Ally scans student-submitted content the same way it scans instructor
        content. Teaching students to add alt text when they insert images in
        the Rich Content Editor (RCE) takes thirty seconds of instruction and makes their
        contributions accessible to everyone.
      </P>
      <div style={{
        padding: "18px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "20px 0",
        fontSize: 14.5, lineHeight: 1.65,
        fontFamily: "var(--font-body)", fontStyle: "italic",
        color: t.textSecondary,
      }}>
        Consider adding to your discussion instructions: &quot;When you
        insert an image, add alt text describing it. Click the image, then
        click Image Options to add a description.&quot;
      </div>

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Add alt text (new image)", "Insert image \u2192 Image Options tray \u2192 Alt Text field"],
        ["Edit alt text (existing)", "Click image \u2192 Image Options \u2192 update Alt Text field"],
        ["Mark as decorative", "Image Options tray \u2192 check \"Decorative Image\""],
        ["Check before publishing", "Rich Content Editor (RCE) toolbar \u2192 Accessibility Checker (person icon)"],
        ["HTML editor", "Click </> \u2192 edit alt attribute on <img> tag"],
        ["Ally error message", "Images must have alternate text description"],
        ["WCAG criterion", "1.1.1 Non-text Content (Level A)"],
        ["Ally severity", "Major"],
        ["Ally engine", "axe-core (image-alt)"],
        ["Known false positive", "Alt text length flagged in Rich Content Editor (RCE) but not in Word"],
      ]} />

      {/* ── Resources ── */}
      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Canvas Instructor Guide: Add Image Alt Tags"
        href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-alt-text-to-an-image-in-the-Rich-Content-Editor/ta-p/1157"
        description="Official Instructure documentation for adding alt text in the Rich Content Editor (RCE)"
      />
      <ResourceLink
        title="WebAIM Alternative Text Guide"
        href="https://webaim.org/techniques/alttext/"
        description="The definitive guide to writing alt text"
      />
      <ResourceLink
        title="W3C Images Tutorial"
        href="https://www.w3.org/WAI/tutorials/images/"
        description="Decision tree for choosing the right type of alt text"
      />
      <ResourceLink
        title="POET Training Tool"
        href="https://poet.diagramcenter.org/"
        description="Practice writing image descriptions with feedback"
      />
      <ResourceLink
        title="W3C: An alt Decision Tree"
        href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
        description="Step-by-step guide to deciding what kind of alt text an image needs"
      />
      <ResourceLink
        title="Deque: axe-core image-alt rule"
        href="https://dequeuniversity.com/rules/axe/4.10/image-alt"
        description="Technical documentation for the rule Ally uses to check image alt text"
      />
    </ContentPageLayout>
  );
}
