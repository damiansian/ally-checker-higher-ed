import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
  CheckerComparisonTable,
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

function AudioDemo({ src, label, transcriptSummary, transcriptContent }) {
  const { t } = useTheme();
  const hasTranscript = transcriptSummary != null && transcriptContent != null;
  return (
    <div style={{ marginBottom: 24 }}>
      <audio
        controls
        src={src}
        aria-label={label}
        style={{
          width: "100%",
          maxWidth: 420,
          height: 40,
          marginTop: 8,
        }}
      >
        <track kind="captions" />
        <a href={src} download>Download audio</a>
      </audio>
      {hasTranscript && (
        <details
          style={{
            marginTop: 12,
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            backgroundColor: t.surfaceAlt,
            overflow: "hidden",
          }}
        >
          <summary
            style={{
              padding: "10px 14px",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              color: t.text,
              cursor: "pointer",
            }}
          >
            <span style={{ userSelect: "none" }}>{transcriptSummary}</span>
          </summary>
          <div
            style={{
              padding: "12px 14px 16px",
              borderTop: `1px solid ${t.border}`,
              fontSize: 14,
              lineHeight: 1.6,
              color: t.textSecondary,
              fontFamily: "var(--font-body)",
            }}
          >
            {transcriptContent}
          </div>
        </details>
      )}
    </div>
  );
}

export default function TextAlternativesOverviewPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="text-alternatives"
      fileTypeSlug="overview"
      title="Text Alternatives"
      subtitle="Overview"
    >
      {/* \u2500\u2500 Overview \u2500\u2500 */}
      <SH id="overview">Overview</SH>
      <P>
        Images, graphics, and non-text content need text descriptions so screen
        readers can convey meaning to students who cannot see them. This is the
        most common Ally error across all file types: every image needs
        alternative text that describes its meaning in context.
      </P>
      <P>
        This category covers WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" target="_blank" rel="noopener noreferrer">1.1.1 Non-text Content</a> (Level A). Ally
        checks for alt text in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>,{" "}
        <strong>Canvas</strong>, and <strong>Image</strong> files. The pages
        in this section walk through each file type with specific instructions,
        screenshots, and testing results.
      </P>
      <Callout type="info">
        Text alternatives is the highest-impact, highest-likelihood category.
        If you fix one thing across your courses, this should be it.
      </Callout>

      {/* \u2500\u2500 Ally Error Messages \u2500\u2500 */}
      <SH id="ally-errors">Ally Error Messages</SH>
      <P>
        Ally reports slightly different error messages depending on the file
        type, but the underlying issue is always the same: an image is missing
        alt text.
      </P>
      <AllyErrorBox
        message="Document has images without alt descriptions"
        severity="Major"
        wcag="1.1.1 Non-text Content (Level A)"
      />
      <div className="error-msg-list code-style-block" style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2.2, color: t.textSecondary,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 110, fontWeight: 600, color: t.text }}>Word</span>
          <span>&ldquo;Document has images without alt descriptions&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 110, fontWeight: 600, color: t.text }}>PowerPoint</span>
          <span>&ldquo;Presentation has images without alt descriptions&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 110, fontWeight: 600, color: t.text }}>PDF</span>
          <span>&ldquo;PDF has images without alternative descriptions&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 110, fontWeight: 600, color: t.text }}>Canvas</span>
          <span>&ldquo;Images must have alternate text description&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 110, fontWeight: 600, color: t.text }}>Image</span>
          <span>&ldquo;Image does not have alternative description&rdquo;</span>
        </div>
      </div>

      {/* \u2500\u2500 Hear the Difference \u2500\u2500 */}
      <SH id="hear-the-difference">Hear the Difference</SH>
      <P>
        The impact of missing alt text is best understood by hearing it. These
        screen reader recordings demonstrate the difference between an image
        with and without alt text in a Word document.
      </P>

      <H3>Before: no alt text</H3>
      <P>
        Without alt text, the screen reader has nothing meaningful to announce.
        The student hears the file name instead of a description.
      </P>
      <AudioDemo
        src="/audio/word-alt-text-before.wav"
        label="Screen reader announcing an image with no alt text"
        transcriptSummary="Show transcript"
        transcriptContent={
          <p style={{ margin: 0 }}>&quot;Graphic. IMG_3847.png.&quot;</p>
        }
      />

      <H3>After: with alt text</H3>
      <P>
        With alt text in place, the screen reader reads the full description.
        The student gets the same information a sighted student gets by looking
        at the chart.
      </P>
      <AudioDemo
        src="/audio/word-alt-text-after.wav"
        label="Screen reader reading image alt text describing a bar chart"
        transcriptSummary="Show transcript"
        transcriptContent={
          <p style={{ margin: 0 }}>
            &quot;Grouped bar graph comparing Quiz 1 and Quiz 2 averages across
            three sections. Section 1: 85% and 82%. Section 2: 83% and 81%.
            Section 3: 85% and 82%.&quot;
          </p>
        }
      />

      {/* \u2500\u2500 Results by File Type \u2500\u2500 */}
      <SH id="results-by-type">Results by File Type</SH>
      <P>
        Ally reliably detects missing alt text across all five file types. The
        check is straightforward: does the image have any text in the alt text
        field? The table below summarizes Ally&apos;s detection for each.
      </P>
      {[
        {
          type: "Word",
          slug: "word",
          status: "Checked",
          statusColor: "green",
          detail: "Ally flags images without alt text. Any non-empty alt text passes, regardless of quality. SmartArt, shape groups, and pasted Excel charts may not trigger a flag depending on how they are inserted.",
        },
        {
          type: "PowerPoint",
          slug: "powerpoint",
          status: "Checked",
          statusColor: "green",
          detail: "Ally flags images and graphics without alt text in slides. The same quality gap applies: placeholder text like \"asdf\" passes. Decorative images should be marked as decorative in the alt text pane.",
        },
        {
          type: "PDF",
          slug: "pdf",
          status: "Checked",
          statusColor: "green",
          detail: "Ally flags images missing alt text in the PDF tag structure. PDFs require Adobe Acrobat Pro to add or edit alt text on individual images within the tags panel.",
        },
        {
          type: "Canvas",
          slug: "canvas",
          status: "Checked",
          statusColor: "green",
          detail: "Ally uses axe-core to check images in the Rich Content Editor (RCE). The check fires on the rendered HTML. Canvas also has a built-in Accessibility Checker that catches missing alt text before you save.",
        },
        {
          type: "Image",
          slug: "image",
          status: "Checked",
          statusColor: "green",
          detail: "Standalone image files (JPEG, PNG, etc.) uploaded directly to the LMS. Ally flags the file itself as missing a description since image files have no inherent alt text.",
        },
      ].map((item, i) => (
        <div key={i} style={{
          padding: "20px 24px", borderRadius: 10,
          backgroundColor: t.surface, border: `1px solid ${t.border}`,
          marginBottom: 14,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 8,
          }}>
            <a
              href={`/text-alternatives/${item.slug}`}
              style={{
                fontSize: 16, fontWeight: 700, color: t.link,
                fontFamily: "var(--font-display)",
                textDecoration: "none",
              }}
            >
              {item.type} &rarr;
            </a>
            <span style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              backgroundColor: t.greenBg,
              color: t.green,
              border: `1px solid ${t.greenBorder}`,
            }}>
              {item.status}
            </span>
          </div>
          <div style={{
            fontSize: 14.5, lineHeight: 1.65, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>
            {item.detail}
          </div>
        </div>
      ))}

      {/* \u2500\u2500 Checker detection: Images (example) \u2500\u2500 */}
      <SH id="checker-detection-images">Checker Detection: Images (example)</SH>
      <P>
        The table below shows whether each checker detects specific
        image issues. <strong>Ally</strong>, <strong>MS Office</strong>, and{" "}
        <strong>Acrobat</strong> apply to documents (Word, PowerPoint, PDF).
      </P>
      <CheckerComparisonTable
        caption="Images: type of test vs. detection by checker"
        rows={[
          { testType: "No text alternative", ally: "Checked", msOffice: "Checked", acrobat: "Checked" },
          { testType: "AI-generated text alternative", ally: "Not checked", msOffice: "Checked", acrobat: "Not checked" },
          { testType: "Should be decorative (divider line)", ally: "Not checked", msOffice: "Not checked", acrobat: "Not checked" },
          { testType: "Vague alt text (2026 sales chart)", ally: "Not checked", msOffice: "Not checked", acrobat: "Not checked" },
          { testType: "Dense alt text (>120 char)", ally: "False positive", msOffice: "n/a", acrobat: "n/a" },
          { testType: "File name as alt text (logo.png)", ally: "Checked", msOffice: "Checked", acrobat: "Not checked" },
          { testType: "Gibberish (alskjshdsflh)", ally: "Not checked", msOffice: "Not checked", acrobat: "Not checked" },
          { testType: "Placeholder (image)", ally: "Not checked", msOffice: "Not checked", acrobat: "Not checked" },
        ]}
      />

      {/* \u2500\u2500 False Positive \u2500\u2500 */}
      <SH id="false-positive">False Positive</SH>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Alt text character length flag in Canvas
        </div>
        When you add alt text to an image in the Canvas Rich Content Editor
        (RCE), Ally flags descriptions over approximately 120 characters.
        Neither HTML nor WCAG defines character limits for alt text. This is a
        false positive.
      </Callout>
      <P>
        The same alt text that passes in a Word document gets flagged when the
        image is uploaded directly in Canvas. There is no WCAG basis for a
        character limit on alt text. Conciseness is a best practice, but some
        images (charts, data visualizations, complex diagrams) need longer
        descriptions to convey the data.
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        Same alt text in Word <span style={{ color: t.green }}>passes</span><br />
        Same alt text in Canvas RCE <span style={{ color: t.accent }}>flagged</span> &mdash; incorrectly
      </div>
      <P>
        If you encounter this flag, do not shorten your alt text to appease
        the tool. Write the description the image needs. If Ally flags it,
        the flag is wrong &mdash; not your alt text. See the{" "}
        <a href="/text-alternatives/canvas#false-positive" style={{ color: t.link, textDecoration: "underline" }}>
          Canvas page
        </a>{" "}
        for the full analysis.
      </P>

      {/* \u2500\u2500 What Ally Catches \u2500\u2500 */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        Across all file types, Ally&apos;s alt text check works the same way:
        it looks for the presence of any text in the alt text field. If the
        field has any content at all, the image passes.
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        &quot;asdf&quot; <span style={{ color: t.green }}>passes</span><br/>
        &quot;image1.jpg&quot; <span style={{ color: t.accent }}>fails</span><br/>
        &quot;TODO add alt text&quot; <span style={{ color: t.green }}>passes</span><br/>
        A perfectly written description <span style={{ color: t.green }}>passes</span><br/>
        Programmatically marked decorative <span style={{ color: t.green }}>passes</span><br/>
        No alt text entered <span style={{ color: t.accent }}>fails</span>
      </div>

      {/* \u2500\u2500 What Ally Misses \u2500\u2500 */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Presence of alt text across all file types. Any text in the alt text field counts as a pass."
        misses="Alt text quality, whether the description is meaningful or accurate, images of text, SmartArt/shape groups, chart alt text, and whether an image should be decorative."
      />
      {[
        {
          term: "Alt text quality",
          desc: "The most significant gap across all file types. Ally gives a green score for descriptions that are useless to students. There is no quality check.",
        },
        {
          term: "Images of text",
          desc: "If you paste a screenshot of text-heavy content, Ally flags the missing alt text but does not flag that the image itself is a problem. The fix is usually to present the information as real text.",
        },
        {
          term: "Decorative images",
          desc: "Ally does not know whether an image is decorative or informational. It only checks if alt text exists. Authors must decide which images need descriptions and which should be marked decorative.",
        },
        {
          term: "Alt text length (Canvas only)",
          desc: "Ally incorrectly flags alt text over ~120 characters in the Canvas Rich Content Editor, but not in Word or other formats. This is a false positive with no WCAG basis.",
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

      {/* \u2500\u2500 Quick Reference \u2500\u2500 */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "3 checks across all file types"],
        ["Ally severity", "Major"],
        ["WCAG criterion", "1.1.1 Non-text Content (Level A)"],
        ["Likelihood", "5 / 5 \u2014 the most common error"],
        ["Impact", "5 / 5 \u2014 complete barrier for screen reader users"],
        ["File types", "Word, PowerPoint, PDF, Canvas, Image"],
        ["Ally detection", "Reliable for presence; does not check quality"],
        ["Known false positive", "Alt text length in Canvas RCE"],
      ]} />

      {/* \u2500\u2500 Resources \u2500\u2500 */}
      <SH id="resources">Resources</SH>
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
    </ContentPageLayout>
  );
}
