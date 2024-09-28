"use client";

import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";

import { Dialog } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { ProjectType } from "@/@types/project";
import { toast } from "sonner";
import { CreateProject } from "@/actions/create-project";
import { UpdateProject } from "@/actions/update-project";

const projectFormSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    }),
});

type ProjectFormSchema = z.infer<typeof projectFormSchema>;

type Props = {
  projects: ProjectType[];
};

export default function ProjectDialog({ projects }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("project");

  const isCreating = id === "new";

  const data = projects.find((project) => project.id === id);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  async function handleProject(form: ProjectFormSchema) {
    const { name } = form;

    if (isCreating) {
      try {
        await CreateProject({
          name,
        });

        router.refresh();

        toast.success("Projeto criado com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao criar usuário");
        throw new Error("Erro ao criar usuário");
      }
    } else {
      try {
        await UpdateProject({
          id: data!.id,
          name,
        });

        router.refresh();

        toast.success("Projeto criado com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar usuário");
        throw new Error("Erro ao atualizar usuário");
      }
    }
  }

  useEffect(() => {
    if (!data) {
      setValue("name", "");
      reset();
      return;
    }
    setValue("name", data?.name);
  }, [data]);

  const Content = () => (
    <form onSubmit={handleSubmit(handleProject)}>
      <Heading>Projeto</Heading>
      <Divider soft className="my-2" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-2">
          <Text>Nome</Text>
          <div className="mt-2">
            <Input
              {...register("name")}
              autoComplete="name"
              disabled={isSubmitting || isSubmitSuccessful}
              required
            />

            {errors.name && (
              <Text className="mt-1 !text-red-500">{errors.name.message}</Text>
            )}
          </div>
        </div>
      </div>
    </form>
  );

  const ButtonEdit = () => (
    <ButtonAnimated
      type="submit"
      animated
      loader={<Loader className="h-6 w-6 animate-spin" />}
      success={
        <div className="flex">
          <CheckIcon className="h-6 w-6" />
          <span className="ml-2">
            {data
              ? "Usuário atualizado com sucesso!"
              : "Usuário criado com sucesso!"}
          </span>
        </div>
      }
      onClick={handleSubmit(handleProject)}
      state={isSubmitSuccessful ? "success" : isSubmitting ? "loading" : "idle"}
      disabled={isSubmitting || isSubmitSuccessful}
    >
      {data ? "Salvar" : "Criar"}
    </ButtonAnimated>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isCreating || (!!data && !!id)}
        onClose={() => {
          router.push("/plataforma/configuracoes");
          reset();
        }}
      >
        <Content />
        <div className="mt-5 flex w-full justify-end sm:mt-6">
          <ButtonEdit />
        </div>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isCreating || (!!data && !!id)}
      onOpenChange={(open) => {
        if (!open) {
          router.push("/plataforma/configuracoes");
          reset();
        }
      }}
    >
      <DrawerContent className="px-4 pb-16">
        <Content />
        <div className="mt-4 flex flex-col gap-4">
          <ButtonEdit />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
