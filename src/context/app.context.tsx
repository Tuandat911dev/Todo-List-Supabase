import { supabase } from "@/utils/supabase";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";


interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  isAppLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setIsAppLoading: (loading: boolean) => void;
}

type TProps = {
  children: React.ReactNode;
};

const CurrentAppContext = createContext<IAppContext | null>(null);

const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  useEffect(() => {
    const initApp = async () => {
      setIsAppLoading(true);
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session) {
          setIsAuthenticated(true);

          const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("id, username, avatar_url, full_name, email")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            message.error("Lấy thông tin người dùng thất bại");
            console.error(profileError);
          } else {
            setUser(profile);
            console.log(profile);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Lỗi khởi tạo App:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsAppLoading(false);
      }
    };

    initApp();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          inset: 0,
          background: "#fff",
          zIndex: 9999,
          transition: "all 0.5s ease",
          opacity: isAppLoading ? 1 : 0,
          visibility: isAppLoading ? "visible" : "hidden",
          pointerEvents: isAppLoading ? "auto" : "none",
        }}
      >
        <FadeLoader color="#61DAFB" loading={true} height="15px" />
      </div>
      <CurrentAppContext.Provider
        value={{
          isAuthenticated,
          user,
          isAppLoading,
          setUser,
          setIsAuthenticated,
          setIsAppLoading,
        }}
      >
        {props.children}
      </CurrentAppContext.Provider>
    </>
  );
};

const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error("useCurrentApp has to be used within <CurrentAppContext>");
  }

  return currentAppContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useCurrentApp };
