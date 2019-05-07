exports.config = {
	// specs: ['../Tests/Demo.spec.js'],

	suites:{

		smoke:['../Tests/Demo.spec.js'],
		regression:['../Tests/*.spec.js']
	},
 
	sauceUser: process.env.SAUCE_USERNAME,
	sauceKey: process.env.SAUCE_ACCESS_KEY,

	// restartBrowserBetweenTests: true,

    multiCapabilities: [
		{
        browserName: 'firefox',
        version: '61.0',
        platform: 'macOS 10.14',
        name: "firefox-tests",
        shardTestFiles: true,
        maxInstances: 25
	}, 
	{
        browserName: 'chrome',
        version: '70.0',
        platform: 'Windows 10',
        name: "chrome-tests",
        shardTestFiles: true,
        maxInstances: 25
    }],

	onPrepare: function () {
		// browser.ignoreSynchronization = true;	// if not an Angular app

		jasmine.getEnv().addReporter({
			specStarted: function(result) {
				browser.getCapabilities().then(function (capabilities) {
					var browserName = capabilities.get("browserName");
					browser.executeScript("sauce:job-name=" + browserName + ":" + result.fullName);
				});
			}
		});

		var AllureReporter = require('jasmine-allure-reporter');
		jasmine.getEnv().addReporter(new AllureReporter({
		  resultsDir: 'allure-results'
		}));

	},

	onComplete: function () {
		var printSessionId = function (jobName) {
			browser.getSession().then(function (session) {
				console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
			});
		}
		
		printSessionId("Insert Job Name Here");
	},

	



};