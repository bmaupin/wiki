---
title: Docker
---

## Build

#### Build a container image

[https://docs.docker.com/engine/reference/commandline/build/](https://docs.docker.com/engine/reference/commandline/build/)

If the current directory has a `Dockerfile`:

```
docker build -t IMAGE_NAME .
```

## Run

#### Run a container image

[https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)

```
docker run FLAGS IMAGE_NAME [COMMANDS]
```

⚠ Make sure the flags come before the image name, otherwise they'll be interpreted as commands to run inside the container

Some helpful flags:

- `--rm`: Automatically delete the container when it's stopped
- `-it`: Use these when you will be connecting to the container (e.g. to run a shell)
- `--network=host`: Use the host machine's network instead of the default bridge network
  - This can be useful whenever the container is having problems accessing the network
- `-v`: Mount a directory from the host machine on the container, e.g. `-v "$PWD:/build"`
- `-e`: Set an environment variable, e.g. `-e grails.env=dev`
  - Or use `--env-file` to read in a `.env` file
- `--name`: When not using `--rm`, give the container a name which can be used to re-run it using `docker start`, e.g. `docker start -a NAME`

## Containers

#### List running containers

```
docker container ls
```

#### List all containers

```
docker container ls --all
```

#### Connect to a terminal in a container

```
docker container exec -it CONTAINER_NAME_OR_ID sh
```

#### Stop a container

```
docker container stop CONTAINER_NAME_OR_ID
```

#### Delete a container

```
docker container rm CONTAINER_NAME_OR_ID
```

## Images

#### List images

```
docker image ls
```

#### Clean up images

This will delete all images that don't have an associated container (you may want to delete any unused containers first--see above)

```
docker image prune -a
```

## Volumes

#### List volumes

```
docker volume ls
```

#### Create a volume

```
docker volume create VOLUME_NAME
```

#### Delete a volume

```
docker volume rm VOLUME_NAME
```
