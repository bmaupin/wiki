let subpageListing = document.getElementById('subpage-listing');
let subpageLinks = subpageListing.getElementsByTagName('a');

for (let i = 0; i < subpageLinks.length; i++) {
  let listCollapser = document.createElement('span');
  subpageLinks[i].parentNode.insertBefore(listCollapser, subpageLinks[i]);

  // Don't show the collapse icon if there are no subelements
  if (subpageLinks[i].nextElementSibling === null) {
    listCollapser.className = 'list-collapser';
    continue;
  }

  listCollapser.className = 'fas fa-chevron-down list-collapser';

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
