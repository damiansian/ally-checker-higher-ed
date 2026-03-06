# Course Content Accessibility

## Overview

The aim of this workshop is not merely basic accessibility training. The aim is **accessibility literacy**: the ability to evaluate what tools catch, recognize what they miss, and make informed decisions about content that no automated check can make for you.

Every document, slide deck, and page published in a course creates an opportunity for access, or a barrier to it. Students who use screen readers, magnification, voice control, or other assistive technologies depend on content that is structured and authored with accessibility in mind.

The Web Content Accessibility Guidelines (WCAG) 2.2 Level AA is the standard that governs digital accessibility in higher education. It applies not just to websites but to every file uploaded or created in the LMS: Word documents, PowerPoint presentations, PDFs, and Canvas pages.

Accessibility checkers like **Anthology Ally** (integrated into Canvas LMS), **Microsoft's built-in Accessibility Checker**, and **Adobe Acrobat's Accessibility Check** can help identify issues, but each has significant blind spots. Research consistently shows that automated tools catch roughly **57% of accessibility barriers**.[^1] The rest require human judgment: Is this alt text actually meaningful? Does the heading structure reflect the content's logic? Will a screen reader pronounce this passage correctly?

**Getting to 100% in Ally is the starting line, not the finish.** A perfect Ally score means the content has passed the checks Ally can run. It does not mean the content is free of barriers to access for individuals with disabilities. Automated tools detect the presence of accessibility features (an alt text field that is not empty, a heading tag that exists, a contrast ratio above a threshold) but they cannot evaluate whether those features are meaningful. The remaining barriers, the ones that determine whether a student can actually use the content, require human inspection and manual testing.

This reference covers the accessibility issues most common in course content, organized around eight areas drawn from WCAG success criteria. For each, this reference describes what automated tools detect, what they miss, and what instructional designers and faculty need to verify manually.

| Category | WCAG | Likelihood | Impact |
|----------|------|------------|--------|
| Text Alternatives | 1.1.1 | 5 / 5 | 5 / 5 |
| Color Contrast | 1.4.3 | 4 / 5 | 4 / 5 |
| Color as Sole Means | 1.4.1 | 4 / 5 | 4 / 5 |
| Headings & Structure | 1.3.1, 2.4.1, 2.4.6 | 5 / 5 | 4 / 5 |
| Tables | 1.3.1 | 3 / 5 | 4 / 5 |
| Lists | 1.3.1 | 4 / 5 | 3 / 5 |
| Language | 3.1.1, 3.1.2 | 3 / 5 | 3 / 5 |
| Seizure Risk | 2.3.1 | 1 / 5 | 5 / 5 |

**Likelihood** reflects how frequently the issue appears in typical course content. **Impact** reflects how severely the barrier affects students who rely on assistive technology.

## Impact on Students

Behind every accessibility guideline is a student trying to learn. The technical language of WCAG and the metrics of automated checkers can obscure that reality, so it is worth stating plainly what inaccessible content means in practice.

A student who is blind and uses a screen reader encounters an image with no alt text. The screen reader announces "Graphic. IMG_3847.png." The image might be a chart that the rest of the class is discussing, a diagram central to the week's assignment, or a decorative banner that could have been skipped entirely. The student has no way to know. They must decide whether to ask the instructor, ask a classmate, or move on without the information. None of these are equivalent to simply seeing the image.

A student with low vision enlarges their screen to 200%. A PowerPoint slide with light gray text on a white background, perfectly readable at standard size on the designer's monitor, becomes a wash of near-invisible content. The student can adjust their device settings, but only if they know the problem is contrast and not a rendering error. Multiply this across a semester of weekly slide decks and the cognitive overhead becomes significant.

A student who is deaf or hard of hearing opens a lecture recording with no captions. A student with a motor disability navigates a 40-page PDF with no headings, forced to read through the document line by line because there is no structure to jump to.
These are not edge cases. According to the National Center for Education Statistics, roughly 21% of undergraduate students report having a disability.[^2] Many do not disclose or register with disability services. Accessible content benefits students who never appear in accommodation letters: students learning in a second language, students in noisy environments, students with temporary injuries, students reading on a phone in poor lighting.

The impact column in the table above is a number. The experience behind it is a student deciding whether the course is worth the extra labor, or whether to drop it.

## Shared Responsibility

Accessibility in a course is not the sole responsibility of the instructor or the instructional designer. It is a shared obligation across everyone who creates or contributes content.

### Instructor and instructional designer responsibility

Instructors and instructional designers own the content they author and publish: syllabi, lecture slides, assignments, handouts, Canvas pages, and any files uploaded to the LMS. This is the bulk of course content and where accessibility efforts have the greatest return. Responsibilities include:

- Authoring documents, slides, and pages with accessibility built in from the start, not remediated after the fact
- Running automated checks (Ally, Microsoft Accessibility Checker, Acrobat) before publishing
- Performing manual review for issues automated tools cannot catch
- Providing equivalent alternatives when content cannot be made fully accessible (e.g., a transcript for audio, a data table for a complex chart)
- Responding to student-reported barriers promptly

### Student responsibility

Students are also content creators. In discussion boards, peer review assignments, group wikis, student-led presentations, and uploaded submissions, students author content that other students must access. When a student posts an image in a discussion without alt text, their peers who use screen readers are excluded from the conversation.

Student responsibility for accessibility should be:

- **Taught, not assumed.** Most students have never encountered alt text, heading structure, or document language settings. Accessibility expectations need to be introduced explicitly, ideally with brief guidance and examples early in the course.
- **Scoped to the tools at hand.** Students can reasonably be expected to add alt text to images they post, use heading styles instead of bold text for structure, and choose readable color combinations. They should not be expected to remediate PDFs in Acrobat Pro or write ARIA attributes.
- **Modeled by the course itself.** Students are more likely to adopt accessible practices when the course content they receive is itself accessible. An instructor who adds alt text to every image normalizes the practice. An instructor whose slides lack headings implicitly signals that structure does not matter.
- **Reinforced through feedback.** When accessibility is part of assignment criteria, even lightly (such as "include alt text for any images in your post"), it becomes part of the learning culture rather than an afterthought.

Accessibility is not a compliance task delegated to one role. It is a baseline expectation for participation in a shared learning environment.

## Two Types of Accessibility Issues

Clearing every issue in Anthology Ally is a great place to start for access and inclusion in the classroom. Unfortunately, it is nowhere near the full scope of accessible course materials. Ally performs automated tests that lack context and are not yet refined enough to catch major issues where human review is required.

**Automated testing failures** are issues that tools like Ally can detect programmatically: a missing alt text attribute, text contrast below 4.5:1, an improperly nested heading tag, a table with no designated headers, a faked list (dashes or numbers typed manually instead of list markup). These are structural, binary checks. The attribute exists or it doesn't. The ratio passes or it doesn't. Automated tools are reliable and efficient at catching these issues, and they should always be the first step.

**Manual testing discoveries** are issues that require human evaluation: alt text that exists but is meaningless, a heading structure that is technically present but logically incoherent, a color-coded rubric with no non-color indicator. No automated tool can assess whether content is *meaningful*, *clear*, or *instructionally sound*. It can only determine whether certain technical markers are present. These issues will pass every automated check and still create barriers for students. It is possible, for example, to create course content that is massively inaccessible but still passes all automated checks. Consider a document where every paragraph is styled as Heading 2, every image has alt text that reads "image," a layout table forces content into a two-column format, and an untranslated Spanish paragraph sits inside an English document with no language attribute. That document would score 100% in Ally.

This reference uses that framework throughout. For each accessibility category, it describes what automated tools detect (the first type) and what requires manual review (the second type). Both are necessary. Neither is sufficient alone.

## Automated Testing

Automated accessibility testing tools scan content against a set of programmatic rules. They are fast, consistent, and essential, but they are also limited to what can be evaluated without human interpretation.

**Anthology Ally** runs checks on files uploaded to Canvas and on Canvas page content. It produces an accessibility score and flags issues with severity levels (Minor, Major, Severe). Ally is effective at catching:

- Missing alt text on images
- Insufficient color contrast ratios on text
- Skipping heading levels
- Tables without designated header rows
- Faked lists (content that looks like a list but uses manual bullets, dashes, or numbers instead of proper list styles)

Beyond detection, Ally provides two additional features that support accessibility workflows:

- **Remediation guidance.** When Ally flags an issue, it provides specific instructions for fixing it: how to add alt text in Word, how to designate a header row in a table, how to set the document language. This guidance is practical and file-type-specific, making Ally a useful teaching tool for instructors learning to author accessible content.
- **Alternative format generation.** Ally automatically generates accessible alternative formats for uploaded files, including HTML, ePub, electronic braille, audio (MP3), and tagged PDF. These alternatives give students options when the original file is not fully accessible. However, alternative formats are a fallback, not a substitute for accessible source content. They inherit the structural defects of the original: an HTML alternative generated from a document with no headings will also have no headings, an audio format cannot compensate for missing structure, braille output depends on correct tagging in the source, and none of the alternative formats will fix semantic errors like meaningless alt text or incorrect language metadata. Accessibility must be built into the source material first. **[TODO: Validate these claims about alternative format inheritance. Confirm each format's behavior with test files before publishing.]**

To describe Ally's behavior across file types, this reference uses a coverage model with four states:

- **Checked:** Ally runs the check and reports results
- **Gap:** The accessibility issue can exist in this file type, but Ally does not check for it
- **Unreliable:** The check exists but produces inconsistent results
- **N/A:** The check does not apply to this file type

The most important limitation of any automated tool is that it checks for **presence**, not **quality**. Ally will pass an image whose alt text is "asdf" because alt text exists. It will pass a document whose every paragraph is tagged as Heading 1 because headings exist. **[TODO: Verify this claim by testing a document with all paragraphs set to Heading 1 in Ally.]** Reaching a 100% Ally score means the content has passed the checks Ally can run. It does not mean the content is free of barriers to access for individuals with disabilities.

## Manual Testing

Manual testing fills the gaps that automated tools cannot reach. At minimum, an accessibility review of course content should include:

- **Reading alt text in context.** Does each description convey the same information a sighted student would get from the image? Is decorative content marked as decorative rather than described?
- **Navigating by headings.** Using a screen reader's heading list (or the Navigation Pane in Word), can a student understand the document's structure and jump to the section they need?
- **Checking reading order.** In PowerPoint and PDF, content may appear visually correct but be read in the wrong sequence by a screen reader. The reading order pane (PowerPoint) and tags panel (Acrobat) reveal the actual order.
- **Verifying table structure.** For complex tables with merged cells or multiple header rows, a screen reader test confirms whether row and column headers are announced correctly.
- **Listening to language.** If a document contains passages in a language other than the primary language, a screen reader test reveals whether pronunciation switches correctly.
- **Reviewing color use.** If color is used to indicate status, category, or meaning (e.g., red for incorrect, green for correct), verify that a non-color indicator is also present.

Screen reader testing does not require expertise. Even a brief listen with VoiceOver (macOS), NVDA (Windows), or JAWS confirms whether content is navigable and comprehensible.

### Instructional quality as accessibility

Manual review also extends to a dimension that no automated tool addresses: whether the content is instructionally clear enough to be usable by all students. A technically accessible document, one with alt text, headings, contrast, and language set correctly, can still be inaccessible in practice if it is poorly organized, ambiguously written, or assumes visual context that is never stated in text. Accessibility and instructional clarity are not separate concerns. A confusing document is harder to navigate for everyone and disproportionately harder for students using assistive technology, who cannot skim, scan, or rely on visual layout cues to compensate for unclear writing.

## Microsoft Accessibility Checker

Microsoft Word, PowerPoint, and Excel include a built-in Accessibility Checker (Review > Check Accessibility). It runs locally before content is uploaded to the LMS and catches several issues that Ally does not:

- **AI-generated alt text.** When Microsoft auto-generates a description, its own checker flags it for review. Ally does not.
- **File name as alt text.** Both the Microsoft checker and Ally flag this, but Microsoft also catches cases where the description is clearly a file path.
- **Missing slide titles.** Both tools flag this.
- **Table header rows.** Both tools flag this.

The Microsoft checker does **not** flag:

- Language issues (missing or incorrect document language)
- Alt text quality (vague, placeholder, or gibberish descriptions pass)
- Color contrast in document content
- Reading order problems
- Faked lists (manually typed bullets, dashes, or numbers instead of list styles)

**Best practice:** Run the Microsoft Accessibility Checker before uploading to Canvas. It complements Ally by catching AI-generated descriptions and providing fix-in-place workflows within the authoring environment.

## Acrobat Accessibility Checker

Adobe Acrobat Pro includes an Accessibility Check (Accessibility > Accessibility Check) that evaluates PDF tag structure, reading order, and metadata. Here are some of the 29 tests that are run by the checker:

- **Missing alt text.** Flagged and fixable in the tags panel.
- **Document language.** Flags missing language metadata.
- **Tagged PDF structure.** Verifies that the PDF has a tag tree (headings, paragraphs, lists, tables).
- **Tab and reading order.** Checks whether the tag order matches the visual layout.

Acrobat does **not** flag:

- File name used as alt text
- AI-generated alt text
- Alt text quality
- Incorrect language (only missing language)
- Language of parts (e.g., a Spanish paragraph in an English document)

::: {.callout}
**Fix at the source.** Many PDFs created from Word or PowerPoint inherit their accessibility (or lack thereof) from the source document. Fixing issues at the source is almost always more efficient than remediating in Acrobat after export.
:::

## Text Alternatives

> In this workshop, we will intentionally trigger each of the failures described below and fix them live using Microsoft Accessibility Checker, Acrobat Accessibility Check, and Anthology Ally. The goal is not just to clear errors, but to understand why the error exists and what the tool cannot detect.

> **Detection key:** 🔴 Automated failure — tool detects this issue · 🟡 Manual-only — requires human review · 🟢 False positive — tool flags incorrectly

**WCAG 1.1.1 Non-text Content (Level A).** All non-text content must have a text alternative that serves an equivalent purpose.

This is the highest-priority accessibility issue in course content: it is the most common (likelihood 5/5) and has the greatest impact (5/5) on students using assistive technology. Without alt text, a screen reader announces an image as its file name ("Graphic. IMG_3847.png"), providing no information about what the image conveys.

### What automated tools detect

| Scenario | Ally | MS Office | Acrobat |
|----------|------|-----------|---------|
| No alt text | Detected | Detected | Detected |
| AI-generated alt text | Not detected | Detected | Not detected |
| File name as alt text | Detected | Detected | Not detected |
| Decorative image not marked | Not detected | Not detected | Not detected |
| Vague alt text ("Quiz comparison chart") | Not detected | Not detected | Not detected |
| Gibberish alt text ("alskjshdsflh") | Not detected | Not detected | Not detected |
| Placeholder alt text ("image") | Not detected | Not detected | Not detected |
| Alt text over ~120 characters | False positive (Canvas) | N/A | N/A |

### What requires manual review

- **Quality and accuracy.** Does the description convey the same information a sighted student would receive? A chart captioned "Quiz comparison chart" passes every automated check but tells a screen reader user nothing about the data.
- **Decorative images.** Divider lines, background textures, and branding elements should be marked as decorative so screen readers skip them. No tool reliably detects images that should be decorative.
- **Complex images.** Charts, graphs, diagrams, and infographics often need extended descriptions beyond what fits in an alt text field. Consider a structured text alternative below the image or a linked long description.
- **SmartArt and grouped shapes.** In Word and PowerPoint, SmartArt graphics and grouped shapes may not be flagged consistently across tools, even when they contain meaningful content.

### Broken Examples and How to Fix Them

The following scenarios walk through each test case from the detection table above. For each, the "broken" state is described along with the Ally error message (where applicable) and step-by-step instructions for fixing the issue in each platform.

Each scenario includes a set of intentionally broken test files that can be uploaded to Canvas to demonstrate the error (or lack of detection) in Ally, the Microsoft Accessibility Checker, and the Acrobat Accessibility Check.

::: {.summary}
**In this section:**

- [Scenario 1: No alt text](#scenario-1-no-alt-text) — 🔴 Ally · 🔴 MS Checker · 🔴 Acrobat
- [Scenario 2: AI-generated alt text](#scenario-2-ai-generated-alt-text) — 🟡 Ally · 🔴 MS Checker · 🟡 Acrobat
- [Scenario 3: File name as alt text](#scenario-3-file-name-as-alt-text) — 🔴 Ally · 🔴 MS Checker · 🟡 Acrobat
- [Scenario 4: Decorative image not marked](#scenario-4-decorative-image-not-marked-as-decorative) — 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat
- [Scenario 5: Vague alt text](#scenario-5-vague-alt-text) — 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat
- [Scenario 6: Gibberish or placeholder alt text](#scenario-6-gibberish-or-placeholder-alt-text) — 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat
- [Scenario 7: Alt text over ~120 characters](#scenario-7-alt-text-over-120-characters-canvas-false-positive) — 🟢 Ally (false positive)
- [Complex images](#complex-images)
- [Known false positive](#known-false-positive)
:::

---

#### Scenario 1: No alt text

**The broken state.** An image is inserted into a document, slide, page, or PDF with no alt text at all. This is the most basic and most common text alternative failure.

**Ally error messages:**

- **Word:** "Document has images without alt descriptions" (Major)
- **PowerPoint:** "Presentation has images without alt descriptions" (Major)
- **Canvas:** "Images must have alternate text description" (Major)
- **PDF:** "PDF has images without alternative descriptions" (Major)

**Detected by:** 🔴 Ally · 🔴 MS Checker · 🔴 Acrobat

**No alt text**

| Broken | Corrected |
|--------|-----------|
| Alt text field is empty. Screen reader announces "Graphic. IMG_3847.png." | "Grouped bar chart comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%." |
| The student receives no information about what the image conveys. | The student receives the same data a sighted reader would get from the chart. |

**How to fix in Word:**

1. Right-click the image.
2. Select **Edit Alt Text**.
3. The Alt Text pane opens on the right side of the screen.
4. Type a description that conveys the same information a sighted reader would get from the image.
5. Close the Alt Text pane.

![Screenshot of the Word Alt Text pane: prompt asking how to describe the object for someone blind or low vision, guidelines (subject, setting, actions, relevant info), description field with example "Line graph showing a steady increase in online course enrollment from 12,000 in Fall 2020 to 28,500 in Fall 2025", Generate alt text for me button, and Mark as decorative option with toggle.](public/assets/word-alt-text-pane.png)

**How to fix in PowerPoint:**

1. Right-click the image.
2. Select **Edit Alt Text**.
3. The Alt Text pane opens on the right side of the screen.
4. Type a description that conveys the same information a sighted reader would get from the image.
5. Close the Alt Text pane.

![Screenshot of the PowerPoint Alt Text pane, which matches Word: prompt for describing the object for someone blind or low vision, description field with enrollment chart example, Generate alt text for me button, and Mark as decorative toggle.](public/assets/word-alt-text-pane.png)

**How to fix in Canvas:**

1. Click the image in the Rich Content Editor.
2. Click the **Image Options** button that appears in the toolbar above the image.
3. In the **Alt Text** field, type a description.
4. Click **Done**.

![Screenshot of Canvas Image Options modal: Alt Text field with example "Grouped bar graph comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%" and Decorative Image checkbox.](public/assets/canvas-image-options.png)

**How to fix in PDF (Acrobat Pro):**

1. Open the PDF in Acrobat Pro.
2. Go to **All tools > Prepare for accessibility > Check for accessibility**.
3. Click **Start Checking**.
4. In the results, expand **Alternate Text**.
5. Right-click the failed item and select **Fix**.
6. In the **Set Alternate Text** dialog, type a description.
7. Click **Save & Close**.

Alternatively, use the Tags panel directly:

1. Open the **Tags** panel (View > Show/Hide > Navigation Panes > Tags).
2. Locate the **Figure** tag for the image.
3. Right-click and select **Properties**.
4. Enter the description in the **Alternate Text** field.
5. Click **Close**.

*[Screenshot placeholder: Acrobat Set Alternate Text dialog]*

---

#### Scenario 2: AI-generated alt text

**The broken state.** Microsoft Office auto-generates a description when an image is inserted (e.g., "A group of people sitting at a table with laptops"). The description may be partially accurate but is often generic, vague, or misleading. It has not been reviewed by a human.

**Detected by:** 🟡 Ally · 🔴 MS Checker · 🟡 Acrobat

::: {.callout}
**Tool gap.** Only Microsoft's checker flags its own AI-generated descriptions. Ally and Acrobat see a non-empty alt text field and move on. A 100% Ally score does not mean the alt text has been reviewed by a human.
:::

**AI-generated alt text**

| Broken | Corrected |
|--------|-----------|
| "A group of people sitting at a table with laptops" *(AI-generated, unreviewed)* | "Instructional design team reviewing course accessibility audit results during the Spring 2026 faculty workshop." |
| The description is generic and misses the context of the image within the course. | The description identifies who is pictured, what they are doing, and why it matters in context. |

::: {.callout}
**Key point.** This is a gap in Ally. AI-generated alt text passes Ally because the alt text field is not empty. The Microsoft checker flags it specifically because it can identify its own generated descriptions. Always review and revise AI-generated alt text.
:::

**How to fix in Word / PowerPoint:**

1. Run the Accessibility Checker (Review > Check Accessibility).
2. The checker will flag images with AI-generated descriptions under **Verify: Automatic alternative text**.
3. Click the flagged item to select the image.
4. Open the Alt Text pane (right-click > Edit Alt Text).
5. Review the generated description. Revise it to accurately describe the image in context, or replace it entirely.
6. Close the Alt Text pane.

![Screenshot of the Alt Text pane showing AI-generated content "A group of people sitting around a table" with warning "AI-generated content may be incorrect", Approve alt text toggle, and Mark as decorative option.](public/assets/ms-accessibility-checker-ai-alt-text.png)

**Not applicable to PDF.** PDFs inherit alt text from the source document or it is added manually in Acrobat. Canvas does have the option to generate alt text in the Dashboard remediation process, but not directly in the Rich Content Editor.

---

#### Scenario 3: File name as alt text

**The broken state.** The alt text field contains the image's file name (e.g., "IMG_3847.png", "chart_final_v2.jpg", "C:\Users\instructor\Desktop\logo.png"). This typically happens when an image is inserted and the application populates the alt text field with the file name by default.

**Detected by:** 🔴 Ally · 🔴 MS Checker · 🟡 Acrobat

**File name as alt text**

| Broken | Corrected |
|--------|-----------|
| "IMG_3847.png" | "Line graph showing a steady increase in online course enrollment from 12,000 in Fall 2020 to 28,500 in Fall 2025." |
| A file name tells the student nothing about the image content. | The description conveys what the image shows and the data it contains. |

**Ally error messages:**

- **Word:** "Document has images with their filenames as descriptions" (Minor)
- **Canvas:** "Alt text should not be the image filename" (Minor)

**How to fix:** Follow the same steps as Scenario 1 for each platform. Delete the file name and replace it with a meaningful description of the image.

---

#### Scenario 4: Decorative image not marked as decorative

**The broken state.** A decorative image (a divider line, a background texture, a branding banner, a purely visual flourish) has either no alt text or a description like "decorative line" or "banner image." It should be marked as decorative so screen readers skip it entirely.

**Detected by:** 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat — No automated tool can determine whether an image *should* be decorative. This is entirely a human judgment call.

::: {.callout}
**Tool gap.** Deciding whether an image is decorative or meaningful requires understanding the content's purpose. No tool attempts this judgment. Every unmarked decorative image adds noise for screen reader users, and no automated score will reflect it.
:::

**Decorative image not marked as decorative**

| Broken | Corrected |
|--------|-----------|
| "decorative line" or "banner image" | *(marked as decorative)* — `alt=""` in HTML, "Mark as decorative" in Office, or artifact in PDF |
| The screen reader announces the decorative image, interrupting the reading flow with meaningless content. | The screen reader skips the image entirely, keeping the student focused on meaningful content. |

**How to mark as decorative in Word / PowerPoint:**

1. Right-click the image.
2. Select **Edit Alt Text**.
3. Check the **Mark as decorative** checkbox.
4. Close the Alt Text pane.

![Screenshot of the Word Alt Text pane with Mark as decorative toggle turned on, showing the message "Content marked as decorative will not expose a description to screen readers" and the decorative-objects explanation.](public/assets/word-alt-text-mark-decorative.png)

**How to mark as decorative in Canvas:**

1. Click the image in the Rich Content Editor.
2. Click **Image Options**.
3. Check the **Decorative Image** checkbox. This clears the Alt Text field and sets `alt=""` in the HTML.
4. Click **Done**.

![Screenshot of Canvas Image Options modal with Decorative Image checkbox checked, showing the Alt Text field with placeholder "(Describe the image)" and the decorative option selected.](public/assets/canvas-image-options-decorative.png)

**How to mark as decorative in PDF (Acrobat Pro):**

1. Open the **Tags** panel.
2. Locate the **Figure** tag for the decorative image.
3. Right-click and select **Change Tag to Artifact**. This removes the image from the tag tree so screen readers skip it.

See [Edit document structure with the Content and Tags panels](https://helpx.adobe.com/acrobat/using/editing-document-structure-content-tags.html) on Adobe HelpX for full details.

![Screenshot of Acrobat Create Artifact dialog: Artifact Type options (Page selected, Pagination, Layout), Attach to Side(s) checkboxes (Left, Top, Right, Bottom), and Cancel/OK buttons. Used when marking a decorative image as artifact so screen readers skip it.](public/assets/acrobat-create-artifact.png)

---

#### Scenario 5: Vague alt text

**The broken state.** The alt text field contains a description that is technically present but too vague to be useful. Examples: "chart," "Quiz comparison chart," "photo," "graph of data." A screen reader user hears the label but receives none of the information the image actually conveys.

**Detected by:** 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat — All three tools check for *presence*, not *quality*.

::: {.callout}
**Tool gap.** All automated tools check only for presence. None evaluate informational equivalence. Alt text that reads "chart" passes every check but gives a screen reader user none of the data the chart conveys.
:::

**Vague alt text: Bar chart**

| Broken | Corrected |
|--------|-----------|
| "Quiz comparison chart" | "Grouped bar chart comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%." |
| Names the chart type but provides none of the data. The student knows a chart exists but not what it shows. | Describes the data the chart conveys so the student receives equivalent information. |

**Vague alt text: Photo**

![Old Queens building on the Rutgers University College Avenue campus in New Brunswick, NJ. A three-story brownstone building with white-trimmed windows, white shutters on the ground floor, a central cupola with weather vane, and brick chimneys on each end. Landscaped shrubs and a green lawn in the foreground, with a lamppost displaying red Rutgers banners.](public/assets/old-queens.png)

| Broken | Corrected |
|--------|-----------|
| "building" | Mark as decorative (if purely visual) or "Old Queens building on the Rutgers University College Avenue campus. A three-story brownstone building with white-trimmed windows, a central cupola with weather vane, and landscaped grounds in the foreground." (if contextually relevant) |
| A single word provides no useful context about what the photo shows or why it is included. | Either skip the image entirely or describe what is shown and its relevance to the course. |

**Vague alt text: Pie chart**

![Pie chart of Fall 2025 student survey results: 62% Satisfied (dark blue), 24% Neutral (green), 14% Dissatisfied (red).](public/assets/pie-chart.png)

| Broken | Corrected |
|--------|-----------|
| "pie chart" | "Pie chart of Fall 2025 student survey: 62% satisfied, 24% neutral, 14% dissatisfied." |
| Identifies the chart type but not the data. The student cannot participate in discussion about the results. | Includes the data so the student can engage with the content on equal terms. |

**How to fix:** Follow the same steps as Scenario 1 for each platform. Replace the vague description with one that conveys the same information a sighted reader would get from the image. For charts and graphs, include the data, not just the chart type.

::: {.callout}
**Writing good alt text.** Ask: "If I could not see this image, what would I need to know?" The answer is the alt text. For data visualizations, the alt text should include the data. For photos, it should describe what is shown and why it matters in context. Avoid starting alt text with words like "graphic," "image," or "picture." Screen readers already announce the element as an image, so these labels are redundant and add noise without meaning.
:::

---

#### Scenario 6: Gibberish or placeholder alt text

**Gibberish or placeholder alt text**

| Broken | Corrected |
|--------|-----------|
| "alskjshdsflh" or "asdf" or "image" | A meaningful description of the image, or marked as decorative |
| Gibberish and placeholder text exist only to satisfy the automated check. A screen reader user hears "alskjshdsflh" and gains nothing. | The student receives a description that conveys the image's meaning, or the screen reader skips it entirely if decorative. |

**The broken state.** The alt text field contains nonsense (e.g., "alskjshdsflh," "asdf," "xxx") or a generic placeholder (e.g., "image," "photo," "graphic," "picture"). This typically results from someone filling the field to clear an automated warning without writing a real description.

**Detected by:** 🟡 Ally · 🟡 MS Checker · 🟡 Acrobat — The alt text field is not empty, so all tools consider it a pass.

::: {.callout}
**Tool gap.** Typing "asdf" into an alt text field clears every automated warning. The content scores 100%. The screen reader user hears "asdf." This is the clearest illustration of why automated scores alone are insufficient.
:::

**How to fix:** Follow the same steps as Scenario 1 for each platform. Delete the placeholder and write a meaningful description. If the image is decorative, mark it as decorative instead of describing it.

---

#### Scenario 7: Alt text over ~120 characters (Canvas false positive)

**Alt text over ~120 characters (false positive)**

| Broken (per Ally) | Corrected |
|--------------------|-----------|
| "Grouped bar chart comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%." *(flagged as too long)* | Keep the description as written. Do not shorten. |
| Ally flags alt text exceeding ~120 characters in Canvas. | There is no WCAG basis for a character limit. The description is accurate and necessary. Shortening it to clear the flag removes information the student needs. |

**The broken state.** This is not actually broken. The alt text is accurate and meaningful but exceeds approximately 120 characters. Ally flags this in the Canvas Rich Content Editor as an issue. There is no WCAG basis for a character limit on alt text, nor any detriment for screen reader users.

**Detected by:** 🟢 Ally (Canvas only — false positive)

**How to handle:** Do not shorten the description to clear the flag. If the description needs to be long to be accurate (common for charts, graphs, and complex images), keep it as written. Note the Ally flag but do not treat it as a real issue. This will not show up in the Accessibility Dashboard in a way that impacts your overall score.

For very long descriptions (multiple paragraphs), consider placing a brief alt text on the image and providing the full description in the body text below the image, or linking to a long description.

---

### Complex images

Charts, graphs, diagrams, infographics, and other complex images often require descriptions that go beyond what fits naturally in an alt text field. For these:

1. Provide a brief alt text on the image that identifies what it is (e.g., "Bar chart of enrollment trends, 2020 to 2025. Full description follows.").
2. Include the full description in the body text immediately below the image, or link to a separate long description.

This ensures the image is not skipped by screen readers and the full information is available in context.

### Known false positive

In the Canvas Rich Content Editor, Ally flags alt text exceeding approximately 120 characters. There is no WCAG basis for a character limit on alt text. Do not shorten a description that needs to be long to be accurate.

![Screenshot of the Canvas Accessibility Checker showing Issue 1 of 1: 'Alt attribute text should not contain more than 120 characters.' The Change alt text field displays a grouped bar graph description that exceeds the limit. Prev, Next, and Apply buttons appear at the bottom.](public/assets/canvas-ally-alt-text-length-warning.png)

::: {.callout}
**Key point.** Ally checks that alt text *exists*. It does not check that alt text is *accurate*, *meaningful*, or *appropriate*. Gibberish, placeholder text, and vague labels all pass.
:::

::: {.summary}
**Automated vs. Manual Summary**

- 🔴 **Automated tools catch:** Missing alt text, file name as alt text
- 🟡 **Manual review required:** Alt text quality, decorative image identification, complex image descriptions, SmartArt and grouped shapes
- 🟢 **False positives:** Alt text over ~120 characters (Canvas/Ally only)
:::

::: {.quick-check}
**Quick Check: Text Alternatives**

- Does every meaningful image have alt text that conveys equivalent information?
- Are decorative images marked as decorative (not described)?
- Do charts and graphs have descriptions that include the data, not just the title?
- Has AI-generated alt text been reviewed and revised?
- Are SmartArt graphics and grouped shapes described?
:::

::: {.callout}
**Now we know that:**

- **100% in Ally ≠ accessible.** A perfect score means the content passed the checks Ally can run. It does not mean the content is free of barriers. Gibberish alt text, vague labels, and unmarked decorative images all score 100%.
- **Tool layering matters.** No single tool catches everything. Ally misses AI-generated alt text that the Microsoft checker flags. Acrobat misses file-name alt text that Ally catches. Running one tool is a start; running all three closes more gaps.
- **Manual review is non-negotiable.** Scenarios 4, 5, and 6 are invisible to every automated tool. The barriers they create — noise from unmarked decorative images, data withheld by vague descriptions, nonsense read aloud by a screen reader — can only be found by a human reviewing the content.
- **Presence ≠ quality.** Every tool checks whether the alt text field contains something. No tool checks whether that something is accurate, meaningful, or equivalent to the visual content. The difference between those two checks is the difference between compliance theater and actual access.
:::

## Color Contrast

**WCAG 1.4.3 Contrast (Minimum) (Level AA).** Text must have a contrast ratio of at least **4.5:1** against its background. Large text (18pt or 14pt bold) requires at least **3:1**.

Contrast issues are common (likelihood 4/5) and meaningfully affect students with low vision, color vision deficiencies, or those reading on screens in bright environments.

### What automated tools detect

Ally and similar tools measure the contrast ratio between text color and background color and flag combinations that fall below the minimum. This works well for body text in standard layouts.

### What requires manual review

- **Text in images.** Contrast within screenshots, diagrams, or infographics is not evaluated by Ally.
- **Near-threshold combinations.** Branded templates with ratios of 4.4:1 or 4.3:1 may not be flagged by all tools but still fail WCAG.
- **Chart labels and annotations.** Light gray axis labels, legend text, and data labels frequently fail contrast requirements but are overlooked because they are embedded in images or chart objects.

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Text-on-background contrast ratios below 4.5:1 (normal text) or 3:1 (large text)
- **Manual review required:** Text embedded in images, near-threshold branded templates, chart labels and annotations
:::

::: {.quick-check}
**Quick Check: Color Contrast**

- Does all body text meet a 4.5:1 contrast ratio against its background?
- Does large text (18pt or 14pt bold) meet at least 3:1?
- Have chart labels, axis text, and legend text been checked manually?
- Are branded templates verified, not assumed to pass?
:::

## Color as Sole Means of Communication

**WCAG 1.4.1 Use of Color (Level A).** Color must not be the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

This is a separate requirement from contrast and is **not checked by Ally or any of the standard automated tools**. It requires manual review.

### Common examples in course content

- A rubric that uses red/yellow/green to indicate performance levels without text labels
- A chart where data series are distinguished only by color without patterns or direct labels
- Feedback that marks incorrect answers in red with no other indicator (icon, text, symbol)
- A schedule where color-coded categories have no legend or text equivalent

### What to look for

Any place where removing color would cause a loss of information. If a colorblind student printed the content in grayscale, would all the meaning still be present?

::: {.callout}
**Key point.** No automated tool checks for color as the sole means of communication. This issue is invisible to Ally, the Microsoft checker, and Acrobat. It requires manual review every time.
:::

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Nothing. This is entirely a manual review issue.
- **Manual review required:** Rubrics, charts, feedback, schedules, and any content where color encodes meaning
:::

::: {.quick-check}
**Quick Check: Color as Sole Means**

- If the content were printed in grayscale, would all information still be conveyed?
- Do charts use patterns, labels, or shapes in addition to color?
- Do rubrics and grading scales include text labels alongside color coding?
- Does feedback use icons or text in addition to red/green indicators?
:::

## Headings

**WCAG 1.3.1 Info and Relationships (Level A), 2.4.1 Bypass Blocks (Level A), 2.4.6 Headings and Labels (Level AA).** Content structure must be programmatically determinable. Headings must be present and descriptive.

Heading issues are tied with text alternatives as the most frequently occurring accessibility problem (likelihood 5/5) and have high impact (4/5). For a student navigating a long document or page by screen reader, headings are the primary mechanism for orientation and navigation, equivalent to scanning a page visually.

### What automated tools detect

- Missing headings entirely (no heading styles used in a Word document, no H tags in a Canvas page)
- Missing slide titles in PowerPoint
- Skipped heading levels (e.g., jumping from H1 to H4), though detection is inconsistent
- Untagged PDFs (no tag structure at all)

### What requires manual review

- **Heading text quality.** Ally checks that headings exist, not that they are descriptive. "Section 1" or "Untitled" as a heading passes automated checks but provides no useful navigation.
- **Logical hierarchy.** A document where every line is Heading 2 will pass automated checks but provides no meaningful structure.
- **Reading order.** In PowerPoint and PDF, content may be visually organized but read in the wrong sequence. The reading order must be verified in the slide's Selection Pane (PowerPoint) or the Tags panel (Acrobat).
- **Content order in multi-column layouts.** Text boxes, sidebars, and multi-column layouts in Word and PowerPoint may not read in the intended order.

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Missing headings, missing slide titles, skipped heading levels (inconsistently), untagged PDFs
- **Manual review required:** Heading text quality, logical hierarchy, reading order, content order in multi-column layouts
:::

::: {.quick-check}
**Quick Check: Headings**

- Does the document use heading styles (not just bold or large text) for structure?
- Do headings follow a logical hierarchy without skipping levels?
- Are heading labels descriptive (not "Section 1" or "Untitled")?
- Does every PowerPoint slide have a unique title?
- Has reading order been verified in the Selection Pane (PowerPoint) or Tags panel (PDF)?
:::

## Tables

**WCAG 1.3.1 Info and Relationships (Level A).** Information and relationships conveyed through presentation must be programmatically determinable.

Tables appear less frequently than images or headings (likelihood 3/5) but have high impact (4/5) when they do appear. Without designated header rows, a screen reader reads table cells as raw data with no context. A student hears "85" without knowing which column or row it belongs to.

### What automated tools detect

- Tables without a designated header row (Ally, MS Office, Acrobat)
- Tables of 3x3 or larger without headers (Canvas, via axe-core)

### What requires manual review

- **Layout tables.** Tables used for visual alignment rather than data presentation create confusing screen reader experiences. Automated tools do not reliably distinguish layout tables from data tables.
- **Complex tables.** Merged cells, multiple header rows, and nested tables require manual verification. The `scope` attribute (HTML) or tagged structure (PDF) must correctly associate each data cell with its headers.
- **Appropriateness.** Some content presented in tables would be more accessible as lists or paragraphs. A "table" with one column and one row per item is really a list.

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Tables without a designated header row
- **Manual review required:** Layout tables misused for formatting, complex tables with merged cells, tables that should be lists
:::

::: {.quick-check}
**Quick Check: Tables**

- Does every data table have a designated header row?
- Are tables used only for data, not for visual layout?
- Do complex tables (merged cells, multiple headers) read correctly in a screen reader?
- Would any table be clearer as a list or structured text?
:::

## Lists

**WCAG 1.3.1 Info and Relationships (Level A).** When content is presented as a list, the list structure must be programmatically determinable so that screen readers can announce list type and item count (e.g., "List of 5 items") and allow list-based navigation.

Lists are very common in course content (likelihood 4/5). A **faked list** is content that looks like a list—lines prefixed with a dash, bullet character, or "1." "2." typed by hand—but is not marked up as a list. In Word, that means using the Bullets or Numbering commands (or list styles), not typing characters. In HTML, it means using `<ul>`, `<ol>`, and `<li>` (or equivalent list roles), not plain paragraphs. When a list is faked, a screen reader does not get list structure; it reads a series of paragraphs, and the student loses the benefit of list semantics and navigation.

### What automated tools detect

- **Ally** flags faked lists: content that visually appears as a list but lacks proper list markup. Ally detects this in Word, PowerPoint, PDF, and Canvas content and reports it as an issue to fix (e.g., "Lists should be formatted as lists," with an option to "Format as a list"). For **Canvas pages and content edited in the Rich Content Editor (RCE)**, the list error often appears in the RCE's Accessibility Checker but may not appear on the Course Dashboard. If you see the issue in the editor, fix it there; do not assume the Dashboard will surface it for the same content.
- **Microsoft Accessibility Checker** and **Adobe Acrobat's Accessibility Check** do not routinely flag faked lists. They may report missing or incorrect list tagging in some contexts (e.g., PDF tag tree), but they do not perform the same "looks like a list but isn't marked as one" check that Ally does. If you rely only on the Microsoft checker or Acrobat, faked lists can pass undetected.

::: {.callout}
**Tool gap.** Ally catches faked lists; the other common checkers generally do not. Content that passes the Microsoft Accessibility Checker or Acrobat can still contain faked lists that create barriers for screen reader users.
:::

::: {.callout}
**Where Ally shows the list error.** For Canvas content, the "Lists should be formatted as lists" issue may show up in the **Rich Content Editor** (when you run the Accessibility Checker from the editor) but not on the **Course Dashboard**. Fix faked lists when the editor flags them; the Dashboard may not list this issue for the same page.
:::

### What requires manual review

- **Nested and multi-level lists.** Ensure list hierarchy is correct in the source (e.g., list-in-list in Word, nested `<ul>`/`<ol>` in HTML) so reading order and structure make sense.
- **When a "list" is really something else.** A single run of short paragraphs may be clearer as a list; a run of numbered steps must be a real ordered list, not typed "1." "2." in plain text.

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Faked lists (Ally only; Microsoft checker and Acrobat typically do not)
- **Manual review required:** Correct nesting of lists, appropriateness of list vs. paragraph structure
:::

::: {.quick-check}
**Quick Check: Lists**

- Are bulleted and numbered lists created with the application's list tools (Bullets / Numbering in Word or PowerPoint, list controls in Canvas), not by typing dashes or numbers?
- Would a screen reader user hear list structure (e.g., "List of 4 items") when moving through the content?
- If you only ran the Microsoft checker or Acrobat, have you also checked the content in Ally (or verified list markup) so faked lists are not missed?
:::

## Language

**WCAG 3.1.1 Language of Page (Level A).** The default human language of each page or document must be programmatically determinable.
**WCAG 3.1.2 Language of Parts (Level AA).** The language of each passage or phrase that differs from the document's default language must be programmatically determinable.

Language affects how screen readers pronounce content. When a document's language metadata is missing or incorrect, a screen reader applies the wrong pronunciation rules. English phonetics applied to a Spanish passage, for example, renders the text incomprehensible.

### Automated tool reliability by file type

| File type | Ally | MS Office | Acrobat |
|-----------|------|-----------|---------|
| Word (.docx) | Unreliable | Not checked | N/A |
| PowerPoint (.pptx) | Unreliable | Not checked | N/A |
| PDF | Unreliable | N/A | Checks missing language only |
| Canvas (HTML) | Checked | N/A | N/A |

Canvas is the only file type where language detection works reliably, because Ally uses axe-core to check the `lang` attribute on the HTML element.

For Word and PowerPoint, Ally's language detection is inconsistent. The Microsoft Accessibility Checker does not flag language issues at all. For PDF, Acrobat can detect a missing language attribute but cannot detect an incorrect one.

### What no automated tool detects

- **Incorrect document language** (e.g., a document tagged as French when the content is English). Ally may flag this in some cases but not reliably across file types.
- **Language of parts.** No automated tool detects that a Spanish paragraph within an English document needs its own language attribute. This can only be verified by listening with a screen reader.

### Setting language of parts

- **Word:** Select the text, then set the proofing language (Review > Language > Set Proofing Language). This embeds the language at the character level.
- **Canvas:** In the HTML editor, wrap the passage in a `span` or `div` with a `lang` attribute (e.g., `<span lang="es">...</span>`).
- **PDF:** Use the tags panel in Acrobat Pro to set the language attribute on individual content tags.

::: {.callout}
**Key point.** Language is the least reliably detected issue across automated tools. For Word and PowerPoint, Ally's checks are inconsistent. The Microsoft Accessibility Checker does not check language at all. Only Canvas HTML is reliably checked.
:::

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Missing language attribute (Canvas HTML only is reliable; Word, PowerPoint, and PDF are unreliable)
- **Manual review required:** Incorrect document language, language of parts, pronunciation accuracy
:::

::: {.quick-check}
**Quick Check: Language**

- Is the document language set correctly in the file properties?
- Do passages in other languages have their own language attributes?
- Has a screen reader been used to verify pronunciation of foreign-language content?
- In Word, is the proofing language set on foreign-language selections?
:::

## Seizure Risk

**WCAG 2.3.1 Three Flashes or Below Threshold (Level A).** Content must not contain anything that flashes more than three times per second.

Seizure risk is the least common issue in course content (likelihood 1/5) but carries the highest possible impact (5/5). A single flashing element can trigger a photosensitive seizure.

### What automated tools detect

Ally checks for rapid flashing in **image files only** (primarily animated GIFs). This is the only file type where seizure risk is evaluated.

### What is not checked

| File type | Status |
|-----------|--------|
| Word (.docx) | Gap: not checked |
| PowerPoint (.pptx) | Gap: not checked |
| PDF | Gap: not checked |
| Canvas pages | Gap: not checked |
| Image (GIF) | Checked |

The most common sources of flashing content in courses (**embedded video, PowerPoint transitions and animations, and auto-playing media**) are not evaluated by any of the standard automated tools.

### Guidance

- Avoid strobe effects, rapid transitions, and flashing animations in all content.
- Review embedded videos for flashing sequences, especially screen recordings with rapid UI changes.
- Use subtle, purposeful animations in PowerPoint rather than attention-grabbing transitions.
- When in doubt, the Photosensitive Epilepsy Analysis Tool (PEAT) can evaluate video content against the flash threshold.[^3]

::: {.callout}
**Key point.** Seizure risk has the lowest likelihood but the highest possible impact. Ally only checks image files (GIFs). Video, PowerPoint animations, and auto-playing media are not evaluated by any automated tool.
:::

::: {.summary}
**Automated vs. Manual Summary**

- **Automated tools catch:** Rapid flashing in animated GIFs (image files only)
- **Manual review required:** Embedded video, PowerPoint transitions and animations, auto-playing media, CSS animations
:::

::: {.quick-check}
**Quick Check: Seizure Risk**

- Does any content flash more than three times per second?
- Have embedded videos been reviewed for strobe or rapid flashing sequences?
- Are PowerPoint transitions subtle and purposeful, not rapid or strobing?
- Has auto-playing media been avoided or reviewed?
:::

---

[^1]: Faulkner, S., et al. "The WebAIM Million: An Annual Accessibility Analysis of the Top 1,000,000 Home Pages." WebAIM, 2024. https://webaim.org/projects/million/

[^2]: National Center for Education Statistics. "Students With Disabilities." Condition of Education, U.S. Department of Education, 2023. https://nces.ed.gov/programs/coe/indicator/cgg

[^3]: Trace Research & Development Center. "Photosensitive Epilepsy Analysis Tool (PEAT)." University of Maryland. https://trace.umd.edu/peat/
