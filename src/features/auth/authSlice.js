import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// user bilgisini, giriş başarılı şekilde olmuş ise, localStorage kısmına ekledik. Yazdık.
// Başlangıç, yani initialState'de user bilgisi eğer localStorage yazıyorsa buradan gelsin
// Aksi halde, null olarak verilsin...
// user : null => user: user ? user : null => şeklinde bir dönüşüm yapılıyor.
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user.email, user.password, user.displayName)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user.email, user.password)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'authSlice',
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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.isSuccess = true
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
})

// "reset" erişmek için yapılan işlem
export const { reset } = authSlice.actions
// "reducer" export etme işlemi
export default authSlice.reducer
