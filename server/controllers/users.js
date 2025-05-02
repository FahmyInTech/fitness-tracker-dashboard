import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, age, weight, height, fitnessGoals } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    user.profile = {
      ...user.profile,
      name: name || user.profile.name,
      age: age || user.profile.age,
      weight: weight || user.profile.weight,
      height: height || user.profile.height,
      fitnessGoals: fitnessGoals || user.profile.fitnessGoals,
    };

    await user.save();
    res.json(user.profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 