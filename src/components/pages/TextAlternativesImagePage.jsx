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

export default function TextAlternativesImagePage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="text-alternatives"
      fileTypeSlug="image"
      title="Text Alternatives"
      subtitle="Image Files in Canvas Files"
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Image does not have alternative description"
        severity="Major"
        wcag="1.1.1 Non-text Content (Level A)"
      />
      <P>
        When you upload a standalone image file (PNG, JPG, GIF, etc.) to your
        Canvas course Files, Ally scans it and flags it if the image has no
        description. Unlike images embedded in a Word document or the Rich
        Content Editor, these are raw image files sitting in your course file
        repository -- there is no surrounding document to provide context. The
        description must be added through Ally&apos;s own interface.
      </P>

      {/* ── Which Images? ── */}
      <SH id="which-images">Which Images Does This Apply To?</SH>
      <Callout>
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 10, fontSize: "var(--fs-sm)",
        }}>
          This page covers image files uploaded directly to Canvas Files
        </div>
        This applies to standalone image files (PNG, JPG, GIF, SVG, etc.)
        uploaded to your course&apos;s Files area in Canvas. These are the
        image files that appear in your file repository and show up in the Ally
        accessibility report as individual items.
      </Callout>
      <P>
        If you are embedding images <em>inside</em> the Canvas Rich Content
        Editor -- for example, inserting a photo into a page, assignment, or
        discussion -- that is a different workflow.{" "}
        <a
          href="/text-alternatives/canvas"
          style={{
            color: t.accent,
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          See the Canvas editor entry for how to add alt text in the Rich
          Content Editor (RCE).
        </a>
      </P>
      <P>
        The distinction matters because the fix is different. In the RCE, you
        add alt text through the image options tray while editing your page. For
        standalone image files in the Files repository, you add a description
        through Ally&apos;s file-level interface.
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        Image in Canvas Files &rarr; <strong>fix through Ally (this page)</strong><br />
        Image in the Rich Content Editor &rarr;{" "}
        <a
          href="/text-alternatives/canvas"
          style={{ color: t.accent }}
        >
          fix through Image Options in the RCE
        </a>
      </div>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        Image files in Canvas Files are often used as attachments, linked from
        modules, or referenced in course content. When a student using a screen
        reader encounters a linked image file, they get no information about
        what the image contains unless a description has been added. They may
        hear the file name -- which is often something
        like <code style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>IMG_4392.jpg</code> or <code style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "1px 6px", borderRadius: 3,
        }}>ppt-decoration.png</code>.
      </P>
      <P>
        Standalone image files also affect your course&apos;s overall Ally
        accessibility score. Each image without a description counts as a
        separate item with an accessibility issue, which can significantly
        lower your course-level score -- even if every page and document in
        your course is fully accessible.
      </P>

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>
      <P>
        Ally provides its own interface for adding descriptions to standalone
        image files. You do not need to download and re-upload the image -- you
        can add the description directly in Canvas.
      </P>

      <H3>Adding a description to an image file</H3>
      <Step number="1">
        Navigate to <strong>Files</strong> in your Canvas course, or open the
        Ally accessibility report and click on the flagged image.
      </Step>
      <Step number="2">
        Click the Ally score indicator next to the image file. The Ally
        feedback panel opens.
      </Step>
      <Step number="3">
        In the <strong>Add image description</strong> field, type a description
        that conveys the meaning of the image.
      </Step>
      <Step number="4">Click <strong>Add</strong> to save the description.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/ally-image-file-no-description.png"
          alt="Ally accessibility score panel for a file named ppt-decoration.png showing a 4% score. The heading reads This file is missing a description. Below are buttons for What this means and How to write a good description, an Add description text field with placeholder text Enter a brief description, an Add button, an Auto-generate description button, and an Indicate decorative button at the bottom."
          width={390}
          height={780}
          style={{
            maxWidth: 390,
            width: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Ally panel for an image file with no description, showing a 4%
          accessibility score
        </figcaption>
      </figure>

      <H3>Editing an existing description</H3>
      <P>
        If the image already has a description but Ally is still flagging it --
        for example, because the description is a file name -- you can edit it
        in the same panel.
      </P>
      <Step number="1">Open the Ally feedback panel for the image.</Step>
      <Step number="2">
        The current description appears in the <strong>Edit image
        description</strong> field. Update it with a meaningful description.
      </Step>
      <Step number="3">Click <strong>Save</strong>.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/ally-image-file-edit-description.png"
          alt="Ally accessibility score panel showing a 75% score. The heading reads This item contains graphics without description, with a What this means button. Below is an Edit description field containing the text Chart-quiz-avg.png, a Save button, and an info message reading The description can't be a file name. Below that are Auto-generate description and Remove description buttons, followed by an Indicate decorative button."
          width={390}
          height={830}
          style={{
            maxWidth: 390,
            width: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          Ally flags a file name used as a description and prompts you to
          replace it
        </figcaption>
      </figure>

      <H3>Marking an image as decorative</H3>
      <P>
        If the image is purely decorative and does not convey meaningful
        content -- a background texture, a divider line, a decorative icon --
        click <strong>Indicate image is decorative</strong> at the bottom of the
        Ally panel. This tells Ally the image does not need a description,
        and it will no longer be flagged.
      </P>

      <H3>Auto-generate description</H3>
      <P>
        Ally offers an <strong>Auto-generate description</strong> button that
        uses AI to create a description. Like Word&apos;s and
        PowerPoint&apos;s auto-generated alt text, this is a starting point --
        not a final answer. AI describes what the image looks like, not what
        it means in your course. Always review and rewrite auto-generated
        descriptions.
      </P>

      {/* ── Writing Good Alt Text ── */}
      <SH id="writing-alt-text">Writing Good Alt Text</SH>
      <P>
        The same principles apply here as in any other format. The description
        is a functional replacement for the image -- not a caption, not a
        title, not a file name. Write it as if you are describing the image to
        someone over the phone who needs the same information a sighted student
        gets by looking at it.
      </P>
      <div style={{ margin: "24px 0" }}>
        {[
          { rule: "Keep it concise.", detail: "One to two sentences for most images. If the image carries complex data (charts, diagrams), write a longer description that conveys the key information." },
          { rule: "Describe function, not appearance.", detail: "\"Bar chart showing enrollment increased 40% between 2020 and 2024\" is useful. \"Colorful bar chart\" is not." },
          { rule: "Match the context.", detail: "Think about how this image is used in your course. A chart linked from an assignment needs the data described. A banner image might be decorative." },
          { rule: "Skip \"image of\" or \"picture of.\"", detail: "Screen readers already announce that the content is an image." },
          { rule: "Don't leave it blank.", detail: "If the image is decorative, mark it as decorative in Ally. If it carries meaning, describe it. Ally specifically rejects file names as descriptions." },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "14px 18px",
            backgroundColor: i % 2 === 0 ? t.surfaceAlt : "transparent",
            borderRadius: 8, marginBottom: 2,
          }}>
            <div style={{
              fontSize: "var(--fs-base)", fontWeight: 600, color: t.text,
              fontFamily: "var(--font-display)", marginBottom: 4,
            }}>{item.rule}</div>
            <div style={{
              fontSize: "var(--fs-base)", color: t.textSecondary, lineHeight: 1.6,
              fontFamily: "var(--font-body)",
            }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <Callout>
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Consider whether the file should be in Files at all
        </div>
        If a standalone image file is only used because it is embedded in a
        Canvas page or assignment, the image description should be handled
        in the Rich Content Editor -- not on the file itself.{" "}
        <a
          href="/text-alternatives/canvas"
          style={{
            color: t.accent,
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          See the Canvas editor entry.
        </a>{" "}
        Ally may flag both the standalone file and the embedded usage
        separately.
      </Callout>

      {/* ── What Ally Catches ── */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        For standalone image files, Ally checks whether a description has been
        provided. It also validates the quality of that description more
        aggressively than it does for images inside documents:
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        No description <span style={{ color: t.accent }}>fails</span><br />
        File name as description <span style={{ color: t.accent }}>fails</span><br />
        &quot;asdf&quot; <span style={{ color: t.green }}>passes</span><br />
        A meaningful description <span style={{ color: t.green }}>passes</span><br />
        Marked as decorative <span style={{ color: t.green }}>passes</span>
      </div>
      <P>
        Notably, Ally <em>does</em> reject file names as descriptions for
        standalone image files -- unlike images embedded in the Rich Content
        Editor, where a file name used as alt text may not always be caught.
        This is one of the stricter checks Ally performs.
      </P>

      {/* ── What Ally Misses ── */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Missing descriptions, file names used as descriptions, and provides an interface to add descriptions or mark images as decorative."
        misses="Description quality beyond file name detection. A vague or inaccurate description passes. Whether the image should be decorative. Whether the image is even needed as a standalone file."
      />
      {[
        {
          term: "Description quality",
          desc: "Beyond rejecting file names, Ally does not evaluate whether the description is meaningful or accurate. A description like \"a chart\" passes even if the image contains critical data that should be described in detail.",
        },
        {
          term: "Decorative vs. meaningful",
          desc: "Ally cannot determine whether an image is decorative or carries content. It is up to you to decide whether the image needs a description or should be marked as decorative.",
        },
        {
          term: "Duplicate checking",
          desc: "If the same image exists as a standalone file and is also embedded in a Canvas page, Ally flags both separately. Fixing one does not fix the other.",
        },
        {
          term: "Context awareness",
          desc: "Ally does not know how the image is used in your course. A chart in your Files might be linked from an assignment, referenced in a module, or unused entirely. The description needs to account for the context you intend, which Ally cannot infer.",
        },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: "var(--fs-base)", fontWeight: 700, color: t.text,
            fontFamily: "var(--font-display)", marginBottom: 4,
          }}>{item.term}</div>
          <div style={{
            fontSize: "var(--fs-base)", lineHeight: 1.7, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>{item.desc}</div>
        </div>
      ))}

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Add description", "Click Ally score \u2192 Add image description \u2192 type description \u2192 Add"],
        ["Edit description", "Click Ally score \u2192 Edit image description \u2192 update text \u2192 Save"],
        ["Mark as decorative", "Click Ally score \u2192 Indicate image is decorative"],
        ["Auto-generate", "Click Ally score \u2192 Auto-generate description (review before saving)"],
        ["Images in the RCE", "See Text Alternatives \u2192 Canvas editor entry"],
        ["Ally error message", "Image does not have alternative description"],
        ["WCAG criterion", "1.1.1 Non-text Content (Level A)"],
        ["Ally severity", "Major"],
      ]} />

      {/* ── Resources ── */}
      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Text Alternatives: Canvas Rich Content Editor"
        href="/text-alternatives/canvas"
        description="How to add alt text to images embedded in Canvas pages, assignments, and discussions using the Rich Content Editor"
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
        title="W3C: An alt Decision Tree"
        href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
        description="Step-by-step guide to deciding what kind of alt text an image needs"
      />
      <ResourceLink
        title="POET Training Tool"
        href="https://poet.diagramcenter.org/"
        description="Practice writing image descriptions with feedback"
      />
    </ContentPageLayout>
  );
}
