import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/store/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub_componetes/Special_loadingButton";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const { isAuthenticated, error,user,loading} = useSelector((state) => state.user);
  // let loading = true
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(login(email, password));
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      console.log("user login ",user)
      toast.success(user.message)
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgate-password" // Use "to" instead of "href" for Link component
                  className="ml-auto inline-block text-sm font-bold"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            {
              loading ? <SpecialLoadingButton content={"loading..."}/> :
              <Button type="button" className="w-full" onClick={handelClick}>
              login
            </Button>
            }
            
          
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
