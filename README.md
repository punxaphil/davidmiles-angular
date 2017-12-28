# DavidMiles

## Pre-requisites:
- node & npm
- angular cli: `npm install -g @angular/cli`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build -op docs` to build the project. The build artifacts will be stored in the `docs` directory. Use the `-prod` flag for a production build.

## Using Docker

If you do not wish to install npm, node and angular cli locally on your machine, Docker can be used instead.

Make sure you have docker installed: https://docs.docker.com/engine/installation/#desktop

- Dev server: sh docker/serve.sh
- Build: sh docker/build.sh
- Bash: sh docker/bash.sh
