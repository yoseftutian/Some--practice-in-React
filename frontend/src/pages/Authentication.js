import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "http://localhost:8080/" + mode,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  console.log("Response data:", resData); // בדוק את התשובה מהשרת

  const token = resData.token;
  if (!token) {
    console.error("Token is missing from response.");
    throw json({ message: "No token received." }, { status: 500 });
  }
  localStorage.setItem("token", token);
  console.log("Token saved in localStorage:", localStorage.getItem("token"));

  return redirect("/");
}
