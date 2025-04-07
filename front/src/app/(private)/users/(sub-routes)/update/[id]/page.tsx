import { UpdateUserClientPage } from "./load-page";

interface Props {
  id: string;
}

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<Props>;
}) {
  const { id } = await params;

  return <UpdateUserClientPage id={id} />;
}
