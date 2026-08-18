import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getConfigFull, updateConfig } from "../../services/api";

const ConfigEditor = () => {
  const { token } = useAuth();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getConfigFull(token);
        setConfig(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load configuration.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const handleBusinessChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      business: { ...prev.business, [field]: value },
    }));
  };

  const handleModifierChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      modifiers: { ...prev.modifiers, [field]: Number(value) },
    }));
  };

  const handleQuestionToggle = (qIndex) => {
    setConfig((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], active: !questions[qIndex].active };
      return { ...prev, questions };
    });
  };

  const handleQuestionLabelChange = (qIndex, value) => {
    setConfig((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], label: value };
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    setConfig((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIndex].options];
      options[oIndex] = {
        ...options[oIndex],
        [field]: field === "label" || field === "value" ? value : Number(value),
      };
      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        business: config.business,
        modifiers: config.modifiers,
        questions: config.questions,
      };
      await updateConfig(token, payload);
      setSuccess("Configuration saved successfully.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        {error || "Failed to load configuration."}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Business Info
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={config.business?.name || ""}
              onChange={(e) => handleBusinessChange("name", e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Region
            </label>
            <input
              type="text"
              value={config.business?.region || ""}
              onChange={(e) => handleBusinessChange("region", e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Currency
            </label>
            <input
              type="text"
              value={config.business?.currency || ""}
              onChange={(e) => handleBusinessChange("currency", e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Modifiers</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Waste Factor (decimal)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.modifiers?.waste_factor ?? 0.1}
              onChange={(e) =>
                handleModifierChange("waste_factor", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Permit Flat Fee (₹)
            </label>
            <input
              type="number"
              value={config.modifiers?.permit_flat_fee ?? 350}
              onChange={(e) =>
                handleModifierChange("permit_flat_fee", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Range Spread (%)
            </label>
            <input
              type="number"
              value={config.modifiers?.range_spread_pct ?? 12}
              onChange={(e) =>
                handleModifierChange("range_spread_pct", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Questions</h3>
        <div className="space-y-6">
          {config.questions?.map((question, qIndex) => (
            <div
              key={question.key}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-mono text-slate-500">
                      {question.key}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                      {question.type}
                    </span>
                    {question.unit && (
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                        {question.unit}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Label
                    </label>
                    <input
                      type="text"
                      value={question.label}
                      onChange={(e) =>
                        handleQuestionLabelChange(qIndex, e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  {question.type === "number" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Min
                        </label>
                        <input
                          type="number"
                          value={question.min ?? ""}
                          readOnly
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Max
                        </label>
                        <input
                          type="number"
                          value={question.max ?? ""}
                          readOnly
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-500"
                        />
                      </div>
                    </div>
                  )}

                  {question.type === "select" && question.options?.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Options
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={option.value}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 p-3"
                          >
                            <span className="w-20 shrink-0 text-xs font-mono text-slate-500">
                              {option.value}
                            </span>
                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) =>
                                handleOptionChange(
                                  qIndex,
                                  oIndex,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-orange-500"
                            />
                            {option.rate_per_sqft !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-500">
                                  ₹/sqft
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={option.rate_per_sqft}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      qIndex,
                                      oIndex,
                                      "rate_per_sqft",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-orange-500"
                                />
                              </div>
                            )}
                            {option.multiplier !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-500">
                                  mult
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={option.multiplier}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      qIndex,
                                      oIndex,
                                      "multiplier",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-orange-500"
                                />
                              </div>
                            )}
                            {option.tear_off_per_sqft !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-500">
                                  tear/sqft
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={option.tear_off_per_sqft}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      qIndex,
                                      oIndex,
                                      "tear_off_per_sqft",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-orange-500"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm text-slate-500">
                    {question.active ? "Active" : "Inactive"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuestionToggle(qIndex)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      question.active ? "bg-orange-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                        question.active ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ConfigEditor;
