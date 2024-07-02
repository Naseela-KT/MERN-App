export const validate = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Enter a valid email';
    }else{
      errors.email=""
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
    }else{
      errors.password=""
    }
  
    return errors;
  };
  