import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const ChooseKid = ({ onKidSelect }) => {
  const [kids, setKids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKids = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:4000/parent/${user.id}/children`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.length === 1) {
            onKidSelect(response.data[0]);
          }
        setKids(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching children:', error);
        setIsLoading(false);
      }
    };

    fetchKids();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-4 rtl">
      <h1 className="text-4xl font-bold text-right mb-4">בחר ילד</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {kids.map((kid) => (
          <Button
            key={kid.id}
            variant="contained"
            onClick={() => onKidSelect(kid)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
          >
            {`${kid.first_name} ${kid.last_name}`}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChooseKid;
