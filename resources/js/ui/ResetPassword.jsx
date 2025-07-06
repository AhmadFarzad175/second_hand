import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Box,
  Paper
} from '@mui/material';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { id:urlToken } = useParams(); // 👈 get the ID from the URL
  const urlEmail = searchParams.get('email');

  useEffect(() => {
    
    console.log('url toke', urlToken)
    
    setToken(urlToken);
    setEmail(urlEmail);
  }, [urlToken, urlEmail]);

  const validatePassword = (value) => {
    if (!value || value.length < 6) {
      return 'Password must be at least 8 characters';
    }
    if (value !== passwordConfirmation) {
      return 'Passwords do not match';
    }
    return '';
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (resetData) => axios.post('/api/reset-password', resetData),
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate('/login')
      
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reset password.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    setPasswordError('');
    
    resetPasswordMutation.mutate({
      token,
      email,
      password,
      password_confirmation: passwordConfirmation
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            label="Email"
            value={email || ''}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
          
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            required
            variant="outlined"
            fullWidth
          />
          
          <TextField
            label="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={resetPasswordMutation.isPending}
            sx={{ mt: 2 }}
          >
            {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
          
          {/* {message && (
            <Typography
              color={messageSeverity === 'success' ? 'success.main' : 'error.main'}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography> */}
          {/* )} */}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;