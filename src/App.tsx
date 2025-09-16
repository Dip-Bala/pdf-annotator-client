import { useState, useEffect} from "react";
import api from "./lib/api";
import { UserContext } from "./Hooks/userContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard"
import Loader from "./components/Loader";

export default function App() {
  const [user, setUser] = useState<boolean | null>(null);
  useEffect(() => {
    async function checkAuth() {
      try {
        await api.post("/api/auth/refresh");
        setUser(true);
      } catch {
        setUser(false);
      }
    }
    checkAuth();
  }, []);

  if (user === null) return <Loader />;

  return (
  <UserContext.Provider value={{ user, setUser }}>
      {user ? (
        <Dashboard />
      ) : (
        <Auth />
      )}
  </UserContext.Provider>
  )
}