// See here for docs for this file: https://www.fumadocs.dev/docs/headless/search/orama

import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

const server = createFromSource(source, {
  language: 'english',
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      // Use this instead to index everything (or better yet replace createSearchAPI with createFromSource)
      // structuredData: page.data.structuredData,
      structuredData: {
        // Use this instead to index page headings
        // headings: page.data.structuredData.headings,
        headings: [],
        contents: [],
      },
    };
  },
});

export async function loader() {
  return server.staticGET();
}
