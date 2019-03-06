#!/bin/sh
source .env
echo Running Build Command
cd web-ui && npm run build; cd -
echo Copying web-ui build files
cp -rf web-ui/build/. stitch-app-hosting/hosting/files
echo Logging into Stitch
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
echo Importing from project directory
stitch-cli import --include-hosting --app-id=$STITCH_APPID --path=./stitch-app-hosting
echo Logging out
stitch-cli logout
echo Deploy Hosting complete
