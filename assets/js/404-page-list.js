const basename = (url) => {
  url = String(url);
  // http://example.com/some/path/ would return "path"
  if (url.endsWith('/')) {
    return url.split('/')[url.split('/').length - 2];
  }
  // http://example.com/some/page.html would return "page.html"
  else {
    return url.split('/').pop();
  }
};

fetch('/wiki/assets/js/pages.json')
  .then((response) => response.json())
  .then((pages) => {
    const matchingPages = [];

    for (const page of pages) {
      if (
        basename(window.location) === basename(page.url) &&
        // sitemap.xml and robots.txt are in pages.json but don't have a title
        page.title.trim() !== ''
      ) {
        matchingPages.push(page);
      }
    }

    let html = '';

    if (matchingPages.length !== 0) {
      if (matchingPages.length === 1) {
        html = `<p>The page you're looking for may have been moved. Only one match was found, so you will be redirected in a few seconds:</p>`;

        setTimeout(function () {
          window.location.href = matchingPages[0].url;
        }, 5000);
      } else {
        html = `<p>The page you're looking for may have been moved. Here are some possible matches:</p>`;
      }

      html += '<ul>';
      for (const page of matchingPages) {
        // Add the URL below the title for easier differentiation in the case of multiple matches
        html += `
          <li>
            <a href="${page.url}">${page.title}</a><br>
            <span style="color: #6f6f6f">${page.url}</span>
          </li>
        `;
      }

      html += `</ul>`;
    } else {
      html = '<span style="font-size: 36px;">☹️</span>';
    }

    const pageList = document.getElementById('page-list');
    pageList.innerHTML = html;
  });
