/**
 * Loads a TypeScript module from src/data/ into plain node without a build
 * step, using the esbuild that Astro already ships. Used by the cadence and
 * verification scripts so they read the SAME source of truth the site renders
 * from — a registry the harness reads from a copy is a registry that drifts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { transform } from 'esbuild';

export async function loadTs(relPath) {
  const src = fs.readFileSync(path.resolve(relPath), 'utf8');
  const { code } = await transform(src, { loader: 'ts', format: 'esm', target: 'node18' });
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
