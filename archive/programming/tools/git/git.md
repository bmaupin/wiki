---
title: Git
---

#### Helpful documentation
- [http://gitref.org/](http://gitref.org/)
- [http://help.github.com/](http://help.github.com/)


## Quick reference

#### Change remote push URL from https:// to git://:
```
git remote set-url --push origin git@`git remote -v | grep push | cut -d / -f 3`:`git remote -v | grep push | awk '{print $2}' | cut -d / -f 4-5`
```


#### Undo uncommitted local changes
```
git reset HEAD
git checkout .
git clean -df
```


## Misc

#### Automatically fetch and merge changes from a git repo (svn update)
```
cd MYGITREPO
git pull
```


#### Git pull without creating a new merge commit
```
git pull --rebase
```


#### Add files to git repo

```
git add FILE1 FILE2
```




#### Remove files from git repo

```
git rm FILE1 FILE2
```




#### Show current changes

```
git status
```




#### Commit changes to repo

```
git commit -m 'COMMIT MESSAGE'
```




#### Ignore changes to specific files in repo
1. Create a file called .gitignore in the root of the repo
1. Add the path to all the files you want to ignore
1. Add and commit .gitignore

Ex:
```
echo "bin/
gen/" > .gitignore
git add .gitignore
git commit -m "add .gitignore"
```

Repository of .gitignore templates:
[https://github.com/github/gitignore](https://github.com/github/gitignore)


#### Go back to HEAD after you've checked out a particular revision
```
git checkout master
```


#### Get a particular version of a file from a particular commit
```
git checkout 40276 my_project/libs/android-support-v4.jar
```


#### Stage newly added files
```
git add .
```



## Undo

#### Undo uncommitted local changes
```
git reset HEAD
git checkout .
git clean -df
```


#### Undo the last local commit (will remove the last local commit, leaving your changes in place)
```
git reset HEAD~1
```


#### Undo the last public commit (like SVN revert; will make a new commit)
```
git revert HEAD
```



## Push

#### Push local repo to remote repo
```
git push -u origin master
```


#### Push and track all local branches to remote branches with the same name
```
git push --all origin -u
```

To push after this:
```
git push
```



## Logs

#### Show a log of commits, one per line
```
git log --pretty=oneline
```


#### Show a log of commits with list of files changed
```
git log --stat
```


#### Show a log of commits with diffs of changes
```
git log -p
```


#### Show the contents of a particular commit
```
git show COMMIT_ID
```

Ex:
```
git show 33f5
```

(note you don't need to use the entire commit id, only the first few unique characters--at least 4)



## Tags

#### Show which tag you're currently on
```
git describe
```


#### List tags
```
git tag
```


#### Fetch a particular tag
```
cd MYGITREPO
git checkout TAG_NAME
```


#### Create a tag
```
git tag -a TAG_NAME -m 'TAG MESSAGE'
```

ex:
```
git tag -a v1.0 -m 'version 1.0: first production version'
```


#### Show the details for a particular tag
```
git show v1.0
```


#### Push local repo to remote repo, including tags
```
git push -u origin master --tags
```



## Branches

#### List local branches
```
git branch
```


#### List all available branches (including remote branches)
```
git branch -a
```


#### Switch to a particular branch
```
git checkout BRANCH_NAME
```


#### Create a new branch from the current working directory
```
git checkout -b BRANCH_NAME
```


#### Push newly created branch
```
git push origin BRANCH_NAME
```


#### Create a new branch from a particular commit
```
git branch COMMIT_ID
```


#### Merge a branch back into master
```
git checkout master
git merge BRANCH_NAME
```


#### Deleting a local branch
```
git branch -d BRANCH_NAME
```


#### Deleting a remote branch
```
git push origin --delete BRANCH_NAME
```



## Setup

#### Install git (ubuntu)
```
sudo apt install git
```


#### Create a git repo
```
mkdir MYREPO
cd MYREPO
git init
git remote add origin git@github.com:username/myrepo.git
```


#### Retreive a git repo for the first time (svn checkout)
```
git clone git://example.com/repository.git
```



## Remote operations

#### List remote repositories
```
git remote
```


#### Remove a remote repository
```
git remote rm REMOTE_NAME
```


#### Add a remote repository
```
git remote add REMOTE_NAME git://example.com/repository.git

```

Ex:
```
git remote add origin git://example.com/repository.git
```


#### List remote URLs
```
git remote -v
```


#### Change remote URL
Change remote push URL from https:// to git://:
```
git remote set-url --push origin git@`git remote -v | grep push | cut -d / -f 3`:`git remote -v | grep push | awk '{print $2}' | cut -d / -f 4-5`
```

(Does this: `git remote set-url --push origin git@github.com:USERNAME/REPOSITORY.git`)

That sets just the push URL. To set the fetch URL:
```
git remote set-url origin https://github.com:USERNAME/REPOSITORY.git
```



## Stash

#### Stash all uncommitted files with a description
```
git stash save "DESCRIPTION"
```


#### Restore the most recent stash and remove it from the list of stashes
```
git stash pop
```


#### Restore the most recent stash and keep it in the list of stashes
```
git stash apply
```


#### Restore a specific stash
1. List all available saved stashes
    ```
    git stash list
    ```

1. Restore the stash
    - Restore the stash and remove it from the list of stashes
        ```
        git stash pop stash@{INDEX}
        ```

    - Restore the stash and keep it in the list of stashes
        ```
        git stash apply stash@{INDEX}
        ```
