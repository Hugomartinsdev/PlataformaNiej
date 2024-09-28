"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { UserType } from "@/@types/user";
import DeleteDialog from "@/components/delete-dialog";

type Props = {
  data: UserType[];
  user: UserType;
};

export function DeleteUser(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("deleteUser");

  const name = props.data.find((item) => item.id === id)?.name;

  const currentUser = props.user.id === id;

  const handleDelete = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      // await deleteUser(id);

      router.push("/configuracoes");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!name) return <></>;

  return (
    <DeleteDialog
      open={!!id}
      title={
        !currentUser
          ? `Apagar usuário - ${name}`
          : "Você não pode apagar seu próprio usuário"
      }
      message={
        !currentUser
          ? "Tem certeza que deseja apagar esse usuário? Esta ação não pode ser desfeita."
          : "Você não pode apagar seu próprio usuário."
      }
      onHandleClose={() => {
        router.push("/plataforma/configuracoes");
      }}
      disabled={currentUser}
      onHandleDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}
