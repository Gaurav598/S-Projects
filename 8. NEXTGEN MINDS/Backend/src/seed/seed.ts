import { connectDB, disconnectDB } from '../utils/mongo';
import Career from '../models/Career';
import Scholarship from '../models/Scholarship';
import College from '../models/College';
import * as path from 'path';
import * as fs from 'fs';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Starting database seed...');

    const dataDir = path.join(__dirname, '../../data');

    const careersPath = path.join(dataDir, 'careers.json');
    if (fs.existsSync(careersPath)) {
      const careersData = JSON.parse(fs.readFileSync(careersPath, 'utf-8'));
      await Career.deleteMany({});
      await Career.insertMany(careersData);
      console.log(`✓ Seeded ${careersData.length} careers`);
    } else {
      console.log('⚠ careers.json not found. Skipping careers seed.');
    }

    const scholarshipsPath = path.join(dataDir, 'scholarships.json');
    if (fs.existsSync(scholarshipsPath)) {
      const scholarshipsData = JSON.parse(fs.readFileSync(scholarshipsPath, 'utf-8'));
      await Scholarship.deleteMany({});
      await Scholarship.insertMany(scholarshipsData);
      console.log(`✓ Seeded ${scholarshipsData.length} scholarships`);
    } else {
      console.log('⚠ scholarships.json not found. Skipping scholarships seed.');
    }

    const collegesPath = path.join(dataDir, 'colleges.json');
    if (fs.existsSync(collegesPath)) {
      const collegesData = JSON.parse(fs.readFileSync(collegesPath, 'utf-8'));
      await College.deleteMany({});
      await College.insertMany(collegesData);
      console.log(`✓ Seeded ${collegesData.length} colleges`);
    } else {
      console.log('⚠ colleges.json not found. Skipping colleges seed.');
    }

    console.log('Database seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seedDatabase();
