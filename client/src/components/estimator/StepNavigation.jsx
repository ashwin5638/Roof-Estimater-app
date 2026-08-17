import { useEstimator } from "../../context/EstimatorContext";

const StepNavigation = () => {
  const { currentStep, isContactStep, canProceed, submitting, goBack, goNext } =
    useEstimator();

  return (
    <div className="mt-8 flex items-center justify-between">
      {currentStep !== 0 ? (
        <button
          type="button"
          onClick={goBack}
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={goNext}
        disabled={!canProceed() || submitting}
        className="ml-auto rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Calculating..."
          : isContactStep
            ? "Get Estimate"
            : "Continue"}
      </button>
    </div>
  );
};

export default StepNavigation;
