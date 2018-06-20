export function configurePageListing(id) {
  let pageListing = document.getElementById(id);
  let pageListingLinks = pageListing.getElementsByTagName('a');

  for (let i = 0; i < pageListingLinks.length; i++) {
    let listCollapser = document.createElement('span');
    pageListingLinks[i].parentNode.insertBefore(listCollapser, pageListingLinks[i]);

    // Don't show the collapse icon if there are no subelements
    if (pageListingLinks[i].nextElementSibling === null) {
      listCollapser.className = 'list-collapser';
      continue;
    }

    if (id === 'sidebar-menu') {
      listCollapser.className = 'fas fa-chevron-down list-collapser collapsed';
    } else {
      listCollapser.className = 'fas fa-chevron-down list-collapser expanded';
    }

    // Adapted from https://stackoverflow.com/a/30945775/399105
    listCollapser.onclick = function() {
      let ul = this.parentElement.querySelectorAll('ul')[0];

      if (ul.offsetHeight > 0) {
        ul.style.display = 'none';
        this.className = 'fas fa-chevron-down list-collapser collapsed';
      } else {
        ul.style.display = 'block';
        this.className = 'fas fa-chevron-down list-collapser expanded';
      }
    }
  }
}
