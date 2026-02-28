import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Placeholder,
} from "@/components/content.jsx";

const tocSections = [
  { id: "ally-error", label: "The Ally Error" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "how-to-fix", label: "How to Fix It" },
  { id: "ally-catches", label: "What Ally Catches" },
  { id: "ally-misses", label: "What Ally Misses" },
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

export default function SemanticStructurePowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="powerpoint"
      title="DRAFT — Semantic Structure"
      subtitle="PowerPoint Presentations"
      tocSections={tocSections}
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
        Slide titles act as headings for the presentation. Without them,
        users cannot jump from slide to slide by name or get a quick
        overview of the deck. Export to PDF or upload to an LMS preserves
        this need.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding slide titles</H3>
      <Step number="1">On each slide, ensure the title placeholder at the top is used. Click &quot;Click to add title&quot; and enter a descriptive title.</Step>
      <Step number="2">If the slide layout has no title placeholder, switch to a layout that includes one: <strong>Home → Layout</strong> and choose a layout with a title area.</Step>
      <Step number="3">Do not leave the title blank or use a text box for the main title instead of the placeholder; Ally and screen readers rely on the placeholder.</Step>
      <Step number="4">Use unique, meaningful titles so the slide list is useful for navigation.</Step>
      <Placeholder label="Screenshot: PowerPoint slide with title placeholder filled and Layout menu" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing slide titles, slides without a title placeholder"
        misses="Whether title text is meaningful, logical slide order, reading order of objects"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not check if the title text is descriptive. It also may
        not fully evaluate reading order when slides have multiple text
        boxes or overlapping content.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Presentation does not have slide titles"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Use title placeholder on every slide; Home → Layout if missing"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained"
      />
      <ResourceLink
        title="Microsoft: Make slides more accessible"
        href="https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2a33-4bd2-8ca7-dae3b2b3ef25"
        description="PowerPoint accessibility"
      />
    </ContentPageLayout>
  );
}
