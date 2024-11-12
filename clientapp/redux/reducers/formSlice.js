import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      signup: {
        name: "",
        email: "",
        workspaceName: "",
        participants: ["kevinroan@gmail.com", "mail.kevinroan@gmail.com"],
        teamName: "",
      },
    },
  },
  reducers: {
    setSignUpformdata: (state, action) => {
      state.formData.signup = {
        ...state.formData.signup,
        ...action.payload,
      };
    },
  },
});

export const { setSignUpformdata } = formSlice.actions;
export default formSlice.reducer;
