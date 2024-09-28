import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Divider } from "@/components/ui/divider";
import { Heading, Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
// import { getOrgCached } from "@/lib/get-org-cached";
// import { getUserCached } from "@/lib/get-user-cached";

// import { DeleteUser } from "./_components/delete-user";
// import { columns } from "./_components/table/columns";
// import { UsersDataTable } from "./_components/table/data-table";
// import { Theme } from "./_components/theme";
// import UserDialog from "./_components/user-dialog";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Theme } from "./_components/theme";
import { UsersDataTable } from "./_components/table-user/data-table";
import { columns } from "./_components/table-user/columns";
import { getUsers } from "@/actions/get-users";
import UserDialog from "./_components/user-dialog";
import { getUser } from "@/actions/get-user";
import { DeleteUser } from "./_components/delete-user";
import { ProjectsDataTable } from "./_components/table-projects/data-table";
import { columnsProjects } from "./_components/table-projects/columns";
import { getProjects } from "@/actions/get-projects";
import ProjectDialog from "./_components/project-dialog";
// import { ChangeOrgProfile } from "./_components/change-org-profile";
// import { ChangeNameOrgForm } from "./_components/change-name-org-form";

export const metadata: Metadata = {
  title: "Configurações",
};

export default async function Settings() {
  const users = await getUsers();

  const user = await getUser();

  const projects = await getProjects();

  console.log(projects);

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Configurações</Heading>

      <Divider className="my-10 mt-6" />

      <section className="flex flex-col gap-4">
        <div className="space-y-1">
          <Subheading>Aparência</Subheading>
          <Text>Escolha o tema da plataforma.</Text>
        </div>
        <div>
          <Theme />
        </div>
      </section>
      <Divider className="my-10" soft />

      <UsersDataTable columns={columns} data={users} />

      <UserDialog users={users} user={user} projects={projects} />

      <DeleteUser user={user} data={users} />

      <Divider className="my-10" soft />

      <ProjectsDataTable columns={columnsProjects} data={projects} />

      <ProjectDialog projects={projects} />
    </form>
  );
}
