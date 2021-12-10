// type validaitonObject = { validatename: string | string[]; message: string }[];

const validate = (validation, body) => {
  for (let index = 0; index < validation.length; index++) {
    if (typeof validation[index].validatename === "string")
      if (
        !body[validation[index].validatename] ||
        body[validation[index].validatename]?.length === 0
      ) {
        return { [validation[index].validatename]: validation[index].message };
      }
  }
  return false;
};

const validateData = (array, body) => {
  for (let item of array) {
    if (!body[item] || body[item].length === 0) {
      console.log(item);
      return true
    };
  }
  return false;
};

const loginValidate = [
  {
    validatename: "username",
    message: "Uživatelské jméno je nutné vyplnit",
  },
  {
    validatename: "username",
    message: "Email je nutné vyplnit",
  },
  {
    validatename: "groupname",
    message: "Název skupiny je nutné vyplnit",
  },
];

const registerValidate = [
  {
    validatename: "username",
    message: "Uživatelské jméno je nutné vyplnit",
  },
  {
    validatename: "email",
    message: "Email je nutné vyplnit",
  },
  {
    validatename: "groupname",
    message: "Název skupiny je nutné vyplnit",
  },
  {
    validatename: "bakalariusername",
    message: "Název skupiny je nutné vyplnit",
  },
  {
    validatename: "bakalaripassword",
    message: "Název skupiny je nutné vyplnit",
  },
];

export { validate, loginValidate, registerValidate, validateData };

// console.log(
//   val(
//     [
//       {
//         validatename: "username",
//         message: "Uživatelské jméno je nutné vyplnit",
//       },
//       {
//         validatename: "password",
//         message: "Heslo je nutné vyplnit",
//       },
//     ],
//     body
//   )
// );

// if (typeof item.validatename === "object")
//   item.validatename.forEach((name) => {
//     if (!body[name] || body[name].length === 0) return item.message;
//   });
