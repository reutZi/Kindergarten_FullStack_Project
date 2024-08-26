import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import LoginParent from './LoginParent';
import backgroundImage from '../images/img.png';

const Login = () => {
    const [role, setRole] = useState('parent');
    const navigate = useNavigate(); 

    // Login function that saves the user info to localStorage and navigates
    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
  
        
        // Navigate based on the user's role
        if (role === 'parent') {
            navigate('/parent/welcome'); // Navigate to parent welcome page
        } else if (role === 'teacher') {
            navigate('/teacher/attendance'); // Navigate to teacher attendance page
        }
    };

    return (
        <Box
            sx={{
                minHeight: '97vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    marginLeft={10}
                >
                    <Grid item xs={12} sm={8} md={5} lg={4}>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                padding: 4,
                                borderRadius: 2,
                                boxShadow: 3
                            }}
                        >
                            <LoginParent role={role} setRole={setRole} login={login} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Login;
