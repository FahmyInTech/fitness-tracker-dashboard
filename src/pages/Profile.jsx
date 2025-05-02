import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userService } from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoals: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data.profile || {});
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateProfile(profile);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={profile.age || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={profile.weight || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={profile.height || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fitnessGoals">Fitness Goals (comma-separated)</label>
          <input
            type="text"
            id="fitnessGoals"
            name="fitnessGoals"
            value={profile.fitnessGoals?.join(', ') || ''}
            onChange={(e) => {
              const goals = e.target.value.split(',').map(goal => goal.trim());
              setProfile(prev => ({ ...prev, fitnessGoals: goals }));
            }}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile; 