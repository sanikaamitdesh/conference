import React, { useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper
} from '@mui/material';
import DashboardStats from '../components/DashboardStats';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const handleScrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.hash === '#dashboard') {
      setTimeout(() => {
        handleScrollToStats();
      }, 100);
    }
  }, [location]);

  return (
    <Layout onScrollToDashboard={handleScrollToStats}>
      {/* Hero Banner */}
      <Box
        sx={{
          height: '45vh',
          background: 'linear-gradient(to right, #00416A, #E4E5E6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          textAlign: 'center',
          px: 2,
          mx: -3,
          mt: -3
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          College Research Conference 2026
        </Typography>
        <Typography variant="h6">
          Advancing Innovation and Collaboration | Jan 9–11, 2026
        </Typography>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          About the Conference
        </Typography>
        <Typography align="center" maxWidth="md" sx={{ mx: 'auto', color: '#555' }}>
          The Annual Research Conference brings together students, faculty, and professionals to present and discuss
          original research in engineering and technology domains. The event fosters interdisciplinary collaboration,
          innovation, and knowledge-sharing across departments. Participants will engage in paper presentations,
          guest lectures, and panel discussions that highlight cutting-edge advancements in various technical fields.
        </Typography>
      </Container>

      {/* Dashboard Stats */}
      <div ref={statsRef} id="dashboard">
        <DashboardStats />
      </div>

      {/* Highlights */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Research Paper Tracks',
              desc: 'Multiple domains including AI, IoT, Cloud, Cybersecurity, and Data Science.',
            },
            {
              title: 'Workshops & Seminars',
              desc: 'Technical workshops and knowledge-sharing sessions from invited speakers.',
            },
            {
              title: 'Student & Faculty Participation',
              desc: 'Encouraging collaborative research and interdisciplinary discussion.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Important Dates */}
      <Box bgcolor="#f9f9f9" py={6} mx={-3}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Important Dates
          </Typography>
          <Box textAlign="center">
            <Typography>Abstract Submission Deadline: Oct 10, 2025</Typography>
            <Typography>Final Paper Submission: Nov 5, 2025</Typography>
            <Typography>Conference Dates: Jan 9–11, 2026</Typography>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box textAlign="center" py={4} borderTop="1px solid #ddd" bgcolor="#fff" mx={-3} mt={3}>
        <Typography variant="body2" color="text.secondary">
          © 2025 College Research Conference | Department of Computer Engineering
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: crc@college.edu
        </Typography>
      </Box>
    </Layout>
  );
};

export default HomePage;
