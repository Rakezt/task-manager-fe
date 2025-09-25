import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  GridLegacy as Grid,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { setToken } from '../utils/auth';

export default function Home() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || 'Login failed');
      setToken(data.token);
      router.push('/task');
    } catch {
      setMsg('Network error');
    }
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 8 }}>
      <Grid container spacing={6} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Typography
            variant='h2'
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Task Manager
          </Typography>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Organize your work and boost productivity.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
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
              {msg && <Typography color='error'>{msg}</Typography>}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Button
              fullWidth
              variant='outlined'
              sx={{ mt: 2 }}
              onClick={() => router.push('/signup')}
            >
              Create New Account
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
