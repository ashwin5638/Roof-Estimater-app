import { Link, Navigate } from "react-router-dom";
import { useEstimator } from "../context/EstimatorContext";

const EstimateResult = () => {
  const { estimateResult, contact, answers, resetEstimator } = useEstimator();

  if (!estimateResult) {
    return <Navigate to="/estimate" replace />;
  }

  const { estimate_low, estimate_high, currency } = estimateResult;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleNewEstimate = () => {
    resetEstimator();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Your Estimate</h1>
          <p className="mt-2 text-slate-500">
            Here is your estimated roofing cost range.
          </p>
        </div>

        <div className="rounded-xl border-2 border-orange-500 bg-orange-50 p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Estimated Range
          </p>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            {formatCurrency(estimate_low)} &mdash; {formatCurrency(estimate_high)}
          </p>
        </div>

        {answers && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Answers
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(answers).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-slate-50 p-3">
                  <span className="block text-slate-500">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {contact && (
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold">Name:</span> {contact.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {contact.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {contact.email}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/estimate"
            onClick={handleNewEstimate}
            className="block w-full rounded-lg bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            Get Another Estimate
          </Link>
          <Link
            to="/"
            className="block w-full rounded-lg border border-slate-300 py-3 text-center font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EstimateResult;
