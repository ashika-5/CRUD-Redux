import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://6a3a1294917c7b14c74caa53.mockapi.io/CRUD",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
//read action

export const showUser = createAsyncThunk("showUser", async () => {
  const response = await fetch(
    "https://6a3a1294917c7b14c74caa53.mockapi.io/CRUD",
  );

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6a3a1294917c7b14c74caa53.mockapi.io/CRUD/${id}`,
      {
        method: "DELETE",
      },
    );

    try {
      await response.json();
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await fetch(
      `https://6a3a1294917c7b14c74caa53.mockapi.io/CRUD/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//redux toolkit
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })

      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          Number(user.id) === Number(action.payload.id) ? action.payload : user,
        );
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => Number(user.id) !== Number(action.payload),
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
