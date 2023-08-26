import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import processService from './processService'


const initialState = {
    process: [],
    months: [],
    years: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getMonths = createAsyncThunk('process/getMonths', async (_, thunkAPI) => {
    try {
        return await processService.getMonths()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getYears = createAsyncThunk('process/getYears', async (_, thunkAPI) => {
    try {
        return await processService.getYears()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const addProcess = createAsyncThunk('process/addProcess', async (data, thunkAPI) => {
    try {
        return await processService.addProcess(data)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const last10GetProcess = createAsyncThunk('process/last10GetProcess', async (email, thunkAPI) => {
    try {
        return await processService.last10GetProcess(email)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const processSlice = createSlice({
    name: 'processSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMonths.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMonths.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.months = action.payload
            })
            .addCase(getMonths.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.months = []
            })
            .addCase(getYears.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getYears.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.years = action.payload
            })
            .addCase(getYears.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.years = []
            })
            .addCase(addProcess.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProcess.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.process.unshift(action.payload)
            })
            .addCase(addProcess.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(last10GetProcess.pending, (state) => {
                state.isLoading = true
            })
            .addCase(last10GetProcess.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.process = action.payload
            })
            .addCase(last10GetProcess.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.process = []
            })
    }
})

export const { reset } = processSlice.actions
export default processSlice.reducer