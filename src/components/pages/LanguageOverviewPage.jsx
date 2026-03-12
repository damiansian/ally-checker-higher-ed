import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
} from "@/components/content.jsx";

/* ── Spanish passage used for audio demos ──────────────────── */

const spanishPassage =
  "Julio se despertó con mucho frío. Agarró su abrigo rojo y salió a la calle. " +
  "El cielo estaba gris y hacía un viento horrible. Qué barbaridad, gritó, mientras " +
  "caminaba hacia la panadería. Quería comprar churros y un chocolate caliente. La " +
  "señora de la tienda le dijo: Hijo, hoy no hay churros, pero tengo unas galletas " +
  "riquísimas. Julio se rió y contestó: Bueno, déjeme cinco galletas y un jugo de " +
  "naranja. Pagó con unas monedas que llevaba en el bolsillo y se fue silbando bajito " +
  "por la acera.";

const phoneticTranscriptAsEnglish =
  "JOO-lee-oh say des-per-TOE con MOO-cho FREE-oh. Uh-GAR-oh soo uh-BREE-go RO-ho why suh-lee-OH ah la KAY.";

/* ── Shared helpers ────────────────────────────────────────── */

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
              fontSize: "var(--fs-sm)",
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
              fontSize: "var(--fs-sm)",
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

export default function LanguageOverviewPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="language"
      fileTypeSlug="overview"
      title="Language"
      subtitle="Overview"
    >
      {/* ── Overview ── */}
      <SH id="overview">Overview</SH>
      <P>
        Documents need a language set so screen readers know how to pronounce
        the text. Without it, an English screen reader might try to read Spanish
        content with English phonetics, turning every word into an
        incomprehensible string of mangled syllables.
      </P>
      <P>
        This category covers WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html" target="_blank" rel="noopener noreferrer">3.1.1 Language of Page</a> (Level A) and
        WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html" target="_blank" rel="noopener noreferrer">3.1.2 Language of Parts</a> (Level AA). Ally checks for language
        attributes in <strong>Word</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files, but detection is unreliable for
        Word and PDF. The pages in this section walk through each file type
        with testing results, screenshots, and audio examples.
      </P>
      <P>
        Language metadata issues are more common than the 3/5 likelihood rating
        might suggest at institutions with multilingual content. Foreign language
        courses routinely include passages, exercises, and readings in the target
        language. Courses in literature, history, and cultural studies frequently
        cite primary sources in their original language. Course catalogs and
        student-facing materials at institutions serving multilingual populations
        may include Spanish, Mandarin, Arabic, or other languages alongside
        English. In each case, the language-of-parts requirement (WCAG 3.1.2)
        applies: every passage in a language other than the document&rsquo;s
        default needs its own <code>lang</code> attribute, or a screen reader will
        mispronounce it. Institutions with significant multilingual content should
        treat language metadata as a higher priority than the general rating
        suggests.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Unreliable detection across document file types
        </div>
        In testing, Ally&apos;s language checks failed to fire consistently
        for Word and PDF documents despite documentation claiming coverage.
        Both file types are marked as <strong>unreliable</strong> on the home
        page. Only Canvas (HTML via axe-core) produced reliable results.
        You should not rely on Ally alone to catch language issues in
        document files.
      </Callout>

      {/* ── Ally Error Messages ── */}
      <SH id="ally-errors">Ally Error Messages</SH>
      <P>
        Ally reports two types of language errors: missing language and
        incorrect language. The exact wording varies by file type.
      </P>
      <AllyErrorBox
        message="Document does not have a language set"
        severity="Minor"
        wcag="3.1.1 Language of Page (Level A)"
      />
      <AllyErrorBox
        message="Document does not have the correct language set"
        severity="Minor"
        wcag="3.1.2 Language of Parts (Level AA)"
      />
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2.2, color: t.textSecondary,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{ minWidth: 70, fontWeight: 600, color: t.text }}>Word</span>
          <span>&ldquo;Document does not have a language set&rdquo; / &ldquo;Document does not have the correct language set&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{ minWidth: 70, fontWeight: 600, color: t.text }}>PDF</span>
          <span>&ldquo;PDF does not have a language set&rdquo; / &ldquo;PDF does not have the correct language set&rdquo;</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{ minWidth: 70, fontWeight: 600, color: t.text }}>Canvas</span>
          <span>&ldquo;&lt;html&gt; element must have a lang attribute&rdquo;</span>
        </div>
      </div>

      {/* ── Hear the Difference ── */}
      <SH id="hear-the-difference">Hear the Difference</SH>
      <P>
        The impact of missing or wrong language tags is best understood by
        hearing it. These recordings use the same Spanish passage read by a
        screen reader with different language settings.
      </P>

      <H3>Correct: Spanish pronunciation</H3>
      <P>
        With the correct language attribute, the screen reader switches to
        Spanish pronunciation and reads the text naturally.
      </P>
      <AudioDemo
        src="/audio/spanish_correct.wav"
        label="Spanish passage read with correct Spanish pronunciation (lang=es)"
        transcriptSummary="Show transcript"
        transcriptContent={spanishPassage}
      />

      <H3>Wrong: English applied to Spanish</H3>
      <P>
        The most common real-world scenario: a document authored in English
        contains a Spanish passage that was never tagged with a different
        language. The screen reader applies English phonetics to every word.
      </P>
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

      <H3>Wrong: French applied to Spanish</H3>
      <P>
        With French phonetics, the screen reader applies nasal vowels, silent
        consonants, and liaison patterns to Spanish words. The result is
        neither French nor Spanish.
      </P>
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
              Joo-lyoh suh des-pair-TOE con moo-SHO free-O. Ah-ga-RO su
              ah-BREE-go ro-ZHOH ay sa-lyOH a la kal.
            </p>
          </>
        }
      />

      {/* ── Results by File Type ── */}
      <SH id="results-by-type">Results by File Type</SH>
      <P>
        Language detection varies significantly by file type. Unlike text
        alternatives, where Ally reliably detects missing alt text everywhere,
        language checks are inconsistent for document formats.
      </P>
      {[
        {
          type: "Word",
          slug: "word",
          status: "Unreliable",
          statusColor: "amber",
          detail: "Word stores language at the character level, not the document level. Ally partially detects when a text run has the wrong language but does not identify which passage is wrong. The Microsoft Accessibility Checker does not flag language issues at all.",
        },
        {
          type: "PDF",
          slug: "pdf",
          status: "Unreliable",
          statusColor: "amber",
          detail: "Ally checks for document-level language metadata. When the check fires, it catches missing language but not wrong language or missing language of parts. Detection was inconsistent in testing.",
        },
        {
          type: "Canvas",
          slug: "canvas",
          status: "Checked",
          statusColor: "green",
          detail: "Canvas content is HTML. Ally uses axe-core to check for the lang attribute on the <html> element. This is the most reliable check in this category. Language of parts requires manually adding lang attributes in the HTML editor.",
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
              href={`/language/${item.slug}`}
              style={{
                fontSize: "var(--fs-lg)", fontWeight: 700, color: t.link,
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
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              backgroundColor: item.statusColor === "green" ? t.greenBg : t.amberBg,
              color: item.statusColor === "green" ? t.green : t.amber,
              border: `1px solid ${item.statusColor === "green" ? t.greenBorder : t.amberBorder}`,
            }}>
              {item.status}
            </span>
          </div>
          <div style={{
            fontSize: "var(--fs-base)", lineHeight: 1.65, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>
            {item.detail}
          </div>
        </div>
      ))}

      {/* ── False Positive ── */}
      <SH id="false-positive">False Positive</SH>
      <P>
        Ally&apos;s language error messages can be misleading. When Ally
        reports &ldquo;Document does not have the correct language set,&rdquo;
        it sounds like the entire document has the wrong language. In
        reality, only one passage may be mislabeled.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Vague error message misleads authors
        </div>
        In our Word testing, a document with one Spanish paragraph marked as
        French triggered the message &ldquo;This document does not have the
        correct language set.&rdquo; The error message does not identify which
        passage is wrong, making it difficult for authors to locate and fix
        the issue. We mark this as <strong>partially detected</strong> because
        Ally flags a review but does not direct authors to the actual problem.
      </Callout>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        Document language = (any value) <span style={{ color: t.green }}>passes</span><br/>
        Document language = (missing) <span style={{ color: t.accent }}>flagged</span><br/>
        Passage language = (wrong) <span style={{ color: t.green }}>passes</span><br/>
        Passage language = (missing) <span style={{ color: t.green }}>passes</span>
      </div>
      <P>
        No automated tool &mdash; Ally, PAC, or Acrobat&apos;s built-in
        checker &mdash; can detect incorrect language of parts. The only
        reliable test is listening with a screen reader.
      </P>

      {/* ── What Ally Catches ── */}
      <SH id="ally-catches">What Ally Catches</SH>
      <P>
        Ally checks whether a language attribute <strong>exists</strong>, not
        whether it is <strong>correct</strong>. A document with every word in
        English but the language set to French passes every automated check.
      </P>

      {/* ── What Ally Misses ── */}
      <SH id="ally-misses">What Ally Misses</SH>
      <CompareBoxes
        catches="Missing document-level language attribute (when the check fires). In Canvas, reliably detects missing lang attribute via axe-core."
        misses="Wrong document language, wrong or missing language of parts, whether the declared language matches the content. Detection is unreliable for Word and PDF."
      />
      {[
        {
          term: "Incorrect language",
          desc: "A document set to French when the content is English passes every Ally check. The language exists, so Ally considers it correct.",
        },
        {
          term: "Language of parts",
          desc: "No automated tool reliably detects when a foreign-language passage within a document is tagged with the wrong language or not tagged at all.",
        },
        {
          term: "Unreliable document detection",
          desc: "For Word and PDF, Ally's language checks did not fire consistently in testing. You may have a language issue that Ally never reports.",
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
        ["Ally checks", "2 checks (missing language, incorrect language)"],
        ["Ally severity", "Minor"],
        ["WCAG criteria", "3.1.1 Language of Page (A) / 3.1.2 Language of Parts (AA)"],
        ["Likelihood", "3 / 5"],
        ["Impact", "3 / 5 \u2014 garbled pronunciation for screen reader users"],
        ["File types", "Word (unreliable), PDF (unreliable), Canvas (checked)"],
        ["Ally detection", "Reliable for Canvas only; unreliable for Word and PDF"],
        ["Best manual test", "Listen with a screen reader"],
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
        title="WebAIM: PDF Accessibility"
        href="https://webaim.org/techniques/acrobat/"
        description="Comprehensive guide to creating accessible PDFs including language"
      />
    </ContentPageLayout>
  );
}
