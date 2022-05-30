const regx = {
  email: new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ),
};

class Validator {
  static required(value: any, message: string) {
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }

    return false;
  }

  static email(value: any, message: string) {
    const result = regx.email.test(value);
    if (!result) return { error: true, message };
    return false;
  }
}

export const inputValidator = (validators: any, value: any) => {
  if (validators?.length) {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i].check(value, validators[i].message);
      if (error) return error;
    }
  }

  return false;
};

export default Validator;
