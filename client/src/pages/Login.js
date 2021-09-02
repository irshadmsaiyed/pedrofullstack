import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

export default function Login() {
  const [loadUser, { data }] = useLazyQuery(GET_USER);
  const initialValues = {
    username: "",
    password: "",
  };

  let username = "";
  let password = "";

  if (data) {
    username = data.getUser.username;
    password = data.getUser.password;
    console.log("Login successfully");
  }

  const onSubmit = (values) => {
    loadUser({
      variables: {
        user: {
          username: values.username,
          password: values.password,
        },
      },
    });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  return (
    <div className="min-h-screen text-gray-800 antialiased py-6 flex flex-col justify-start sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">User Login</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-3 bg-blue-400 rounded-t-md"></div>
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
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md"
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
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md"
              />
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 w-full"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
