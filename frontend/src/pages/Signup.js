
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Validations from './Validations';
import axios from 'axios'



const Signup = () => {

  let navigate=useNavigate();
  let [val, setVal] = useState({
    firstName: "",
    lastName: "",
    mobile:"",
    email: "",
    password: ""

  })


  let [errors, setErrors] = useState({})

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  function updateValues(e) {
    setVal({
      ...val,
      [e.target.name]: e.target.value
    })

  }

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  function submitData(e) {
  
    e.preventDefault()

    setErrors(Validations(val))
   
    const validationErrors = Validations(val);
    setErrors(validationErrors);

    let requestData = {
      firstName: val.firstName,
      lastName: val.lastName,
      mobile:val.mobile,
      email: val.email,
      password: val.password

    }

   

    if (Object.keys(validationErrors).length === 0) {
      
      axios.post('http://127.0.0.1:8000/user/signup', requestData)
      
        .then(result => {
          alert("form submitted")
          navigate('/')
          console.log(result.data.message)

          setVal({
            firstName: "",
            lastName: "",
            mobile:"",
            email: "",
            password: ""
          });

        })
        .catch(err => {
          
          if (err.response.data.message === "user already exists") {
            setErrors({
              ...errors,
              email: 'Email already exists'
            });
          }

          
         

        })


    }


  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Signup</h3></div>
            <div className="card-body">
              <form >

                <div className="form-floating mb-3">
                  <input
                    className="form-control"

                    type="text"
                    placeholder="FirstName"
                    name="firstName"
                    value={val.firstName}
                    onChange={updateValues}
                  />

                  <label >FirstName</label>
                  {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
                </div>



                <div className="form-floating mb-3">
                  <input
                    className="form-control"

                    type="text"
                    placeholder="LastName"
                    name="lastName"
                    value={val.lastName}
                    onChange={updateValues}
                  />
                  <label >LastName</label>
                  {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                </div>


                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={val.email}
                    onChange={updateValues}

                  />
                  <label htmlFor="inputEmail">Email address</label>
                  {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>




                <div className="form-floating mb-3">
                  <input
                    className="form-control"

                    type="number"
                    placeholder="phoneNumber"
                    name="mobile"
                    value={val.mobile}
                    onChange={updateValues}
                  />

                  <label >phoneNumber</label>
                  {errors.mobile && <span style={{ color: "red" }}>{errors.mobile}</span>}
                </div>


              
                  <div className="form-floating mb-3 flex-container">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password"
                    name="password"
                    value={val.password}
                    onChange={updateValues}
                    
                   
                  />
                  
                    
                  <label htmlFor="inputPassword">Password</label>

                 
                  {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
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


                <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                  <button className="btn btn-primary" type="submit" onClick={submitData}>Signup</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                Already have an account? <Link to="/login">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
