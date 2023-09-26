import { CurrentUser } from "@/types";
import * as jwt from "jsonwebtoken";

export const authDetails = (req: Request): CurrentUser => {
  const token = String(req.headers.get("authorization"));
  const decoded: CurrentUser | any = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  );
  return decoded;
};


