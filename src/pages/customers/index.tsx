import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Button,
  TextField,
  Input
} from '@material-ui/core';
import {
  MdModeEdit as EditIcon,
  MdDeleteForever as DeleteIcon,
  MdPersonAdd as AddIcon
} from 'react-icons/md';
import { HiArrowNarrowLeft as LeftIcon } from 'react-icons/hi';

import customersServices from '../../services/customersServices';

import Container from '../../components/Container';
import ConfirmDialog from '../../components/ConfirmDialog';
import OverlayLoading from '../../components/OverlayLoading';

import classes from '../../components/CustomersStyles/styles.module.css';

const customers: React.FC = () => {
  const router = useRouter();
  const { getCustomers, removeCustomer } = customersServices;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState('');

  const getCustomersRequest = useCallback(async () => {
    setLoading(true);
    const response = await getCustomers();
    if (response.status === 200) {
      setCustomers(response.data.data);
    }
    setLoading(false);
  }, [getCustomers]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getCustomersRequest();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(insurance =>
        insurance.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, customers]);

  const handleRemoveCustomer = async () => {
    const response = await removeCustomer(customerId);
    if (response.status === 200) {
      toast.success('Removido com sucesso', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setOpenDialog(false);
      setTimeout(async () => {
        await getCustomersRequest();
      }, 3000);
    }
  };
  return (
    <Container>
      <div>
        <Grid
          container
          justify="space-between"
          item
          style={{ marginBottom: 20 }}
        >
          <Button
            variant="outlined"
            style={{
              alignContent: 'center',
              textAlign: 'center',
              width: '150px',
              height: '42px !important'
            }}
            onClick={() => router.push('/')}
          >
            <LeftIcon size={16} style={{ marginRight: 8 }} />
            Voltar
          </Button>
          <Input
            style={{ width: 250 }}
            name="search"
            placeholder="Pesquise por nome.."
            onChange={e => {
              setTimeout(() => {
                setSearch(e.target.value);
              }, 1000);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => router.push('/customer/new')}
            style={{
              alignContent: 'center',
              textAlign: 'center',
              backgroundColor: '#0d0d0d',
              color: '#fff',
              width: '150px',
              height: '42px'
            }}
          >
            <AddIcon style={{ marginRight: 12 }} size={16} />
            Adicionar
          </Button>
        </Grid>
        <Grid container style={{ marginTop: 60 }}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Nome
                  </TableCell>
                  <TableCell align="center">Telefone</TableCell>
                  <TableCell align="center">Data de Nascimento</TableCell>
                  <TableCell align="center">Endereço</TableCell>
                  <TableCell align="center">Cidade/UF</TableCell>
                  <TableCell align="center">CEP</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell align="left">{customer.name}</TableCell>
                    <TableCell align="left">{customer.phone}</TableCell>
                    <TableCell align="center">{customer.birth}</TableCell>
                    <TableCell align="center">
                      {customer.address}
                      {', '}
                      {customer.address_number}
                    </TableCell>
                    <TableCell align="center">
                      {customer.city}
                      {'/'}
                      {customer.state}
                    </TableCell>
                    <TableCell align="center">{customer.zip_code}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          router.push(`/customer/${customer.id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setCustomerId(customer.id);
                          setOpenDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {loading && <OverlayLoading />}
        <ToastContainer />
        <ConfirmDialog
          title="Confirmar exclusão"
          acceptLabel="Confirmar"
          cancelLabel="Cancelar"
          description="Tem certeza que deseja remover este cliente?"
          open={openDialog}
          onAccept={handleRemoveCustomer}
          onClose={() => setOpenDialog(false)}
        />
      </div>
    </Container>
  );
};
export default customers;
