import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import CircularLoaderSkeleton from "@/src/common/components/skeletons/CircularLoaderSkeleton";
import GenericResponseHandler from "@/src/common/components/skeletons/GenericResponseHandler";
import useAsync from "@/src/common/components/custom-hooks/useAsync";
import BlogService from "@/src/blogs/services/BlogService";
import useUserContext from "@/src/profile/context/useUserContext";
import { SITE_NAME, SERVER } from "@/src/common/config/seo";
import BlogDetails from "@/src/blogs/components/detail/BlogDetails";

const blogService = new BlogService();
// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
  const { data: blogData, run, status, error, setData } = useAsync();
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      run(blogService.fetchBlogData(id)).catch((error) => console.error(error));
    };

    id && fetchBlogData();
  }, [id, run, user._id]);

  return (
    <>
      <GenericResponseHandler
        status={status}
        error={error}
        skeleton={<CircularLoaderSkeleton />}
      >
        <BlogDetails blogData={blogData?.blog} setData={setData} />
      </GenericResponseHandler>
    </>
  );
}
