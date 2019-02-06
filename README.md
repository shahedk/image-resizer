# Image Resizer

A micro-service to resize images. It provides an http end-point that takes the original url, desired height & width as parameters and returns the resized image in response

It is also available as docker container.

```
docker pull shahedk/image-resizer:latest
```

The following script will start the container at http://localhost:8080.

```
docker run  -p 8080:80 shahedk/image-resizer:latest
```

For example, to resize an image from "http://cdn.shahed.ca/default.jpg" into 100x100 pixel the request would be like this:

```
http://localhost:8080/resize?w=100&h=100&url=http%3A//cdn.shahed.ca/default.jpg
```