// src/components/StatsPage.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  Alert
} from '@mui/material';

const StatsPage = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosClient.get('/stats');
        setStats(response.data);
        setError('');
      } catch (err) {
        console.error('Stats fetch error:', err);
        setError('Failed to fetch stats. Please try again later.');
      }
    };

    fetchStats();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>📊 URL Shortener Statistics</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {stats.length === 0 ? (
        <Typography>No stats available yet.</Typography>
      ) : (
        stats.map((urlStat) => (
          <Paper key={urlStat.shortcode} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1">
              🔗 Short URL: <a href={`http://localhost:3000/${urlStat.shortcode}`} target="_blank" rel="noreferrer">
                http://localhost:3000/{urlStat.shortcode}
              </a>
            </Typography>
            <Typography>🕒 Created: {new Date(urlStat.createdAt).toLocaleString()}</Typography>
            <Typography>⌛ Expires: {new Date(urlStat.expiresAt).toLocaleString()}</Typography>
            <Typography>📈 Clicks: {urlStat.clicks.length}</Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" fontWeight="bold">Click Details:</Typography>
            <List dense>
              {urlStat.clicks.map((click, index) => (
                <ListItem key={index} sx={{ display: 'block', pl: 0 }}>
                  <Typography>📍 Time: {new Date(click.timestamp).toLocaleString()}</Typography>
                  <Typography>🔗 Source: {click.referrer || 'Direct / Unknown'}</Typography>
                  <Typography>🌐 Location: {click.location || 'Hyderabad, India (mock)'}</Typography>
                  <Divider sx={{ my: 1 }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default StatsPage;
