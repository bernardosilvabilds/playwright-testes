const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber-report.json',
  output: 'cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": process.env.ENV || "dev",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  },
  screenshotsDirectory: 'test-results/screenshots/',
  storeScreenshots: true,
  noInlineScreenshots: true,
  scenarioTimestamp: true,
  columnLayout: 1,
  name: 'Relatório de Testes BDD',
  brandTitle: 'Automação BDD',
  customData: {
    title: 'Informações do Teste',
    data: [
      { label: 'Projeto', value: 'Automação BDD' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Ciclo', value: 'B1.0' },
      { label: 'Execução', value: new Date().toLocaleString() }
    ]
  }
};

reporter.generate(options); 