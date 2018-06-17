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

  // Set initial height manually so collapse animation will work
  let ul = listCollapser.parentElement.querySelectorAll('ul')[0];
  ul.style.height = ul.scrollHeight + "px";

  // Adapted from https://stackoverflow.com/a/30945775/399105
  listCollapser.onclick = function() {
    let ul = this.parentElement.querySelectorAll('ul')[0];

    if (ul.className !== 'collapsed') {
      ul.className = 'collapsed';
      ul.style.height = 0;
      this.className = 'fas fa-chevron-right list-collapser';
    } else {
      ul.className = 'expanded';
      ul.style.height = ul.scrollHeight + "px";
      this.className = 'fas fa-chevron-down list-collapser';
    }
  }
}
