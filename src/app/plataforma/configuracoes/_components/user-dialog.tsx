"use client";

import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
import { UserType } from "@/@types/user";
import { SignUp } from "@/actions/auth/sign-up";
import { toast } from "sonner";
import { UpdateUser } from "@/actions/auth/update-user";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ProjectType } from "@/@types/project";
import { AddMemberToProject } from "@/actions/add-member-to-project";

const userFormSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, {
        message: "Nome deve ter no mínimo 3 caracteres",
      }),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email({
        message: "Email inválido",
      }),
    role: z.enum(["user", "admin"]),
    password: z
      .string({
        required_error: "Nova senha é obrigatória",
      })
      .min(8, {
        message: "A senha deve ter no mínimo 8 dígitos.",
      })
      .regex(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      ),
    confirm_password: z.string({
      required_error: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas precisam ser iguais.",
    path: ["confirm_password"],
  });

type UserFormSchema = z.infer<typeof userFormSchema>;

type Props = {
  users: UserType[];
  user: UserType;
  projects: ProjectType[];
};

export default function UserDialog({
  users,
  user: currentUser,
  projects,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("user");

  const isCreating = id === "new";

  const data = users.find((user) => user.id === id);

  const isCurrentUser = currentUser.id === id;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      role: data?.role,
    },
  });

  async function handleUser(form: UserFormSchema) {
    const { name, email, role, password } = form;

    if (isCreating) {
      try {
        await SignUp({
          name,
          email,
          role,
          password,
        });

        router.refresh();

        toast.success("Usuário criado com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao criar usuário");

        throw new Error("Erro ao criar usuário");
      }
    } else {
      try {
        await UpdateUser({
          id: data!.id,
          name,
          email: form.email,
          role,
          password,
        });

        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar usuário");
        throw new Error("Erro ao atualizar usuário");
      }
    }
  }

  const [selectProject, setSelectProject] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddProject() {
    if (!selectProject || selectProject === "") {
      toast.error("Selecione um projeto");
      return;
    }

    try {
      setIsLoading(true);
      await AddMemberToProject(selectProject, data!.id);

      router.refresh();

      toast.success("Projeto adicionado com sucesso");

      setSelectProject(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar projeto");
      throw new Error("Erro ao adicionar projeto");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!data) {
      setValue("name", "");
      setValue("email", "");
      setValue("role", "user");
      reset();
      return;
    }
    setValue("name", data?.name);
    setValue("email", data?.email);
    setValue("role", data?.role);
  }, [data]);

  const Content = () => (
    <form onSubmit={handleSubmit(handleUser)}>
      <Heading>Usuário</Heading>
      <Divider soft className="my-2" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-2">
          <Text>Nome</Text>
          <div className="mt-2">
            <Input
              {...register("name")}
              autoComplete="name"
              disabled={isSubmitting || isSubmitSuccessful || isCurrentUser}
              required
            />

            {errors.name && (
              <Text className="mt-1 !text-red-500">{errors.name.message}</Text>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <Text>Email</Text>
          <div className="mt-2">
            <Input
              type="email"
              autoComplete="email"
              {...register("email")}
              disabled={isSubmitting || isSubmitSuccessful || isCurrentUser}
              required
            />

            {errors.email && (
              <Text className="mt-1 !text-red-500">{errors.email.message}</Text>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <Text>Role</Text>
          <Select
            aria-label="Permissão"
            className="mt-2"
            {...register("role")}
            disabled={isSubmitting || isSubmitSuccessful || isCurrentUser}
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </Select>

          {errors.role && (
            <Text className="mt-1 !text-red-500">{errors.role.message}</Text>
          )}
        </div>

        <div className="col-span-2">
          <Text>Senha</Text>
          <Input
            type="password"
            className="mt-2"
            {...register("password")}
            disabled={isSubmitting || isSubmitSuccessful || isCurrentUser}
          />

          {errors.password && (
            <Text className="mt-1 !text-red-500">
              {errors.password.message}
            </Text>
          )}
        </div>

        <div className="col-span-2">
          <Text>Confirmar senha</Text>
          <Input
            type="password"
            className="mt-2"
            {...register("confirm_password")}
            disabled={isSubmitting || isSubmitSuccessful || isCurrentUser}
          />

          {errors.confirm_password && (
            <Text className="mt-1 !text-red-500">
              {errors.confirm_password.message}
            </Text>
          )}
        </div>
      </div>
    </form>
  );

  const ProjectContent = () => (
    <form>
      <Heading>Projetos</Heading>
      <Divider soft className="my-2" />
      <Text>Adicionar usuário a um projeto</Text>
      <Select
        aria-label="Projetos"
        className="mt-2"
        value={selectProject ?? ""}
        onChange={(e) => setSelectProject(e.target.value)}
        disabled={
          isSubmitting || isSubmitSuccessful || isCurrentUser || isLoading
        }
      >
        <option value="" disabled>
          Selecione um projeto
        </option>
        {projects
          .filter((project) => !data?.projects.some((p) => p.id === project.id))
          .map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
      </Select>

      <div className="mt-5 flex w-full justify-end">
        <ButtonAnimated
          className="mt-2 items-end justify-end"
          disabled={
            isSubmitting || isSubmitSuccessful || isCurrentUser || isLoading
          }
          onClick={handleAddProject}
        >
          Adicionar
          <PlusIcon className="ml-2 h-4 w-4 text-white" />
        </ButtonAnimated>
      </div>
      <Divider soft className="my-2" />

      <Text className="my-4">Projetos que o usuário participa</Text>

      <ul className="data-list grid grid-cols-1 gap-y-4">
        {data?.projects.length === 0 && (
          <Text className="col-span-1 text-center">
            Nenhum projeto encontrado
          </Text>
        )}

        {data?.projects.map((project) => (
          <li
            key={project.id}
            className="flex list-disc items-center justify-between"
          >
            <Text className="strong">- {project.name}</Text>
            <ButtonAnimated
              className="mt-2 items-end justify-end"
              disabled={true}
            >
              Remover
              <TrashIcon className="ml-2 h-4 w-4 text-white" />
            </ButtonAnimated>
          </li>
        ))}
      </ul>
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
      onClick={handleSubmit(handleUser)}
      state={isSubmitSuccessful ? "success" : isSubmitting ? "loading" : "idle"}
      disabled={
        isSubmitting || isSubmitSuccessful || isCurrentUser || isLoading
      }
    >
      {isCurrentUser
        ? "Você não pode editar seu próprio usuário nessa tela"
        : data
          ? "Salvar"
          : "Criar"}
    </ButtonAnimated>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isCreating || (!!data && !!id)}
        onClose={() => {
          router.push("/plataforma/configuracoes");
          setSelectProject(null);
          reset();
        }}
      >
        <div className="flex h-[30rem] flex-col gap-4 overflow-auto">
          <Content />
          <div className="mt-5 flex w-full justify-end sm:mt-6">
            <ButtonEdit />
          </div>
          {watch("role") === "user" && <ProjectContent />}
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
          setSelectProject(null);
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
