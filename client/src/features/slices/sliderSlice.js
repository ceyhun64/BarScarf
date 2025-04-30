import { createSlice } from "@reduxjs/toolkit";
import { 
  getBannersThunk, 
  getHeroesThunk, 
  getSlidersThunk, 
  createBannerThunk, 
  createHeroesThunk, 
  createSliderThunk, 
  deleteSliderThunk, 
  deleteBannerThunk, 
  deleteHeroesThunk 
} from "../thunks/sliderThunk";

const initialState = {
  banners: [],
  heroes: [],
  sliders: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  alert: { message: "", type: "" },
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.alert = { message: "", type: "" };
    }
  },
  extraReducers: (builder) => {
    builder
      // Banners işlemleri
      .addCase(getBannersThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getBannersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload || [];
      })
      .addCase(getBannersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Banners alınırken bir hata oluştu.";
      })

      // Heroes işlemleri
      .addCase(getHeroesThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getHeroesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroes = action.payload || [];
      })
      .addCase(getHeroesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Heroes alınırken bir hata oluştu.";
      })

      // Sliders işlemleri
      .addCase(getSlidersThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getSlidersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = action.payload || [];
      })
      .addCase(getSlidersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Sliders alınırken bir hata oluştu.";
      })

      // Banner creation işlemi
      .addCase(createBannerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createBannerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Eğer gelen veri bir dizi değilse, bunu dizi olarak ekleyelim.
        state.banners = [...state.banners, ...(Array.isArray(action.payload) ? action.payload : [action.payload])];
        
        // Eklenme bildirimini ayarlıyoruz
        state.alert = { message: "Banner başarıyla eklendi!", type: "success" };
      })
      .addCase(createBannerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Banner oluşturulurken bir hata oluştu.";
      })

      // Hero creation işlemi
      .addCase(createHeroesThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createHeroesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroes.push(action.payload);
        
        // Eklenme bildirimini ayarlıyoruz
        state.alert = { message: "Hero başarıyla eklendi!", type: "success" };
      })
      .addCase(createHeroesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Hero oluşturulurken bir hata oluştu.";
      })

      // Slider creation işlemi
      .addCase(createSliderThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createSliderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders.push(action.payload);
        
        // Eklenme bildirimini ayarlıyoruz
        state.alert = { message: "Slider başarıyla eklendi!", type: "success" };
      })
      .addCase(createSliderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Slider oluşturulurken bir hata oluştu.";
      })

      // Slider silme işlemi
      .addCase(deleteSliderThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteSliderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = state.sliders.filter((slider) => slider._id !== action.payload);
      })
      .addCase(deleteSliderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Slider silinirken bir hata oluştu.";
      })

      // Hero silme işlemi
      .addCase(deleteHeroesThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteHeroesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroes = state.heroes.filter((hero) => hero._id !== action.payload);
      })
      .addCase(deleteHeroesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Hero silinirken bir hata oluştu.";
      })

      // Banner silme işlemi
      .addCase(deleteBannerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteBannerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = state.banners.filter((banner) => banner._id !== action.payload);
      })
      .addCase(deleteBannerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Banner silinirken bir hata oluştu.";
      });
  }
});

export const { clearAlert } = sliderSlice.actions;
export default sliderSlice.reducer;
