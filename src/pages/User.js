/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import { mockImgAvatar } from '../utils/mockImages';
import { get_employees } from '../actions/employee';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'role', label: 'Role', alignRight: false },
//   { id: 'isVerified', label: 'Verified', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' }
// ];

const TABLE_HEAD = [
  { id: 'sur_name', label: 'Sur name', alignRight: false },
  { id: 'first_name', label: 'First name', alignRight: false },
  { id: 'serial_number', label: 'Serial number', alignRight: false },
  { id: 'force_number', label: 'Force number', alignRight: false },
  { id: 'place_of_work', label: 'Place of work', alignRight: false },
  { id: 'date_of_birth', label: 'Date of birth', alignRight: false },
  { id: 'date_of_enlishment', label: 'Date of enlishment', alignRight: false },
  { id: 'date_of_posting', label: 'Date of posting', alignRight: false },
  { id: 'computer_number', label: 'Computer number', alignRight: false },
  { id: 'rank', label: 'Rank', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'on_leave', label: 'On leave', alignRight: false },
  { id: 'date_of_establishment', label: 'Date of establishment', alignRight: false },
  { id: 'file_number', label: 'File number', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (_user) => _user.sur_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

function User(props) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [employees_list, setEmployees_List] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees_list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  React.useEffect(() => {
    props.get_employees();
  }, []);

  React.useEffect(() => {
    if (props.employees.employees_data !== null) {
      console.log(props.employees.employees_data);
      setEmployees_List(props.employees.employees_data);
    } else {
      console.log('No data...');
    }
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees_list.length) : 0;

  // const filteredUsers = applySortFilter(employees_list, getComparator(order, orderBy), filterName);
  const filteredUsers = employees_list;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="HRIMS | Employees">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/employee_add"
            startIcon={<Icon icon={plusFill} />}
          >
            New Employee
          </Button>
        </Stack>

        <Card>
          {/* Search */}
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ width: 2500, minheight: 1500 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {props.employees.employees_data !== null ? (
                  <TableBody>
                    {props.employees.employees_data
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          id,
                          sur_name,
                          first_name,
                          serial_number,
                          force_number,
                          place_of_work,
                          date_of_birth,
                          date_of_enlishment,
                          date_of_posting,
                          computer_number,
                          rank,
                          title,
                          department,
                          status,
                          on_leave,
                          date_of_establishment,
                          file_number
                        } = row;
                        const isItemSelected = selected.indexOf(sur_name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              {/* <Checkbox
                                        checked={isItemSelected}
                                        onChange={(event) => handleClick(event, name)}
                                      /> */}
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar
                                  alt={sur_name}
                                  // src={avatarUrl}
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {sur_name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{first_name}</TableCell>
                            <TableCell align="left">{serial_number}</TableCell>
                            <TableCell align="left">{force_number}</TableCell>
                            <TableCell align="left">{place_of_work}</TableCell>
                            <TableCell align="left">{date_of_birth}</TableCell>
                            <TableCell align="left">{date_of_enlishment}</TableCell>
                            <TableCell align="left">{date_of_posting}</TableCell>
                            <TableCell align="left">{computer_number}</TableCell>
                            <TableCell align="left">{rank}</TableCell>
                            <TableCell align="left">{title}</TableCell>
                            <TableCell align="left">{department}</TableCell>
                            {/* <TableCell align="left">{status ? 'Yes' : 'No'}</TableCell> */}
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (status === 'active' && 'success') ||
                                  (status === 'transferred' && 'success') ||
                                  (status === 'sick' && 'error') ||
                                  (status === 'absent' && 'error') ||
                                  (status === 'dead' && 'error')
                                }
                                // ('active', 'Active'),
                                // ('sick', 'Sick'),
                                // ('absent', 'Absent'),
                                // ('dead', 'Dead'),
                                // ('transferred', 'Transferred'),
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (on_leave === 'pass_leave' && 'success') ||
                                  (on_leave === 'annual_leave' && 'success')
                                }
                                // ('pass_leave', 'Pass leave'),
                                // ('annual_leave', 'Annual leave'),
                              >
                                {sentenceCase(on_leave)}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{date_of_establishment}</TableCell>
                            <TableCell align="left">{file_number}</TableCell>

                            {/* <TableCell align="right">
                                      <UserMoreMenu />
                                    </TableCell> */}
                          </TableRow>
                        );
                      })
                      .reverse()}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <div>No employees yet</div>
                )}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {props.employees.employees_data !== null ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.employees.employees_data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  errors: state.errors,
  employees: state.employees
});

export default connect(mapStateToProps, { get_employees })(User);
