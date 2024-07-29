
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import Validations from './loginValidatons';

const Login = () => {
let navigate=useNavigate();
  let [values,updateValue]=useState({
    email:"",
    password:"",
  })


  let [error,setError]=useState({})

  const [showPassword,setShowPassword]=useState(false)

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }
  function ChangeValues(e){
    updateValue({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  function Submitdata(e){
    e.preventDefault();
    setError(Validations(values))
    let requestData={
      email:values.email,
      password:values.password
    }
    if(Object.keys(error).length===0){
    axios.post('http://localhost:8000/user/login',requestData)
    .then((result)=>{
      // localStorage.setItem('token', result.data.token);
      toast.success("success");
      navigate('/')
      console.log(result)
    })
    .catch((err)=>{
     if(err.response.data.message==="invalid credentials"){
       setError({
        ...error,
        password:"Invalid Credentials"
       })

     }
    console.log(err)
    })

  }
  }


 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
            <div className="card-body">
              <form >
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={values.email}
                    onChange={ChangeValues}
                   
                    
                  />
                  
                  <label htmlFor="inputEmail">Email address</label>
                  {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type={showPassword?"text":"password"}
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={ChangeValues}
                   
                    
                  />
                  <label htmlFor="inputPassword">Password</label>
                  {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPasswordCheckbox"
                    onChange={togglePasswordVisibility}
                   
                  />
                  <label className="form-check-label" htmlFor="showPasswordCheckbox">
                    Show Password
                  </label>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Link className="small" to="/forgot-password">Forgot Password?</Link>
                  <button className="btn btn-primary" type="submit" onClick={Submitdata}>Login</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                New user? <Link to="/signup">Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
