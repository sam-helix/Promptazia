"use client";

// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";
const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  //for refetching the data of a user in order to edit the prompt
  useEffect(() => {
    const getPromptDetails = async () => {
      //out own endpoint that we created
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId){
      getPromptDetails();
    }
  }, [promptId]);
  //   whenever the promptID changes this will happen
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      return alert("Prompt ID not found!");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        //this is the api we gonna call
        method: "PATCH",
        //passing all of this data below to thie fetch api endpoint using post methods
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;