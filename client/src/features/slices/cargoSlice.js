import {createSlice} from '@reduxjs/toolkit';
import {sendCargoThunk, getTokenThunk} from '../thunks/cargoThunk';

const initialState = {
  cargoData: null,
  token: null,
  loading: false,
  error: null,
};
