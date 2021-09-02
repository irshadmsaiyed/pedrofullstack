import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations";
import { GET_ALL_POSTS } from "../graphql/queries";

const CreatePost = () => {
  const [createPost, { data }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  if (data) {
    console.log(data);
  }

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    createPost({
      variables: {
        post: {
          title: values.title,
          postText: values.postText,
          username: values.username,
        },
      },
    });
    console.log(values.title, values.postText, values.username);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  return (
    <div className="min-h-screen text-gray-800 antialiased py-6 flex flex-col justify-start sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Create a new Post</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-3 bg-indigo-400 rounded-t-md"></div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="px-8 py-6 bg-gray-50">
              <label className="block font-semibold">Title</label>
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-400 text-sm"
              />
              <Field
                type="text"
                name="title"
                placeholder="Enter post title"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <label className="block font-semibold mt-5">Text</label>
              <ErrorMessage
                name="postText"
                component="span"
                className="text-red-400 text-sm"
              />
              <Field
                name="postText"
                placeholder="Enter post text"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <label className="block font-semibold mt-5">Username</label>
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-400 text-sm"
              />
              <Field
                name="username"
                placeholder="Enter user name"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <button
                type="submit"
                className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 w-full"
              >
                Create
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
