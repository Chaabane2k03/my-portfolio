import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Paper className="rounded-xl border border-slate-800 bg-slate-900/70 p-4" elevation={0}>
      <Typography variant="body2">Footer</Typography>
    </Paper>
  );
}

export default Footer;
