import api from '../helpers/api';
import ICustomers from '../interfaces/ICustomers';

const customersService = {
  getCustomers: async () => {
    const response = await api
      .get('/clients')
      .then(({ ...response }) => response)
      .catch(({ response }) => response);

    return response;
  },
  addCustomer: async (form: ICustomers) => {
    const response = await api
      .post('/clients', form)
      .then(({ ...response }) => response)
      .catch(({ response }) => response);

    return response;
  },
  getCustomer: async (id: number) => {
    const response = await api
      .get(`/clients/${id}`)
      .then(({ ...response }) => response)
      .catch(({ response }) => response);

    return response;
  },
  removeCustomer: async (id: number) => {
    const response = await api
      .delete(`/clients/${id}`)
      .then(({ ...response }) => response)
      .catch(({ response }) => response);

    return response;
  },
  updateCustomer: async (id: number | string, form: ICustomers) => {
    const response = await api
      .put(`/clients/${id}`, form)
      .then(({ ...response }) => response)
      .catch(({ response }) => response);

    return response;
  }
};

export default customersService;
