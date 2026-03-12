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

/* Phonetic transcripts: how the passage sounds when read with the wrong language.
   Approximate "sounds-like" spelling for the first two sentences. */
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
              fontSize: "var(--fs-base)",
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

export default function LanguagePdfPage() {
  const { t } = useTheme();

  return (
    <ContentPageLayout
      categorySlug="language"
      fileTypeSlug="pdf"
      title="Language"
      subtitle="PDF Documents"
    >
      {/* ── The Ally Errors ── */}
      <SH id="ally-error">The Ally Errors</SH>
      <AllyErrorBox
        message="PDF does not have a language set"
        severity="Minor"
        wcag="3.1.1 Language of Page (Level A)"
      />
      <AllyErrorBox
        message="PDF does not have the correct language set"
        severity="Minor"
        wcag="3.1.2 Language of Parts (Level AA)"
      />
      <P>
        Ally flags two language issues in PDFs. The first fires when no
        document-level language is set at all. The second fires when the
        language metadata exists but does not match the actual content.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Unreliable detection
        </div>
        In testing, Ally&apos;s language checks failed to fire consistently for
        PDF documents despite documentation claiming coverage. The file type is
        marked as <strong>unreliable</strong> on the home page for this reason.
        You should not rely on Ally alone to catch language issues in PDFs.
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
        scenario: a PDF authored in English contains a Spanish passage that was
        never tagged with a different language.
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

      {/* ── How to Fix It ── */}
      <SH id="how-to-fix">How to Fix It</SH>

      <H3>Setting the document language</H3>
      <P>
        The document-level language is set in the PDF&apos;s metadata. If you
        create your PDF from a Word document, the language
        should carry over. If it does not:
      </P>
      <Step number="1">Open the PDF in Adobe Acrobat Pro.</Step>
      <Step number="2">Go to <strong>File &rarr; Properties</strong> (or <strong>Ctrl+D</strong>).</Step>
      <Step number="3">Select the <strong>Advanced</strong> tab.</Step>
      <Step number="4">Under <strong>Reading Options</strong>, choose the correct language from the <strong>Language</strong> dropdown.</Step>
      <Step number="5">Click <strong>OK</strong>.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-document-properties-language.png"
          alt="Screenshot of the Document Properties dialog in Adobe Acrobat, with the Advanced tab selected and the Language dropdown menu open under Reading Options. The open dropdown displays a list of languages including Danish, Dutch, English, English with Arabic support, English with Hebrew support, and Estonian."
          width={640}
          height={480}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
      </figure>

      <H3>Setting language for a specific passage</H3>
      <P>
        When your PDF contains passages in a different language than the document
        default, tag those passages individually (<a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html" target="_blank" rel="noopener noreferrer">WCAG 3.1.2</a>).
      </P>
      <Step number="1">Open the PDF in Adobe Acrobat Pro.</Step>
      <Step number="2">Open the <strong>Accessibility</strong> tags panel (<strong>View &rarr; Show/Hide &rarr; Navigation Panes &rarr; Tags</strong>).</Step>
      <Step number="3">Find and select the tag containing the foreign-language text.</Step>
      <Step number="4">Right-click the tag and select <strong>Properties</strong>.</Step>
      <Step number="5">In the <strong>Tag</strong> tab, set the <strong>Language</strong> field to the correct language code (e.g., <Code>es</Code> for Spanish, <Code>fr</Code> for French).</Step>
      <Step number="6">Click <strong>Close</strong>.</Step>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-tag-properties-language.png"
          alt="Screenshot of an Object Properties dialog with the Tag tab selected. The Language field is highlighted, showing Spanish as the selected language with a dropdown arrow, indicating where to set the language for a specific passage."
          width={640}
          height={480}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
      </figure>

      {/* ── Fix Language in Ally ── */}
      <SH id="fix-in-ally">Fix Language in Ally</SH>
      <P>
        Ally can both flag missing or wrong language and provide a way to fix it.
        Using Ally&apos;s fix workflow to set or correct the PDF language is a valid
        test and a valid fix: you confirm the issue in Ally and resolve it
        without leaving your LMS.
      </P>
      <P>
        When Ally reports a language error on a PDF, use the fix option to set
        the document language (or correct it). The exact steps depend on your
        Ally version and LMS; typically you choose the language from a dropdown
        and apply the fix. Once applied, re-run Ally to confirm the issue is
        resolved.
      </P>

      {/* ── Sample PDFs to Test in Ally ── */}
      <SH id="sample-pdfs">Sample PDFs to Test in Ally</SH>
      <P>
        You can try Ally&apos;s language checks yourself. Download either PDF below,
        upload it to a course in your LMS, and run Ally. You should see Ally
        flag the language issue (when the check fires for PDFs). Use the sample
        to practice the fix in Ally or to compare with a correctly tagged
        version.
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
            fontSize: "var(--fs-lg)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: t.text,
            marginBottom: 6,
          }}>
            No language set
          </div>
          <P style={{ margin: "0 0 12px" }}>
            This PDF has no document language set. Ally should flag it as
            &quot;PDF does not have a language set&quot; (when detection runs).
            Use it with a screen reader to hear the wrong pronunciation, or
            upload to Ally to see the error and practice the fix.
          </P>
          <a
            href="/documents/no-language.pdf"
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
            Download no-language.pdf
          </a>
        </div>
        <div style={{
          padding: "20px 24px",
          borderRadius: 10,
          border: `1px solid ${t.border}`,
          backgroundColor: t.surfaceAlt,
        }}>
          <div style={{
            fontSize: "var(--fs-lg)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: t.text,
            marginBottom: 6,
          }}>
            Wrong language of parts
          </div>
          <P style={{ margin: "0 0 12px" }}>
            This PDF contains a Spanish passage tagged with the wrong language.
            Ally may flag &quot;PDF does not have the correct language set&quot;
            depending on how it checks. Use it to compare screen reader
            pronunciation or to test Ally&apos;s fix for language of parts.
          </P>
          <a
            href="/documents/wrong-language-of-parts.pdf"
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
            Download wrong-language-of-parts.pdf
          </a>
        </div>
      </div>

      {/* ── What Ally Catches and Misses ── */}
      <SH id="ally-detection">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Missing document-level language attribute. If no language is set at all, Ally flags it (when the check fires -- see caveat about unreliable detection)."
        misses="Wrong document language, wrong or missing language of parts (passages in a different language), and whether the declared language matches the content."
      />
      <P>
        Ally checks whether a language attribute <strong>exists</strong>, not
        whether it is <strong>correct</strong>. A PDF with every word in English
        but the language set to French passes every automated check.
      </P>
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
        No automated tool -- Ally, PAC, or Acrobat&apos;s built-in checker --
        can detect incorrect language of parts. The only reliable test is
        listening with a screen reader.
      </P>

      {/* ── Other Tools ── */}
      <SH id="other-tools">Check It With Other Tools</SH>
      {[
        {
          name: "PAC (PDF Accessibility Checker)",
          meta: "Free \u00b7 Windows",
          desc: "Checks for document-level language. Like Ally, catches missing language but not wrong language or missing language of parts.",
        },
        {
          name: "Adobe Acrobat Pro Accessibility Check",
          meta: "Accessibility \u2192 Accessibility Check",
          desc: "The most complete automated check for PDF language, but still cannot detect incorrect language of parts.",
        },
        {
          name: "Screen reader testing",
          meta: "NVDA (free) \u00b7 JAWS \u00b7 VoiceOver (macOS/iOS)",
          desc: "The only reliable way to verify language of parts. Open the PDF and listen -- if the pronunciation sounds wrong, the language tag is missing or incorrect.",
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
      <P>
        In Acrobat Pro, when no document language is set, the Accessibility
        Checker reports <strong>Primary language &mdash; Failed</strong>:
      </P>
      <figure style={{ margin: "24px 0" }}>
        <img
          src="/images/acrobat-checker-primary-language-failed.png"
          alt="Screenshot of the Acrobat Accessibility Checker dialog showing Document (3 issues). Primary language is marked Failed with a red X; other items include Accessibility permission flag Passed, Tagged PDF Passed, Logical Reading Order and Color contrast Needs manual check, Title and Bookmarks Passed."
          width={480}
          height={360}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            border: `1px solid ${t.border}`,
          }}
        />
      </figure>

      {/* ── Quick Reference ── */}
      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Set document language", "Acrobat: File \u2192 Properties \u2192 Advanced \u2192 Language"],
        ["Set language of parts", "Acrobat: Tags panel \u2192 Tag Properties \u2192 Language"],
        ["Check before uploading", "PAC or Acrobat Accessibility Check"],
        ["Ally error (missing)", "\u201CPDF does not have a language set\u201D"],
        ["Ally error (wrong)", "\u201CPDF does not have the correct language set\u201D"],
        ["WCAG criteria", "3.1.1 Language of Page (A) / 3.1.2 Language of Parts (AA)"],
        ["Ally severity", "Minor"],
        ["Ally detection", "Unreliable for PDF"],
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
        title="Adobe HelpX: Create and verify PDF accessibility (Acrobat Pro)"
        href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html"
        description="Document language and language of parts (Tags panel) in Acrobat"
      />
      <ResourceLink
        title="Adobe HelpX: Spell check and language dictionaries (InDesign)"
        href="https://helpx.adobe.com/indesign/using/spell-checking-language-dictionaries.html"
        description="Set language for text in InDesign (character attribute; exports to tagged PDF)"
      />
      <ResourceLink
        title="PAC (PDF Accessibility Checker)"
        href="https://pac.pdf-accessibility.org/"
        description="Free tool for checking PDF accessibility including language"
      />
      <ResourceLink
        title="WebAIM: PDF Accessibility"
        href="https://webaim.org/techniques/acrobat/"
        description="Comprehensive guide to creating accessible PDFs"
      />
    </ContentPageLayout>
  );
}
