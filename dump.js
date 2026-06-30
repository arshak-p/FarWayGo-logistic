const fs = require('fs');
const path = require('path');

const root = 'd:\\colourparrot\\Farwaygo.com';
const artifactPath = 'C:\\Users\\ARSHAK\\.gemini\\antigravity\\brain\\613493b8-b673-4c68-bbe7-b5d63ca04975\\code_review_dump.md';

const filesToDump = [
  'src/app/page.tsx',
  'src/components/sections/Navbar.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/TrustGrid.tsx',
  'src/components/sections/WhyStandOut.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Services.tsx',
  'src/components/sections/Process.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/FinalCta.tsx',
  'src/components/ui/AnimatedSection.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/ContainerHook.tsx',
  'src/components/ui/CountUp.tsx',
  'src/components/ui/CraneIllustration.tsx',
  'src/components/ui/CustomCursor.tsx',
  'src/components/ui/EyebrowBadge.tsx',
  'src/components/ui/Preloader.tsx',
  'src/components/ui/ScrollFloat.css',
  'src/components/ui/ScrollFloat.tsx',
  'src/components/ui/ScrollReveal.css',
  'src/components/ui/ScrollReveal.tsx',
  'package.json',
  'next.config.ts',
  'src/app/globals.css',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/components/providers/SmoothScrollProvider.tsx'
];

let markdown = '# Full Codebase Dump for Performance & Code Quality Review\n\n';

for (const relPath of filesToDump) {
  const fullPath = path.join(root, relPath);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const ext = path.extname(fullPath).substring(1);
    const lang = ext === 'tsx' || ext === 'ts' ? 'typescript' : ext;
    markdown += `## \`${relPath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
  } catch (err) {
    markdown += `## \`${relPath}\`\n\n*Error reading file: ${err.message}*\n\n`;
  }
}

fs.writeFileSync(artifactPath, markdown);
console.log('Successfully created code_review_dump.md');
