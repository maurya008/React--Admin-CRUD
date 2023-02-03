import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getDetailUsers} from '../redux/actions';

const ViewUser = () => {

  let { id } = useParams();
  const { user } = useAppSelector((state) => state.data);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetailUsers(id));
  }, []);

  const CustomBackButton = styled(Button) ({
        float: 'right',
        marginTop: '-50px',
        marginRight: '30px',
        width: '15%',
        backgroundColor: 'black',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'black',
            borderColor: 'black',
            boxShadow: 'none',
        }
    });
   

  return (
    <div>
      <h2 style={{ marginRight: '82%' }}>View User Detail</h2>
      <CustomBackButton variant="contained" onClick={() => navigate('/')}>Back</CustomBackButton>
      <hr></hr>
      <Box
        component="form"
        sx={{
          marginRight: 120,
          marginTop: 3,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <TextField id="filled-read-only-input" label="Name" variant="filled" value={user.firstName || ""} name="firstName" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Email" variant="filled" value={user.lastName || ""} name="lastName" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Gender" variant="filled" value={user.age || ""} name="age" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Status" variant="filled" value={user.phoneNumber || ""} name="phoneNumber" type="text" InputProps={{readOnly: true}}/>
        <br />
      </Box>
      <br />
    </div>
  )
}

export default ViewUser;