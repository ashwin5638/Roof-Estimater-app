import { useEstimator } from "../../context/EstimatorContext";

const Loader = () => {
  const { loading } = useEstimator();

  if (!loading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500" />
        <p className="text-slate-500">Loading estimator...</p>
      </div>
    </div>
  );
};

export default Loader;
