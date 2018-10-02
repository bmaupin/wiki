{%- assign sorted_pages = site.pages | sort: 'url' -%}
{%- for site_page in sorted_pages -%}
  {% comment %} The next 3 lines are a workaround for site_page.url.beginswith(page.dir) {% endcomment %}
  {%- assign relative_subpage_url = site_page.url | remove_first: page.dir -%}
  {%- assign reconstructed_url = page.dir | append: relative_subpage_url -%}
  {%- if site_page.url == reconstructed_url and site_page.url != page.url -%}
    {%- unless site.paths_to_ignore contains site_page.path -%}
      {% comment %} Don't show pages beginning with '/archive/' on the home page {% endcomment %}
      {%- assign first_url_segment = site_page.url | slice: 1, site_page.url.size | split: '/' | first -%}
      {%- unless page.url == '/' and first_url_segment == 'archive' -%}
        {%- assign url_segments = relative_subpage_url | split: '/' -%}
        {% comment %} The capitalized directory name will be used if the page doesn't have a title {% endcomment %}
        {%- assign directory_title = site_page.dir | split: '/' | last | capitalize -%}
        {% comment %} Indent links starting at the second level for a hierarchical page tree link list {% endcomment %}
        {%- for i in (2..url_segments.size ) -%}{{-"    "-}}{%- endfor -%}- [{{ site_page.title | default: directory_title }}]({{ relative_subpage_url }})
      {%- endunless %}
    {%- endunless %}
  {%- endif %}
{% endfor %}
{% if page.url == '/' %}
- [Archive]({{ '/archive/' | relative_url }})
{% endif %}
