import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
export default function gatAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }
  const tokenDuration = getTokenDuration();
  
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
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
