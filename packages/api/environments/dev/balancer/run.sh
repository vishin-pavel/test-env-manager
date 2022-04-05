docker run --name hl-proxy -d -p 8080:8080 -p 80:80 -p 8889:8889  -v $PWD/proxy.yml:/etc/traefik/traefik.yml traefik:v2.5
