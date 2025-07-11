"use client";

import { AddAccount } from "@/components/add-account";
import { useEffect, useState } from "react";

export default function EditAccountPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<any>(null);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL +`/accounts/${params.id}`)
      .then((res) => res.json())
      .then(setInitialData);
  }, [params.id]);

  // You would pass initialData to AddAccount for editing
  return <AddAccount initialData={initialData} mode="edit" />;
}
