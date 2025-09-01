import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sortbutton = {
    name: string,
}

const initialState: sortbutton = {
    name: "All"
}

export const sortbuttonSlice = createSlice({
    name: "sortbutton",
    initialState,
    reducers: {
        activesortbutton: (state, action: PayloadAction<sortbutton>) => {
            state.name = action.payload.name
        },
    }
})

export const { activesortbutton } = sortbuttonSlice.actions
export default sortbuttonSlice.reducer