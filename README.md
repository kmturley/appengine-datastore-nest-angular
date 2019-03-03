# appengine-datastore-nest-angular

Example full-stack Typescript project using:

* AppEngine Standard
* Google Datastore 3.1.x
* NodeJS 10.x
* NestJS 5.6.x
* Angular Universal 7.1.x
* Docker 18.x
* Googe OAuth2


## Auth Setup

Create a Google Cloud project, and enable the Google+ API at:

    https://console.cloud.google.com/apis/library/plus.googleapis.com

Then create some credentials and save to a file at /backend/credentials.json:

    APIs & Services > Create credentials > OAuth client ID > Other > Enter name > Download JSON

Then generate a JWT token using:

    cd backend
    npm run generate-token

Save in the following format at /backend/jwt.json

    {
      "secret_key": "X"
    }

## Installation

Install dependencies and build images using:

    docker-compose build


## Usage

Run the backend and frontend together using:

    docker-compose up

View the Nest backend at:

    http://localhost:8080/

View the Angular frontend at:

    http://localhost:4200/


## Automatic Deployment

Go to Google Cloud Build:

    https://console.cloud.google.com/cloud-build/triggers

Click 'Add Trigger' and name it 'Backend'. Then set Cloud Build configuration file location:

    /backend/cloudbuild.yaml

Click 'Add Trigger' and name it 'Frontend'. Then set Cloud Build configuration file location:

    /frontend/cloudbuild.yaml


## Manual Deployment

Deploy backend service:

    cd backend
    gcloud init
    npm install
    npm run build
    npm run deploy

Deploy frontend service:

    cd frontend
    gcloud init
    npm install
    npm run build:prerender
    npm run deploy


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
