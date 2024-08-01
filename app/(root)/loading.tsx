import Loader from "@/components/ui/loader";
import React from "react";

function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
