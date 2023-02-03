import React, {useEffect} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { blue, red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deleteUsers, loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: blue[900],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const CustomAddButton = styled(Button) ({
    float: 'right',
    // position: 'relative',
    // top: '60px',
    // right: '30px',
    marginTop: '20px',
    marginRight: '30px',
    width: '15%',
    backgroundColor: 'blue',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: 'black',
        borderColor: 'black',
        boxShadow: 'none',
    }
});

const Home = () => {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    const { users } = useAppSelector((state) => state.data);
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const handleDelete = (id:any) => {
        if (window.confirm("Are you sure want to delete the user ?")) {
            dispatch(deleteUsers(id));
        }
    };

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
            <div>
            <h2 style={{ float: 'left', marginLeft: '30px' }}>User List</h2>
            <CustomAddButton variant="contained" onClick={() => navigate('/addUser')}>Add User</CustomAddButton>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ marginTop: 1, minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        {/* <StyledTableCell style={{ fontWeight: 'bold' }} align="center">ID</StyledTableCell> */}
                        <StyledTableCell style={{ fontWeight: 'bold' }} align="center">First Name</StyledTableCell>
                        <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Last Name</StyledTableCell>
                        <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Age</StyledTableCell>
                        <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Phone Number</StyledTableCell>
                        <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users && users?.data?.map((user:any) => (
                        <StyledTableRow key={user.id}>
                            {/* <StyledTableCell component="th" scope="row">{user._id}</StyledTableCell> */}
                            <StyledTableCell align="center">{user.firstName}</StyledTableCell>
                            <StyledTableCell align="center">{user.lastName}</StyledTableCell>
                            <StyledTableCell align="center">{user.age}</StyledTableCell>
                            <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
                            <StyledTableCell align="center">
                                <ButtonGroup variant="text" size="small" aria-label="text button group">
                                    <Button color="primary" onClick={() => navigate(`/viewUser/${user._id}`)}>View</Button>
                                    <Button color="primary" onClick={() => navigate(`/editUser/${user._id}`)}>Update</Button>
                                    <Button color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home;