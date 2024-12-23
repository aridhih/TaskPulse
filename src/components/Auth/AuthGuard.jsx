import { useEffect } from "react";
import { auth } from "../../firebase";
import { useAtom } from 'jotai';
import { useNavigate } from "react-router-dom";
import isLoggedInAtom from "../../atom";

function AuthGuard({ children }) {
  const [{ loading, loggedIn }, setAuthState] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState({
        loading: false,
        loggedIn: !!user
      });
    });

    return () => unsubscribe();

  }, [setAuthState]);


  if (loading) {
    return <></>;
  }

  
  if (!loggedIn) {
    return (
      <div className="text-center flex justify-center items-center flex-col h-screen gap-12">
        <h1 className="text-3xl text-red-500">Please login to continue</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
