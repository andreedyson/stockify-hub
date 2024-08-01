"use client";
import { dotSpinner } from "ldrs";

dotSpinner.register();

function Loader() {
  return (
    <div>
      <l-dot-spinner size="40" speed="1.3" color="#519ee6"></l-dot-spinner>
    </div>
  );
}

export default Loader;
