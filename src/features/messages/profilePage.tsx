import React from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockUser } from '../../mock/data';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState(mockUser);
  const [formData, setFormData] = React.useState(mockUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          variant={isEditing ? 'success' : 'primary'}
          size="md"
          icon={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Card */}
      <Card padding="lg">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-blue-200"
            />
            {isEditing && (
              <Button variant="secondary" size="sm">
                Change Avatar
              </Button>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {!isEditing && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-2xl font-bold text-gray-900">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <Badge variant="info" className="mt-1">
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </Badge>
                </div>
              </>
            )}

            {isEditing && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as 'student' | 'instructor' | 'admin',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card padding="lg">
        <CardHeader title="Account Settings" />
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Secure your account with 2FA</p>
            </div>
            <Badge variant="warning">Disabled</Badge>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border-t border-gray-200">
            <div>
              <p className="font-semibold text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Stay updated with course activities</p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border-t border-gray-200">
            <div>
              <p className="font-semibold text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your password regularly</p>
            </div>
            <Button variant="secondary" size="sm">
              Update
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="md">
          <p className="text-sm text-gray-600">Total Courses</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-gray-600">Completed Courses</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-gray-600">Average Score</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">87%</p>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card padding="lg" bordered>
        <CardHeader title="Danger Zone" />
        <Button variant="danger" fullWidth>
          Delete Account
        </Button>
      </Card>
    </div>
  );
};
