import { Container, Typography, Box, Button } from '@mui/material'
import Navbar from '../components/navbar'
import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from "../lib/auth"
import { PlayArrow } from '@mui/icons-material'

const Login: React.FC<{}> = () => {
  const { auth, googleSignIn } = useAuth()
  const router = useRouter()

  if (auth) {
    router.push((router.query.next as string) || '/form')
  }

  return (
    <>
      <Navbar />
      <Container sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box component="div">
          <Button
            size="large"
            color="secondary"
            variant="contained"
            endIcon={<PlayArrow />}
            disableElevation
            onClick={() => googleSignIn()}
          >
            Start
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Login