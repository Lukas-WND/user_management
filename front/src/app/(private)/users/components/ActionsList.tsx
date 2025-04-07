import { User } from "@/contexts/AuthContext";
import { DetailsUser } from "./DetailsUser";

export function ActionsList({user}: {user: User}) {
  return <div>
    <DetailsUser user={user}/>
  </div>;
}
