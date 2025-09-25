import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { useState, ChangeEvent, useEffect } from 'react';
import { IUser } from '@/types/types';

interface EditProfileModalProps {
  open: boolean;
  user: IUser | null;
  onClose: () => void;
  onSave: (updatedUser: FormData) => void;
}

export default function EditProfileModal({
  open,
  user,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(null);
    }
  }, [user]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={user?.avatar} sx={{ width: 48, height: 48 }} />
            <Button variant='contained' component='label'>
              Upload Avatar
              <input
                hidden
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
              />
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
