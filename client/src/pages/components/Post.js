import React from "react";
import { useParams } from "react-router-dom";
import { GET_POST, GET_COMMENTS } from "../../graphql/queries";
import { CREATE_COMMENT } from "../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Post() {
  const { id } = useParams();
  const { data: post } = useQuery(GET_POST, {
    variables: { id: id },
  });
  const { data: comments } = useQuery(GET_COMMENTS, {
    variables: { postId: id },
  });

  const [createComment, { comment }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { postId: id } }],
  });

  const initialValues = {
    commentBody: "",
    postId: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    createComment({
      variables: {
        comment: {
          commentBody: values.commentBody,
          postId: id,
        },
      },
    });
    console.log(values.commentBody, id);
  };

  const validationSchema = Yup.object().shape({
    commentBody: Yup.string().required(),
  });

  return (
    <>
      {post && (
        <div className="md:flex space-y-8">
          <div className="md:w-1/2 mt-7">
            <div className="flex justify-center">
              <div className="w-full rounded-xl shadow-md overflow-hidden md:max-w-md mx-8">
                <div className="bg-indigo-300 text-center font-bold uppercase p-2">
                  {post.getPost.title}
                </div>
                <div className="px-2 py-6 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-600">
                  {post.getPost.postText}
                </div>
                <div className="p-2 bg-indigo-100">
                  @{post.getPost.username}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-yellow-300">
            <div>
              <div className="bg-gray-200 shadow-md rounded-lg text-left">
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="px-8 py-6 bg-gray-50 flex">
                    <div className="w-full">
                      <Field
                        type="text"
                        name="commentBody"
                        placeholder="Enter comment here"
                        className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      />
                      <ErrorMessage
                        name="commentBody"
                        component="span"
                        className="text-red-400 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 ml-2 bg-indigo-500 text-white py-2 px-2 rounded-md hover:bg-indigo-600 w-32 h-10"
                    >
                      Save
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
            <div>
              List of comments.....
              {comments &&
                comments.getComments.map((value, key) => {
                  return (
                    <div className=" w-auto bg-red-200 rounded-lg p-2 m-2 ">
                      {value.commentBody}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
