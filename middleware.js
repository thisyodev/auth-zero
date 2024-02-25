import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";
import { jwtDecode } from "jwt-decode";

export default withMiddlewareAuthRequired(async (req) => {
    const res = NextResponse.next();

    const user = await getSession(req, res);

    if (!user) {
        return NextResponse.redirect("/api/auth/login");
    }

    const userPermissions = jwtDecode(user.accessToken);
    console.log(userPermissions, 'userPermissions');

    return res;
});

export const config = {
    matcher: "/profile",
};
