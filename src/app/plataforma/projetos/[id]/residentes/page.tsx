import { getResidents } from "@/actions/get-residents";
import { columns } from "./_components/table/columns";
import { ResidentDataTable } from "./_components/table/data-table";

export default async function Page() {
  const residents = await getResidents();

  return <ResidentDataTable columns={columns} data={residents} />;
}
