import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import isReact from 'is-react';

import * as data from '../db.json';
import * as actions from '../src/redux/actions';

import CreateProduct from '../src/components/CreateProduct/CreateProduct';

configure({ adapter: new Adapter() });

describe('<CreateProduct/>', () => {
   const state = { products: data.products };
   const mockStore = configureStore([thunk]);
   const { CREATE_PRODUCT } = actions;

   beforeAll(() => expect(isReact.classComponent(CreateProduct)).toBeFalsy());

   // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
   describe('Formulario de creación de producto', () => {
      let createProduct;
      let store = mockStore(state);
      beforeEach(() => {
         createProduct = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/products/create']}>
                  <CreateProduct />
               </MemoryRouter>
            </Provider>,
         );
      });

      it('Debe renderizar un formulario', () => {
         expect(createProduct.find('form').length).toBe(1);
      });

      it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
         expect(createProduct.find('label').at(0).text()).toEqual('Name: ');
      });

      it('Debe renderizar un input para con la propiedad "name" igual a "name', () => {
         expect(createProduct.find('input[name="name"]').length).toBe(1);
      });

      it('Debe renderizar un label para el precio con el texto "Price:', () => {
         expect(createProduct.find('label').at(1).text()).toBe('Price: ');
      });

      it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "price"', () => {
         expect(createProduct.find('input[name="price"]').length).toBe(1);
         expect(createProduct.find('input[type="number"]').length).toBe(2);
      });
      it('Debe renderizar un label para la descripción con el texto "Description:', () => {
         expect(createProduct.find('label').at(2).text()).toBe('Description: ');
      });
      it('Debe renderizar un textarea con la propiedad name igual a "description"', () => {
         expect(createProduct.find('textarea[name="description"]').length).toBe(
            1,
         );
      });

      it('Debe renderizar in label para el stock con el texto "Stock: "', () => {
         expect(createProduct.find('label').at(3).text()).toEqual('Stock: ');
      });
      it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "stock', () => {
         expect(createProduct.find('input[name="stock"]').length).toBe(1);
         expect(createProduct.find('input[type="number"]').length).toBe(2);
      });

      it('Debería renderizar un input de button submit y con texto "Create Product"', () => {
         expect(createProduct.find('button[type="submit"]').length).toBe(1);
         expect(createProduct.find('button[type="submit"]').text()).toBe(
            'Create Product',
         );
      });
   });