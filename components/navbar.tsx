import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth';
import styled from '@emotion/styled'

const StyledTypography = styled(Typography)<any>({
    cursor: 'pointer'
}) as typeof Typography

const Navbar: React.FC<{}> = () => {
  const { auth, signOut } = useAuth()
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='secondary'>
        <Toolbar variant='dense'>
          <Box sx={{ flexGrow: 1 }}>
            {router.pathname == '/' ? (
              <Typography
                variant="h6"
                component="span"
              >
                FormApp
              </Typography>
            ) : (
              <StyledTypography
                variant="h6"
                component="span"
                onClick={() => router.push('/')}
              >
                FormApp
              </StyledTypography>
            )}
          </Box>
          <Box>
            {auth ? (
              <>
                <StyledTypography
                  style={{ marginRight: '16px' }}
                  component="span"
                  fontWeight={router.pathname == '/form' ? 'fontWeightMedium' : 'fontWeightRegular'}
                  onClick={() => router.push('/form')}
                >
                  Form
                </StyledTypography>
                <StyledTypography
                  component="span"
                  onClick={() => signOut()}
                >
                  Logout
                </StyledTypography>
              </>
            ) : (
              <StyledTypography
                component="span"
                fontWeight={router.pathname == '/login' ? 'fontWeightMedium' : 'fontWeightRegular'}
                onClick={() => router.push('/login')}
              >
                Login
              </StyledTypography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar