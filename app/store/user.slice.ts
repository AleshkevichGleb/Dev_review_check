import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginUser} from "../types/types.ts";

interface IInitialState extends LoginUser {
    cash: number,
}
const initialState: IInitialState = {
    email: '',
    password: '',
    cash: 10000,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginUser>) => {
            const {email, password} = action.payload;
            state.email = email;
            state.password = password;
        },

        increaseCash: (state, action: PayloadAction<number>) => {
            state.cash += action.payload
        },

        decreaseCash: (state, action: PayloadAction<number>) => {
            state.cash -= action.payload
        },
    }
})

export const {setUser, increaseCash, decreaseCash} = userSlice.actions;
export default userSlice.reducer;