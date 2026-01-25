import { Request, Response } from 'express';
import Career from '../models/Career';
import Scholarship from '../models/Scholarship';
import College from '../models/College';

export const getCareers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skills, interests } = req.query;

    let query: any = {};

    if (skills && typeof skills === 'string') {
      const skillsArray = skills.split(',').map((s) => s.trim());
      query.skills = { $in: skillsArray };
    }

    if (interests && typeof interests === 'string') {
      const interestsArray = interests.split(',').map((i) => i.trim());
      query.$or = [
        { title: { $regex: interestsArray.join('|'), $options: 'i' } },
        { description: { $regex: interestsArray.join('|'), $options: 'i' } },
      ];
    }

    const careers = await Career.find(query).sort({ title: 1 });

    res.status(200).json({
      count: careers.length,
      data: careers,
    });
  } catch (error: any) {
    console.error('Get careers error:', error);
    res.status(500).json({ message: 'Error fetching careers', error: error.message });
  }
};

export const getCareerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const career = await Career.findOne({ id });

    if (!career) {
      res.status(404).json({ message: 'Career not found' });
      return;
    }

    res.status(200).json(career);
  } catch (error: any) {
    console.error('Get career by id error:', error);
    res.status(500).json({ message: 'Error fetching career', error: error.message });
  }
};

export const getScholarships = async (req: Request, res: Response): Promise<void> => {
  try {
    const scholarships = await Scholarship.find()
      .sort({ deadline: 1 })
      .limit(100);

    res.status(200).json({
      count: scholarships.length,
      data: scholarships,
    });
  } catch (error: any) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
  }
};

export const getColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, program } = req.query;

    let query: any = {};

    if (location && typeof location === 'string') {
      query.location = { $regex: location, $options: 'i' };
    }

    if (program && typeof program === 'string') {
      query.programs = { $regex: program, $options: 'i' };
    }

    const colleges = await College.find(query).sort({ name: 1 });

    res.status(200).json({
      count: colleges.length,
      data: colleges,
    });
  } catch (error: any) {
    console.error('Get colleges error:', error);
    res.status(500).json({ message: 'Error fetching colleges', error: error.message });
  }
};
