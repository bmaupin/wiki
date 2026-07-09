---
title: GitHub Actions
---

#### Set up GitHub Actions

[https://docs.github.com/en/actions/quickstart](https://docs.github.com/en/actions/quickstart)

1. Create the necessary directories in your project

   ```
   mkdir -p .github/workflows
   ```

1. Create the new workflow file

   ```
   touch .github/workflows/ci.yml
   ```

1. Populate the workflow file with one of the starter workflows

   - The starter workflows are here: [https://github.com/actions/starter-workflows](https://github.com/actions/starter-workflows). See here for CI starter workflows in particular: [https://github.com/actions/starter-workflows/tree/main/ci](https://github.com/actions/starter-workflows/tree/main/ci)

   - When copying the starter workflow, replace `$default-branch` with `main` or `master` as appropriate (`$default-branch` is only for workflow templates)

1. (Optional) Create a badge in your readme

   Follow this pattern:

   ```markdown
   [![CI](https://github.com/USER/REPOSITORY/workflows/WORKFLOW_NAME/badge.svg)](https://github.com/USER/REPOSITORY/actions)
   ```

   - Replace `USER` and `REPOSITORY` as necessary
   - Replace `WORKFLOW_NAME` with the exact value you used for `name` in the workflow file, e.g. `CI`
     - **Note** that this is case-sensitive

   e.g.

   ```markdown
   [![CI](https://github.com/bmaupin/devops-cheatsheets/workflows/CI/badge.svg)](https://github.com/bmaupin/devops-cheatsheets/actions)
   ```

#### Skip CI

Add `[skip ci]` to the commit message

## Jobs

#### Run an executable file in the repo

Prefix it with `./`, e.g.

```yaml
- name: Build
  run: ./build.sh
```

#### Run multiple commands in a step

Use a pipe, e.g.

```yaml
run: |
  wget https://github.com/IDPF/epubcheck/releases/download/v${EPUBCHECK_VERSION}/epubcheck-${EPUBCHECK_VERSION}.zip
  unzip epubcheck-${EPUBCHECK_VERSION}.zip
```
