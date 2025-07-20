import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchAnimals = createAsyncThunk('animals/fetchAnimals', async (params = {}) => {
  const response = await api.get('/animals/', { params });
  return response.data;
});

export const addAnimal = createAsyncThunk('animals/addAnimal', async (data) => {
  const response = await api.post('/animals/', data);
  return response.data;
});

export const updateAnimal = createAsyncThunk('animals/updateAnimal', async ({ id, ...data }) => {
  const response = await api.put(`/animals/${id}/`, data);
  return response.data;
});

export const deleteAnimal = createAsyncThunk('animals/deleteAnimal', async (id) => {
  await api.delete(`/animals/${id}/`);
  return id;
});

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.findIndex((animal) => animal.id === action.payload.id);
        state.animals[index] = action.payload;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter((animal) => animal.id !== action.payload);
      });
  },
});

export default animalsSlice.reducer;