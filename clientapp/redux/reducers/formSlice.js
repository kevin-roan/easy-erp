import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      profileFormData: {
        name: "",
        email: "",
        status: "Active",
      },
      workspaceFormData: {
        workspaceName: "",
        participants: ["kevinroan@gmail.com", "mail.kevinroan@gmail.com"], // optional, planning to implement it in future.
        owner: {
          // owner details
          userId: "672603867cd35ceb12ebcad5", // id of logged user
          userName: "",
          userEmail: "",
        },
      },
      teamFormData: {
        teamName: "",
        teamMembers: ["kevinroan@gmail.com", "mail.kevinroan@gmail.com"],
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
    setTeamFormData: (state, action) => {
      state.formData.teamFormData = {
        ...state.formData.teamFormData,
        ...action.payload,
      };
    },
  },
});

export const { setProfileFromData, setWorkspaceFormData, setTeamFormData } =
  formSlice.actions;
export default formSlice.reducer;
