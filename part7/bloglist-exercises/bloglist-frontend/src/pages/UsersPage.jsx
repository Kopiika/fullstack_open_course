import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeUsers } from '../reducers/usersReducer';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';


const UsersPage = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
    <div>
      <Typography
        Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        marginBottom={4}
        fontWeight={700}
      >
        Users table
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 700, m: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.600' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1.1rem', color: '#fff' }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1.1rem', color: '#fff' }}>
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <MuiLink
                    component={RouterLink}
                    to={`/users/${user.id}`}
                    underline="hover"
                    sx={{ fontWeight: 500 }}
                  >
                    {user.name}
                  </MuiLink>
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}



export default UsersPage
