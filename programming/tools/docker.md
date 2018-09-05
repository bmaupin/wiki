---
title: Docker
---

## Containers

#### List running containers
```
docker container ls
```


#### List all containers
```
docker container ls --all
```


#### Stop a container

```
docker container stop CONTAINER_ID
```


#### Clean up containers
This will delete all stopped containers (typically this is safe since the associated images won't be affected):
```
docker container prune
```



## Images

#### List images
```
docker image ls
```


#### Delete an image
```
docker image rm IMAGE_ID
```

If the image is associated with a container, you may need to delete the container first. One quick way to do this is to use `docker container prune` (see above).



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
