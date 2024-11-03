import { redirect } from "react-router-dom";

export default function gatAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return gatAuthToken();
}

export function checkAuthLoader() {
  const token = gatAuthToken();

  if (!token) {
    return redirect("/auth");
  }
  return null;
}
