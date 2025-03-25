import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container,
  Tab,
  Tabs,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  School, 
  Person,
  Visibility,
  VisibilityOff,
  ArrowBack
} from '@mui/icons-material';
import Header from '../components/Header';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DEMO_CREDENTIALS = {
  students: {
    'E23CSE001': { password: 'anant123', name: 'Anant Mishra' },
    'E23CSE002': { password: 'kushagra123', name: 'Kushagra' },
    'E23CSE003': { password: 'divyansh123', name: 'Divyansh Chouhan' },
    'E23CSE004': { password: 'shubhangam123', name: 'Shubhangam Mishra' }
  } as Record<string, { password: string; name: string }>,
  teacher: { id: 'T12345', password: 'teacher123' }
};

export default function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    // For demo purposes, check against demo credentials
    const isStudent = tabValue === 0;
    
    if (isStudent) {
      // Check if the username exists in the students object
      if (username in DEMO_CREDENTIALS.students) {
        const studentCred = DEMO_CREDENTIALS.students[username];
        if (password === studentCred.password) {
          localStorage.setItem('currentUser', JSON.stringify({ id: username, name: studentCred.name, role: 'student' }));
          navigate('/student');
          return;
        }
      }
      setError('Invalid credentials. Please try again.');
    } else {
      const teacherCred = DEMO_CREDENTIALS.teacher;
      if (username === teacherCred.id && password === teacherCred.password) {
        localStorage.setItem('currentUser', JSON.stringify({ id: username, role: 'teacher' }));
        navigate('/teacher');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      py: 4
    }}>
      <Header />
      
      <Container maxWidth="sm">
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ 
            p: 4,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}>
            <Typography 
              component="h1" 
              variant="h4" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center"
              gutterBottom
            >
              Login to access your Bennett University grading portal
            </Typography>

            <Box sx={{ width: '100%', mt: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab 
                  icon={<Person />} 
                  label="Student" 
                  sx={{ 
                    textTransform: 'none',
                    minHeight: 64
                  }}
                />
                <Tab 
                  icon={<School />} 
                  label="Teacher" 
                  sx={{ 
                    textTransform: 'none',
                    minHeight: 64
                  }}
                />
              </Tabs>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ mt: 2 }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              )}

              <TabPanel value={tabValue} index={0}>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="student-id"
                    label="Student ID"
                    name="studentId"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="student-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    onClick={handleLogin}
                  >
                    Login as Student
                  </Button>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="teacher-id"
                    label="Teacher ID"
                    name="teacherId"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="teacher-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    onClick={handleLogin}
                  >
                    Login as Teacher
                  </Button>
                </Box>
              </TabPanel>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Demo Student Credentials:
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Student ID: E23CSE001, Password: anant123
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Student ID: E23CSE002, Password: kushagra123
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }} gutterBottom>
                  Demo Teacher Credentials:
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Teacher ID: T12345, Password: teacher123
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          Need help? Contact{' '}
          <Link href="mailto:support@bennett.edu.in" color="primary">
            support@bennett.edu.in
          </Link>
        </Typography>
      </Container>
    </Box>
  );
} 