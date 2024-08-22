import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserDetail:(state,actions)=>{
        state.user=actions.payload
        // console.log("user-Detail",actions.payload);
        
    }
    
  }, 
})

// Action creators are generated for each case reducer function
export const {setUserDetail} = userSlice.actions

export default userSlice.reducer