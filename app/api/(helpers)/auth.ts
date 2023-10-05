import { CurrentUser } from "@/types";
import * as jwt from "jsonwebtoken";

export const authDetails = (r: Request): CurrentUser => {
  const token = String(r.headers.get("authorization"));
  const decoded: CurrentUser | any = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  );
  return decoded;
};


