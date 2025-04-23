import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, registerThunk, passwordEmailThunk, updatePasswordThunk } from '../thunks/authThunk';  // Hem login hem de register thunk'larını import ediyoruz

const initialState = {
    username: "",
    token: "",
    isAuthenticated: false,
    error: "",
    loading: false,
    alert: { message: "", type: "" } // Alert state'ini ekliyoruz
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.alert = { message: null, type: null };
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
        clearAlert: (state) => {
            state.alert = { message: "", type: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            // Login işlemleri
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload.username;  // Kullanıcı adı
                state.token = action.payload.token;    // Token
                state.isAuthenticated = true;  // Kullanıcı giriş yaptı
                state.alert = { message: 'Giriş yapıldı anasayfaya yönlendiriliyorsunuz', type: 'success' }; // Giriş yapılıyor mesajı
                localStorage.setItem('token', action.payload.token);  // Token'ı localStorage'a kaydediyoruz
                localStorage.setItem('username', action.payload.username);  // Kullanıcı adını da localStorage'a kaydediyoruz
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Bir hata oluştu!';
                state.alert = { message: 'Hatalı giriş ! Email veya şifrenizi kontrol edip tekrar deneyiniz', type: 'danger' }; // Hata mesajı
            })

            // Register işlemleri
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload.username;  // Kullanıcı adı
                state.token = action.payload.token;    // Token
                state.isAuthenticated = false;  // Kullanıcı kayıt oldu ve giriş yaptı
                state.alert = { message: 'Kayıt yapıldı giriş sayfasına yönlendiriliyorsunuz', type: 'success' }; // Giriş yapılıyor mesajı
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Bir hata oluştu!';
                state.alert = { message: state.error, type: 'danger' }; // Hata mesajı
            })

            // Şifre değiştirme maili işlemleri
            .addCase(passwordEmailThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordEmailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload.username;  // Kullanıcı adı
                state.token = action.payload.token;    // Token
                state.isAuthenticated = false;  // Kullanıcı giriş yaptı
                state.alert = { message: 'Sıfırlama maili gönderildi e-postanızı kontrol ediniz', type: 'success' }; // Giriş yapılıyor mesajı
              
            })
            .addCase(passwordEmailThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Bir hata oluştu!';
                state.alert = { message: state.error, type: 'danger' }; // Hata mesajı
            })

            // Şifre güncelleme işlemleri
            .addCase(updatePasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload.username;  // Kullanıcı adı
                state.token = action.payload.token;    // Token
                state.isAuthenticated = false;  // Kullanıcı giriş yaptı
                state.alert = { message: 'Güncelleme tamamlandı giriş yapabilirsiniz', type: 'success' }; // Giriş yapılıyor mesajı
               
            })
            .addCase(updatePasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Bir hata oluştu!';
                state.alert = { message: state.error, type: 'danger' }; // Hata mesajı
            })
    }
});

export const { logout, clearAlert } = authSlice.actions;
export default authSlice.reducer;
