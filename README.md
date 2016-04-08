AngularJS Testing Starter
====================

Setup Unit tests and E2E tests for AngularJS with Karma, Protractor, and Grunt using TodoMVC as the tested app.

Be sure to run ```npm install```

Grunt Commands
---
```grunt serve``` - Starts Karma, connects to the web server, and re-runs tests when changes are made

```grunt karma:unit``` - Runs unit tests, jshint, and test coverage reporter once

```grunt unit-test``` - Starts Karma and re-runs tests when changes are made

```grunt e2e-test``` - Starts application server and re-runs E2E tests using Protractor when changes are made

```grunt test``` - Starts application server and runs all unit tests and E2E tests once using Karma and Protractor

Blog posts
---
- [Testing With AngularJS Part 1: Setting up Unit Testing With Karma](https://www.credera.com/blog/technology-insights/open-source-technology-insights/testing-angularjs-part-1-setting-unit-testing-karma/)
- [Testing With AngularJS Part 2: Other Useful Karma Plugins](https://www.credera.com/blog/custom-application-development/testing-angularjs-part-2-useful-karma-plugins/)
- [Testing With AngularJS Part 3: Karma and Grunt](https://www.credera.com/blog/technology-insights/java/testing-angularjs-part-3-karma-grunt/)
- [Testing With AngularJS Part 4: Setting up E2E Testing With Protractor](https://www.credera.com/blog/technology-insights/java/testing-angularjs-part-4-setting-e2e-testing-protractor/)
- [Testing With AngularJS Part 5: Protractor and Grunt](https://www.credera.com/blog/technology-insights/java/testing-angularjs-part-5-protractor-grunt/)

Karma html2js Plugin
---
This is disabled as there are no directives in this app with a templateUrl but all the configuration is in the karma-conf.js file.
