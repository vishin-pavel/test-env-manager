import {Request, Response} from "express";
import path from 'path'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import fs from 'fs'
import Docker from 'dockerode'

export const eventHandler = async (req: Request, res: Response) => {
    try {

        if (req.headers['x-github-event'] !== 'push') {
            res.json('ok')
            return
        }
        if (req.body.deleted) {
            res.json('ok')
            console.log('Deleted');
            return
        }
        if (typeof req.body.ref !== 'string') {
            res.json('ok')
            console.log('NO REF');
            return
        }

        const baseDir = path.join(process.cwd(), '../workflow')
        const refNameParts = req.body.ref.split('/')
        const refName = refNameParts[refNameParts.length - 1]
        const repoPath = `${baseDir}/${refName}`

        console.log(req.body.ref, ' >>> ', repoPath);

        await git.clone({
                fs,
                http,
                dir: repoPath,
                url: 'https://github.com/vishin-pavel/test-env-manager.git'
            })

        await git.checkout({
            fs,
            dir: repoPath,
            ref: refName,
        })

        console.log('Cloned');


        const docker = new Docker({socketPath: '/var/run/docker.sock'});
        const stream = await docker.buildImage({
            context: repoPath,
            src: ['.']
        }, {t: refName})
        const buildResult = await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
        });

        console.log('BUILT');
        console.log(buildResult);

        docker.createContainer({
            Image: refName,
            name: refName,
            Labels:{
                'traefik.enable':'true',
                [`traefik.http.routers.${refName}.rule`]: `Host(\`${refName}.localhost\`)`,
                [`traefik.http.routers.${refName}.entrypoints`]:'web'
            },
            HostConfig: {
                NetworkMode: "traefik"
            },
        },  (err, container) => { if(!err)container?.start() })

        res.json('ok')
    } catch (e) {
        console.log(e);
    }
}

export const testDocker =  async (req: Request, res: Response) => {
    const docker = new Docker({socketPath: '/var/run/docker.sock'});
    const images = await docker.listImages()
    res.json(images)
}
