import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-eva/people-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  // padding: theme.spacing(2, 0),
  color: theme.palette.primary.darker,
  width: '150px',
  height: '45px',
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  justifyContent: 'center',
  // marginBottom: theme.spacing(1),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 400000;

export default function AppWeeklySales(props) {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography variant="h3">{props.total}</Typography>
      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Employees
      </Typography> */}
    </RootStyle>
  );
}
