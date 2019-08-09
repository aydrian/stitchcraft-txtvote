# Text to Vote

An application created using MongoDB Stitch and React.js. It uses Twilio to facilitate entering and voting for a contest. The Live-coding video for this app can be found on the [StitchCraft YouTube](https://youtu.be/OAK-qLaQzWY).

[![Powered by Stitch](http://badge.learnstitch.com/?appid=stitchcraft-txtvote-xlhrw)](http://cloud.mongodb.com)

## web-ui

React.js application created using [Create React App](https://github.com/facebook/create-react-app).

## stitch-app

Exported (as template) [Stitch app](https://docs.mongodb.com/stitch/deploy/export-stitch-app/).

## Scripts

The following scripts will assist in the initial setup of your Stitch Application.

## Requirements:

- Install the [stitch-cli](https://docs.mongodb.com/stitch/deploy/stitch-cli-reference/)
- Generate an [API Key](https://docs.atlas.mongodb.com/configure-api-access/#generate-api-keys)
- Create a `.env` file like the following

```
export STITCH_API_KEY=<API_KEY>
export STITCH_USERNAME=<CLOUD_USERNAME>
export STITCH_APPID=<APPID>
```

- Create a `secrets.json` file in the `stitch-app` directory like the following

```
{
  "services": {
    "aws": {
      "secretAccessKey": "<secret-access-key>",
      "accessKeyId": "<access-id>"
    },
    "twilio": {
      "auth_token": "<auth-token>"
    }
  }
}
```

**NOTE:** Do not commit this file.

### deploy.sh

Deploy current code using `./deploy.sh` in the root of the project

```
> ./deploy.sh
```

### export.sh

Export the project code template using `./export.sh` in the root of the project.

```
> ./export.sh
```

**Note:** This exports the application configuration without any service ID values, including the App ID.
