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

export default function TextAlternativesPdf() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="text-alternatives"
      fileTypeSlug="pdf"
      title="Text Alternatives"
      subtitle="PDF Documents"
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="PDF has images without alternative descriptions"
        severity="Major"
        wcag="1.1.1 Non-text Content (Level A)"
      />
      <P>
        When Ally scans a PDF and finds images without alt text, it flags this
        error. Every meaningful image in your PDF needs alternative text so
        screen readers can describe it to students who cannot see it. Without
        alt text, the student hears nothing -- or at best, a meaningless tag
        name like &quot;Figure 1.&quot;
      </P>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        PDFs are one of the most common file types uploaded to an LMS. Syllabi,
        handouts, journal articles, flyers, and reports all end up as PDFs. When
        these documents contain images without alt text, screen reader users get
        no information about what those images contain.
      </P>
      <div style={{
        padding: "2px 0 2px 20px",
        borderLeft: `3px solid ${t.border}`,
        margin: "18px 0 18px 4px",
      }}>
        {[
          ["A department logo on a letterhead?", "Annoying but not a barrier."],
          ["A chart referenced in the surrounding text?", "The student loses the thread of the argument."],
          ["A scanned form with instructions?", "The student cannot complete the task at all."],
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
        Unlike Word or PowerPoint, you cannot simply right-click an image in a
        PDF viewer and add alt text. Fixing PDFs requires Adobe Acrobat Pro (or
        a similar tool). This makes it especially important to add alt text in
        the source document <em>before</em> exporting to PDF.
      </P>

      <H3>Before: no alt text</H3>
      <P>
        Without alt text, the screen reader has nothing meaningful to announce.
        Depending on the reader, the student hears &quot;graphic&quot; followed
        by the embedded file name -- giving them no useful information about the
        image.
      </P>
      <AudioDemo
        src="/audio/pdf-alt-text-before.wav"
        label="Screen reader announcing a PDF image with no alt text"
        transcriptSummary="Show transcript"
        transcriptContent={
          <p style={{ margin: 0 }}>&quot;Graphic. IMG_3847.png.&quot;</p>
        }
      />

      <H3>After: with alt text</H3>
      <P>
        With alt text in place, the screen reader reads the full description.
        The student gets the same information a sighted student gets by looking
        at the image.
      </P>
      <AudioDemo
        src="/audio/pdf-alt-text-after.wav"
        label="Screen reader reading image alt text in a PDF"
        transcriptSummary="Show transcript"
        transcriptContent={
          <p style={{ margin: 0 }}>
            &quot;Grouped bar graph comparing Quiz 1 and Quiz 2 averages across
            three sections. Section 1: 85% and 82%. Section 2: 83% and 81%.
            Section 3: 85% and 82%.&quot;
          </p>
        }
      />

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>

      <H3>Best approach: fix in the source document</H3>
      <P>
        If you still have the original Word, PowerPoint, or InDesign file, add
        alt text there and re-export to PDF. Alt text set in the source
        application carries over into the PDF. This is almost always easier than
        editing the PDF directly.
      </P>

      <H3>Using the Acrobat Accessibility Checker</H3>
      <P>
        If the source file is not available, use Adobe Acrobat Pro&apos;s
        built-in Accessibility Checker to find and fix missing alt text.
      </P>
      <Step number="1">
        Open the PDF in <strong>Adobe Acrobat Pro</strong>.
      </Step>
      <Step number="2">
        Go to <strong>All tools &rarr; Prepare for accessibility</strong> (or{" "}
        <strong>Accessibility</strong> in older versions).
      </Step>
      <Step number="3">
        Select <strong>Check for accessibility</strong>. The Accessibility
        Checker Options dialog opens.
      </Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-accessibility-checker-options.png"
          alt="Screenshot of the Accessibility Checker Options dialog in Adobe Acrobat Pro. Report Options at top shows Create accessibility report checked. Page Range is set to All pages in document. Checking Options shows 31 of 32 in all categories with the Document category selected, listing checks for Accessibility permission flag, Document is not image-only PDF, Document is tagged PDF, Document structure provides a logical reading order, Text language is specified, Document title is showing in title bar, Bookmarks are present in large documents, and Document has appropriate color contrast. Start Checking button is at bottom right."
          width={480}
          height={520}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-body)",
          marginTop: 10, lineHeight: 1.5,
        }}>
          The Accessibility Checker Options dialog with default checking options
        </figcaption>
      </figure>
      <Step number="4">
        Click <strong>Start Checking</strong>. The results appear in the left
        panel.
      </Step>
      <Step number="5">
        Expand <strong>Alternate Text</strong>. Failed items appear beneath it.
      </Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-checker-alt-text-failed.png"
          alt="Screenshot of the Accessibility Checker results panel showing Alternate Text with 1 issue. Beneath it, Figures alternate text is marked Failed with a red X icon, and Figure 1 is listed below."
          width={260}
          height={80}
          style={{
            maxWidth: 260,
            width: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-body)",
          marginTop: 10, lineHeight: 1.5,
        }}>
          The checker flags images without alt text under Alternate Text
        </figcaption>
      </figure>
      <Step number="6">
        Right-click the failed item and select <strong>Fix</strong>.
      </Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-checker-fix-context-menu.png"
          alt="Screenshot of a context menu in the Accessibility Checker results. Options include Fix, Skip Rule, Explain, Show in Content Panel, Show in Tags Panel, Check Again, Show Report, and Options."
          width={180}
          height={200}
          style={{
            maxWidth: 180,
            width: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-body)",
          marginTop: 10, lineHeight: 1.5,
        }}>
          Right-click a failed item and choose Fix
        </figcaption>
      </figure>
      <Step number="7">
        The <strong>Set Alternate Text</strong> dialog opens. Type your
        description in the text field, or check <strong>Decorative
        figure</strong> if the image is purely decorative.
      </Step>
      <Step number="8">
        Click <strong>Save &amp; Close</strong>.
      </Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-set-alternate-text.png"
          alt="Screenshot of the Set Alternate Text dialog in Adobe Acrobat Pro. It shows Item 1 of 1 with navigation arrows, an Alternate text label, a Decorative figure checkbox, and a text field containing Rutgers The State University of New Jersey logo. Save and Close and Cancel buttons are at the bottom."
          width={320}
          height={240}
          style={{
            maxWidth: 320,
            width: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-body)",
          marginTop: 10, lineHeight: 1.5,
        }}>
          Type a description or mark as decorative, then Save &amp; Close
        </figcaption>
      </figure>

      <H3>Using the Tags panel directly</H3>
      <P>
        You can also add alt text through the Tags panel without running the
        full checker. This is useful when you know exactly which image needs
        fixing.
      </P>
      <Step number="1">
        Open the PDF in <strong>Adobe Acrobat Pro</strong>.
      </Step>
      <Step number="2">
        Open the Tags panel: <strong>View &rarr; Show/Hide &rarr; Navigation
        Panes &rarr; Tags</strong>.
      </Step>
      <Step number="3">
        Find the <strong>&lt;Figure&gt;</strong> tag for the image. You can
        click the image on the page, then use <strong>Find Tag from
        Selection</strong> in the Tags panel options.
      </Step>
      <Step number="4">
        Right-click the <strong>&lt;Figure&gt;</strong> tag and
        select <strong>Properties</strong>.
      </Step>
      <Step number="5">
        In the <strong>Object Properties</strong> dialog, type your description
        in the <strong>Alternate Text</strong> field.
      </Step>
      <Step number="6">
        Click <strong>Close</strong>. The alt text is saved.
      </Step>

      <H3>Marking an image as decorative (artifact)</H3>
      <P>
        In PDF accessibility, a decorative image is converted to
        an <em>artifact</em>. Artifacts are ignored by screen readers entirely.
        Use this for logos in repeated headers, decorative borders, and
        background graphics.
      </P>
      <Callout>
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Two ways to mark as decorative
        </div>
        <div style={{
          fontSize: 14.5, lineHeight: 1.65,
          fontFamily: "var(--font-body)",
        }}>
          <strong>From the checker:</strong> Check the <strong>Decorative
          figure</strong> box in the Set Alternate Text dialog instead of
          typing a description.
          <br /><br />
          <strong>From the Tags panel:</strong> Right-click
          the <strong>&lt;Figure&gt;</strong> tag &rarr; <strong>Change Tag to
          Artifact</strong>. The tag is removed from the document structure and
          the image becomes invisible to assistive technology.
        </div>
      </Callout>

      {/* ── Writing Good Alt Text ── */}
      <SH id="writing-alt-text">Writing Good Alt Text</SH>
      <P>
        The same principles apply regardless of file format. Alt text is a
        functional replacement for the image -- not a caption, not a title. Write
        it as if you are describing the image to someone over the phone who needs
        the same information a sighted student gets by looking at it.
      </P>
      <div style={{ margin: "24px 0" }}>
        {[
          { rule: "Keep it concise.", detail: "One to two sentences for most images. If you need more, the image might need a long description." },
          { rule: "Describe function, not appearance.", detail: "\"Bar chart showing enrollment increased 40% between 2020 and 2024\" is useful. \"Colorful bar chart\" is not." },
          { rule: "Match the context.", detail: "The same photo might need different alt text in different documents." },
          { rule: "Skip \"image of\" or \"picture of.\"", detail: "Screen readers already announce that the content is an image." },
          { rule: "Don't leave it blank.", detail: "If the image is decorative, mark it as an artifact. If it carries meaning, describe it." },
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
        <AltTextExample image="University logo on a PDF flyer" poor='"logo"' better="Rutgers The State University of New Jersey logo" />
        <AltTextExample image="Line graph in a journal article" poor='"graph"' better="Line graph showing U.S. unemployment rate declining from 14.7% in April 2020 to 3.4% in January 2023" />
        <AltTextExample image="Decorative header graphic" poor='"banner image"' better="Mark as artifact (decorative -- does not convey content)" />
        <AltTextExample image="Screenshot of assignment instructions" poor='"screenshot"' better="Canvas assignment settings showing Due Date set to March 15 and Available Until set to March 22" />
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
          Write short alt text that identifies the type and topic: &quot;Flowchart of the
          IRB approval process. Full description below.&quot;
        </Step>
        <Step number="2">
          Provide the complete description in the document text immediately before or
          after the image. This benefits everyone, not just screen reader users.
        </Step>
      </Callout>
      <P>
        In PDFs, long descriptions can also be added to the <strong>Description</strong>{" "}
        field in the tag&apos;s Object Properties dialog (separate from Alternate
        Text). However, not all screen readers consistently read this field, so
        providing the description in the visible document text is more reliable.
      </P>

      {/* ── What Ally Catches ── */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        When Ally scans a PDF, the primary check is whether each figure tag
        has alt text. If the figure has any alt text at all, it passes:
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

      {/* ── What Ally Misses ── */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Presence of alt text on figure tags in the PDF. Any text in the alt text attribute counts as a pass."
        misses="Alt text quality, untagged images (artifacts that should be figures), images of text, whether the PDF is tagged at all, and whether the description matches the image."
      />
      {[
        { term: "Alt text quality", desc: "The most significant gap. Ally gives a green score for descriptions that are useless to students." },
        { term: "Untagged PDFs", desc: "If the PDF is not tagged at all, Ally flags the missing tags as a separate issue but may not separately flag missing alt text on images within an untagged document." },
        { term: "Images of text", desc: "Scanned pages or screenshots of text-heavy content are flagged for missing alt text, but the real fix is to provide the information as actual text. Alt text alone cannot replace a full page of scanned content." },
        { term: "Artifacts vs. figures", desc: "If a meaningful image was incorrectly marked as an artifact (decorative), it disappears from the tag tree entirely. Ally will not flag it because there is no figure tag to check." },
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
        margin: "0 0 14px",
      }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: t.text,
          fontFamily: "var(--font-display)", marginBottom: 4,
        }}>Adobe Acrobat Pro Accessibility Checker</div>
        <div style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-display)", marginBottom: 12,
        }}>All tools &rarr; Prepare for accessibility &rarr; Check for accessibility</div>
        <div style={{
          fontSize: 14.5, lineHeight: 1.65, color: t.textSecondary,
          fontFamily: "var(--font-body)", marginBottom: 14,
        }}>
          The most complete built-in tool for PDF accessibility. Runs locally
          with instant feedback and provides a fix workflow for each issue. It
          will flag:
        </div>
        <div style={{
          fontSize: 14, lineHeight: 1.75, color: t.textSecondary,
          fontFamily: "var(--font-body)", paddingLeft: 6,
        }}>
          {[
            { issue: "Missing alt text on figures", note: "also flagged by Ally" },
            { issue: "Untagged document", note: "also flagged by Ally" },
            { issue: "Images of text", note: "not always flagged by Ally" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "baseline", gap: 8,
              padding: "4px 0",
            }}>
              <span style={{
                display: "inline-block", width: 5, height: 5, minWidth: 5,
                borderRadius: "50%", backgroundColor: t.textTertiary,
                position: "relative", top: -2,
              }} />
              <span>
                <strong style={{ color: t.text }}>{item.issue}</strong>
                <span style={{
                  fontSize: 12.5, color: t.textTertiary,
                  fontStyle: "italic", marginLeft: 8,
                }}>({item.note})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "20px 24px", borderRadius: 10,
        backgroundColor: t.surface, border: `1px solid ${t.border}`,
        margin: "0 0 20px",
      }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: t.text,
          fontFamily: "var(--font-display)", marginBottom: 4,
        }}>PAC (PDF Accessibility Checker)</div>
        <div style={{
          fontSize: 13, color: t.textTertiary,
          fontFamily: "var(--font-display)", marginBottom: 12,
        }}>Free &middot; Windows</div>
        <div style={{
          fontSize: 14.5, lineHeight: 1.65, color: t.textSecondary,
          fontFamily: "var(--font-body)",
        }}>
          A free, standalone tool that checks PDFs against WCAG and PDF/UA
          standards. PAC provides a detailed report and a screen reader preview
          mode that lets you see exactly what assistive technology will read.
          It catches missing alt text, untagged content, and structural issues
          that Ally may miss.
        </div>
      </div>

      {/* ── Sample PDF ── */}
      <SH id="sample-pdf">Sample PDF</SH>
      <P>
        Download this PDF to practice finding and fixing missing alt text. It
        contains an image (a university logo) with no alt text set. Upload it to
        your LMS to see the Ally error, or open it in Acrobat Pro and walk
        through the fix using the steps above.
      </P>
      <div style={{
        padding: "20px 24px",
        borderRadius: 10,
        border: `1px solid ${t.border}`,
        backgroundColor: t.surfaceAlt,
        marginBottom: 24,
      }}>
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          color: t.text,
          marginBottom: 6,
        }}>
          Image-PDF.pdf
        </div>
        <div style={{
          fontSize: 14.5, lineHeight: 1.65,
          fontFamily: "var(--font-body)",
          color: t.textSecondary,
          marginBottom: 14,
        }}>
          A one-page PDF containing a Rutgers University logo with no
          alternative text. Ally will flag &quot;PDF has images without
          alternative descriptions.&quot; Use it to practice the Acrobat
          Accessibility Checker fix workflow.
        </div>
        <a
          href="/documents/image-pdf.pdf"
          download
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: t.accent,
            color: t.accentContrast,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            textDecoration: "none",
          }}
        >
          Download Image-PDF.pdf
        </a>
      </div>

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Add alt text (Acrobat checker)", "Accessibility Check \u2192 Alternate Text \u2192 right-click \u2192 Fix \u2192 type description"],
        ["Add alt text (Tags panel)", "Tags panel \u2192 right-click <Figure> \u2192 Properties \u2192 Alternate Text"],
        ["Mark as decorative", "Check \"Decorative figure\" in Set Alternate Text, or change tag to Artifact"],
        ["Best practice", "Add alt text in the source document before exporting to PDF"],
        ["Check before uploading", "Acrobat Accessibility Check or PAC"],
        ["Ally error message", "PDF has images without alternative descriptions"],
        ["WCAG criterion", "1.1.1 Non-text Content (Level A)"],
        ["Ally severity", "Major"],
      ]} />

      {/* ── Resources ── */}
      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Adobe HelpX: Create and verify PDF accessibility"
        href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html"
        description="Official guide to running the Accessibility Checker and fixing issues in Acrobat Pro"
      />
      <ResourceLink
        title="WebAIM: PDF Accessibility"
        href="https://webaim.org/techniques/acrobat/"
        description="Comprehensive guide to creating accessible PDFs including alt text, tags, and reading order"
      />
      <ResourceLink
        title="WebAIM Alternative Text Guide"
        href="https://webaim.org/techniques/alttext/"
        description="The definitive guide to writing alt text for any format"
      />
      <ResourceLink
        title="W3C Images Tutorial"
        href="https://www.w3.org/WAI/tutorials/images/"
        description="Decision tree for choosing the right type of alt text"
      />
      <ResourceLink
        title="PAC (PDF Accessibility Checker)"
        href="https://pac.pdf-accessibility.org/"
        description="Free tool for checking PDF accessibility against WCAG and PDF/UA"
      />
      <ResourceLink
        title="POET Training Tool"
        href="https://poet.diagramcenter.org/"
        description="Practice writing image descriptions with feedback"
      />
    </ContentPageLayout>
  );
}
