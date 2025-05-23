const { readFileSync, readdirSync, statSync } = require('fs');
const { join } = require('path');

const suspiciousPatterns = [
    /eval\s*\(/,
    /Function\s*\(/,
    /setTimeout\s*\(\s*['"`]/,
    /setInterval\s*\(\s*['"`]/,
    /atob\s*\(/,
    /btoa\s*\(/,
    /import\s*\(/,
    /require\s*\(/,
    /window\./,
    /document\./,
    /localStorage\./,
    /sessionStorage\./,
    /base64/i,
];

const ignoreFiles = ['serviceWorker.js'];

const scanFile = (filePath) => {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (lines[idx - 1] && lines[idx - 1].includes('scan-suspicious-ignore-next-line')) {
            return;
        }
        suspiciousPatterns.forEach((pattern) => {
            if (pattern.test(line)) {
                console.log(`Suspicious pattern "${pattern}" found in: ${filePath} at line ${idx + 1}`);
            }
        });
    });
};

const scanDir = (dir) => {
    readdirSync(dir).forEach((file) => {
        const fullPath = join(dir, file);
        const relPath = fullPath.replace(join(__dirname, 'src') + '\\', '').replace(/\\/g, '/');
        if (statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (/\.(js|jsx)$/.test(file)) {
            if (ignoreFiles.includes(relPath)) {
                return;
            }
            scanFile(fullPath);
        }
    });
};

scanDir(join(__dirname, 'src'));

console.log('Scan complete.');
