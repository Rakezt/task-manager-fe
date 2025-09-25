import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, removeToken } from '../utils/auth';
import { ITask, IUser, TaskStatus } from '@/types/types';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  Box,
  Avatar,
} from '@mui/material';
import EditTaskModal from '../components/EditTaskModal';
import EditProfileModal from '@/components/EditProfileModal';

export default function TasksPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<ITask | null>(null);

  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== 'undefined' ? getToken() : null;

  // Fetch logged-in user
  async function fetchUser() {
    const res = await fetch(`${API}/api/auth/me`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  }

  // Fetch tasks
  async function fetchTasks() {
    setLoading(true);
    const res = await fetch(`${API}/api/task`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    if (res.status === 401) {
      removeToken();
      router.push('/login');
      return;
    }
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  // Create task
  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${API}/api/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ title, description }),
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  }

  // Delete task
  async function deleteTask(id: string) {
    await fetch(`${API}/api/task/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    fetchTasks();
  }

  // Change task status
  async function changeStatus(id: string, status: ITask['status']) {
    await fetch(`${API}/api/task/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  }

  // Save edited task
  async function handleSave(updatedTask: ITask) {
    await fetch(`${API}/api/task/${updatedTask._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      }),
    });
    setOpen(false);
    setEditTask(null);
    fetchTasks();
  }

  // Save updated profile
  async function handleProfileSave(formData: FormData) {
    const res = await fetch(`${API}/api/auth/me`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setProfileOpen(false);
    } else {
      alert('Failed to update profile');
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchTasks();
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <Container maxWidth='md' sx={{ mt: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{ width: 48, height: 48 }}
          />
          <Typography variant='h5'>Hi, {user?.name || 'User'} 👋</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant='text' onClick={() => setProfileOpen(true)}>
            Edit Profile
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              removeToken();
              router.push('/');
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={createTask}>
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
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type='submit' variant='contained' sx={{ mt: 2 }}>
            Create Task
          </Button>
        </form>
      </Paper>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : tasks.length === 0 ? (
        <Typography>No tasks</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((t) => (
                <TableRow key={t._id}>
                  <TableCell
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                    onClick={() => {
                      setEditTask(t);
                      setOpen(true);
                    }}
                  >
                    {t.title}
                  </TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>
                    <Select
                      value={t.status}
                      onChange={(e) =>
                        changeStatus(t._id, e.target.value as ITask['status'])
                      }
                      size='small'
                    >
                      <MenuItem value={TaskStatus.Pending}>Pending</MenuItem>
                      <MenuItem value={TaskStatus.InProgress}>
                        In Progress
                      </MenuItem>
                      <MenuItem value={TaskStatus.Completed}>
                        Completed
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {typeof t.user === 'object'
                      ? t.user?.email
                      : t.user || 'You'}
                  </TableCell>
                  <TableCell>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => deleteTask(t._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <EditProfileModal
        open={profileOpen}
        user={user}
        onClose={() => setProfileOpen(false)}
        onSave={handleProfileSave}
      />
      <EditTaskModal
        open={open}
        task={editTask}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </Container>
  );
}
