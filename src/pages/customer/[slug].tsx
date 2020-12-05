import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMount } from 'react-use';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Grid, TextField, Typography, Button } from '@material-ui/core';

import OverlayLoading from '../../components/OverlayLoading';
import ICustomers from '../../interfaces/ICustomers';
import customersService from '../../services/customersServices';

export default function Customer() {
  const [customer, setCustomer] = useState<ICustomers>();
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const isEdit = slug !== 'new';

  const { getCustomer, addCustomer, updateCustomer } = customersService;

  useMount(() => {
    if (isEdit) {
      getCustomerRequest(slug);
      setCustomerId(slug);
    }
    if (slug === 'new') {
      setCustomer({
        name: '',
        address: '',
        city: '',
        address_number: '',
        birth: '',
        state: '',
        zip_code: '',
        phone: ''
      });
    }
  });

  const getCustomerRequest = useCallback(async idCustomer => {
    const { status, data } = await getCustomer(idCustomer);
    setLoading(true);
    if (status === 200) {
      setCustomer(data.data);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const handleFormSubmit = async (form: ICustomers) => {
    if (isEdit) {
      const response = await updateCustomer(customerId, form);
      if (response.status === 200) {
        toast.success('Atualizado com sucesso!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          router.push('/customers');
        }, 3000);
      }
    } else {
      const { status } = await addCustomer(form);
      if (status === 200) {
        toast.success('Cadastrado com sucesso!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          router.push('/customers');
        }, 3000);
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 770,
        margin: '0 auto',
        paddingTop: 40,
        position: 'relative'
      }}
    >
      {customer && (
        <Formik
          enableReinitalize
          initialValues={customer}
          onSubmit={handleFormSubmit}
        >
          {({ values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography variant="caption">
                    {slug === 'new' ? 'Cadastrar usuário' : 'Dados do usuário'}
                  </Typography>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 15 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Nome"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Telefone"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.phone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      onChange={handleChange}
                      name="birth"
                      label="Data de Nascimento"
                      variant="outlined"
                      value={values.birth}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="address"
                      onChange={handleChange}
                      label="Endereço"
                      variant="outlined"
                      value={values.address}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="address_number"
                      onChange={handleChange}
                      label="Número"
                      variant="outlined"
                      value={values.address_number}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="city"
                      onChange={handleChange}
                      label="Cidade"
                      variant="outlined"
                      value={values.city}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="state"
                      onChange={handleChange}
                      label="Estado"
                      placeholder="RS, SC, ..."
                      variant="outlined"
                      value={values.state}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="zip_code"
                      onChange={handleChange}
                      label="CEP"
                      variant="outlined"
                      value={values.zip_code}
                    />
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    spacing={2}
                    style={{ padding: 8 }}
                  >
                    <Grid item xs="auto">
                      <Button
                        variant="outlined"
                        onClick={() => router.push('/customers')}
                        style={{
                          backgroundColor: '#ebebeb',
                          color: '#000',
                          width: '150px'
                        }}
                      >
                        Voltar
                      </Button>
                    </Grid>
                    <Grid item xs="auto">
                      <Button
                        variant="outlined"
                        type="submit"
                        style={{
                          backgroundColor: '#0d0d0d',
                          color: '#fff',
                          width: '150px'
                        }}
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
      {loading && <OverlayLoading />}
      <ToastContainer />
    </div>
  );
}
