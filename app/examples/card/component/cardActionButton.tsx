"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { incrementCounter } from "./actions";

const CardActionButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <Button
        onClick={() => {
          startTransition(() => {
            incrementCounter(); // server action triggers refresh
          });
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
        disabled={isPending}
      >
         {isPending ? "Updating..." : "Increase Counter"}
      </Button>
    </div>
  );
};

export default CardActionButton;
