import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPassword() {

  let [password, setPassword] = useState('')
  let [error, setError] = useState({})
  let { id } = useParams();

  const [showPassword,setShowPassword]=useState(false)

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }

  function updatePassword(e) {

    setPassword(e.target.value)
  }


  function validatePassword(password) {
    var valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
    return valid.test(password);
  }

  function Validate() {

    if (!validatePassword(password)) {
       setError({ message: "Please enter a valid password." });
        return false
    }
    return true
  }
  function Submitdata(e) {
    e.preventDefault(); 
    if (Validate()) {
      axios.post(`http://localhost:8000/user/reset-password/${id}`, { password })
        .then((result) => {
         
          toast.success("reset success");
          setPassword(password="")
         
          setError({
            error:""
          })

          console.log(result)
         
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else{
      toast.error("error")
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Reset Password</h3></div>
            <div className="card-body">
              <form >
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type={showPassword?"text":"password"}
                    placeholder="name@example.com"

                    value={password}
                    onChange={updatePassword}

                  />

                  <label htmlFor="inputPassword">Enter newPassword</label>
                  {error.message && <span style={{ color: "red" }}>{error.message}</span>}
                </div>

                <div className="checkbox-container mb-3"> 
                  <input
                    className="form-check-input "
                    type="checkbox"
                    id="showPasswordCheckbox"
                    onChange={togglePasswordVisibility}
                   
                  />
                  <label className="form-check-label show-password-label" htmlFor="showPasswordCheckbox">
                    Show Password
                  </label>
                  <div className="small login-link">
                 <Link to="/login"> Back to Login </Link>
              </div>
                </div>
               
              </form>
            </div>
           
            <div className="d-flex align-items-center justify-content-center mt-4 mb-5">

              <button className="btn btn-primary w-25" type="submit" onClick={Submitdata}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;