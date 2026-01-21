import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';

const getUrl = createGetUrl('/wiki');

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = [];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    for await (const entry of glob('**/*.{md,mdx}', { cwd: 'docs' })) {
      paths.push(getUrl(getSlugs(entry)));
    }

    return paths;
  },
} satisfies Config;
