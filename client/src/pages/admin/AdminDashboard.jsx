import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthGuard from "../../components/owner/AuthGuard";
import ConfigEditor from "../../components/owner/ConfigEditor";
import LeadTable from "../../components/owner/LeadTable";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("config");

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-100">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm font-semibold text-slate-500 transition hover:text-orange-500"
              >
                Estimator
              </Link>
              <h1 className="text-lg font-bold text-slate-900">
                Owner Panel
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                {user?.username}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6 flex gap-1 rounded-lg bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setTab("config")}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                tab === "config"
                  ? "bg-orange-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Config Editor
            </button>
            <button
              type="button"
              onClick={() => setTab("leads")}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                tab === "leads"
                  ? "bg-orange-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Leads
            </button>
          </div>

          {tab === "config" && <ConfigEditor />}
          {tab === "leads" && <LeadTable />}
        </div>
      </main>
    </AuthGuard>
  );
};

export default AdminDashboard;
