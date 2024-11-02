export default function gatAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}
