---
title: Home
---

{%- assign sorted_pages = site.pages | sort: 'url' -%}
{%- for page in sorted_pages -%}
  {%- if page.path != '404.md' and page.path != 'assets/css/style.scss' and page.path != 'index.md' -%}
    {%- assign url_segments = page.url | slice: 1, page.url.size | split: '/' -%}
    {%- for i in (2..url_segments.size) -%}{{-"    "-}}{%- endfor -%} - [{{ page.title | default: page.dir | split: '/' | last | capitalize }}]({{ page.url | relative_url -}})
  {%- endif %}
{% endfor -%}
