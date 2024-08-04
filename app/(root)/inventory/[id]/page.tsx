import React from "react";

function InventoryItemPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <div>{id}</div>;
}

export default InventoryItemPage;
