import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const ChildrenTable = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const kindergartenId = user?.kindergarten_id;

      try {
        const response = await axios.get(`http://localhost:4000/children/kindergarten/${kindergartenId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setChildren(response.data);
      } catch (err) {
        setError('שגיאה בטעינת נתוני הילדים.');
        console.error('Error fetching children:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell align="right" className="text-lg font-bold text-purple-600">מס טלפון הורה 2</TableCell>
              <TableCell align="right" className="text-lg font-bold text-purple-600">מס טלפון הורה 1</TableCell>
              <TableCell align="right" className="text-lg font-bold text-purple-600">מידע על אלרגיות</TableCell>
              <TableCell align="right" className="text-lg font-bold text-purple-600">שם משפחה</TableCell>
              <TableCell align="right" className="text-lg font-bold text-purple-600">שם פרטי</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((child) => (
              <TableRow key={child.id} className="hover:bg-gray-100">
                <TableCell align="right">{child.parent2_phone}</TableCell>
                <TableCell align="right">{child.parent1_phone}</TableCell>
                <TableCell align="right">{child.allergy_info || "אין מידע על אלרגיות ידועות"}</TableCell>
                <TableCell align="right">{child.last_name}</TableCell>
                <TableCell align="right">{child.first_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChildrenTable;
