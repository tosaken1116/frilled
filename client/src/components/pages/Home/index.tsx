import { useSignin } from "../../../libs/firebase";
import { Button } from "../../ui/Button";

export const HomePage = () => {
  return <Login />;
};

const Login = () => {
  const { signinWithGoogle } = useSignin();
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
        <Button onClick={signinWithGoogle}>ログインする</Button>
      </div>
    </div>
  );
};
