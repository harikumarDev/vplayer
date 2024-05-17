export const getErrMsg = (err) => {
  return err.response?.data?.message || "Something went wrong";
};

export const validateForm = (form, optional = []) => {
  let isValid = true;
  for (let key in form) {
    if (form[key].trim() === "") {
      if (optional.includes(key)) continue;

      isValid = false;
      break;
    }
  }

  return isValid;
};
