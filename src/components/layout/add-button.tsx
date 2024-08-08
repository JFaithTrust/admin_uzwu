import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface AddButtonProps {
  link: string
}

export function AddButton({
                            link
                          }: AddButtonProps) {
  return (
    <div className="flex gap-x-4">
      <Link href={link}>
        <Button
          variant="outline"
          className="ml-auto bg-sky-100 text-blue-600 hover:text-blue-600/85 border-blue-500"
        >
          Create
        </Button>
      </Link>
    </div>
  )
}