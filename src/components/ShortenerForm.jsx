// src/components/ShortenerForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';
import axiosClient from '../api/axiosClient';
import logger from '../middleware/logger';

const ShortenerForm = ({ onSuccess, onError }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!originalUrl.trim()) {
    onError("Original URL is required");
    return;
  }

  try {
    // ✅ MOCK: Create fake shortcode if none is provided
    const shortCode = customCode || Math.random().toString(36).substring(2, 8);
    const shortUrl = `http://localhost:3000/${shortCode}`;

    const payload = {
      originalUrl,
      customCode: shortCode,
      validity: parseInt(validity, 10) || 30,
    };

    onSuccess(shortUrl);
    logger("SHORTEN_SUCCESS", payload);
  } catch (err) {
    const errorMsg = 'Something went wrong (mock mode)';
    onError(errorMsg);
    logger("SHORTEN_ERROR", { error: errorMsg });
  }
};


  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Original URL"
            fullWidth
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Custom Shortcode (optional)"
            fullWidth
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Validity (minutes)"
            type="number"
            fullWidth
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            SHORTEN
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShortenerForm;