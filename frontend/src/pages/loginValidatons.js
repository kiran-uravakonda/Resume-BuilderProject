const Validations=(values)=>{
let errors={}
if(!values.email){
      errors.email="please enter email"
}
if(!values.password){
    errors.password="please enter password"
}
return errors;
}

export default Validations;