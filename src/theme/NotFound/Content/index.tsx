import clsx from 'clsx';
import React, {
  useState,
  useEffect,
  type ReactNode,
  ReactElement,
} from 'react';
import type ContentType from '@theme/NotFound/Content';
import type { WrapperProps } from '@docusaurus/types';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

// Source: https://github.com/cmfcmf/docusaurus-search-local/blob/a9d2faa3847f9762e8498c253b89f04bdaf7ab2a/packages/docusaurus-search-local/src/types.ts
type SearchIndexDocument = {
  id: number;
  pageTitle: string;
  sectionTitle: string;
  sectionRoute: string;
  type: 'docs' | 'blog' | 'page';
};

type SearchIndex = {
  documents: SearchIndexDocument[];
};

type Props = WrapperProps<typeof ContentType>;

// Get last part of URL similar to linux "basename" command and strip the extension
const getBasename = (url: string) => {
  let basename = '';

  url = String(url);
  // http://example.com/some/path/ would become "path"
  if (url.endsWith('/')) {
    basename = url.split('/')[url.split('/').length - 2];
  }
  // http://example.com/some/page.html would become "page.html"
  else {
    basename = url.split('/').pop() ?? '';
  }

  // Drop the final '.html' (or any other extension just in case); the search index does
  // not have an extension and Docusaurus doesn't use one for the authoritative URL
  return basename.split('.')[0];
};

// Get a list of pages whose basename matches the current page
const getMatchingPages = async (
  baseUrl: string
): Promise<SearchIndexDocument[]> => {
  // This file gets created by the docusaurus-search-local plugin at build time
  const response = await fetch(
    `${baseUrl}search-index-docs-default-current.json`
  );
  const searchIndex: SearchIndex = await response.json();

  const currentPageBasename = getBasename(String(window.location));
  const matchingPages = [];

  for (const document of searchIndex.documents) {
    // Skip indexes for sections in pages
    if (document.sectionRoute.includes('#')) {
      continue;
    }

    const documentBasename = getBasename(document.sectionRoute);
    if (documentBasename === currentPageBasename) {
      matchingPages.push(document);
    }
  }

  return matchingPages;
};

export default function NotFoundContent({ className }: Props): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  const [notFoundMessage, setNotFoundMessage] = useState<ReactElement>();

  // useEffect allows us to call async functions, in this case getMatchingPages which uses
  // fetch to get the search index
  useEffect(() => {
    getMatchingPages(siteConfig.baseUrl).then((matchingPages) => {
      if (matchingPages.length === 1) {
        const page = matchingPages[0];
        setNotFoundMessage(
          <>
            <p>
              The page you're looking for may have been moved. Only one match
              was found, so you will be redirected in a few seconds:
            </p>
            <p>
              <strong>
                <a href={page.sectionRoute}>{page.pageTitle}</a>
              </strong>
            </p>
            <p>You can use the search at the top right for more results.</p>
          </>
        );

        setTimeout(function () {
          window.location.href = page.sectionRoute;
        }, 5000);
      } else if (matchingPages.length > 1) {
        const formattedMatchingPages = [];
        for (const [i, page] of matchingPages.entries()) {
          formattedMatchingPages.push(
            <li
              key={i}
              // Otherwise the bullet points fall outside the parent element
              style={{ margin: '0.5em 1em' }}
            >
              <strong>
                <a href={page.sectionRoute}>{page.pageTitle}</a>
              </strong>{' '}
              (<span>{page.sectionRoute}</span>)
            </li>
          );
        }
        setNotFoundMessage(
          <>
            <p>
              The page you're looking for may have been moved. Here are some
              possible matches:
            </p>
            <p>{formattedMatchingPages}</p>
            <p>You can use the search at the top right for more results.</p>
          </>
        );
      } else {
        setNotFoundMessage(
          <>
            <p>
              The page you're looking for may have been moved, but no matching
              pages were found ☹️
            </p>
            <p>You can use the search at the top right for more results.</p>
          </>
        );
      }
    });
  }, []);

  return (
    <>
      {/* Source: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NotFound/Content/index.tsx */}
      <main className={clsx('container margin-vert--xl', className)}>
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1" className="hero__title">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page"
              >
                Page not found
              </Translate>
            </Heading>
            <>{notFoundMessage}</>
          </div>
        </div>
      </main>
    </>
  );
}
