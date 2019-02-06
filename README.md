# Image Resizer

A micro-service to resize images. It provides a http end-point that takes the original url, desired height & width as parameters and returns the resized image in response

It is also available as docker container. For example, the following script will start the container at http://localhost:8080.

`
docker pull shahedk/image-resizer:latest

docker run  -p 8080:80 shahedk/image-resizer:latest
`
