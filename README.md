# nuxt-fs

> A sample full-stack web application with NuxtJS, Express and MongoDB deploying on now.sh

## BUILD SETUP

```bash
# install dependencies
$ npm install

# add variables to ".env" files
+ MONGO_URI
+ NODE_ENV
    - 'development' when running locally
    - 'production' before deploying to now.sh
+ API_DEV_PORT (any port number except 3000)

# run locally
$ npm run dev

# deploy to now.sh
$ now --prod
```
