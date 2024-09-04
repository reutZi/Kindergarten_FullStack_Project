import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginParent from './LoginParent';
import backgroundImage from '../img/bg.png';
import lettersImage from '../img/letters.png'; // Import letters.png
import lettersbackImage from '../img/lettersback.png'; // Import lettersback.png
import { useKid } from './KidContext';

const Login = () => {
    const [role, setRole] = useState('parent');
    const navigate = useNavigate(); 
    const { setKindergartenId } = useKid(); 

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));

        if (role === 'parent') {
            navigate('/parent/choosekid');
        } else if (role === 'teacher') {
            setKindergartenId(user.kindergarten_id);
            navigate('/teacher/attendance');
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: 'auto', md: '100vh' },  // Scrollable on small screens, full height on large screens
                width: '100vw',
                display: 'flex',
                overflowX: { xs: 'hidden', md: 'hidden' },  // Prevent horizontal scrolling
                overflowY: { xs: 'auto', md: 'hidden' },
                alignItems: { xs: 'flex-start', md: 'center' },  // Flex-start on small screens, centered on large screens
                flexDirection: { xs: 'column', md: 'unset' },  // Stack vertically on small screens
            }}
        >
            {/* Large screen image (letters) */}
            <Box
                component="img"
                src={lettersImage}
                alt="Letters"
                sx={{
                    position: 'absolute',
                    top: { xs: '5%', md: '8%' },  // Adjusted top margin for both small and large screens
                    right: { xs: '60%', md: '7%' }, // More right margin on larger screens
                    transform: { xs: 'translateX(50%)', md: 'none' }, // Center the image horizontally on small screens
                    width: { xs: '200px', sm: '300px', md: '400px', lg: '450px' }, // Larger image on bigger screens
                    height: 'auto',
                    zIndex: 1, 
                    display: { xs: 'none', md: 'block' } // Hide on small screens
                }}
            />

            {/* Small screen image (lettersback) */}
            <Box
                component="img"
                src={lettersbackImage}
                alt="LettersBack"
                sx={{
                    position: 'relative',  // Change to relative for proper stacking on small screens
                    top: { xs: '4%', md: '5%' }, // Adjusted top position to prevent overlap
                    right: { xs: '0%', md: '5%' }, // Default for small screens, adjusted for large screens
                    left: {xs: '18%', md: '5%'},
                    transform: { xs: 'translateX(0%)', md: 'none' }, // Centered on small screens
                    width: { xs: '350px', sm: '400px', md: '500px', lg: '650px' }, // Responsive width
                    height: 'auto',
                    zIndex: 1,
                    display: { xs: 'block', md: 'none' },  // Display on small screens only
                    mb: { xs: '0%', md: '0%' },  // Add bottom margin to avoid overlap with LoginParent on small screens
                }}
            />

            {/* Main content */}
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ 
                        marginLeft: '0%',
                        marginRight: { xs: '0%', md: '5%' , lg: '20%'}  // Add margin-right for LoginParent on small screens
                    }}
                >
                    <Grid item xs={12} sm={8} md={5} lg={4}>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                padding: 4,
                                borderRadius: 2,
                                boxShadow: 3,
                                mt: { xs: 2, md: 0 }  // Increased margin-top for small screens
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
