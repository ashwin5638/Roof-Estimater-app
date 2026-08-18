import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConfig, calculateEstimate } from "../services/api";

const EstimatorContext = createContext(null);

const CONTACT_FIELDS = [
  { label: "Full Name", field: "name", type: "text", placeholder: "John Smith" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "(555) 123-4567" },
  { label: "Email", field: "email", type: "email", placeholder: "john@example.com" },
];


export const useEstimator = () => {
  const context = useContext(EstimatorContext);
  if (!context) {
    throw new Error("useEstimator must be used within an EstimatorProvider");
  }
  return context;
};

export const EstimatorProvider = ({ children }) => {
  const navigate = useNavigate();

  const [config, setConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [estimateResult, setEstimateResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getConfig();
        setConfig(data);
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("Unable to load estimator.");
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const totalSteps = questions.length + 1;
  const isContactStep = currentStep === questions.length;

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleContactChange = (field) => (e) => {
    setContact((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const canProceed = () => {
    if (isContactStep) {
      return contact.name && contact.phone && contact.email;
    }

    const question = questions[currentStep];
    if (!question) return false;

    if (question.type === "number") {
      const val = answers[question.key];
      return val >= (question.min || 0) && val <= (question.max || Infinity);
    }

    if (question.type === "select") {
      return !!answers[question.key];
    }

    return false;
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const goNext = async () => {
    if (!canProceed()) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setSubmitting(true);
    try {
      const result = await calculateEstimate({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        answers,
      });

      setEstimateResult(result);
      navigate("/estimate/result");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to calculate estimate.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const resetEstimator = () => {
    setCurrentStep(0);
    setAnswers({});
    setContact({ name: "", phone: "", email: "" });
    setEstimateResult(null);
    setError("");
  };

  const value = {
    config,
    questions,
    currentStep,
    answers,
    contact,
    contactFields: CONTACT_FIELDS,
    estimateResult,
    loading,
    submitting,
    error,
    totalSteps,
    isContactStep,
    handleChange,
    handleContactChange,
    canProceed,
    goBack,
    goNext,
    resetEstimator,
    setError,
  };

  return (
    <EstimatorContext.Provider value={value}>
      {children}
    </EstimatorContext.Provider>
  );
};
