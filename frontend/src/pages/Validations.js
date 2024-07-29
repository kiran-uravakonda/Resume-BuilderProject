function validatePassword(password) {
   var valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
     return valid.test(password);
 }

function Validations(val){
   
    let errors={}
    if(!val.firstName){
     errors.firstName="please enter firstName"
    }
     if(!val.lastName){
      errors.lastName="please enter lastName"
    }
    if(!val.mobile){
      errors.mobile="please enter phone number"
    }
    if( !val.email){
       errors.email="please enter valid email"
    }
   

    if(!validatePassword(val.password)){
      errors.password="please enter valid password"
    }



  
    

     return errors;
       
     
    
}

export default Validations;