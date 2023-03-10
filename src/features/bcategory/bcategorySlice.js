import { createSlice , createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getCategories=createAsyncThunk('blogCategory/get-categories',async(thunkAPI)=>{
    try{
        return await bCategoryService.getBlogCategories()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlogCategory=createAsyncThunk('blogCategory/create-category',async(catData,thunkAPI)=>{
    try{
        return await bCategoryService.createBlogCategory(catData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAblogCat=createAsyncThunk('blogCategory/get-category',async(id,thunkAPI)=>{
    try{
        return await bCategoryService.getBlogCategory(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateAblogCat=createAsyncThunk('blogCategory/update-category',async(color,thunkAPI)=>{
    try{
        return await bCategoryService.updateBlogCategory(color)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteAblogCat=createAsyncThunk('blogCategory/delete-category',async(id,thunkAPI)=>{
    try{
        return await bCategoryService.deleteBlogCategory(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState=createAction("Reset_all")
const initialState={
    bCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const pCategorySlice=createSlice({
    name:"bCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategories=action.payload;
            
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        }).addCase(createBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdBlogCategory=action.payload;
            
        })
        .addCase(createBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        }).addCase(getAblogCat.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAblogCat.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogCatName=action.payload.title;
            
        })
        .addCase(getAblogCat.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        }).addCase(updateAblogCat.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateAblogCat.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedBlogCategory=action.payload;
            
        })
        .addCase(updateAblogCat.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        })
        .addCase(deleteAblogCat.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteAblogCat.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedBlogCategory=action.payload;
            
        })
        .addCase(deleteAblogCat.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        })
        .addCase(resetState,()=>initialState);
    }
})

export default pCategorySlice.reducer;