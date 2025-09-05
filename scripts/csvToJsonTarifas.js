import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);

const inputPath = path.resolve(scriptDir, '../data/raw/tarifas.csv');
const outputPath = path.resolve(scriptDir, '../data/tarifas.json');

const results = [];

fs.createReadStream(inputPath)
    .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim()}))
    .on('data', (row) => {
        console.log('row read from tarifas.csv', row);
        results.push({
            plan: row.plan.trim().toLowerCase(),
            edad: Number(row.edad),
            genero: row.genero.trim().toUpperCase(),
            tarifa: Number(row.tarifa)
        });
    })

    .on('end', () => {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`\u2705 File Generated Successfully ${outputPath}`);
    })
    .on('error', (err) => {
        console.error('Error reading CSV file:', err);
    })