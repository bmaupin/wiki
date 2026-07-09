---
title: Git advanced notes
---

## Branches

#### Rename a branch
1. Rename the local branch
    ```
    git branch -m oldname newname
    ```

1. Push the renamed branch
    ```
    git push origin newname
    ```

1. Delete the remote branch
    ```
    git push origin --delete oldname
    ```


#### Create a new, empty branch
```
git checkout --orphan BRANCHNAME
git rm -rf .
```



## Rewriting history

#### Delete pushed commits

**Never do this if other people are using the repo!**

If you wish to delete all commits after a certain one:
1. Get the hash of the last commit you want to keep:
    ```
    git log -p
    ```

1. Do a hard reset to that commit
    ```
    git reset --hard 2221651
    ```

1. Do a force push to delete the remote commits
    **Always specify the branch if you have more than one branch!**
    ```
    git push --force
    ```


#### Delete a file completely from git history
[https://help.github.com/articles/remove-sensitive-data/#using-filter-branch](https://help.github.com/articles/remove-sensitive-data/#using-filter-branch)
```
cd /path/to/repo
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA' \
--prune-empty --tag-name-filter cat -- --all
git push origin --force --all
git push origin --force --tags
```



## Merging

#### Merge specific files from one branch to another, without history
[http://stackoverflow.com/a/1355990/399105](http://stackoverflow.com/a/1355990/399105)



## Workflows

#### Sample feature branch workflow

These instructions are based on a feature branch workflow:
[https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

Rebasing instead of merging is used on the feature branch for cleaner project history:
[https://www.atlassian.com/git/tutorials/merging-vs-rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
1. Pull the latest updates to the repo
    ```
    cd /path/to/repo
    git pull
    ```

1. Create a new branch named after the feature
    ```
    git checkout -b FEATURE-NAME
    ```

    Ex:
    ```
    git checkout -b feature-add-logout
    ```

1. Do work in the new branch, committing as needed
    ```
    git add /path/to/file
    git commit
    ```

1. Push work periodically to the repo
    ```
    git push -u origin FEATURE-NAME
    ```

    Ex:
    ```
    git push -u origin feature-add-logout
    ```

    (The first push will start tracking the feature branch. After than, you can just use `git push`)

1. Discuss changes with other users of the repository

1. Prepare feature branch for merging
    ```
    git checkout master
    git pull
    git checkout FEATURE-NAME
    git pull
    git rebase master
    ```

1. Merge feature branch
    - To merge your branch and keep all commits:
        ```
        git checkout master
        git merge FEATURE-NAME
        git push
        ```

    - To add work to the main branch as one commit (losing all of the individual commit logs):
        ```
        git checkout master
        git merge --squash FEATURE-NAME
        git commit -m "Commit message for your feature"
        git push
        ```

1. If you're finished with the feature branch, you can delete it
    1. Delete the branch locally
        ```
        git branch -d FEATURE-NAME
        ```

    1. Delete the branch remotely
        ```
        git push origin --delete FEATURE-NAME
        ```

## Ignoring

#### Ignore local changes to a file in the repo
[https://stackoverflow.com/a/20241145/399105](https://stackoverflow.com/a/20241145/399105)
