import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getDetailUsers, updateUsers } from '../redux/actions';

const EditUser = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: ""
  });

  const [error, setError] = useState("");
  let { id } = useParams();
  const { user } = useAppSelector((state) => state.data);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { firstName, lastName, age, phoneNumber } = state;

  useEffect(() => {
    dispatch(getDetailUsers(id));
  }, []);

  useEffect(() => {
    if (user) {
        setState({ ...user });
    }
  }, [user]);

  const handleInputChange = (e:any) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !age) {
      setError("Please input all Field");
    } else {
      dispatch(updateUsers(state, id));
      navigate("/");
      setError("");
    }
  };
  return (
    <div>
      <h2>Edit User</h2>
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
        <TextField id="outlined-size-small" label="First Name" variant="outlined" value={firstName || ""} name="firstName" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Last Name" variant="outlined" value={lastName || ""} name="lastName" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Age" variant="outlined" value={age || ""} name="age" type="number" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Phone" variant="outlined" value={phoneNumber || ""} name="phoneNumber" type="tel" onChange={handleInputChange}/>
        <br />
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button style={{ width: '170px' }} color="primary" onClick={() => navigate('/')}>Cancel</Button>
          <Button style={{ marginLeft: '20px', width: '170px' }} color="primary" type="submit">Update</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default EditUser;