import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      profileFormData: {
        name: "",
        email: "",
      },
      workspaceFormData: {
        workspaceName: "",
        participantsEmail: [""], // optional, planning to implement it in future.
      },
    },
  },
  reducers: {
    setProfileFromData: (state, action) => {
      state.formData.profileFormData = {
        ...state.formData.profileFormData,
        ...action.payload,
      };
    },
    setWorkspaceFormData: (state, action) => {
      state.formData.workspaceFormData = {
        ...state.formData.workspaceFormData,
        ...action.payload,
      };
    },
  },
});

export const { setProfileFromData, setWorkspaceFormData } = formSlice.actions;
export default formSlice.reducer;
