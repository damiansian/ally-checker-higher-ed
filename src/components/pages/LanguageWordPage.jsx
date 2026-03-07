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
      fontSize: "var(--fs-base)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
  );
}

function P({ children }) {
  const { t } = useTheme();
  return (
    <p style={{
      fontSize: "var(--fs-base)", lineHeight: 1.75, color: t.text,
      fontFamily: "var(--font-body)",
      margin: "0 0 18px",
    }}>{children}</p>
  );
}

function Code({ children }) {
  const { t } = useTheme();
  return (
    <code style={{
      fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
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
          fontSize: "var(--fs-xs)",
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
            fontSize: "var(--fs-xs)",
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
            fontSize: "var(--fs-xs)",
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
          fontSize: "var(--fs-base)",
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

/* ── Audio demo player ─────────────────────────────────────── */

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

export default function LanguageWordPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="language"
      fileTypeSlug="word"
      title="Language"
      subtitle="Microsoft Word Documents"
    >
      {/* ── The Ally Errors ── */}
      <SH id="ally-error">The Ally Errors</SH>
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
      <P>
        Ally flags two language issues in Word documents. The first fires when
        no language is set on the text. The second fires when the language
        metadata does not match the actual content &mdash; for example, a
        Spanish passage marked as French.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Unreliable detection
        </div>
        In testing, Ally&apos;s language checks for Word documents were
        inconsistent. The file type is marked
        as <strong>unreliable</strong> on the home page for this reason.
        You should not rely on Ally alone to catch language issues in
        Word documents.
      </Callout>

      {/* ── Why This Matters ── */}
      <SH id="why-matters">Why This Matters</SH>
      <P>
        Screen readers use the language attribute to choose pronunciation rules.
        When the language is wrong or missing, every word comes out garbled.
        English phonetics applied to Spanish text turns
        &quot;Julio se despert&oacute; con mucho fr&iacute;o&quot; into an
        incomprehensible string of mangled syllables.
      </P>
      <P>
        This is common in practice. Course materials routinely include passages
        in other languages: foreign language departments, ESL programs,
        multicultural studies, and any course that cites sources in the original
        language.
      </P>

      {/* ── How Word Handles Language ── */}
      <SH id="how-word-handles">How Word Handles Language</SH>
      <P>
        Unlike PDF, which supports a single document-level language
        declaration, MS Word does not have a document-level language setting.
        Instead, Word assigns language at the <strong>character
        level</strong> &mdash; every run of text carries its own language
        attribute, similar to how every run carries its own font and size.
      </P>
      <P>
        By default, Word uses the language of your operating system and Office
        installation (typically English-US) as the proofing language for new
        text. When you type or paste, Word assigns that default language
        automatically. You can override it by selecting text
        and choosing a different language.
      </P>
      <P>
        Word also has a <strong>Detect language automatically</strong> feature
        that attempts to identify the language of text as you type. When it
        works, it can correctly assign Spanish to a Spanish passage without
        manual intervention. When it fails, it may tag Spanish text as French
        or another language, and neither the author nor Ally may notice.
      </P>
      <Callout type="info">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Character-level language vs. document-level language
        </div>
        Because Word stores language per text run rather than per document,
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html" target="_blank" rel="noopener noreferrer">WCAG 3.1.1 (Language of Page)</a> does not map cleanly to Word documents.
        Ally treats the predominant language of the text as the
        &quot;document language.&quot; <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html" target="_blank" rel="noopener noreferrer">WCAG 3.1.2 (Language of Parts)</a> maps
        more naturally: each passage in a different language should have the
        correct language assigned to its text run.
      </Callout>

      {/* ── Hear the Difference ── */}
      <SH id="hear-the-difference">Hear the Difference</SH>
      <P>
        The passages below contain the same Spanish text. The only difference is
        the language tag. If you use a screen reader, navigate to
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
        phonetics &mdash; nasal vowels, silent consonants, liaison patterns
        &mdash; to Spanish words. The result is neither French nor Spanish.
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
        scenario: a Word document authored in English contains a Spanish
        passage whose text runs were never assigned a different language.
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

      {/* ── Testing Results ── */}
      <SH id="testing-results">Testing Results</SH>
      <P>
        We tested two Word documents with the same Spanish passage. The only
        difference was the language assigned to the Spanish text run.
      </P>

      <H3>Wrong language: Spanish text marked as French</H3>
      <P>
        This document has all text set to English-US except the Spanish passage,
        which is programmatically set to <strong>French</strong> instead
        of Spanish. The spellchecker shows red underlines on nearly every word
        because it applies French spelling rules to Spanish text.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/word-spanish-text-wrong-language.png"
          alt="Screenshot of the Spanish passage in MS Word with red wavy spellcheck underlines on most words, indicating the text is marked with the wrong proofing language. Words like despertó, mucho, frío, Agarró, abrigo, rojo, and salió are all underlined as misspelled."
          width={716}
          height={146}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          Spanish text with French as the proofing language &mdash; red
          underlines show the spellchecker treating every Spanish word as
          misspelled French
        </figcaption>
      </figure>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/word-language-dialog-french.png"
          alt="Screenshot of the MS Word Language dialog box showing Mark selected text as with French highlighted in the language list. The Detect language automatically checkbox is checked. This shows the incorrect language assignment causing the spellcheck errors."
          width={396}
          height={588}
          style={{
            maxWidth: 360,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Language dialog confirms the selected text is marked as French
        </figcaption>
      </figure>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
          <span style={{ minWidth: 180 }}>A11y automated checker</span>
          <span style={{ color: t.amber, fontWeight: 600 }}>Partially Detected</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 180 }}>MS Accessibility checker</span>
          <span style={{ color: t.accent, fontWeight: 600 }}>Not Detected</span>
        </div>
      </div>
      <P>
        Ally reports <strong>&quot;This document does not have the correct
        language set.&quot;</strong> This is directionally correct &mdash;
        there <em>is</em> a language error in the document. However,
        the error message sounds like the entire document has the wrong
        language, when in reality only one paragraph is mislabeled. Ally
        does not identify <em>which</em> portion has the incorrect language,
        making it hard for authors to locate and fix the issue.
      </P>
      <P>
        We mark this as <strong>&quot;partially detected&quot;</strong>
        because Ally flags a review but does not direct authors to where the
        issue exists so they can fix it efficiently. The Microsoft
        Accessibility Checker does not detect the issue at all.
      </P>

      <H3>Correct language: Spanish text marked as Spanish</H3>
      <P>
        This document has all text set to English-US except the Spanish
        passage, which is correctly identified as Spanish. The spellchecker
        shows no errors because it applies Spanish spelling rules to Spanish
        text.
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/word-spanish-text-correct.png"
          alt="Screenshot of the same Spanish passage in MS Word with no spellcheck underlines, showing the text displays correctly when the proofing language is properly set to Spanish."
          width={740}
          height={134}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          Spanish text with the correct proofing language &mdash; no
          spellcheck underlines
        </figcaption>
      </figure>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/word-language-dialog-spanish.png"
          alt="Screenshot of the MS Word Language dialog box showing Mark selected text as with Spanish highlighted in the language list. The Detect language automatically checkbox is checked."
          width={396}
          height={530}
          style={{
            maxWidth: 360,
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
        <figcaption style={{
          fontSize: "var(--fs-base)", color: t.textTertiary, marginTop: 8,
          fontFamily: "var(--font-body)", fontStyle: "italic",
        }}>
          The Language dialog confirms the selected text is correctly marked
          as Spanish
        </figcaption>
      </figure>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
          <span style={{ minWidth: 180 }}>A11y automated checker</span>
          <span style={{ color: t.green, fontWeight: 600 }}>No issues reported</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ minWidth: 180 }}>MS Accessibility checker</span>
          <span style={{ color: t.green, fontWeight: 600 }}>No issues reported</span>
        </div>
      </div>
      <P>
        MS Word does not allow you to set a document-level language, like in
        PDF. You can only select text and mark pieces of text in a language.
        Word can also auto-detect language on the fly. This document has all
        text set as English-US except the passage in Spanish, which is
        programmatically identified as Spanish. This is the correct behavior,
        and Ally does not report any errors &mdash; which is accurate.
      </P>

      <H3>Visual clue: spellcheck underlines</H3>
      <P>
        One quick way to spot a language mismatch in Word is to look at the
        spellcheck underlines. When text is marked with the wrong proofing
        language, the spellchecker does not recognize the words and underlines
        nearly everything in red. If you see a block of foreign-language text
        covered in red squiggles, the proofing language is likely wrong.
      </P>
      <Callout type="tip">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Red underlines are not always a language problem
        </div>
        Spellcheck underlines can appear for other reasons &mdash; proper
        nouns, technical terms, or languages for which you do not have a
        proofing dictionary installed. But when you see a large block of
        foreign text covered in underlines, checking the proofing language
        should be your first step.
      </Callout>

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>

      <H3>Setting the proofing language on a passage</H3>
      <P>
        To fix the language of a specific passage in Word, select the text and
        assign the correct proofing language. This is the equivalent of
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html" target="_blank" rel="noopener noreferrer">WCAG 3.1.2 (Language of Parts)</a> for Word documents.
      </P>
      <Step number="1">Select the text that is in a different language.</Step>
      <Step number="2">
        Go to <strong>Review &rarr; Language &rarr; Set Proofing
        Language</strong> (on Mac: <strong>Tools &rarr; Language</strong>).
      </Step>
      <Step number="3">
        In the Language dialog, choose the correct language for the selected
        text (e.g., <strong>Spanish</strong> for Spanish text).
      </Step>
      <Step number="4">Click <strong>OK</strong>.</Step>
      <Step number="5">
        Verify the spellcheck underlines disappear. If they do, the proofing
        language is now correct.
      </Step>

      <H3>Using Detect language automatically</H3>
      <P>
        Word&apos;s <strong>Detect language automatically</strong> feature
        can often assign the correct proofing language without manual
        intervention. To enable it:
      </P>
      <Step number="1">
        Go to <strong>Review &rarr; Language &rarr; Set Proofing
        Language</strong>.
      </Step>
      <Step number="2">
        Check <strong>Detect language automatically</strong> at the bottom of
        the dialog.
      </Step>
      <Step number="3">Click <strong>OK</strong>.</Step>
      <P>
        When enabled, Word watches as you type and switches the proofing
        language for new text runs automatically. However, it does not
        retroactively fix text that was already tagged with the wrong
        language. For existing content, you still need to select the text and
        set the language manually.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Auto-detect is not always correct
        </div>
        Word&apos;s language auto-detection can misidentify languages,
        especially for short passages or languages with similar character
        sets (e.g., Spanish vs. Portuguese, or Norwegian vs. Danish). Always
        verify the result &mdash; particularly for content that will be used
        in an accessibility-sensitive context.
      </Callout>

      <H3>Setting the default language for new documents</H3>
      <P>
        If you regularly author documents in a language other than your
        system default, you can change Word&apos;s default proofing language:
      </P>
      <Step number="1">
        Go to <strong>Review &rarr; Language &rarr; Set Proofing
        Language</strong>.
      </Step>
      <Step number="2">Select the language you want as the default.</Step>
      <Step number="3">
        Click <strong>Default&hellip;</strong> at the bottom of the dialog.
      </Step>
      <Step number="4">
        Confirm the change. New documents will use this language for all new
        text.
      </Step>

      <H3>What happens when you export to PDF</H3>
      <P>
        When you save or export a Word document as PDF, the language
        assignments carry over &mdash; with caveats. The predominant language
        of the document becomes the PDF&apos;s document-level language, and
        individual text runs should retain their language tags if the export
        is done properly (using <strong>Save As PDF</strong> rather than
        printing to PDF). If the Word document has the wrong languages
        assigned, the PDF inherits those errors.
      </P>

      {/* ── Sample Files to Test in Ally ── */}
      <SH id="sample-files">Sample Files to Test in Ally</SH>
      <P>
        Download either Word document below, upload it to a course in your
        LMS, and run Ally. Use them to see how Ally handles language detection
        in Word documents, or to practice fixing the issue.
      </P>
      <div style={{
        display: "grid",
        gap: 16,
        marginTop: 20,
        marginBottom: 24,
      }}>
        <div style={{
          padding: "20px 24px",
          borderRadius: 10,
          border: `1px solid ${t.border}`,
          backgroundColor: t.surfaceAlt,
        }}>
          <div style={{
            fontSize: "var(--fs-base)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: t.text,
            marginBottom: 6,
          }}>
            Wrong language of parts
          </div>
          <P>
            This Word document contains a Spanish passage whose proofing
            language is set to <strong>French</strong>. Ally should
            flag &quot;Document does not have the correct language
            set&quot; (when the check fires). Open in Word to see the
            spellcheck underlines, or upload to Ally to see the error.
          </P>
          <a
            href="/documents/wrong-language-of-parts.docx"
            download
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: 6,
              backgroundColor: t.accent,
              color: t.accentContrast,
              fontSize: "var(--fs-sm)",
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              textDecoration: "none",
            }}
          >
            Download wrong-language-of-parts.docx
          </a>
        </div>
        <div style={{
          padding: "20px 24px",
          borderRadius: 10,
          border: `1px solid ${t.border}`,
          backgroundColor: t.surfaceAlt,
        }}>
          <div style={{
            fontSize: "var(--fs-base)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: t.text,
            marginBottom: 6,
          }}>
            Correct language of parts
          </div>
          <P>
            The same document with the Spanish passage correctly identified
            as Spanish. Neither Ally nor the MS Accessibility Checker reports
            any issues. Use it as a comparison or as a correctly tagged
            reference file.
          </P>
          <a
            href="/documents/correct-language-of-parts.docx"
            download
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: 6,
              backgroundColor: t.accent,
              color: t.accentContrast,
              fontSize: "var(--fs-sm)",
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              textDecoration: "none",
            }}
          >
            Download correct-language-of-parts.docx
          </a>
        </div>
      </div>

      {/* ── What Ally Catches and Misses ── */}
      <SH id="ally-detection">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Partially detects when a text run has the wrong language assigned. Ally flags the document-level error but does not identify which passage is wrong."
        misses="Does not pinpoint the specific text with the wrong language. Does not detect missing language tags on foreign passages when the rest of the document language is correct. Microsoft's built-in Accessibility Checker does not flag language issues at all."
      />
      <P>
        Ally&apos;s detection for Word language issues is <strong>partial at
        best</strong>. When it fires, the error message points to the
        document as a whole rather than the specific passage. An author
        seeing &quot;Document does not have the correct language set&quot;
        has no way to know which paragraph to fix without manually reviewing
        the entire document.
      </P>
      <div style={{
        padding: "16px 22px", borderRadius: 10,
        backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}`,
        margin: "16px 0 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)", lineHeight: 2, color: t.textSecondary,
      }}>
        Spanish text, language = Spanish <span style={{ color: t.green }}>passes</span><br/>
        Spanish text, language = French <span style={{ color: t.amber }}>partially detected</span> &mdash; Ally flags but does not pinpoint<br/>
        Spanish text, language = English <span style={{ color: t.amber }}>partially detected</span> &mdash; same vague message<br/>
        All text same language (correct) <span style={{ color: t.green }}>passes</span>
      </div>
      <P>
        The spellchecker underlines remain the most practical visual cue for
        authors. If a block of foreign text is covered in red squiggles,
        check the proofing language first.
      </P>

      {/* ── Other Tools ── */}
      <SH id="other-tools">Check It With Other Tools</SH>
      {[
        {
          name: "Microsoft Accessibility Checker",
          meta: "Built into Word \u00b7 Review \u2192 Check Accessibility",
          desc: "Does not check for language issues at all. In testing, the checker reported no issues even when text was assigned the wrong proofing language.",
        },
        {
          name: "Word Spellchecker (visual inspection)",
          meta: "Built into Word \u00b7 always active",
          desc: "Not a formal accessibility tool, but the red spellcheck underlines are the most visible indicator that a proofing language mismatch exists. If a block of foreign text shows underlines on nearly every word, the proofing language is likely wrong.",
        },
        {
          name: "Screen reader testing",
          meta: "NVDA (free) \u00b7 JAWS \u00b7 VoiceOver (macOS/iOS)",
          desc: "The only reliable way to verify language of parts. Open the Word document and listen. If the pronunciation sounds wrong when the screen reader reaches a foreign-language passage, the language tag is missing or incorrect.",
        },
      ].map((tool, i) => (
        <div key={i} style={{
          padding: "20px 24px", borderRadius: 10,
          backgroundColor: t.surface, border: `1px solid ${t.border}`,
          margin: `0 0 ${i < 2 ? 14 : 20}px`,
        }}>
          <div style={{
            fontSize: "var(--fs-base)", fontWeight: 700, color: t.text,
            fontFamily: "var(--font-display)", marginBottom: 4,
          }}>{tool.name}</div>
          <div style={{
            fontSize: "var(--fs-sm)", color: t.textTertiary,
            fontFamily: "var(--font-display)", marginBottom: 12,
          }}>{tool.meta}</div>
          <div style={{
            fontSize: "var(--fs-base)", lineHeight: 1.65, color: t.textSecondary,
            fontFamily: "var(--font-body)",
          }}>{tool.desc}</div>
        </div>
      ))}

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Set proofing language", "Review \u2192 Language \u2192 Set Proofing Language (or Tools \u2192 Language on Mac)"],
        ["Auto-detect language", "Enable \u201CDetect language automatically\u201D in the Language dialog"],
        ["Change default language", "Language dialog \u2192 select language \u2192 click Default\u2026"],
        ["Check before uploading", "Look for spellcheck underlines on foreign text; use a screen reader"],
        ["Ally error (missing)", "\u201CDocument does not have a language set\u201D"],
        ["Ally error (wrong)", "\u201CDocument does not have the correct language set\u201D"],
        ["Ally detection", "Unreliable for Word \u2014 partially detected in testing"],
        ["MS Accessibility Checker", "Does not flag language issues"],
        ["WCAG criteria", "3.1.1 Language of Page (A) / 3.1.2 Language of Parts (AA)"],
        ["Ally severity", "Minor"],
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
        title="Microsoft Support: Check spelling and grammar in a different language"
        href="https://support.microsoft.com/en-us/office/check-spelling-and-grammar-in-a-different-language-667ba67a-a202-42fd-8f45-571d16a31b24"
        description="How to change the proofing language for selected text in Word"
      />
      <ResourceLink
        title="Microsoft Support: Add an editing or authoring language"
        href="https://support.microsoft.com/en-us/office/add-an-editing-or-authoring-language-or-set-language-preferences-in-office-663d9d94-ca99-4a0d-973e-7c4a6b8a827d"
        description="How to add language packs and set language preferences in Office"
      />
      <ResourceLink
        title="WebAIM: Microsoft Word -- Creating Accessible Documents"
        href="https://webaim.org/techniques/word/"
        description="Comprehensive guide to creating accessible Word documents"
      />
      <ResourceLink
        title="Accessible Digital Office Document (ADOD) Project: Word"
        href="https://adod.idrc.ocadu.ca/word2016.html"
        description="Step-by-step guide including language settings for accessible Word documents"
      />
    </ContentPageLayout>
  );
}
