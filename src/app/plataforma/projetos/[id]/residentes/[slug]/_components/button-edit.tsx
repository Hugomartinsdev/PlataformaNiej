"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonEdit({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`${id}/editar`);
      }}
      onTouchStart={() => {
        router.prefetch(`${id}/editar`);
      }}
      onMouseEnter={() => {
        router.prefetch(`${id}/editar`);
      }}
    >
      Editar
    </Button>
  );
}
