This is my wiki. There are many like it, but this one is mine.

Theme heavily inspired by [Sphinx theme for readthedocs.org](https://github.com/rtfd/sphinx_rtd_theme)

## Development

#### Install Ruby

(Includes bundle, gem, and header files for installing native modules)

```
sudo apt install ruby ruby-bundler ruby-dev
```

#### Install and configure Jekyll

[https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)

#### Running Jekyll

```
bundle exec jekyll serve --livereload
```

See [this answer](https://stackoverflow.com/a/73909796/399105) if you get this error:

```
/var/lib/gems/3.0.0/gems/pathutil-0.16.2/lib/pathutil.rb:502:in `read': no implicit conversion of Hash into Integer (TypeError)
```

#### Updating gems

This is particularly useful if Github bugs you that you have a security vulnerability in one of your dependencies (this has been remedied for this project by removing Gemfile.lock from git 🤷)

```
rm Gemfile.lock
bundle install
```
