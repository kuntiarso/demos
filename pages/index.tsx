import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import Navbar from '../components/navbar'

const Home: NextPage = () => {
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
        <Typography
          variant="h1"
          component="div"
          sx={{ padding: "20px 0", fontWeight: 'medium' }}
        >
          Welcome to FormApp!
        </Typography>
      </Container>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {}
  }
}

export default Home
