sed -i '/<AdminDashboard \/>/a\
        )}\
\
        {currentScreen === "platform" && (\
          <PlatformHub onBack={() => setCurrentScreen("dashboard")} />' src/components/DashboardContainer.tsx
