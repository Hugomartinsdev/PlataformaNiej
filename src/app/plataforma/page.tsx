import { getProjects } from "@/actions/get-projects";
import { getProjectsUser } from "@/actions/get-projects-user";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { USER_TOKEN } from "@/lib/constants";
import { decodeToken } from "@/server/jwt";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page() {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    notFound();
  }

  const { role } = decodeToken(token.value);

  const projects =
    role === "admin" ? await getProjects() : await getProjectsUser();

  return (
    <div className="flex flex-1 flex-col">
      <Heading>Projetos</Heading>
      <div className="my-7 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-4 md:gap-y-8 lg:gap-x-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative h-full w-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl sm:w-48"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
              {project.banner ? (
                <img
                  src={project.banner}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <span className="text-2xl font-bold text-gray-500">
                    {project.name}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex flex-row items-center justify-between">
                <Link
                  href={`/plataforma/projetos/${project.id}/residentes`}
                  className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
