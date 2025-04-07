import React from "react";
import { useMemo } from "./@lib";
import { NotificationContext, ThemeProvider, UserContext } from "./contexts";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { useAuth, useNotification, useTheme, useUser } from "./hooks";
import { useItems } from "./hooks/useItmes";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const { theme } = useTheme();
  const { items, addItems } = useItems();
  const { user, setUser } = useUser();
  const { notifications, addNotification, removeNotification } =
    useNotification();
  const { login, logout } = useAuth({
    setUser,
    addNotification,
  });

  const userContextValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  const notificationContextValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <ThemeProvider>
      <UserContext.Provider value={userContextValue}>
        <NotificationContext.Provider value={notificationContextValue}>
          <div
            className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
          >
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList items={items} onAddItemsClick={addItems} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
            <NotificationSystem />
          </div>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
