import MainLayout from "../components/layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export default function AuthPage({ isLogin }) {
  return <MainLayout>{isLogin ? <Login /> : <Register />}</MainLayout>;
}
