import { createSlice } from "@reduxjs/toolkit";
import Admin_list_employee from "../Actions/AdminAction/AdminHomeAction";
import Admin_Edit_the_Employe from "../Actions/AdminAction/AdminGetUserToEditAction";
import Admin_Add_the_Employee from "../Actions/AdminAction/AdminAddUserAction";
import Admin_PaginationNext_the_Employee from "../Actions/AdminAction/AdminPagination";
import Admin_PaginationPrev_the_Employee from "../Actions/AdminAction/AdminPrevAction";
import Admin_Delete_the_Employee from "../Actions/AdminAction/AdminDeleteUser";
import Admin_Search_the_Employee from "../Actions/AdminAction/SearchAction";



const employee_list = createSlice({
  name: "List",
  initialState: {
    loads: false,
    employeelist: null,
    errorr: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(Admin_list_employee.pending, (state) => {
        state.loads = true;
        state.errorr = null;
      })
      .addCase(Admin_list_employee.fulfilled, (state, action) => {
        state.loads = false;
        state.employeelist = action.payload;
        state.errorr = null;
      })
      .addCase(Admin_list_employee.rejected, (state, action) => {
        state.loads = false;
        state.errorr = action.payload.message;
      })
      
      .addCase(Admin_Edit_the_Employe.pending, (state) => {
        state.loads = true;
        state.errorr = null;
      })
      .addCase(Admin_Edit_the_Employe.fulfilled, (state, action) => {
        state.loads = false;
        state.employeelist = action.payload;
        state.errorr = null;
      })
      .addCase(Admin_Edit_the_Employe.rejected, (state, action) => {
        state.loads = false;
        state.errorr = action.payload.message;
      })

      .addCase(Admin_Add_the_Employee.pending, (state) => {
        state.loads = true;
        state.errorr = null;
      })
      .addCase(Admin_Add_the_Employee.fulfilled, (state, action) => {
        state.loads = false;
        state.employeelist = action.payload;
        state.errorr = null;
      })
      .addCase(Admin_Add_the_Employee.rejected, (state, action) => {
        state.loads = false;
        state.errorr = action.payload.message;
    })

    .addCase(Admin_PaginationNext_the_Employee.pending, (state) => {
      state.loads = true;
      state.errorr = null;
    })
    .addCase(Admin_PaginationNext_the_Employee.fulfilled, (state, action) => {
      state.loads = false;
      state.employeelist = action.payload;
      state.errorr = null;
    })
    .addCase(Admin_PaginationNext_the_Employee.rejected, (state, action) => {
      state.loads = false;
      state.errorr = action.payload.message;
  })
  .addCase(Admin_PaginationPrev_the_Employee.pending, (state) => {
    state.loads = true;
    state.errorr = null;
  })
  .addCase(Admin_PaginationPrev_the_Employee.fulfilled, (state, action) => {
    state.loads = false;
    state.employeelist = action.payload;
    state.errorr = null;
  })
  .addCase(Admin_PaginationPrev_the_Employee.rejected, (state, action) => {
    state.loads = false;
    state.errorr = action.payload.message;
})

.addCase(Admin_Delete_the_Employee.pending, (state) => {
  state.loads = true;
  state.errorr = null;
})
.addCase(Admin_Delete_the_Employee.fulfilled, (state, action) => {
  state.loads = false;
  state.employeelist = action.payload;
  state.errorr = null;
})
.addCase(Admin_Delete_the_Employee.rejected, (state, action) => {
  state.loads = false;
  state.errorr = action.payload.message;
})

.addCase(Admin_Search_the_Employee.pending, (state) => {
  state.loads = true;
  state.errorr = null;
})
.addCase(Admin_Search_the_Employee.fulfilled, (state, action) => {
  state.loads = false;
  state.employeelist = action.payload;
  state.errorr = null;
})
.addCase(Admin_Search_the_Employee.rejected, (state, action) => {
  state.loads = false;
  state.errorr = action.payload.message;
})


  },
});

export default employee_list.reducer;