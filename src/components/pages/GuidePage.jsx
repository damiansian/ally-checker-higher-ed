import { useState } from "react";
import { useTheme } from "@/components/theme.jsx";
import { SideNav, MobileHeader } from "@/components/layout.jsx";
import { Callout } from "@/components/content.jsx";

function guideStyles(t) {
  const thBase = {
    padding: "12px 16px", fontWeight: 700, color: t.textSecondary,
    textAlign: "left", fontFamily: "var(--font-display)",
  };
  const tdBase = { padding: "12px 16px", color: t.textSecondary, verticalAlign: "top" };
  return {
    thBase,
    thFirst: { ...thBase, padding: "12px 16px 12px 0" },
    tdBase,
    tdFirst: { ...tdBase, padding: "12px 16px 12px 0", fontWeight: 600, color: t.text },
    pageTitle: {
      fontSize: "var(--fs-3xl)", fontWeight: 800, color: t.text,
      fontFamily: "var(--font-display)", letterSpacing: "-0.03em",
      margin: "0 0 12px", lineHeight: 1.15,
    },
    subtitle: {
      fontSize: "var(--fs-xl)", lineHeight: 1.6, color: t.textSecondary,
      fontFamily: "var(--font-body)", maxWidth: 640, margin: "0 0 40px",
    },
    footer: {
      borderTop: `1px solid ${t.border}`, padding: "24px 32px",
      textAlign: "center", fontSize: "var(--fs-xs)", color: t.textTertiary,
      fontFamily: "var(--font-display)",
    },
  };
}

function SH({ id, children }) {
  const { t } = useTheme();
  return (
    <h2 id={id} style={{
      fontSize: "var(--fs-2xl)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      letterSpacing: "-0.01em",
      marginTop: 56, marginBottom: 16,
      paddingTop: 20, scrollMarginTop: 80,
      borderBottom: `1px solid ${t.border}`,
      paddingBottom: 10,
    }}>{children}</h2>
  );
}

function H3({ id, children }) {
  const { t } = useTheme();
  return (
    <h3 id={id} style={{
      fontSize: "var(--fs-lg)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      marginTop: 36, marginBottom: 12,
      scrollMarginTop: 80,
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
      maxWidth: 720,
    }}>{children}</p>
  );
}

function UL({ children }) {
  const { t } = useTheme();
  return (
    <ul style={{
      margin: "0 0 18px", paddingLeft: 24,
      fontFamily: "var(--font-body)", fontSize: "var(--fs-md)",
      lineHeight: 1.75, color: t.text, maxWidth: 720,
    }}>
      {children}
    </ul>
  );
}

function CheckerTable() {
  const { t } = useTheme();
  const s = guideStyles(t);
  const rows = [
    ["Missing alt text", "Detected", "Detected", "Detected"],
    ["AI-generated alt text", "Not detected", "Detected", "Not detected"],
    ["File name as alt text", "Detected", "Detected", "Not detected"],
    ["Faked lists", "Detected", "Not detected", "Not detected"],
    ["Missing headings", "Detected", "Detected (slide titles)", "Detected (tag tree)"],
    ["Table headers", "Detected", "Detected", "Detected"],
    ["Text contrast", "Detected", "Detected", "Not checked"],
    ["Document language", "Unreliable (except HTML)", "Not checked", "Missing only"],
    ["Color as sole means", "Not checked", "Not checked", "Not checked"],
    ["Alt text quality", "Not checked", "Not checked", "Not checked"],
    ["Reading order", "Not checked", "Not checked", "Partial"],
  ];
  return (
    <figure style={{ margin: "24px 0" }}>
      <div
        role="region"
        aria-label="Scrollable checker comparison table"
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex -- scrollable region needs keyboard access
        style={{ overflowX: "auto" }}
      >
        <table style={{
          width: "100%", borderCollapse: "collapse",
          fontSize: "var(--fs-base)", fontFamily: "var(--font-body)", minWidth: 600,
        }} aria-label="Checker detection comparison across Ally, Microsoft, and Acrobat">
          <thead>
            <tr style={{ borderBottom: `2px solid ${t.border}` }}>
              <th scope="col" style={s.thFirst}>Issue</th>
              <th scope="col" style={s.thBase}>Ally</th>
              <th scope="col" style={s.thBase}>MS Office</th>
              <th scope="col" style={s.thBase}>Acrobat</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([issue, ally, ms, acrobat], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                <td style={s.tdFirst}>{issue}</td>
                <td style={s.tdBase}>{ally}</td>
                <td style={s.tdBase}>{ms}</td>
                <td style={s.tdBase}>{acrobat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function GuidePage() {
  const { t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const s = guideStyles(t);

  return (
    <div
      className="app-layout"
      style={{
        minHeight: "100vh",
        backgroundColor: t.bg,
        transition: "background-color 0.3s ease",
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SideNav activeCategorySlug="guide" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="main-area">
        <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main
          id="main-content"
          tabIndex={-1}
          style={{ maxWidth: 860, padding: "40px 48px 80px" }}
        >
        <h1 style={s.pageTitle}>
          Accessibility Guide
        </h1>
        <p style={s.subtitle}>
          What automated tools catch, what they miss, and why manual review is
          non-negotiable.
        </p>

        <SH id="impact">Impact on Students</SH>
        <P>
          Behind every accessibility guideline is a student trying to learn.
          The technical language of WCAG and the metrics of automated checkers
          can obscure that reality, so it is worth stating plainly what
          inaccessible content means in practice.
        </P>
        <P>
          A student who is blind and uses a screen reader encounters an image
          with no alt text. The screen reader announces &ldquo;Graphic.
          IMG_3847.png.&rdquo; The image might be a chart that the rest of the
          class is discussing, a diagram central to the week&rsquo;s
          assignment, or a decorative banner that could have been skipped
          entirely. The student has no way to know.
        </P>
        <P>
          A student with low vision enlarges their screen to 200%. A PowerPoint
          slide with light gray text on a white background, perfectly readable
          at standard size on the designer&rsquo;s monitor, becomes a wash of
          near-invisible content. Multiply this across a semester of weekly
          slide decks and the cognitive overhead becomes significant.
        </P>
        <P>
          A student who is deaf or hard of hearing opens a lecture recording
          with no captions. A student with a motor disability navigates a
          40-page PDF with no headings, forced to read through the document
          line by line because there is no structure to jump to.
        </P>
        <P>
          These are not edge cases. According to the National Center for
          Education Statistics, roughly 21% of undergraduate students report
          having a disability. Many do not disclose or register with disability
          services. Accessible content benefits students who never appear in
          accommodation letters: students learning in a second language,
          students in noisy environments, students with temporary injuries,
          students reading on a phone in poor lighting.
        </P>

        <SH id="shared-responsibility">Shared Responsibility</SH>
        <P>
          Accessibility in a course is not the sole responsibility of the
          instructor or the instructional designer. It is a shared obligation
          across everyone who creates or contributes content.
        </P>
        <H3 id="instructor-responsibility">Instructor and instructional designer responsibility</H3>
        <P>
          Instructors and instructional designers own the content they author
          and publish: syllabi, lecture slides, assignments, handouts, Canvas
          pages, and any files uploaded to the LMS. Responsibilities include:
        </P>
        <UL>
          <li>Authoring documents, slides, and pages with accessibility built in from the start, not remediated after the fact</li>
          <li>Running automated checks (Ally, Microsoft Accessibility Checker, Acrobat) before publishing</li>
          <li>Performing manual review for issues automated tools cannot catch</li>
          <li>Providing equivalent alternatives when content cannot be made fully accessible (e.g., a transcript for audio, a data table for a complex chart)</li>
          <li>Responding to student-reported barriers promptly</li>
        </UL>

        <H3 id="student-responsibility">Student responsibility</H3>
        <P>
          Students are also content creators. In discussion boards, peer review
          assignments, group wikis, and student-led presentations, students
          author content that other students must access.
        </P>
        <UL>
          <li><strong>Taught, not assumed.</strong> Most students have never encountered alt text, heading structure, or document language settings.</li>
          <li><strong>Scoped to the tools at hand.</strong> Students can reasonably be expected to add alt text, use heading styles, and choose readable colors. They should not be expected to remediate PDFs in Acrobat Pro.</li>
          <li><strong>Modeled by the course itself.</strong> Students are more likely to adopt accessible practices when the course content they receive is itself accessible.</li>
          <li><strong>Reinforced through feedback.</strong> When accessibility is part of assignment criteria, even lightly, it becomes part of the learning culture.</li>
        </UL>

        <SH id="two-types">Two Types of Accessibility Issues</SH>
        <P>
          Clearing every issue in Anthology Ally is a great place to start.
          Unfortunately, it is nowhere near the full scope of accessible course
          materials.
        </P>
        <P>
          <strong>Automated testing failures</strong> are issues that tools
          like Ally can detect programmatically: a missing alt text attribute,
          text contrast below 4.5:1, an improperly nested heading tag, a table
          with no designated headers, a faked list. These are structural,
          binary checks. The attribute exists or it doesn&rsquo;t. The ratio
          passes or it doesn&rsquo;t.
        </P>
        <P>
          <strong>Manual testing discoveries</strong> are issues that require
          human evaluation: alt text that exists but is meaningless, a heading
          structure that is technically present but logically incoherent, a
          color-coded rubric with no non-color indicator. No automated tool can
          assess whether content is <em>meaningful</em>, <em>clear</em>, or{" "}
          <em>instructionally sound</em>.
        </P>
        <Callout type="warning">
          <strong>It is possible to create course content that is massively
          inaccessible but still scores 100% in Ally.</strong> Consider a
          document where every paragraph is styled as Heading 2, every image
          has alt text that reads &ldquo;image,&rdquo; a layout table forces
          content into a two-column format, and an untranslated Spanish
          paragraph sits inside an English document with no language attribute.
          That document would score 100% in Ally.
        </Callout>

        <SH id="automated-testing">Automated Testing</SH>
        <P>
          Automated accessibility testing tools scan content against a set of
          programmatic rules. They are fast, consistent, and essential, but
          they are also limited to what can be evaluated without human
          interpretation.
        </P>
        <P>
          <strong>Anthology Ally</strong> runs checks on files uploaded to
          Canvas and on Canvas page content. It produces an accessibility score
          and flags issues with severity levels (Minor, Major, Severe). Ally is
          effective at catching:
        </P>
        <UL>
          <li>Missing alt text on images</li>
          <li>Insufficient color contrast ratios on text</li>
          <li>Skipping heading levels</li>
          <li>Tables without designated header rows</li>
          <li>Faked lists (content that looks like a list but uses manual bullets, dashes, or numbers instead of proper list styles)</li>
        </UL>
        <P>
          The most important limitation of any automated tool is that it checks
          for <strong>presence</strong>, not <strong>quality</strong>. Ally will
          pass an image whose alt text is &ldquo;asdf&rdquo; because alt text
          exists. It will pass a document whose every paragraph is tagged as
          Heading 1 because headings exist.
        </P>

        <SH id="manual-testing">Manual Testing</SH>
        <P>
          Manual testing fills the gaps that automated tools cannot reach. At
          minimum, an accessibility review of course content should include:
        </P>
        <UL>
          <li><strong>Reading alt text in context.</strong> Does each description convey the same information a sighted student would get from the image?</li>
          <li><strong>Navigating by headings.</strong> Using a screen reader&rsquo;s heading list (or the Navigation Pane in Word), can a student understand the document&rsquo;s structure?</li>
          <li><strong>Checking reading order.</strong> In PowerPoint and PDF, content may appear visually correct but be read in the wrong sequence.</li>
          <li><strong>Verifying table structure.</strong> For complex tables with merged cells or multiple header rows, a screen reader test confirms whether headers are announced correctly.</li>
          <li><strong>Listening to language.</strong> If a document contains passages in another language, a screen reader test reveals whether pronunciation switches correctly.</li>
          <li><strong>Reviewing color use.</strong> If color is used to indicate status or meaning, verify that a non-color indicator is also present.</li>
        </UL>
        <P>
          Manual review also extends to whether the content is instructionally
          clear enough to be usable by all students. A technically accessible
          document can still be inaccessible in practice if it is poorly
          organized, ambiguously written, or assumes visual context that is
          never stated in text. Accessibility and instructional clarity are not
          separate concerns.
        </P>

        <SH id="tools">Tool Comparison</SH>
        <P>
          No single tool catches everything. Ally misses AI-generated alt text
          that the Microsoft checker flags. Acrobat misses file-name alt text
          that Ally catches. Running one tool is a start; running all three
          closes more gaps.
        </P>
        <CheckerTable />

        <H3 id="ms-checker">Microsoft Accessibility Checker</H3>
        <P>
          Microsoft Word, PowerPoint, and Excel include a built-in
          Accessibility Checker (Review &gt; Check Accessibility). It runs
          locally before content is uploaded to the LMS and catches several
          issues that Ally does not, including AI-generated alt text.
        </P>
        <P>
          The Microsoft checker does <strong>not</strong> flag: language issues,
          alt text quality, color contrast in document content (though recent
          versions are adding this), reading order problems, or faked lists.
        </P>

        <H3 id="acrobat-checker">Acrobat Accessibility Checker</H3>
        <P>
          Adobe Acrobat Pro includes an Accessibility Check (Accessibility &gt;
          Accessibility Check) that evaluates PDF tag structure, reading order,
          and metadata. It runs 29 tests covering alt text, document language,
          tagged PDF structure, and tab/reading order.
        </P>
        <P>
          Acrobat does <strong>not</strong> flag: file name as alt text,
          AI-generated alt text, alt text quality, incorrect language (only
          missing), or language of parts.
        </P>
        <Callout type="tip">
          <strong>Fix at the source.</strong> Many PDFs created from Word or
          PowerPoint inherit their accessibility (or lack thereof) from the
          source document. Fixing issues at the source is almost always more
          efficient than remediating in Acrobat after export.
        </Callout>
        <P>
          For category-specific detection details, see the overview pages:{" "}
          <a href="/text-alternatives/">Text Alternatives</a>,{" "}
          <a href="/color/">Color</a>,{" "}
          <a href="/semantic-structure/">Semantic Structure</a>,{" "}
          <a href="/tables/">Tables</a>,{" "}
          <a href="/language/">Language</a>.
        </P>
        </main>

        <footer style={s.footer}>
          Canvas LMS Accessibility &middot; Damian Sian
        </footer>
      </div>
    </div>
  );
}
