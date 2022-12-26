import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <h3 className='text-center'>Reset Password </h3>
        <p className='text-center'>Please Enter your new password</p>
       <form action="">
       <CustomInput type="text" Label="Email Address" id="Email"/>
        <CustomInput type="password" Label="Password" id="pass"/>
        <button className='border-0 px-3 py-2 text-white fw-bold w-100' style={{background:"#ffd333"}} 
        type="submit">Login</button>
       </form>
      </div>
    </div>
  )
}

export default Resetpassword