const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = __dirname;
const binDir = path.join(projectRoot, 'node_modules', '.bin');

// Add node_modules/.bin to PATH
const currentPath = process.env.PATH || '';
process.env.PATH = `${binDir}${path.delimiter}${currentPath}`;
process.chdir(projectRoot);

console.log('=== 1. PRISMA GENERATE ===');
const prismaResult = spawnSync(
  process.platform === 'win32' ? 'prisma.cmd' : 'prisma',
  ['generate'],
  { stdio: 'inherit', shell: true, env: process.env, cwd: projectRoot }
);
if (prismaResult.status !== 0 && prismaResult.status !== null) {
  console.error('PRISMA GENERATE FAILED:', prismaResult.status);
  process.exit(prismaResult.status || 1);
}
console.log('--- PRISMA GENERATE DONE ---\n');

console.log('=== 2. NEXT BUILD ===');
const nextResult = spawnSync(
  process.platform === 'win32' ? 'next.cmd' : 'next',
  ['build'],
  { stdio: 'inherit', shell: true, env: process.env, cwd: projectRoot }
);
if (nextResult.status !== 0 && nextResult.status !== null) {
  console.error('NEXT BUILD FAILED:', nextResult.status);
  process.exit(nextResult.status || 1);
}
console.log('\n=== BUILD SUCCESS ===');
process.exit(0);
