import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { ITask } from '@/types/types';

interface EditTaskModalProps {
  open: boolean;
  task: ITask | null;
  onClose: () => void;
  onSave: (task: ITask) => void;
}

export default function EditTaskModal({
  open,
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    onSave({
      ...task,
      title,
      description,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label='Title'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label='Description'
          fullWidth
          margin='normal'
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
