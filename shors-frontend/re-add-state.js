const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const stateInjection = `
  const [heroData, setHeroData] = useState<any>(null);
  const [showcaseModule, setShowcaseModule] = useState<any>(null);
`;
content = content.replace(/const \[heroData, setHeroData\] = useState<any>\(null\);\r?\n/, stateInjection);

const fetchInjection = `
    const fetchHero = async () => {
      try {
        const res = await fetch(
          \`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/hero\`,
        );
        const json = await res.json();
        if (json.success && json.data) {
          setHeroData(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch hero data", e);
      }
    };
    
    const fetchShowcases = async () => {
      try {
        const res = await fetch(
          \`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/homepage-showcase-module\`,
        );
        const json = await res.json();
        if (json.success && json.data) {
          setShowcaseModule(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch showcase module", e);
      }
    };
`;
content = content.replace(/const fetchHero = async \(\) => \{\s*try \{\s*const res = await fetch\(\s*`\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5000\/api\/v1"\}\/hero`,\s*\);\s*const json = await res\.json\(\);\s*if \(json\.success && json\.data\) \{\s*setHeroData\(json\.data\);\s*\}\s*\} catch \(e\) \{\s*console\.error\("Failed to fetch hero data", e\);\s*\}\s*\};\r?\n/, fetchInjection);

content = content.replace(/fetchHero\(\);\r?\n/, 'fetchHero();\n    fetchShowcases();\n');

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Re-added state and fetch block');
