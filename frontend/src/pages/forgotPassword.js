import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
function ForgotPassword(){

let [email,setEmail]=useState('')
let [error,setError]=useState({})
function updateEmail(e){
   
   setEmail(e.target.value)
}

function validateEmail(email) {
  var valid =  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return valid.test(email);
}


function Validate(){
  if(!validateEmail(email)){
    setError({message:"please enter valid email"})
  }
}

function Submitdata(e){
    e.preventDefault();
  Validate()
    axios.post('http://localhost:8000/user/forgot-password',{email})
    .then((result)=>{
        toast.success("Link sent to email");
        setEmail(email="")
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}
    return(
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Forgot Password</h3></div>
            <div className="card-body">
              <form >
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={updateEmail}
                    
                  />
                  
                  <label htmlFor="inputEmail">Email address</label>
                  {error && <span style={{ color: "red" }}>{error.message}</span>}
                </div>
              </form>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4 mb-5">
                  
                  <button className="btn btn-primary w-25" type="submit" onClick={Submitdata}>send</button>
                </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ForgotPassword;