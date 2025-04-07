import { User } from "@/contexts/AuthContext";
import { DetailsUser } from "./DetailsUser";
import { DeleteUser } from "./DeleteUser";
import { UpdateUserButton } from "./UpdateUser";

export function ActionsList({ user }: { user: User }) {
  return (
    <div className="flex gap-1 flex-nowrap">
      <DetailsUser user={user} />
      <UpdateUserButton user={user} />
      <DeleteUser user={user} />
    </div>
  );
}
