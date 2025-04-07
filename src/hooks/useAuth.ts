import { useCallback } from "../@lib";
import { Notification, User } from "../types";

interface useAuthProps {
  setUser: (user: User | null) => void;
  addNotification: (message: string, type: Notification["type"]) => void;
}

export const useAuth = ({ setUser, addNotification }: useAuthProps) => {
  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification, setUser]);

  return {
    login,
    logout,
  };
};