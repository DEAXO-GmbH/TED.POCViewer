import { execSync } from 'child_process';

console.log('\n====== [ TED.POCViewer / build ] ======\n');

console.log('Building the project...');
execSync('npx rollup -c');

// to be coded...
