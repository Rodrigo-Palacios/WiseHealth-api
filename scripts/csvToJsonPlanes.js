import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import csv from 'csv-parser'

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);

const inputPath = path.join(scriptDir, '../data/raw/planes.csv');
const outputPath = path.join(scriptDir, '../data/planes.json');

const result = [];

fs.createReadStream(inputPath)
    .pipe(csv({ separator: ';', mapHeaders:({header}) => header.trim()} ))
    .on('data', (row) => {
        console.log('row read from planes.csv', row);
        result.push({
            plan: row.plan.trim(),
            moneda: row.moneda.trim(),
            suma_asegurada: Number(row.suma_asegurada),
            deducible: Number(row.deducible),
            coaseguro: Number(row.coaseguro),
            tope_coaseguro: Number(row.tope_coaseguro),
            renovación: row.renovación.trim()
        })
    })
    
    .on('end', () => {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
        console.log(`\u2705 File Generated Successfully ${outputPath}`);
    })
    .on('error', (err) => {
        console.error('Error reading CSV file', err);
    })