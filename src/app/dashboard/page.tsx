//src/app/dashboard/page.tsx
'use client'

const DashboardPage = () => {
  return (
    <div  >
      <h2 className="text-blue-700">Dashboard</h2>
      <p className="text-white mb-4">
        Welcome to your dashboard! This is where you can manage your account and view your data.
      </p>
      <button className="text-blue-700">
        View Data
      </button>
    </div>
  );
};

export default DashboardPage;