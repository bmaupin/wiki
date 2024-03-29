---
title: Git
---

## Branches

#### Deleting a local branch

```
git branch -d BRANCH_NAME
```

#### Deleting a remote branch

```
git push origin --delete BRANCH_NAME
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

## Tags

#### Rename a tag

1. Get the commit of the original tag, e.g.

   ```
   git show v0.1
   ```

1. Create a new tag, e.g.

   ```
   $ git tag -a v0.1.0 5632ce689d0455d539dbc3829a0ec025667b85f1 -m "v0.1.0"
   ```

1. Push the new tag

   ```
   git push --tags
   ```

1. (Optional) In GitHub, edit the existing release

   1. Point it to the new tag
   1. Rename it

1. Delete the old tag

   ```
   git push origin :v0.1
   ```

## Undo

#### Undo the last local commit (will remove the last local commit, leaving your changes in place)

```
git reset HEAD~1
```

#### Undo the last public commit (like SVN revert; will make a new commit)

```
git revert HEAD
```

## Rewriting history

#### Deleting files/directories from Git history

Use `git-filter-repo`: [https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

1. Do a fresh clone of the repo

1. Use `git-filter-repo`, e.g.

   ```
   git-filter-repo --path PATH_TO_DELETE --invert-paths
   ```

1. Add back the remote (`git-filter-repo` removes it), e.g.

   ```
   git remote add origin git@github.com:user/repo.git
   ```

1. Force push to the remote

   ```
   git push --set-upstream origin main --force
   ```

## Other

#### Interactive rebasing/squashing

**Warning:** Rebasing should only be done on feature branches that nobody else is working on

1. (Optional) Create a backup branch

   ```
   git checkout -b backup
   ```

   Then switch back to the branch you want to rebase

1. Find the commit ID of the last commit you want to keep

1. Start an interactive rebase

   ```
   git rebase -i COMMIT_ID
   ```

   Ex:

   ```
   git rebase -i 91b49d38
   ```

1. Go through the list of commits and change `pick` as desired

   - `squash` is typically going to be the most useful option. It will take changes from that commit and add them to
     the previous commit.
     - It will make sure all changes get included without any conflicts and still gives you the opportunity to edit
       the commit message starting with the first `pick` as long as there's at least one `squash` after it (not
       counting any `fixup` commits before or after the `squash`).
     - If you don't want to change the previous commit, use `squash` or `fixup` with the next commit instead. **Don't
       use `drop`** because it will result in conflicts since it will try to apply changes to pieces of the file that
       may have been dropped.
     - Since `squash` merges changes into the previous commit, it can't be used for the first commit ID in a rebase.
   - `fixup` is really only useful for commits where you were testing or fixing typos and you're absolutely certain you
     don't want to use the commit message.
     - `squash` is typically still better because a `pick` followed by only `fixup` commits won't give you the
       opportunity to edit the commit message.
   - Commit IDs will be changed starting with the first commit where you use something other than `pick`.
   - If you simply close the interactive rebase screen, nothing will be changed.

1. Fix any conflicts as needed

   1. List the conflicted files

      ```
      git status
      ```

   1. Edit and save the conflicted files

   1. Use `git add` to mark the conflicted file as resolved. Ex:

      ```
      git add README.md
      ```

   1. Resume the rebase
      ```
      git rebase --continue
      ```

1. Push the rebased branch

   Use `--force` if this branch has already been pushed remotely

1. Delete the backup branch
   ```
   git branch -d backup
   ```
