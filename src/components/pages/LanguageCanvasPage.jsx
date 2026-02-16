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
  { id: "hear-the-difference", label: "Hear the Difference" },
  { id: "how-canvas-handles", label: "How Canvas Handles Language" },
  { id: "language-of-parts", label: "Language of Parts in the RCE" },
  { id: "testing-results", label: "Testing Results" },
  { id: "how-to-fix", label: "How to Fix It" },
  { id: "test-file", label: "Test File" },
  { id: "ally-detection", label: "What Ally Catches and Misses" },
  { id: "acr-vpat", label: "The ACR / VPAT" },
  { id: "other-tools", label: "Other Tools" },
  { id: "quick-ref", label: "Quick Reference" },
  { id: "resources", label: "Resources" },
];

/* ── Shared helpers ────────────────────────────────────────── */

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

function Code({ children }) {
  const { t } = useTheme();
  return (
    <code style={{
      fontFamily: "var(--font-mono)", fontSize: 13,
      backgroundColor: t.codeBg, color: t.codeText,
      padding: "1px 6px", borderRadius: 3,
    }}>{children}</code>
  );
}

/* ── Spanish passage used throughout ──────────────────────── */

const spanishPassage =
  "Julio se despertó con mucho frío. Agarró su abrigo rojo y salió a la calle. " +
  "El cielo estaba gris y hacía un viento horrible. Qué barbaridad, gritó, mientras " +
  "caminaba hacia la panadería. Quería comprar churros y un chocolate caliente. La " +
  "señora de la tienda le dijo: Hijo, hoy no hay churros, pero tengo unas galletas " +
  "riquísimas. Julio se rió y contestó: Bueno, déjeme cinco galletas y un jugo de " +
  "naranja. Pagó con unas monedas que llevaba en el bolsillo y se fue silbando bajito " +
  "por la acera.";

/* Phonetic transcripts */
const phoneticTranscriptAsEnglish =
  "JOO-lee-oh say des-per-TOE con MOO-cho FREE-oh. Uh-GAR-oh soo uh-BREE-go RO-ho why suh-lee-OH ah la KAY.";
const phoneticTranscriptAsFrench =
  "Joo-lyoh suh des-pair-TOE con moo-SHO free-O. Ah-ga-RO su ah-BREE-go ro-ZHOH ay sa-lyOH a la kal.";

/* ── Blockquote-style passage with lang attribute ─────────── */

function LanguagePassage({ lang, label, labelColor }) {
  const { t } = useTheme();
  return (
    <figure style={{ margin: "0 0 24px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 8,
      }}>
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: 4,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          backgroundColor: labelColor === "green" ? t.greenBg : labelColor === "amber" ? t.amberBg : t.accentBg,
          color: labelColor === "green" ? t.green : labelColor === "amber" ? t.amber : t.accent,
          border: `1px solid ${labelColor === "green" ? t.greenBorder : labelColor === "amber" ? t.amberBorder : t.accentBorder}`,
        }}>
          {label}
        </span>
        {lang && (
          <code style={{
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: t.textTertiary,
            backgroundColor: t.codeBg,
            padding: "2px 8px",
            borderRadius: 4,
          }}>
            lang=&quot;{lang}&quot;
          </code>
        )}
        {!lang && (
          <code style={{
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: t.textTertiary,
            backgroundColor: t.codeBg,
            padding: "2px 8px",
            borderRadius: 4,
          }}>
            no lang attribute
          </code>
        )}
      </div>
      <blockquote
        lang={lang || undefined}
        style={{
          margin: 0,
          padding: "18px 24px",
          borderLeft: `4px solid ${labelColor === "green" ? t.green : labelColor === "amber" ? t.amber : t.accent}`,
          backgroundColor: t.surfaceAlt,
          borderRadius: "0 8px 8px 0",
          fontSize: 15,
          lineHeight: 1.75,
          color: t.text,
          fontFamily: "var(--font-body)",
        }}
      >
        {spanishPassage}
      </blockquote>
    </figure>
  );
}

/* ── Audio demo player (screen reader pronunciation samples) ─ */

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

/* ── Main page ────────────────────────────────────────────── */

export default function LanguageCanvasPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="language"
      fileTypeSlug="canvas"
      title="Language"
      subtitle="Canvas RCE (Rich Content Editor)"
      tocSections={tocSections}
    >
      {/* ── The Ally Error ── */}
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="<html> element must have a lang attribute"
        severity="Severe"
        wcag="3.1.1 Language of Page (Level A)"
      />
      <P>
        Ally uses <strong>axe-core</strong> to check Canvas content for
        accessibility. The <Code>html-has-lang</Code> rule checks whether
        the <Code>&lt;html&gt;</Code> element includes
        a <Code>lang</Code> attribute. Without it, screen readers have no
        reliable way to know which pronunciation rules to use.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          This error could not be triggered in testing
        </div>
        Despite deliberate attempts to create language errors in the Canvas
        Rich Content Editor -- including pasting HTML with no
        {" "}<Code>lang</Code> attribute, using the raw HTML editor, and
        uploading an HTML file without a language declaration -- Ally did not
        flag any language issues. The Accessibility Checker
        reported &quot;No accessibility issues were detected&quot; in every
        case.
      </Callout>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        Screen readers choose pronunciation rules based on the declared
        language. When the <Code>lang</Code> attribute is missing, the screen
        reader falls back to the user&apos;s system language. If that happens
        to be English, English text sounds fine -- but any content in another
        language is butchered. And if the student&apos;s system language does
        not match the content at all, even English text may sound wrong.
      </P>
      <P>
        Language also affects braille output, hyphenation, and how assistive
        technology handles quotation marks, dates, and number formats. It is
        a small attribute with a wide blast radius.
      </P>
      <P>
        This matters especially for courses that include content in multiple
        languages: foreign language departments, ESL programs, multicultural
        studies, and any course that cites sources in the original language.
        Without proper language tagging, screen reader users hear garbled
        pronunciations every time the language changes.
      </P>

      {/* ── Hear the Difference ── */}
      <SH id="hear-the-difference">Hear the Difference</SH>
      <P>
        The passages below contain the same Spanish text. The only difference is
        the <Code>lang</Code> attribute. If you use a screen reader, navigate to
        each passage and listen to how the pronunciation changes.
      </P>

      <H3>Correct: Spanish</H3>
      <P>
        With <Code>lang=&quot;es&quot;</Code>, a screen reader switches to
        Spanish pronunciation and reads the text naturally.
      </P>
      <LanguagePassage lang="es" label="Correct: Spanish" labelColor="green" />
      <AudioDemo
        src="/audio/spanish_correct.wav"
        label="Spanish passage read with correct Spanish pronunciation (lang=es)"
        transcriptSummary="Show transcript"
        transcriptContent={spanishPassage}
      />

      <H3>Wrong: French applied to Spanish</H3>
      <P>
        With <Code>lang=&quot;fr&quot;</Code>, the screen reader applies French
        phonetics -- nasal vowels, silent consonants, liaison patterns -- to
        Spanish words. The result is neither French nor Spanish.
      </P>
      <LanguagePassage lang="fr" label="Wrong: French applied" labelColor="amber" />
      <AudioDemo
        src="/audio/spanish_as_french.wav"
        label="Spanish passage read with French pronunciation (lang=fr, incorrect)"
        transcriptSummary="Show phonetic transcript (mispronunciation)"
        transcriptContent={
          <>
            <p style={{ margin: "0 0 8px" }}>
              Approximate &quot;sounds-like&quot; spelling of the first two
              sentences as read with French phonetics:
            </p>
            <p style={{ margin: 0 }} lang="en">
              {phoneticTranscriptAsFrench}
            </p>
          </>
        }
      />

      <H3>Wrong: English applied to Spanish</H3>
      <P>
        With <Code>lang=&quot;en&quot;</Code>, the most common real-world
        scenario: a Canvas page authored in English contains a Spanish passage
        that was never tagged with a different language.
      </P>
      <LanguagePassage lang="en" label="Wrong: English applied" labelColor="accent" />
      <AudioDemo
        src="/audio/spanish_as_english.wav"
        label="Spanish passage read with English pronunciation (lang=en, incorrect)"
        transcriptSummary="Show phonetic transcript (mispronunciation)"
        transcriptContent={
          <>
            <p style={{ margin: "0 0 8px" }}>
              Approximate &quot;sounds-like&quot; spelling of the first two
              sentences as read with English phonetics:
            </p>
            <p style={{ margin: 0 }} lang="en">
              {phoneticTranscriptAsEnglish}
            </p>
          </>
        }
      />

      <H3>No language at all</H3>
      <P>
        No <Code>lang</Code> attribute. The screen reader falls back to the
        system or document language (English for this site), producing the same
        result as the English example above.
      </P>
      <LanguagePassage lang={null} label="No language" labelColor="accent" />
      <AudioDemo
        src="/audio/spanish_as_english.wav"
        label="Spanish passage with no lang attribute (falls back to English, same as above)"
        transcriptSummary="Show phonetic transcript (mispronunciation)"
        transcriptContent={
          <>
            <p style={{ margin: "0 0 8px" }}>
              Same as English above: approximate &quot;sounds-like&quot; spelling
              of the first two sentences.
            </p>
            <p style={{ margin: 0 }} lang="en">
              {phoneticTranscriptAsEnglish}
            </p>
          </>
        }
      />

      {/* ── How Canvas Handles Language ── */}
      <SH id="how-canvas-handles">How Canvas Handles Language</SH>
      <P>
        When you create a Canvas page, assignment, discussion, or
        announcement, Canvas wraps your content in its own HTML shell. That
        shell includes a <Code>lang</Code> attribute on
        the <Code>&lt;html&gt;</Code> element, set from the
        institution&apos;s or user&apos;s language preference in the course
        settings.
      </P>
      <P>
        This means <strong>WCAG 3.1.1 (Language of Page) is handled
        automatically</strong> for anything authored in the Rich Content
        Editor. You do not need to do anything to satisfy it for regular
        Canvas content.
      </P>
      <Callout type="info">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Course locale vs. content language
        </div>
        Canvas uses the course locale setting to set both the language of the
        HTML content <em>and</em> the language of the Canvas user interface
        (menus, buttons, labels). These are two different things. A course
        taught in Spanish with a student who prefers an English UI creates a
        mismatch that Canvas does not cleanly handle. The course locale
        forces the UI language for all users in the course.
      </Callout>

      {/* ── Language of Parts in the RCE ── */}
      <SH id="language-of-parts">Language of Parts in the RCE</SH>
      <P>
        WCAG 3.1.2 (Language of Parts) requires that passages in a different
        language than the page default be marked with their own language
        attribute. For example, a Spanish quotation on an English page should
        be wrapped in an element with <Code>lang=&quot;es&quot;</Code>.
      </P>
      <P>
        The Canvas Rich Content Editor <strong>does not provide any way to
        set language on a selection of text</strong>. There is no dropdown,
        no toolbar button, and no menu option for it. This is a known
        limitation, documented by the University of Washington&apos;s
        Accessible Technology group and raised in the Canvas community.
      </P>
      <P>
        The <strong>only workaround</strong> is to switch to the
        RCE&apos;s HTML editor and manually wrap foreign-language passages
        in a <Code>&lt;span&gt;</Code> or
        {" "}<Code>&lt;p&gt;</Code> with a <Code>lang</Code> attribute.
        The <Code>lang</Code> attribute is on Canvas&apos;s HTML allowlist,
        so it <em>is</em> preserved when you save -- but it requires comfort
        with HTML and is not something most instructors will know to do.
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
        &lt;p&gt;As the author writes:&lt;/p&gt;<br />
        &lt;p <strong style={{ color: t.accent }}>lang=&quot;es&quot;</strong>&gt;<br />
        &nbsp;&nbsp;Julio se despert&oacute; con mucho fr&iacute;o...<br />
        &lt;/p&gt;
      </div>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Some Canvas content types block even the workaround
        </div>
        Certain quiz question types -- including categorization, matching,
        and fill-in-the-blank with dropdown choices -- do not allow HTML
        editing at all. In these contexts, there is <strong>no way
        whatsoever</strong> to set language of parts. This has been raised as
        a formal accessibility concern in the Canvas community.
      </Callout>

      {/* ── Testing Results ── */}
      <SH id="testing-results">Testing Results</SH>
      <P>
        We attempted every available method to trigger an Ally language error
        in the Canvas Rich Content Editor. None succeeded.
      </P>

      <H3>Test 1: Raw HTML editor with clear language issue</H3>
      <P>
        Using the RCE&apos;s HTML editor, we created a page with a Spanish
        passage that had no <Code>lang</Code> attribute -- a clear WCAG
        3.1.2 violation. Ally reported no issues.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-no-lang-content.png"
          alt="Screenshot of the Canvas Rich Content Editor in HTML view showing a Spanish passage inside a div with class passage but no lang attribute. The HTML contains headings for English Paragraph and Spanish Paragraph with no lang attribute, confirming the language is not set for the foreign-language content."
          width={800}
          height={400}
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
          Spanish passage in the HTML editor with no lang attribute -- a clear
          3.1.2 violation
        </figcaption>
      </figure>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-ally-no-issues-detected.png"
          alt="Screenshot of the Canvas Accessibility Checker showing a celebration graphic with balloons and the message No accessibility issues were detected, despite the page containing a Spanish passage without a lang attribute."
          width={360}
          height={440}
          style={{
            maxWidth: 360,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: 13, color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          Ally reports no accessibility issues on content with a clear language
          error
        </figcaption>
      </figure>

      <H3>Test 2: Full HTML document pasted into the RCE</H3>
      <P>
        We pasted a complete HTML document (with <Code>&lt;!DOCTYPE&gt;</Code>,
        {" "}<Code>&lt;html&gt;</Code> with no <Code>lang</Code> attribute,
        {" "}<Code>&lt;head&gt;</Code>, and <Code>&lt;style&gt;</Code>) into
        the raw HTML editor. Canvas stripped all of it, keeping only the body
        content. The <Code>&lt;html&gt;</Code> element that Ally&apos;s
        {" "}<Code>html-has-lang</Code> rule would check was never part of
        the saved content.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-full-html-pasted.png"
          alt="Screenshot of the Canvas raw HTML editor showing a complete HTML document including DOCTYPE, html, head, style, and body tags pasted into the editor, before Canvas strips the non-body content."
          width={800}
          height={400}
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
          Full HTML document pasted into the raw HTML editor
        </figcaption>
      </figure>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-html-stripped.png"
          alt="Screenshot of the Canvas RCE HTML editor after saving, showing that Canvas has stripped the DOCTYPE, html, head, and style elements, leaving only the body content. The h1 has been converted to h2, and the document structure has been flattened."
          width={800}
          height={400}
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
          After saving: Canvas strips everything except body content --
          no <code>html</code> element for Ally to check
        </figcaption>
      </figure>

      <H3>Test 3: Language attributes added via HTML editor</H3>
      <P>
        We added <Code>lang=&quot;es&quot;</Code> and
        {" "}<Code>lang=&quot;fr&quot;</Code> attributes directly on
        {" "}<Code>&lt;p&gt;</Code> elements using the HTML editor. Canvas
        preserved the attributes (they are on the HTML allowlist). However,
        Ally still reported no issues -- because axe-core does not have a
        rule that flags <em>missing</em> <Code>lang</Code> attributes on
        inline content. It only validates <Code>lang</Code> values that
        are <em>already present</em>.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/canvas-rce-lang-attributes-html.png"
          alt="Screenshot of the Canvas HTML editor showing two paragraphs with explicit lang attributes: one set to lang es for Spanish and one set to lang fr for French, both containing the same Spanish passage text. This confirms Canvas preserves lang attributes when added manually."
          width={800}
          height={400}
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
          Canvas preserves lang attributes added in the HTML editor, but
          Ally does not flag missing ones
        </figcaption>
      </figure>

      <H3>Summary</H3>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13.5, lineHeight: 2, color: t.textSecondary,
      }}>
        Canvas page (normal use) <span style={{ color: t.green }}>passes</span> &mdash; Canvas sets <Code>lang</Code> automatically<br />
        Spanish passage, no <Code>lang</Code> attr <span style={{ color: t.green }}>passes</span> &mdash; <strong>not detected by Ally</strong><br />
        Full HTML with no <Code>lang</Code> pasted <span style={{ color: t.green }}>passes</span> &mdash; Canvas strips <Code>&lt;html&gt;</Code> before Ally sees it<br />
        Wrong <Code>lang</Code> attr on passage <span style={{ color: t.green }}>passes</span> &mdash; axe-core only validates present values, not correctness
      </div>

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>
      <P>
        There is nothing to &quot;fix&quot; from Ally&apos;s perspective --
        it does not flag language issues in Canvas RCE content. But the
        accessibility problem is real. Here is how to address it manually.
      </P>

      <H3>Setting language of parts (the HTML editor workaround)</H3>
      <Step number="1">In the Canvas RCE, click the <strong>HTML editor</strong> button (the <Code>&lt;/&gt;</Code> icon).</Step>
      <Step number="2">
        Find the foreign-language passage and wrap it in an element with
        the appropriate <Code>lang</Code> attribute. Use
        {" "}<Code>&lt;span lang=&quot;es&quot;&gt;</Code> for inline text
        or <Code>&lt;p lang=&quot;es&quot;&gt;</Code> for a full paragraph.
      </Step>
      <Step number="3">Switch back to the visual editor and verify the content looks correct.</Step>
      <Step number="4">Save the page.</Step>
      <Step number="5">
        Re-open the HTML editor to verify the <Code>lang</Code> attribute
        was preserved. Canvas should keep it (it is on the allowlist), but
        it is worth confirming.
      </Step>

      <H3>For uploaded HTML files</H3>
      <P>
        If you upload a standalone HTML file to Canvas, make sure it includes
        a <Code>lang</Code> attribute on its <Code>&lt;html&gt;</Code> element.
        While Ally did not flag this in testing, it is still required by WCAG
        and matters for assistive technology.
      </P>
      <Step number="1">Open the HTML file in any text editor.</Step>
      <Step number="2">
        Find the <Code>&lt;html&gt;</Code> tag and add the language
        attribute:{" "}
        <span style={{
          display: "inline-block", marginTop: 8,
          fontFamily: "var(--font-mono)", fontSize: 13,
          backgroundColor: t.codeBg, color: t.codeText,
          padding: "4px 10px", borderRadius: 4,
        }}>
          &lt;html <strong style={{ color: t.accent }}>lang=&quot;en&quot;</strong>&gt;
        </span>
      </Step>
      <Step number="3">Save and re-upload to Canvas.</Step>

      <Callout type="tip">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Automated language tagging at scale
        </div>
        A Canvas developer has published an open-source script
        (<Code>language_tag_a_course.py</Code>) that walks all course
        content and adds <Code>lang</Code> attributes to HTML elements via
        the Canvas API. This is useful for institutions that want to
        retroactively tag existing content. See the Resources section for
        the link.
      </Callout>

      {/* ── Test File ── */}
      <SH id="test-file">Test File</SH>
      <P>
        Download the HTML file below to test Ally&apos;s language detection
        yourself. The file has <strong>no <Code>lang</Code> attribute</strong>
        {" "}on its <Code>&lt;html&gt;</Code> element and includes both
        English and Spanish paragraphs.
      </P>
      <P>
        You can test it two ways: (1) upload it as a file to a Canvas
        course, or (2) paste its content into the RCE&apos;s raw HTML
        editor. In our testing, neither method triggered an Ally error.
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
          No language set (HTML)
        </div>
        <P>
          An HTML file with no <Code>lang</Code> attribute. Contains an
          English paragraph and a Spanish paragraph (also without
          a <Code>lang</Code> attribute). Upload to Canvas to test whether
          Ally flags the missing page language.
        </P>
        <a
          href="/documents/no-language.html"
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
          Download no-language.html
        </a>
      </div>

      {/* ── What Ally Catches and Misses ── */}
      <SH id="ally-detection">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="In theory, Ally checks for the html-has-lang and html-lang-valid axe-core rules. In practice, we could not trigger either error in Canvas content."
        misses="Language of parts (foreign-language passages without a lang attribute). Whether the declared language matches the content. Canvas page content where the RCE strips <html> elements. Every scenario tested."
      />
      <P>
        The fundamental problem is architectural. Canvas wraps RCE content in
        its own HTML shell, which already has a <Code>lang</Code> attribute.
        Ally&apos;s axe-core check sees that attribute and passes. Meanwhile,
        the actual <em>content</em> may contain passages in a dozen
        different languages with no markup at all, and neither Canvas&apos;s
        built-in Accessibility Checker nor Ally flags it.
      </P>
      <P>
        For uploaded HTML files, Canvas does not inject its own
        {" "}<Code>&lt;html&gt;</Code> element -- the file&apos;s own
        markup is served directly. This <em>should</em> be where Ally
        catches a missing <Code>lang</Code> attribute, but in testing it
        did not.
      </P>

      {/* ── The ACR / VPAT ── */}
      <SH id="acr-vpat">The ACR / VPAT</SH>
      <P>
        Instructure publishes an Accessibility Conformance Report (ACR) for
        Canvas LMS using the VPAT 2.4 format. WebAIM independently certified
        Canvas as conformant with <strong>WCAG 2.2 Level A and AA</strong> as
        of June 26, 2025.
      </P>

      <H3>3.1.1 Language of Page</H3>
      <P>
        The Canvas VPAT marks criterion 3.1.1 as
        {" "}<strong>&quot;Supports&quot;</strong>. This is accurate: Canvas
        does set the <Code>&lt;html lang&gt;</Code> attribute automatically
        on all platform-generated pages based on the course or user language
        setting.
      </P>

      <H3>3.1.2 Language of Parts</H3>
      <P>
        The VPAT&apos;s specific claim for 3.1.2 is not publicly broken out
        in the available documentation. However, the overall
        &quot;substantially conformant&quot; certification implies at least
        partial support. In practice:
      </P>
      <div style={{
        padding: "2px 0 2px 20px",
        borderLeft: `3px solid ${t.border}`,
        margin: "18px 0 18px 4px",
      }}>
        {[
          ["The lang attribute is on the HTML allowlist.", "Canvas preserves lang attributes added via the HTML editor."],
          ["There is no GUI for setting language of parts.", "The RCE has no dropdown, toolbar button, or menu option for it."],
          ["Some content types block the workaround entirely.", "Quiz question types like categorization, matching, and fill-in-the-blank do not allow HTML editing."],
          ["Ally does not flag missing language of parts.", "No automated check catches this issue in Canvas."],
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
        The gap between the VPAT&apos;s conformance claim and the actual
        authoring experience is significant. An instructor creating
        multilingual content in Canvas has no supported path to WCAG 3.1.2
        compliance without editing raw HTML -- and no automated tool will
        tell them they need to.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          This is a platform-level accessibility gap
        </div>
        Language of parts is not something instructors should need to solve
        with raw HTML. In June 2025, accessibility advocates formally
        requested that Instructure add a language menu to the Rich Content
        Editor. As of this writing, the feature has not been implemented.
        If your institution needs to escalate this, contact
        {" "}<Code>accessibility@instructure.com</Code> and reference
        WCAG 3.1.2.
      </Callout>

      {/* ── Other Tools ── */}
      <SH id="other-tools">Check It With Other Tools</SH>
      {[
        {
          name: "axe DevTools (browser extension)",
          meta: "Free \u00b7 Chrome, Firefox, Edge",
          desc: "The same engine Ally uses. Install the extension, open any Canvas page, and run the scan. Checks html-has-lang, html-lang-valid, and valid-lang (validates existing lang attribute values, but does not flag missing lang on foreign passages). Note: axe only works on pages loaded in the browser -- it cannot scan downloaded HTML files or file uploads. To test an HTML file, you would need to serve it locally or open it in the browser first.",
        },
        {
          name: "WAVE (browser extension)",
          meta: "Free \u00b7 Chrome, Firefox",
          desc: "Reports missing page language and invalid lang attributes. Visual overlay makes it easy to spot which element triggered the alert. Will not catch missing language of parts. Like axe, WAVE only works on pages loaded in the browser -- it cannot scan downloaded HTML files or file uploads.",
        },
        {
          name: "Screen reader testing",
          meta: "NVDA (free) \u00b7 JAWS \u00b7 VoiceOver (macOS/iOS)",
          desc: "The only reliable way to verify language of parts. Navigate to a foreign-language passage and listen. If the pronunciation sounds wrong, the lang attribute is missing or incorrect. This is the definitive test.",
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

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Canvas page language", "Set automatically by Canvas (course/user language preference)"],
        ["Language of parts (RCE)", "HTML editor \u2192 wrap passage in <span lang=\"xx\"> or <p lang=\"xx\">"],
        ["Language of parts (GUI)", "Not available \u2014 no RCE interface for this"],
        ["Language of parts (quizzes)", "Not possible \u2014 some question types block HTML editing"],
        ["Ally error", "\u201C<html> element must have a lang attribute\u201D"],
        ["Ally detection in testing", "Could not trigger \u2014 Ally passed all test cases"],
        ["WCAG criteria", "3.1.1 Language of Page (A) / 3.1.2 Language of Parts (AA)"],
        ["VPAT claim (3.1.1)", "Supports"],
        ["Ally engine", "axe-core (html-has-lang, html-lang-valid)"],
        ["HTML allowlist", "lang attribute is allowed on all elements"],
      ]} />

      {/* ── Resources ── */}
      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Language of Page"
        href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html"
        description="WCAG 3.1.1 explained with examples and techniques"
      />
      <ResourceLink
        title="W3C: Understanding Language of Parts"
        href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html"
        description="WCAG 3.1.2 explained -- when and how to tag passages in a different language"
      />
      <ResourceLink
        title="UW Accessible Technology: Language in Canvas"
        href="https://www.washington.edu/accesstech/courses/canvas/language/"
        description="University of Washington guide documenting Canvas's language limitations and the HTML editor workaround"
      />
      <ResourceLink
        title="Illinois State: Specify a Different Language in Canvas Page Content"
        href="https://help.illinoisstate.edu/accessibility/website-and-digital/creating-accessible-course-content-with-canvas-lms/specify-a-different-language-within-canvas-page-content"
        description="Step-by-step guide to adding lang attributes via the Canvas HTML editor"
      />
      <ResourceLink
        title="Canvas Community: Enabling language menu options in the RCE"
        href="https://community.canvaslms.com/t5/Accessibility/Enabling-language-menu-options-in-rich-text-editor/m-p/651977"
        description="June 2025 request for Instructure to add a language menu to the Rich Content Editor"
      />
      <ResourceLink
        title="Canvas Community: Language tagging content vs. setting course locale"
        href="https://community.canvaslms.com/t5/Canvas-Developers-Group/language-tagging-content-versus-setting-course-locale/ba-p/611688"
        description="Developer discussion of the course locale problem and an API-based script for bulk language tagging"
      />
      <ResourceLink
        title="Canvas LMS VPAT (Instructure)"
        href="https://www.instructure.com/products/canvas/accessibility"
        description="Instructure's accessibility page with the Canvas LMS VPAT and WebAIM certification"
      />
      <ResourceLink
        title="WebAIM: Canvas LMS Verification of Conformance"
        href="https://webaim.org/services/certification/canvas"
        description="Independent certification of Canvas conformance with WCAG 2.2 Level A and AA (June 2025)"
      />
      <ResourceLink
        title="Deque: axe-core html-has-lang rule"
        href="https://dequeuniversity.com/rules/axe/4.10/html-has-lang"
        description="Technical documentation for the rule Ally uses to check page language"
      />
      <ResourceLink
        title="MDN: lang attribute"
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
        description="Reference for the HTML lang attribute including valid BCP 47 tags"
      />
    </ContentPageLayout>
  );
}
