import { z } from "zod";
import { zSession } from "../schemas/session.schema";

type Session = z.infer<typeof zSession>;

interface iToken {
  token: string;
}

export { Session, iToken };
