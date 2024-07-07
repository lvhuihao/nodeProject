const path = require('path');
const {convertCsvToXlsx} = require('@aternus/csv-to-xlsx');
import path from 'path'
import { convertCsvToXlsx } from '@aternus/csv-to-xlsx';

let source = path.join(__dirname, 'report.csv');
let destination = path.join(__dirname, 'converted_report.xlsx');

try {
  convertCsvToXlsx(source, destination);
} catch (e) {
  console.error(e.toString());
}