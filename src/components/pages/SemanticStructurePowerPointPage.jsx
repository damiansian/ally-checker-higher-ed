import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
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

export default function SemanticStructurePowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="powerpoint"
      title="Semantic Structure"
      subtitle="PowerPoint Presentations"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Presentation does not have slide titles"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags PowerPoint files where slides lack a designated title.
        Each slide should have a title placeholder (or equivalent) so
        screen reader users can navigate by slide and understand context.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Slide titles are the equivalent of headings in a Word document.
        Without them, users cannot jump from slide to slide by name or get
        a quick overview of the deck. A screen reader user navigating a
        40-slide presentation with no titles has no way to skip to the
        relevant section without reading every slide in sequence.
      </P>
      <P>
        The title placeholder is also how PowerPoint communicates slide
        identity in exported formats. When PDFs are generated from a
        presentation, slide titles become bookmark entries. When slides are
        uploaded to an LMS, the title determines what the thumbnail or file
        entry is labeled.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding slide titles</H3>
      <Step number="1">On each slide, ensure the title placeholder at the top is used. Click &quot;Click to add title&quot; and enter a descriptive title.</Step>
      <Step number="2">If the slide layout has no title placeholder, switch to a layout that includes one: <strong>Home → Layout</strong> and choose a layout with a title area.</Step>
      <Step number="3">Do not leave the title blank or use a text box for the main title instead of the placeholder; Ally and screen readers rely on the placeholder.</Step>
      <Step number="4">Use unique, meaningful titles so the slide list is useful for navigation.</Step>

      <SH id="lists">Lists</SH>
      <P>
        Ally flags <strong>faked lists</strong> - content that looks like a
        list but uses typed bullet characters or numbers instead of
        PowerPoint&apos;s list tools. Use the <strong>Home</strong> tab
        <strong> Bullets</strong> or <strong>Numbering</strong> buttons on
        placeholders or text boxes so the list structure is exposed to
        screen readers. Do not type • or &quot;1.&quot; &quot;2.&quot;
        manually.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing slide titles, slides without a title placeholder, faked lists (manual bullets/numbers)"
        misses="Whether title text is meaningful, logical slide order, reading order of objects, list nesting"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not check if the title text is descriptive. It also may
        not fully evaluate reading order when slides have multiple text
        boxes or overlapping content.
      </P>

      <SH id="check-tools">Check It With Other Tools</SH>
      <H3>Outline View</H3>
      <P>
        Use <strong>View → Outline View</strong> to audit the slide title
        structure. Only text in the title placeholder appears at the top
        indentation level. If slides show no text at that level, the title
        placeholder is missing or empty. Outline View also reveals reading
        order for body content on each slide.
      </P>
      <H3>Microsoft Accessibility Checker</H3>
      <P>
        PowerPoint&apos;s built-in checker (<strong>Review → Check
        Accessibility</strong>) flags missing titles and other issues such
        as missing alt text and reading order problems.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally errors", "No slide titles; lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Titles", "Use title placeholder on every slide; Home → Layout if missing"],
        ["Lists", "Home → Bullets or Numbering; do not type bullets/numbers"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained"
      />
      <ResourceLink
        title="Microsoft: Make your PowerPoint presentations accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="Comprehensive guide to PowerPoint accessibility including slide titles and reading order"
      />
      <ResourceLink
        title="WebAIM: PowerPoint Accessibility"
        href="https://webaim.org/techniques/powerpoint/"
        description="Techniques for creating accessible PowerPoint presentations"
      />
    </ContentPageLayout>
  );
}
