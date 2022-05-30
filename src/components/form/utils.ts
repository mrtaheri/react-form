import React from "react";

export const setFormDefaults = (
  children: React.ReactNode,
  cb: (e: FormStateType) => void
) => {
  let inputElements: any = {};

  React.Children.forEach(children, (element: any) => {
    if (element.props?.name) {
      inputElements[element.props?.name] = element.props?.defaultValue || null;
    }
  });

  cb(inputElements);
};

export const fieldsWithError = (
  errorFields: string[],
  name: string,
  error: any
) => {
  const index = errorFields.findIndex((item: string) => item === name);
  const cloneErrorFields = [...errorFields];

  if (error && index === -1) {
    cloneErrorFields.push(name);
  } else {
    cloneErrorFields.splice(index, 1);
  }

  return cloneErrorFields;
};
