import { useEffect, Fragment, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getLeads } from "../../services/api";

const LeadTable = () => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLeads(token);
        setLeads(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No leads captured yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Phone</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
              <th className="px-4 py-3 font-semibold text-slate-700">
                Estimate
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700">Config</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <Fragment key={lead._id}>
                <tr
                  className="cursor-pointer transition hover:bg-slate-50"
                  onClick={() => toggleExpand(lead._id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{lead.email}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {formatCurrency(lead.estimate_low)} &mdash;{" "}
                    {formatCurrency(lead.estimate_high)}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    v{lead.config_version}
                  </td>
                </tr>
                {expandedId === lead._id && (
                  <tr>
                    <td colSpan={6} className="border-t border-slate-100 bg-slate-50 px-4 py-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Submitted Answers
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-5">
                        {Object.entries(lead.answers || {}).map(
                          ([key, value]) => (
                            <div key={key} className="rounded-lg bg-white p-2 border border-slate-200">
                              <span className="block text-xs text-slate-500">
                                {key.replace(/_/g, " ")}
                              </span>
                              <span className="font-semibold text-slate-900">
                                {String(value)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
        {leads.length} lead{leads.length !== 1 ? "s" : ""} total. Click a row
        to expand.
      </div>
    </div>
  );
};

export default LeadTable;
