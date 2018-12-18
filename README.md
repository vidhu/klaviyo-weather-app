# Weather App
Weather app for Klaviyo. [Specification here](https://www.klaviyo.com/weather-app)

## Arcitecture
![Arcitecture Overview](https://i.imgur.com/YK1F7Jr.png)

## Quick Start
```sh
git clone https://github.com/vidhu/klaviyo-weather-app.git
docker-compose up --scale mailer=2
docker exec -it web weather-cli
```
These commands willl clone the directory and start all the services. There will be to 2 mailer micro services running. There can be any number of web servers and mailer services running. 

The `docker exec...` command will invoke the cli tool which is installed as a binary in all the web servers. 

Visit the frontend at `http://localhost:8080` or whatever your docker-machine ip address is

View send emails here:
https://ethereal.email/messages
```
username: en57otb2vldrenmg@ethereal.email
password: ckZWafnyfGFvqQqsHN
```

## Development
Run the backend services
```sh
docker-compose -f docker-compose.dev.yml up
```

Run react development server
```sh
cd frontend
BASE_URL=http://localhost:8080 npm run start
```

## Run
```sh
docker-compose -f docker-compose.yml up --scale mailer=2
```

When containers are build built, the frontend is built first in a staging container and then added into the backend container. It doesn't have its own container. Its served by `express` as the default route.

Visit `localhost:8080`

## Test
 > Todo :(