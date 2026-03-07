export const categories = [
  {
    id: "text-alternatives",
    name: "Text Alternatives",
    slug: "text-alternatives",
    description:
      "Images, graphics, and non-text content need text descriptions so screen readers can convey meaning to students who can't see them.",
    likelihood: 5,
    impact: 5,
    fileTypes: {
      docx: "checked",
      pptx: "checked",
      pdf: "checked",
      canvas: "checked",
      image: "checked",
    },
    allyChecks: 3,
    allyCatches:
      "Presence of alt text across all file types",
    allyMisses:
      "Quality of alt text, whether description is meaningful or accurate, if image should be decorative",
    wcag: "1.1.1",
  },
  {
    id: "color",
    name: "Color",
    slug: "color",
    description:
      "Text must have sufficient contrast against its background (WCAG 1.4.3). Color must not be the only way to convey information (WCAG 1.4.1); students who cannot perceive color need other cues.",
    likelihood: 4,
    impact: 4,
    fileTypes: {
      docx: "checked",
      pptx: "checked",
      pdf: "checked",
      canvas: "checked",
      image: "na",
    },
    allyChecks: 1,
    allyCatches:
      "Contrast ratio below 4.5:1 (or 3:1 for large text). Color-as-sole-means is not checked by Ally.",
    allyMisses:
      "Color as sole indicator (1.4.1), contrast in images/charts, branded templates",
    wcag: "1.4.1 / 1.4.3",
  },
  {
    id: "semantic-structure",
    name: "Semantic Structure",
    slug: "semantic-structure",
    description:
      "Headings, titles, and document structure let students navigate and understand content organization. Without them, a 20-page document is a wall of text with no way to jump to the section a student needs.",
    likelihood: 5,
    impact: 4,
    fileTypes: {
      docx: "checked",
      pptx: "checked",
      pdf: "checked",
      canvas: "checked",
      image: "na",
    },
    allyChecks: 4,
    allyCatches:
      "Missing headings, skipped levels, missing slide/page titles, untagged PDFs",
    allyMisses:
      "Whether heading text is meaningful, logical content order, reading sequence in PowerPoint and PDF",
    wcag: "1.3.1 / 2.4.1 / 2.4.6",
  },
  {
    id: "tables",
    name: "Tables",
    slug: "tables",
    description:
      "Data tables need marked header rows so screen readers can announce column context as students navigate cells.",
    likelihood: 3,
    impact: 4,
    fileTypes: {
      docx: "checked",
      pptx: "checked",
      pdf: "checked",
      canvas: "checked",
      image: "na",
    },
    allyChecks: 2,
    allyCatches: "Tables without designated header rows; table headers with empty content",
    allyMisses:
      "Layout tables misused for formatting, row headers not designated, overly complex structures, whether a table is the right format at all",
    wcag: "1.3.1",
  },
  {
    id: "lists",
    name: "Lists",
    slug: "lists",
    description:
      "Bulleted and numbered content must use real list markup so screen readers announce list type and item count. Faked lists (typed dashes, bullets, or numbers) are invisible to assistive technology.",
    likelihood: 4,
    impact: 3,
    fileTypes: {
      docx: "checked",
      pptx: "checked",
      pdf: "checked",
      canvas: "checked",
      image: "na",
    },
    allyChecks: 1,
    allyCatches:
      "Faked lists: content that visually appears as a list but lacks proper list markup",
    allyMisses:
      "Correct nesting of multi-level lists, whether content should be a list vs paragraphs. Microsoft checker and Acrobat typically do not flag faked lists.",
    wcag: "1.3.1",
  },
  {
    id: "language",
    name: "Language",
    slug: "language",
    description:
      "Documents need a language set so screen readers know how to pronounce the text. Without it, an English screen reader might try to read Spanish content with English phonetics.",
    likelihood: 3,
    impact: 3,
    fileTypes: {
      docx: "unreliable",
      pptx: "unreliable",
      pdf: "unreliable",
      canvas: "checked",
      image: "na",
    },
    allyChecks: 2,
    allyCatches:
      "Missing or incorrect language attribute (HTML via axe-core)",
    allyMisses:
      "In testing, language checks failed to fire for DOCX, PPTX, and PDF despite documentation claiming coverage",
    wcag: "3.1.1 / 3.1.2",
    caveat:
      "Ally's language detection may not work reliably outside of HTML content",
  },
  {
    id: "seizure-risk",
    name: "Seizure Risk",
    slug: "seizure-risk",
    description:
      "Flashing or rapidly animated content can trigger seizures in students with photosensitive epilepsy. This cannot be demonstrated safely.",
    likelihood: 1,
    impact: 5,
    fileTypes: {
      docx: "gap",
      pptx: "gap",
      pdf: "gap",
      canvas: "gap",
      image: "checked",
    },
    allyChecks: 1,
    allyCatches:
      "Animated images (GIFs) with rapid flashing",
    allyMisses:
      "Flashing in embedded video, auto-playing media, PowerPoint animations/transitions, CSS animations",
    wcag: "2.3.1",
  },
];

export const fileTypeMeta = {
  docx: { label: "Word", slug: "word" },
  pptx: { label: "PowerPoint", slug: "powerpoint" },
  pdf: { label: "PDF", slug: "pdf" },
  canvas: { label: "Canvas editor", slug: "canvas" },
  image: { label: "Image", slug: "image" },
};

export const stateInfo = {
  checked: { label: "Ally checks", short: "Checked" },
  gap: { label: "Ally doesn't check", short: "Gap" },
  unreliable: { label: "Unreliable", short: "Unreliable" },
  na: { label: "Not applicable", short: "N/A" },
};

// Ally error messages keyed by category > file type
export const allyMessages = {
  "text-alternatives": {
    docx: "Document has images without alt descriptions",
    pptx: "Presentation has images without alt descriptions",
    pdf: "PDF has images without alternative descriptions",
    canvas: "Images must have alternate text description",
    image: "Image does not have alternative description",
  },
  color: {
    docx: "Document has text with insufficient contrast",
    pptx: "Presentation has text with insufficient contrast",
    pdf: "PDF has contrast issues",
    canvas: "Text must have sufficient color contrast",
  },
  "semantic-structure": {
    docx: "Document does not have any headings",
    pptx: "Presentation does not have slide titles",
    pdf: "PDF does not have any headings",
    canvas: "Headings should be present",
  },
  lists: {
    docx: "Lists should be formatted as lists",
    pptx: "Lists should be formatted as lists",
    pdf: "Lists should be formatted as lists",
    canvas: "Lists should be formatted as lists",
  },
  tables: {
    docx: "This document contains tables that are missing headers",
    pptx: "Presentation tables don't have headers",
    pdf: "PDF tables don't have headers",
    canvas: "This item contains table headers that are missing content",
  },
  language: {
    docx: [
      "Document does not have a language set",
      "Document does not have the correct language set",
    ],
    pptx: [
      "Presentation does not have a language set",
      "Presentation does not have the correct language set",
    ],
    pdf: [
      "PDF does not have a language set",
      "PDF does not have the correct language set",
    ],
    canvas: "<html> element must have a lang attribute",
  },
  "seizure-risk": {
    image: "Image can induce seizures",
  },
};
