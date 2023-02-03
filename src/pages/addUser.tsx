import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import { addUsers } from '../redux/actions';

const AddUser = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: ""
  });

  const [error, setError] = useState("");

  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { firstName, lastName, age, phoneNumber } = state;

  const handleInputChange = (e:any) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !age) {
      setError("Please input all Field");
    } else {
      dispatch(addUsers(state));
      navigate("/");
      setError("");
    }
  };
  return (
    <div>
      <h2>Add New User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <Box
        component="form"
        sx={{
          marginTop: 5,
          '& > :not(style)': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField id="outlined-size-small" label="First Name" variant="outlined" value={firstName} name="firstName" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Last Name" variant="outlined" value={lastName} name="lastName" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Age" variant="outlined" value={age} name="age" type="number" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Phone" variant="outlined" value={phoneNumber} name="phoneNumber" type="tel" onChange={handleInputChange}/>
        <br />
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button style={{ width: '170px' }} color="primary" onClick={() => navigate('/')}>Cancel</Button>
          <Button style={{ marginLeft: '20px', width: '170px' }} color="primary" type="submit">Submit</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default AddUser;