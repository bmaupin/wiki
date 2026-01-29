import React, { type ReactNode } from 'react';
import MDXContent from '@theme-original/MDXContent';
import type MDXContentType from '@theme/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import Admonition from '@theme/Admonition';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof MDXContentType>;

export default function MDXContentWrapper(props: Props): ReactNode {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/wiki/archive') && (
        <Admonition title="Archived" type="warning">
          <p>
            This page has been archived and will receive no further updates.
          </p>
        </Admonition>
      )}
      <MDXContent {...props} />
    </>
  );
}
