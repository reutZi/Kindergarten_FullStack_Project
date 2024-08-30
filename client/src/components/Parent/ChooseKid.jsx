import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import ChildProfile from '../ChildProfile';  // Ensure the correct import path
import { useKid } from '../KidContext';  // Use the KidContext

const ChooseKid = () => {
  const [kids, setKids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedKid, setSelectedKid, setKindergartenId } = useKid(); 

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
        const children = response.data;
        setKids(children);
        setIsLoading(false);

        if (children.length === 1) {
          setSelectedKid(children[0]);  // Automatically select the only kid
          setKindergartenId(children[0].kindergarten_id);  // Set the kindergarten ID
        }
      } catch (error) {
        console.error('Error fetching children:', error);
        setIsLoading(false);
      }
    };

    fetchKids();
  }, [setSelectedKid, setKindergartenId]);

  const handleKidSelect = (event) => {
    const kid = kids.find(k => k.id === event.target.value);
    setSelectedKid(kid);
    setKindergartenId(kid.kindergarten_id);  // Set the kindergarten ID when a kid is selected
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3498db" loading={isLoading} size={150} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 rtl">
      <h1 className="text-4xl font-bold text-right mb-4">בחר ילד</h1>

      {kids.length > 1 ? (
        <Select
          value={selectedKid?.id || ''}
          onChange={handleKidSelect}
          className="mb-4"
          displayEmpty
        >
          <MenuItem value="" disabled>
            בחר ילד
          </MenuItem>
          {kids.map(kid => (
            <MenuItem key={kid.id} value={kid.id}>
              {`${kid.first_name} ${kid.last_name}`}
            </MenuItem>
          ))}
        </Select>
      ) : null}

      {selectedKid && <ChildProfile child={selectedKid} />}
    </div>
  );
};

export default ChooseKid;
