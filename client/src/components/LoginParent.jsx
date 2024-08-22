import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';

const API_URL = 'http://localhost:4000/user';

const schema = yup.object().shape({
    userName: yup.string().required('שם משתמש הוא שדה חובה'),
    password: yup.string().min(4, 'סיסמה חייבת להיות באורך ארבעה תווים לפחות').required('סיסמה היא שדה חובה'),
});

const LoginParent = ({ role, setRole, login }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`${API_URL}/username/${data.userName}`);

            if (response.data.length === 0) {
                throw new Error('שם משתמש לא קיים');
            }

            if(response.data.role !== role) {
                throw new Error('שם משתמש לא קיים');
            }

            const user = response.data;

            if (user.password === data.password) {
                login(user);
            } else {
                throw new Error('סיסמה שגויה');
            }

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
            <Typography variant="h4" align="center" gutterBottom>
                {role === 'parent' ? 'כניסת הורים' : 'כניסת צוות'}
            </Typography>
            
            <TextField
                id="userName"
                fullWidth
                label="שם משתמש"
                margin="normal"
                {...register('userName')}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                variant="outlined"
            />
            
            <TextField
                id="password"
                fullWidth
                label="סיסמה"
                type="password"
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
            />

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                כניסה
            </Button>

            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => setRole(role === 'parent' ? 'teacher' : 'parent')}
            >
                {role === 'parent' ? 'כניסת צוות' : 'כניסת הורים'}
            </Button>
        </Box>
    );
};

export default LoginParent;
