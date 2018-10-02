{%- assign sorted_pages = site.pages | sort: 'url' -%}
{%- for site_page in sorted_pages -%}
  {%- unless site.paths_to_ignore contains site_page.path -%}
    {% comment %} Don't show pages beginning with '/archive/' on the home page {% endcomment %}
    {%- assign first_url_segment = site_page.url | slice: 1, site_page.url.size | split: '/' | first -%}
    {%- unless first_url_segment == 'archive' -%}
      {%- assign url_segments = site_page.url | slice: 1, site_page.url.size | split: '/' -%}
        {% comment %} The capitalized directory name will be used if the page doesn't have a title {% endcomment %}
        {%- assign directory_title = site_page.dir | split: '/' | last | capitalize -%}
        {% comment %} Indent links starting at the second level for a hierarchical page tree link list {% endcomment %}
        {%- for i in (2..url_segments.size ) -%}{{-"    "-}}{%- endfor -%}- [{{ site_page.title | default: directory_title }}]({{ site_page.url | relative_url }})
    {%- endunless %}
  {%- endunless %}
{% endfor -%}
- [Archive]({{ '/archive/' | relative_url }})
