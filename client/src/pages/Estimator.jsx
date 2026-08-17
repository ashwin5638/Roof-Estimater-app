import { useEstimator } from "../context/EstimatorContext";
import Loader from "../components/common/Loader";
import Input from "../components/common/Input";
import QuestionField from "../components/estimator/QuestionField";
import ProgressBar from "../components/estimator/ProgressBar";
import StepNavigation from "../components/estimator/StepNavigation";

const Estimator = () => {
  const { questions, loading, error, isContactStep } = useEstimator();

  if (loading) return <Loader />;

  if (error && !questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Get Your Roofing Estimate
        </h1>

        <p className="mt-2 text-slate-500">Answer a few questions to get started.</p>

        <div className="mt-6">
          <ProgressBar />
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {!isContactStep && <QuestionField />}

          {isContactStep && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Your Contact Details
              </h2>
              <p className="text-sm text-slate-500">
                We need your info to send your estimate.
              </p>
              <Input />
            </div>
          )}
        </div>

        <StepNavigation />
      </div>
    </main>
  );
};

export default Estimator;
