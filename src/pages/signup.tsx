import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { UserRole } from '@/types/types';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [msg, setMsg] = useState('');
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || 'Signup failed');
      router.push('/');
    } catch {
      setMsg('Network error');
    }
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant='h5' gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handle}>
          <TextField
            label='Name'
            fullWidth
            margin='normal'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <TextField
            select
            label='Role'
            fullWidth
            margin='normal'
            value={form.role || 'user'}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value={UserRole.User}>User</MenuItem>
            <MenuItem value={UserRole.Admin}>Admin</MenuItem>
          </TextField>
          {msg && <Typography color='error'>{msg}</Typography>}
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button
            fullWidth
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => router.push('/')}
          >
            Already have an accout? Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
