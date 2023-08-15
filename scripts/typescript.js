import { execSync } from 'child_process';
import fs from 'fs';

console.log('\n====== [ TED.POCViewer / typescript check ] ======\n');

fs.rmSync('dist', { recursive: true, force: true });

console.log('Building the project...');
execSync('npx rollup -c');
