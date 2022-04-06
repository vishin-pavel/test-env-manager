
# How it works
The idea is to have a separate service to serve backends and point
Vercel builds to that backends. This service is a scratch of how it could work. 

#### Notice: There is a lot of code in this repo, but in fact, you should pay attention only to expressJS controllers in `/packages/api/src/application/controllers`

### Step-by-step
1. eventHandler() in the github.controller.ts handle events from Github
2. If new a branch or a comment is pushed -- start processing
3. Clone repo and switch to the branch 
4. Build a new docker image using Dockerfile in the root of that branch
5. Create a container from the image with proper labels to let Traefik build a
route to the container.
6. Traefik automatically detect new container and route to request to it

As a result each time you create new branch in this repo it can be accepted on 
`http://[branch-name].localhost`

# Important places
- Dockerfile - simple build instructions for this service
- docker-compose.yml - starts Traefik witch should serve containers
- `/packages/api/src/application/controllers/github/github.controller.ts` -> eventHandler() - GitHub webhook handler
- `/packages/api/src/application/controllers/users/user.controller.ts` -> simple payload for the service to check it works.
 `http://[branch-name].localhost/users/ping`

### How to try
1. fork repo
2. clone repo
3. create docker network manually `docker network create traefik`
4. run docker-compose.yml
5. run [Ngrok](https://ngrok.com/) (service starts on port 8888)
6. go to forked repo on Github -> Settings -> webhook
7. add webhook to your Ngrok
8. start service `npm run dev`
9. create new branch, make update and push
10. visit `http://[branch-name].localhost/users/ping`
