const fs = require('fs');
const fix = (file, search, replace) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(search, replace);
    fs.writeFileSync(file, content);
};
fix('src/app/skills/page.tsx', `LET'S TALK`, `LET&apos;S TALK`);
fix('src/app/page.tsx', `LET'S BUILD SOMETHING.`, `LET&apos;S BUILD SOMETHING.`);
fix('src/app/contact/page.tsx', `you'd like`, `you&apos;d like`);
fix('src/app/about/page.tsx', `When I'm`, `When I&apos;m`);
fix('src/app/blog/[slug]/page.tsx', `aren't relying`, `aren&apos;t relying`);
fix('src/app/blog/[slug]/page.tsx', `browser's native`, `browser&apos;s native`);
fix('src/app/page.tsx', `ariaHidden: true`, ``);
fix('src/app/page.tsx', `whiteSpace: "nowrap",  }}`, `whiteSpace: "nowrap" }} aria-hidden={true}`);
