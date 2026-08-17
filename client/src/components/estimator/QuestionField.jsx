import { useEstimator } from "../../context/EstimatorContext";

const QuestionField = () => {
  const { questions, currentStep, answers, handleChange } = useEstimator();

  const question = questions[currentStep];
  if (!question || !question.active) {
    return null;
  }

  const value = answers[question.key];

  if (question.type === "number") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          {question.label}
          {question.unit && (
            <span className="ml-1 text-slate-500">({question.unit})</span>
          )}
        </label>
        <input
          type="number"
          min={question.min}
          max={question.max}
          value={value || ""}
          onChange={(e) => handleChange(question.key, Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
          placeholder={`Enter ${question.min} - ${question.max}`}
        />
      </div>
    );
  }

  if (question.type === "select") {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          {question.label}
        </label>
        <div className="space-y-2">
          {question.options?.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange(question.key, option.value)}
              className={`w-full rounded-lg border p-4 text-left transition ${
                value === option.value
                  ? "border-orange-500 bg-orange-50"
                  : "border-slate-300 hover:border-orange-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default QuestionField;
