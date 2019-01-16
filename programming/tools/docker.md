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
