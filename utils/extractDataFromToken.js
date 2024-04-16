import jwt from "jsonwebtoken";

export async function extractDataFromToken(request) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = tokenPayload.id;
    return userId;
  } catch (error) {
    throw new Error(error.message);
  }
}
