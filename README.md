# Puppies in Sea Trouble

Puppies in Sea Trouble is an online game experiment, where players must man a lighthouse together to save seafaring puppies from peril.

- Run the game in your browser and keep clicking to keep the lighthouse alive.
- Share the URL with friends to man the lighthouse when you're not there or play together to save some puppies!

Game URL: [https://puppies-in-sea-trouble.herokuapp.com](https://puppies-in-sea-trouble.herokuapp.com/)

![screenshot0.png](https://static.jam.vg/raw/172/a/z/5770.png)

## Tech

* Typescript game server backend with Express + [Socket.io](https://socket.io)
* Typescript game frontend with [Phaser.io](https://phaser.io).
* Webpack for frontend
* Docker for local development environment
* Heroku deployment
* PostgreSQL + Redis for data persistence + cache
* CI capability. Currently only testing with tslint + David
* Bonus: Web3 for connecting to the Ethereum blockchain (Wound up not using this)

## Local development

Requirements: Docker, npm

1. Clone this repository
1. Enter shell with Docker `npm run shell`
1. Inside Docker shell: `npm install && knex migrate:latest`
1. Exit the shell with `exit`
1. `docker-compose up web`

Start developing!

## [Save the puppies!](https://puppies-in-sea-trouble.herokuapp.com/)

