// src/components/RedirectHandler.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import logger from '../middleware/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const fetchRedirect = async () => {
      try {
        const res = await axiosClient.get(`/redirect/${shortcode}`);
        logger('REDIRECT', { shortcode, redirectTo: res.data.originalUrl });
        window.location.href = res.data.originalUrl;
      } catch (err) {
        logger('REDIRECT_ERROR', { shortcode, error: err.message });
        alert('Invalid or expired shortcode');
      }
    };

    fetchRedirect();
  }, [shortcode]);

  return null;
};

export default RedirectHandler;
