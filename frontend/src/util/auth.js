export default function gatAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return gatAuthToken();
}
