import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

function DashboardLayout(props) {
  const [open, setOpen] = useState(false);
  const [user, setUserobject] = useState(null);
  useEffect(() => {
    if (props.auth.user !== null) {
      setUserobject(props.auth.user);
    }
  }, [props.auth]);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, null)(DashboardLayout);
