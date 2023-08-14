---
title: Git advanced notes
---

## Dates

#### Show commit logs with author and commit date

```
git log --pretty=fuller
```

## Tags

#### Lightweight vs. annotated tags

Lightweight tags simply point to a commit. They don't have their own hash, date, or message.

Annotated tags point to a commit, but they have their own hash, date, and message.

GitHub typically creates lightweight tags.

#### Convert annotated tags to lightweight tags

[Can an annotated tag be replaced with a lightweight tag?](https://stackoverflow.com/a/75725806/399105)

#### Update tags after a rebase

This script will attempt to update the references for tags after a rebase has changed the hashes of the commits the tags are referencing:

```bash
for tag in $(git for-each-ref --format="%(refname:short)" "refs/tags/*"); do
  objecttype=$(git for-each-ref --format="%(objecttype)" "refs/tags/${tag}")
  if [ "$objecttype" == "tag" ]; then
    originalcommithash=$(git for-each-ref --format="%(*objectname)" "refs/tags/${tag}")
    tagdate=$(git for-each-ref --format="%(creatordate)" "refs/tags/${tag}")
    tagmessage=$(git for-each-ref --format="%(subject)" "refs/tags/${tag}")

  elif [ "$objecttype" == "commit" ]; then
    originalcommithash=$(git for-each-ref --format="%(objectname)" "refs/tags/${tag}")
  fi

  originalcommitmessage="$(git log --format=%B -n 1 ${originalcommithash})"
  matchedcommithashes=()

  for commithash in $(git log --format=%H); do
    commitmessage="$(git log --format=%B -n 1 ${commithash})"
    if [ "$commitmessage" == "$originalcommitmessage" ]; then
      matchedcommithashes+=("$commithash")
    fi
  done

  if [ ${#matchedcommithashes[@]} -ne 1 ]; then
    echo "WARNING: No exact commit match for tag ${tag}: ${matchedcommithashes[@]}"
    echo "    NOT updating tag"
  else
    # Update annotated tags
    if [ "$objecttype" == "tag" ]; then
      #echo "GIT_COMMITTER_DATE=\"$tagdate\" git tag -f -a \"$tag\" \"${matchedcommithashes[0]}\" -m \"$tagmessage\""
      GIT_COMMITTER_DATE="$tagdate" git tag -f -a "$tag" "${matchedcommithashes[0]}" -m "$tagmessage"
    # Update lightweight tags
    elif [ "$objecttype" == "commit" ]; then
      #echo "git tag -f ${tag} ${matchedcommithashes[0]}"
      git tag -f ${tag} ${matchedcommithashes[0]}
    fi
  fi
done
```
