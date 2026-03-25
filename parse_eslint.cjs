const { exec } = require('child_process');
const fs = require('fs');
exec('npx eslint src/ --format json', { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
  if (stdout) {
    try {
      const data = JSON.parse(stdout);
      let output = '';
      data.forEach(file => {
        if (file.messages.length > 0) {
          output += file.filePath + '\n';
          file.messages.forEach(msg => {
            output += `  ${msg.line}:${msg.column} ${msg.ruleId}: ${msg.message}\n`;
          });
        }
      });
      fs.writeFileSync('error_summary.txt', output);
      console.log('Summary written to error_summary.txt');
    } catch (e) {
      console.error('Failed to parse stdout:', e);
    }
  }
  if (stderr) console.error('STDERR:', stderr);
});
