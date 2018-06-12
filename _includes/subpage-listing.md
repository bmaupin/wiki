{%- assign sorted_pages = site.pages | sort: 'url' -%}
{%- for site_page in sorted_pages -%}
  {% comment %} This is a workaround for site_page.url.beginswith(page.dir) {% endcomment %}
  {%- assign relative_subpage_url = site_page.url | remove_first: page.dir -%}
  {%- assign reconstructed_url = page.dir | append: relative_subpage_url -%}
  {%- if site_page.url == reconstructed_url and site_page.url != page.url -%}
    {%- if site_page.path != '404.md' and site_page.path != 'assets/css/style.scss' and site_page.path != 'index.md' -%}
      {%- assign url_segments = relative_subpage_url | split: '/' -%}
      {%- assign directory_title = site_page.dir | split: '/' | last | capitalize -%}
      {%- for i in (2..url_segments.size ) -%}{{-"    "-}}{%- endfor -%} - [{{ site_page.title | default: directory_title }}]({{ relative_subpage_url }})
    {%- endif %}
  {%- endif %}
{% endfor %}
