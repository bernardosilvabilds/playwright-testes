module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step-definitions/**/*.ts'],
    format: [
      'json:cucumber-report.json',
      'summary',
      'progress-bar',
      'message:cucumber-messages.ndjson',
      'rerun:rerun.txt'
    ],
    // paths: ['features/**/*.feature'],
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'https://seu-site.com'
    },
    retry: 0,
    parallel: 2,
    tags: 'not @wip',
    timeout: 60000
  }
} 