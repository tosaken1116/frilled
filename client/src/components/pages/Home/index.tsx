import { useSignin } from "../../../libs/firebase";

export const HomePage = () => {
  return <Login />;
};

const Login = () => {
  const { signinWithGoogle } = useSignin();
  return (
    <div>
      <button onClick={signinWithGoogle}>login</button>
    </div>
  );
};
