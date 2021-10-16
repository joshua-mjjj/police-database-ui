import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

LogoDashboard.propTypes = {
  sx: PropTypes.object
};

export default function LogoDashboard({ sx }) {
  return (
    <Box component="img" src="/static/logo2.png" sx={{ ml: 9, width: 80, height: 100, ...sx }} />
  );
}
