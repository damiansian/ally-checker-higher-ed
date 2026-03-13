import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const htmlPath = process.argv[2] || 'course-content-accessibility.html';

async function checkAccessibility() {
  try {
    const html = await readFile(htmlPath, 'utf-8');
    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    const { window } = dom;
    const { document } = window;

    // Inject axe-core into the window
    const axeSource = axe.source;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = axeSource;
    document.head.appendChild(scriptEl);

    // Wait for axe to be available
    await new Promise(resolve => setTimeout(resolve, 100));

    // Run axe
    const results = await new Promise((resolve, reject) => {
      if (!window.axe) {
        reject(new Error('axe-core not loaded'));
        return;
      }
      window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
        }
      }).then(resolve).catch(reject);
    });

    // Report violations
    if (results.violations.length === 0) {
      console.log('✓ No accessibility violations found!');
      return;
    }

    console.log(`\n❌ Found ${results.violations.length} accessibility violations:\n`);

    results.violations.forEach((violation, index) => {
      console.log(`${index + 1}. ${violation.help}`);
      console.log(`   Impact: ${violation.impact}`);
      console.log(`   WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}`);
      console.log(`   Description: ${violation.description}`);
      console.log(`   Affected elements: ${violation.nodes.length}`);

      violation.nodes.slice(0, 3).forEach((node, i) => {
        console.log(`\n   Element ${i + 1}:`);
        console.log(`   HTML: ${node.html.substring(0, 150)}${node.html.length > 150 ? '...' : ''}`);
        console.log(`   Target: ${node.target.join(' > ')}`);
        if (node.failureSummary) {
          console.log(`   Issue: ${node.failureSummary}`);
        }
      });

      if (violation.nodes.length > 3) {
        console.log(`\n   ... and ${violation.nodes.length - 3} more elements`);
      }

      console.log(`\n   More info: ${violation.helpUrl}\n`);
      console.log('   ' + '-'.repeat(80) + '\n');
    });

    process.exit(1);
  } catch (error) {
    console.error('Error running accessibility check:', error);
    process.exit(1);
  }
}

checkAccessibility();
