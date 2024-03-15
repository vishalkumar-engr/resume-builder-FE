import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    basic: {},
    education: [],
    experience: [],
    project: [],
    technicalSkills: [],
    personalSkills: [],
    social: [],
    templateId: 0,
    title: "",
  },
  reducers: {
    addBasic: (state, action) => {
      state.basic = action.payload;
    },
    addEducation: (state, action) => {
      state.education = action.payload;
    },
    addExperience: (state, action) => {
      state.experience = action.payload;
    },
    addProject: (state, action) => {
      state.project = action.payload;
    },
    addTechnicalSkills: (state, action) => {
      state.technicalSkills = action.payload;
    },
    addPersonalSkills: (state, action) => {
      state.personalSkills = action.payload;
    },
    addSocial: (state, action) => {
      state.social = action.payload;
    },
    addTemplateId: (state, action) => {
      state.templateId = action.payload;
    },
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    setInitial: (state, action) => {
      state = {
        basic: {},
        education: [],
        experience: [],
        project: [],
        technicalSkills: [],
        personalSkills: [],
        social: [],
        templateId: 0,
        title: "",
      };
    },
  },
});

export const {
  addBasic,
  addEducation,
  addExperience,
  addProject,
  addTechnicalSkills,
  addPersonalSkills,
  addSocial,
  addTemplateId,
  addTitle,
  setInitial,
} = resumeSlice.actions;

export default resumeSlice.reducer;
