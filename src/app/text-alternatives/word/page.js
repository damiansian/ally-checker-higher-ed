"use client";
import { useTheme } from "@/components/theme";
import { ContentPageLayout } from "@/components/layout";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  Placeholder,
  RefTable,
  ResourceLink,
  Callout,
} from "@/components/content";

const tocSections = [
  { id: "ally-error", label: "The Ally Error" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "how-to-fix", label: "How to Fix It" },
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

export default function TextAlternativesWord() {
  const { t, dark } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="text-alternatives"
      fileTypeSlug="word"
      title="Text Alternatives"
      subtitle="Word Documents"
      tocSections={tocSections}
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Document has images without alt descriptions"
        severity="Major"
        wcag="1.1.1 Non-text Content (Level A)"
      />
      <P>
        This is the most common Ally error you will see. Every image in your Word
        document needs alternative text -- a short description that conveys the
        meaning of the image to someone who cannot see it. Screen readers read this
        text aloud. Without it, the student hears "image" and nothing else.
      </P>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        When a screen reader encounters an image without alt text, the student gets
        no information about what that image contains. Depending on the image, that
        ranges from a minor gap to a complete barrier:
      </P>
      <div style={{
        padding: "2px 0 2px 20px",
        borderLeft: `3px solid ${t.border}`,
        margin: "18px 0 18px 4px",
      }}>
        {[
          ["A decorative banner?", "Probably not a problem."],
          ["A diagram referenced in the next paragraph?", "The student just lost the thread of your content."],
          ["A screenshot of assignment instructions?", "The student cannot complete the assignment."],
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
        The impact depends entirely on the role the image plays in your content.
        That is exactly what alt text communicates: not what the image looks like,
        but what it means in context.
      </P>
      <Placeholder label="Screen reader audio: before (no alt text) and after (with alt text)" />

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding alt text to an image</H3>
      <Step number="1">Right-click the image.</Step>
      <Step number="2">Select <strong>Edit Alt Text</strong> (or <strong>View Alt Text</strong> in some versions).</Step>
      <Step number="3">The Alt Text pane opens on the right side of the screen.</Step>
      <Step number="4">Type your description in the text box.</Step>
      <Step number="5">Close the pane. The alt text is saved automatically.</Step>
      <Placeholder label="Screenshot: Alt Text pane in Word" />

      <H3>Marking an image as decorative</H3>
      <P>
        Not every image carries meaning. Borders, spacers, and purely decorative
        graphics should be marked as decorative so screen readers skip them entirely.
        A student does not need to hear "decorative blue line" twelve times in your
        syllabus.
      </P>
      <Step number="1">Right-click the image.</Step>
      <Step number="2">Select <strong>Edit Alt Text</strong>.</Step>
      <Step number="3">Check the box labeled <strong>Mark as decorative</strong>.</Step>
      <Placeholder label="Screenshot: Decorative checkbox in Alt Text pane" />

      <H3>What about "Generate a description for me"?</H3>
      <P>
        Word offers an AI-generated alt text option. It is a starting point, not a
        solution. The generated text describes what the image looks like ("a group of
        people standing in a room"), not what it means in your content ("Students
        presenting their final project at the Spring 2025 showcase"). Always review
        and rewrite AI-generated descriptions to reflect the purpose of the image in
        context.
      </P>

      {/* ── Writing Good Alt Text ── */}
      <SH id="writing-alt-text">Writing Good Alt Text</SH>
      <P>
        Alt text is not a caption. It is not a title. It is a functional replacement
        for the image. Write it as if you are describing the image to someone over the
        phone who needs the same information a sighted student gets by looking at it.
      </P>
      <div style={{ margin: "24px 0" }}>
        {[
          { rule: "Keep it concise.", detail: "One to two sentences for most images. If you need more, the image might need a long description." },
          { rule: "Describe function, not appearance.", detail: '"Bar chart showing enrollment increased 40% between 2020 and 2024" is useful. "Colorful bar chart" is not.' },
          { rule: "Match the context.", detail: "The same photo might need different alt text in different documents." },
          { rule: 'Skip "image of" or "picture of."', detail: "Screen readers already announce that the content is an image." },
          { rule: "Don't leave it blank.", detail: "If the image is decorative, mark it as decorative. If it carries meaning, describe it." },
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
        <AltTextExample image="Line graph in economics lecture" poor='"graph"' better="Line graph showing U.S. unemployment rate declining from 14.7% in April 2020 to 3.4% in January 2023" />
        <AltTextExample image="Photo of campus building on syllabus" poor='"building photo"' better="Mark as decorative (does not convey course content)" />
        <AltTextExample image="Screenshot of LMS assignment settings" poor='"screenshot"' better="Canvas assignment settings showing Due Date set to March 15 and Available Until set to March 22" />
        <AltTextExample image="Logo at top of department letterhead" poor='"logo"' better='Mark as decorative, or "Rutgers SCI logo" if identification matters in context' />
      </div>

      {/* ── Complex Images ── */}
      <SH id="complex-images">Complex Images</SH>
      <P>
        Some images carry too much information for a one-sentence description.
        Flowcharts, data visualizations, detailed diagrams, and infographics fall
        into this category. These need a long description in addition to brief alt
        text.
      </P>
      <Callout>
        <div style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 10, fontSize: 14 }}>
          The approach:
        </div>
        <Step number="1">
          Write short alt text that identifies the type and topic: "Flowchart of the
          IRB approval process. Full description below."
        </Step>
        <Step number="2">
          Provide the complete description in the document text immediately before or
          after the image. This benefits everyone, not just screen reader users.
        </Step>
      </Callout>
      <P>
        If you cannot provide the full description inline, you can link to a separate
        document or page. But inline is always better -- it keeps all students in the
        same content flow.
      </P>
      <Placeholder label="Example: complex image with short alt text and long description in document body" />

      {/* ── What Ally Catches ── */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        Ally checks whether alt text is <strong>present</strong>. Period. If the alt
        text field has any text in it, the image passes. This means:
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        "asdf" <span style={{ color: t.green }}>passes</span><br/>
        "image1.jpg" <span style={{ color: t.green }}>passes</span><br/>
        "TODO add alt text" <span style={{ color: t.green }}>passes</span><br/>
        A perfectly written description <span style={{ color: t.green }}>passes</span>
      </div>
      <P>
        Ally cannot evaluate whether your alt text is accurate, meaningful, or
        appropriate for the context. That is a human judgment call.
      </P>

      {/* ── What Ally Misses ── */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Presence of alt text across all file types. Any text in the alt text field counts as a pass."
        misses="Alt text quality, images of text, SmartArt/shape groups, chart alt text, and whether the description actually matches the image content."
      />
      {[
        { term: "Alt text quality", desc: "The most significant gap. Ally will give you a green score for descriptions that are useless to students." },
        { term: "Images of text", desc: "If you paste a screenshot of a text-heavy slide or email, Ally flags the missing alt text but does not flag that the image itself is a problem. The fix is usually to present the information as real text." },
        { term: "SmartArt and shape groups", desc: "Depending on how they are inserted, these may not trigger an Ally flag even when they lack alt text." },
        { term: "Chart alt text", desc: "Excel charts pasted into Word carry their own alt text field, separate from image alt text. Ally may or may not flag these depending on how they were inserted." },
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
      <div style={{
        padding: "20px 24px", borderRadius: 10,
        backgroundColor: t.surface, border: `1px solid ${t.border}`,
        margin: "0 0 20px",
      }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: t.text,
          fontFamily: "var(--font-display)", marginBottom: 4,
        }}>Microsoft Accessibility Checker</div>
        <div style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-display)", marginBottom: 12,
        }}>Review tab &rarr; Check Accessibility</div>
        <div style={{
          fontSize: 14.5, lineHeight: 1.65, color: t.textSecondary,
          fontFamily: "var(--font-body)",
        }}>
          Flags missing alt text (same as Ally), flags images of text as a separate
          issue (Ally does not do this in Word), and suggests AI-generated alt text
          with a prompt to review. Runs locally so you get instant feedback while
          editing. This is the tool to run before you upload to your LMS.
        </div>
      </div>
      <Placeholder label="Screenshot: Microsoft Accessibility Checker results in Word" />

      {/* ── The Student Side ── */}
      <SH id="student-side">The Student Side</SH>
      <P>
        This is not just about your course materials. Students upload Word documents
        too: papers, reports, group projects, resumes. If a student includes images in
        their submission and does not add alt text, those images are inaccessible to
        classmates, peer reviewers, and group members who use screen readers.
      </P>
      <P>
        Ally scans student submissions the same way it scans instructor content.
        Teaching your students to add alt text to their own documents is an inclusive
        practice that extends beyond your course.
      </P>
      <div style={{
        padding: "18px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "20px 0",
        fontSize: 14.5, lineHeight: 1.65,
        fontFamily: "var(--font-body)", fontStyle: "italic",
        color: t.textSecondary,
      }}>
        Consider adding to your assignment instructions: "All images in your
        submission should include alt text. Right-click any image and select Edit Alt
        Text to add a description."
      </div>

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Add alt text", "Right-click image \u2192 Edit Alt Text \u2192 type description"],
        ["Mark as decorative", "Right-click image \u2192 Edit Alt Text \u2192 check \"Mark as decorative\""],
        ["Check before uploading", "Review tab \u2192 Check Accessibility"],
        ["Ally error message", "\"Document has images without alt descriptions\""],
        ["WCAG criterion", "1.1.1 Non-text Content (Level A)"],
        ["Ally severity", "Major"],
      ]} />

      {/* ── Resources ── */}
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
      <ResourceLink
        title="Microsoft: Add alternative text"
        href="https://support.microsoft.com/en-us/office/add-alternative-text-to-a-shape-picture-chart-smartart-graphic-or-other-object-44989b2a-903c-4d9a-b742-6a75b451c669"
        description="Official documentation for alt text in Office"
      />
    </ContentPageLayout>
  );
}
