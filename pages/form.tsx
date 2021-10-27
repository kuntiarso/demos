import React, { useEffect } from "react"
import Navbar from "../components/navbar"
import * as yup from 'yup'
import { Container, Paper, TextField, Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Send } from '@mui/icons-material'
import { Formik, Form, Field } from 'formik'
import { v4 as uuid } from 'uuid'
import { useAuth } from "../lib/auth"
import { store } from "../utils/service"
import { useRouter } from "next/router"
import { GetServerSidePropsContext } from "next"
import { getOrders } from "../utils/db"
import CustomizedTable from "../components/table"

const InitForm: React.FC<{ orders: string }> = (props) => {
  const { auth, loading } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (!auth && !loading) {
      router.push('/login?next=/form');
    }
  }, [auth, loading]);

  const initialValues = {
    beverage: '',
    sugar: '',
    type: '',
    qty: '',
  }

  const onSubmit = async (values: any, actions: any) => {
    try {
      values = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuid()
      }
      await store(auth, values)
      refreshData()
    } catch (e) {
      console.log('error', e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const validationSchema = yup.object().shape({
    beverage: yup.string().required("Beverage is required"),
    sugar: yup.string().required("Sugar level is required"),
    type: yup.string().required("Drinks type is required"),
    qty: yup.number().required('Qty is required').positive().integer(),
  });

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Container sx={{ marginTop: '100px' }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Grid container rowSpacing={1} columnSpacing={4}>
                  <Grid item xs={3}>
                    <Field name='beverage'>
                      {({ field, form }: any) => (
                        <TextField
                          label='Beverage'
                          variant='standard'
                          placeholder='ex: coffee/tea/juice'
                          fullWidth
                          error={form.errors.beverage && form.touched.beverage}
                          helperText={form.errors.beverage}
                          {...field}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <Field name='sugar'>
                      {({ field, form }: any) => (
                        <TextField
                          label='Sugar Level'
                          variant='standard'
                          placeholder='ex: half/less/normal/extra'
                          fullWidth
                          error={form.errors.sugar && form.touched.sugar}
                          helperText={form.errors.sugar}
                          {...field}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={2}>
                    <Field name='type'>
                      {({ field, form }: any) => (
                        <TextField
                          label='Drinks Type'
                          variant='standard'
                          placeholder='ex: hot/iced'
                          fullWidth
                          error={form.errors.type && form.touched.type}
                          helperText={form.errors.type}
                          {...field}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={2}>
                    <Field name='qty'>
                      {({ field, form }: any) => (
                        <TextField
                          label='Quantity'
                          variant='standard'
                          type='number'
                          fullWidth
                          inputProps={{ min: 1 }}
                          error={form.errors.qty && form.touched.qty}
                          helperText={form.errors.qty}
                          {...field}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'end' }}>
                    <LoadingButton
                      variant='contained'
                      loadingPosition='end'
                      color='secondary'
                      type='submit'
                      fullWidth
                      endIcon={<Send />}
                      loading={props.isSubmitting}
                      disabled={!props.isValid && props.dirty}
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            )}
            </Formik>
            <br />
            <CustomizedTable {...props} />
        </Container>
      </Box>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const orders = await getOrders()
  return {
      props: {
          orders: JSON.stringify(orders)
      }
    }
}

export default InitForm