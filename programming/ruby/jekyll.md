---
title: Jekyll
---

#### Install Ruby

(Includes the gem command and header files for installing native modules)

```
sudo apt install ruby ruby-dev
```


#### Install and configure Jekyll
[https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)


#### Running Jekyll

```
bundle exec jekyll serve --livereload
```


#### Updating gems
This is particularly useful if Github bugs you that you have a security vulnerability in one of your dependencies.

```
rm Gemfile.lock
bundle install
```
