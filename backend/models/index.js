import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json'), 'utf8'));
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

const db = {};

import sequelize from '../src/db/dbConnection.js';

console.log("Imported sequelize:", sequelize); // Debug: Check the sequelize object
console.log("Sequelize define method:", typeof sequelize.define); // Should be "function"

const initializeModels = async () => {
  const files = fs.readdirSync(__dirname).filter(file =>
    file.indexOf('.') !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );

  for (const file of files) {
    console.log(`Loading model: ${file}`); // Debug: Track which file is being loaded
    const { default: modelInit } = await import(path.join(__dirname, file));
    const model = modelInit(sequelize, Sequelize.DataTypes);
    console.log(`Model ${model.name} loaded:`, model);
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await initializeModels();

console.log("Loaded Models:", Object.keys(db));

export default db;