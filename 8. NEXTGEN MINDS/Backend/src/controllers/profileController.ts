import { Request, Response } from 'express';
import User from '../models/User';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      profile: user.profile,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { name, age, education, interests, skills, experience, goals, location } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData['profile.name'] = name;
    if (age !== undefined) updateData['profile.age'] = age;
    if (education !== undefined) updateData['profile.education'] = education;
    if (interests !== undefined) updateData['profile.interests'] = interests;
    if (skills !== undefined) updateData['profile.skills'] = skills;
    if (experience !== undefined) updateData['profile.experience'] = experience;
    if (goals !== undefined) updateData['profile.goals'] = goals;
    if (location !== undefined) updateData['profile.location'] = location;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      id: user._id,
      email: user.email,
      profile: user.profile,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};
