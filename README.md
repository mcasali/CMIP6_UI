# GISClimateData
Written by Nhi Nguyen

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

[Main repository for edits found here](https://github.com/NCAR/RAL_GIS_Data_Converter). Instructions for build found in this repo.

This RAL_drupal_gis_climatedata repository is for the Web Dev team, though the only important files live in dist/GISClimateData.
- The dist folder gets dropped into user@faraday:/www/virtual/gisclimatechange-dev/drupal/sites/default/modules/gis_climatedata and user@faraday:/www/virtual/gisclimatechange/drupal/sites/default/modules/gis_climatedata
- There is an includes/main.css file for small edits to the UI.
- Must correct gis_climatedata.module to point to the correct paths for the dist/GISClimateData filename changes. The {random-hash} in main.{random-hash}.js get changed when a software engineer builds it in the other GitHub repo linked above.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
