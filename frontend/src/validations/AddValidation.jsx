export const validate = (values) => {
    const errors = {};

    
    if (!values.name.trim()) {
        errors.name = 'Name is required';
      } else if (!/^[A-Za-z\s]+$/i.test(values.name)) {
        errors.name = 'Should not contain numbers!';
    }else{
        errors.name=""
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Enter a valid email';
    }else{
        errors.email=""
    }
  
    return errors;
  };
  