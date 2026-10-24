import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
let commit = process.env.CF_PAGES_COMMIT_SHA || process.env.COMMIT_SHA;
if (!commit) {
  try { commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); }
  catch { throw new Error('A build must identify its source commit. Set COMMIT_SHA when building without git.'); }
}
writeFileSync('dist/build-info.json', JSON.stringify({ commit, builtAt: new Date().toISOString() }) + '\n');
