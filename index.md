---
title: Home
---

<ul>
    {% assign sorted_pages = site.pages | sort: 'path' %}
    {% for page in sorted_pages %}
      {% if page.title and page.path != '404.md' and page.path != 'index.md' %}
        <li><a href="{{ page.url | relative_url }}">{{ page.dir }}{{ page.title }}</a></li>
      {% endif %}
    {% endfor %}
</ul>
