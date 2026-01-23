import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My wiki',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://bmaupin.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wiki/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bmaupin', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/bmaupin/wiki/',
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return formatSidebarItems(sidebarItems);
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    navbar: {
      title: 'My wiki',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Current docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'archive',
          position: 'left',
          label: 'Archive',
        },
        {
          href: 'https://github.com/bmaupin/wiki/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} bmaupin Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

// https://stackoverflow.com/a/1026087/399105
const capitaliseFirstLetter = (val: string): string => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

const getCategoryPath = (category): string => {
  if (category.items && category.items.length > 0) {
    // Categories (directories) don't have an ID from which we can generate the path,
    // so get the ID from the documents under the directory
    if (category.items[0].id) {
      let path = category.items[0].id.split('/');
      path.pop();
      return path.join('/');
    }
    // TODO: This isn't quite right; see operating-systems/android
    // // If a directory only contains directories, we need to go deeper until we get to a doc
    // else if (category.items[0].items.length > 0) {
    //   return getCategoryPath(category.items[0]);
    // }
  }
  // Fallback; this is the default directory path
  return `category/${category.label}`;
};

const formatSidebarItems = (items) => {
  for (const item of items) {
    if (item.type === 'category') {
      // TODO: this is quite broken
      // item.link = {
      //   type: 'generated-index',
      //   slug: getCategoryPath(item),
      // };
      item.label = capitaliseFirstLetter(item.label);
      item.label = item.label.replaceAll('-', ' ');

      if (item.items) {
        item.items = formatSidebarItems(item.items);
      }
    }
  }

  return items;
};

export default config;
