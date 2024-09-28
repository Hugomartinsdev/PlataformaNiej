import { getUser } from "@/actions/get-user";
import { SidebarPlataform } from "@/components/sidebar-plataform";

export default async function PlataformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return <SidebarPlataform user={user}>{children}</SidebarPlataform>;
}
