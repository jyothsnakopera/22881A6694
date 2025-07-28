// src/components/Home.jsx
import React, { useState } from 'react';
import ShortenerForm from './ShortenerForm';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Home() {
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShortenSuccess = (url) => {
    setShortUrl(url);
    setError('');
  };

  const handleShortenError = (err) => {
    setShortUrl('');
    setError(err || 'Something went wrong!');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <ShortenerForm onSuccess={handleShortenSuccess} onError={handleShortenError} />

      {shortUrl && (
        <Box mt={4}>
          <Typography variant="subtitle1">Shortened URL:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField value={shortUrl} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
            <IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton>
          </Box>
        </Box>
      )}

      {error && (
        <Box mt={2} color="red">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}

export default Home;