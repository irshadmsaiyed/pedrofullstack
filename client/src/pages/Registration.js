import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export default function Registration() {
  const [createUser, { data }] = useMutation(CREATE_USER);

  if (data) {
    console.log(data);
  }

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    createUser({
      variables: {
        user: {
          username: values.username,
          password: values.password,
        },
      },
    });
    console.log(values.username, values.password);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  return (
    <div className="min-h-screen text-gray-800 antialiased py-6 flex flex-col justify-start sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Create a new User</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-3 bg-green-400 rounded-t-md"></div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="px-8 py-6 bg-gray-50">
              <label className="block font-semibold mt-5">Username</label>
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-400 text-sm"
              />
              <Field
                name="username"
                placeholder="Enter user name"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
              />
              <label className="block font-semibold mt-5">Password</label>
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-400 text-sm"
              />
              <Field
                name="password"
                placeholder="Enter password"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
              />
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 w-full"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
