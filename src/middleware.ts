//To decide which pages can be seen after auth and which cannot be seen before auth

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:["/"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};