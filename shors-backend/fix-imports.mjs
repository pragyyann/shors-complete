import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

let updatedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;

  // Regex to match ES6 imports with relative paths
  // Matches: import { x } from './y'; or import x from "../y";
  const importRegex = /(from\s+['"])(\.[^'"]+)(['"])/g;
  
  content = content.replace(importRegex, (match, p1, p2, p3) => {
    if (!p2.endsWith('.js') && !p2.endsWith('.json')) {
      hasChanges = true;
      return `${p1}${p2}.js${p3}`;
    }
    return match;
  });

  // Regex to match dynamic imports or requires if any exist (though usually it's just import)
  // export * from './y';
  const exportRegex = /(export\s+.*\s+from\s+['"])(\.[^'"]+)(['"])/g;
  
  content = content.replace(exportRegex, (match, p1, p2, p3) => {
    if (!p2.endsWith('.js') && !p2.endsWith('.json')) {
      hasChanges = true;
      return `${p1}${p2}.js${p3}`;
    }
    return match;
  });

  if (hasChanges) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in: ${path.relative(__dirname, file)}`);
    updatedFilesCount++;
  }
});

console.log(`\nFinished! Updated ${updatedFilesCount} files.`);
