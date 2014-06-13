AngularJS Test Starter
====================

Setup Unit tests and E2E tests for AngularJS with Karma, Protractor, and Grunt using TodoMVC as the tested app.

Grunt Commands
---
```grunt serve``` - Starts Karma, connects to the web server, and re-runs tests when changes are made

#####grunt karma:single
Runs unit tests, jshint, and test coverage reporter once

#####grunt unit-test
Starts Karma and re-runs tests when changes are made

#####grunt test
Runs all unit tests and E2E tests once using Karma and Protractor

Karma html2js Plugin
---
This is disabled as there are no directives with a templateUrl but all the configuration is in the karma-conf.js file.