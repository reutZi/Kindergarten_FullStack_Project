import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    IconButton,
    Button,
    TextField,
    Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useKid } from './KidContext';

const NoticeBoard = ({ user }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacherName, setTeacherName] = useState('');
    const [editingNewsId, setEditingNewsId] = useState(null);
    const [newNews, setNewNews] = useState({ title: '', content: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editValues, setEditValues] = useState({ title: '', content: '' });

    const { kindergartenId } = useKid();

    const fetchNews = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fetch teacher details using kindergarten ID
            const teacherResponse = await axios.get(`http://localhost:4000/teacher/kindergarten/${kindergartenId}`, config);
            setTeacherName(`${teacherResponse.data.first_name} ${teacherResponse.data.last_name}`);

            // Fetch news for the kindergarten
            const newsResponse = await axios.get(`http://localhost:4000/noticeBoard/${kindergartenId}`, config);
            setNews(newsResponse.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [kindergartenId]);

    const handleAddNews = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(
                `http://localhost:4000/noticeBoard`,
                {
                    title: newNews.title,
                    content: newNews.content,
                    kindergarten_id: kindergartenId,
                },
                config
            );
            fetchNews(); 
            setNewNews({ title: '', content: '' });
            setIsFormOpen(false); 
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    const handleEditNews = async (newsId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:4000/noticeBoard/${newsId}`, editValues, config);
            fetchNews(); 
            setEditingNewsId(null); 
        } catch (error) {
            console.error('Error editing news:', error);
        }
    };

    const handleDeleteNews = async (newsId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:4000/noticeBoard/${newsId}`, config);
            fetchNews(); 
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleEditClick = (item) => {
        setEditingNewsId(item.id);
        setEditValues({ title: item.title, content: item.content });
    };

    const handleCancelEdit = () => {
        setEditingNewsId(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} sx={{ direction: 'rtl', textAlign: 'right' }}>
            <Typography variant="h4" gutterBottom>
                ברוכים הבאים לגן של {teacherName}
            </Typography>

            {user.role === 'teacher' && (
                <Box mb={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setIsFormOpen(!isFormOpen)}
                    >
                        הוסף חדשות
                    </Button>
                    <Collapse in={isFormOpen}>
                        <Box mt={2}>
                            <Typography variant="h6">הוסף חדשות</Typography>
                            <TextField
                                label="כותרת"
                                value={newNews.title}
                                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="תוכן"
                                value={newNews.content}
                                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" onClick={handleAddNews}>
                                הוסף חדשות
                            </Button>
                        </Box>
                    </Collapse>
                </Box>
            )}

            {news.length === 0 ? (
                <Typography variant="body1">אין חדשות זמינות לכיתה זו.</Typography>
            ) : (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    justifyContent="space-around"
                    sx={{ mt: 3 }}
                >
                    {news.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={3}
                            sx={{
                                width: '200px',
                                height: '200px',
                                padding: 2,
                                backgroundColor: '#fffb8f',
                                transform: 'rotate(-2deg)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'right',
                            }}
                        >
                            {editingNewsId === item.id ? (
                                <Box>
                                    <TextField
                                        label="כותרת"
                                        value={editValues.title}
                                        onChange={(e) =>
                                            setEditValues({ ...editValues, title: e.target.value })
                                        }
                                        fullWidth
                                        margin="normal"
                                        sx={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <TextField
                                        label="תוכן"
                                        value={editValues.content}
                                        onChange={(e) =>
                                            setEditValues({ ...editValues, content: e.target.value })
                                        }
                                        fullWidth
                                        multiline
                                        rows={4}
                                        margin="normal"
                                        sx={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditNews(item.id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        שמור שינויים
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                                        ביטול
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {item.content}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(item.date_posted).toLocaleDateString()}
                                        </Typography>
                                        {user.role === 'teacher' && (
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditClick(item)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteNews(item.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default NoticeBoard;
