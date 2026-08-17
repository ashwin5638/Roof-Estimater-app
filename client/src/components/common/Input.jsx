import { useEstimator } from "../../context/EstimatorContext";

const Input = () => {
  const { contact, contactFields, handleContactChange } = useEstimator();

  return (
    <div className="space-y-4">
      {contactFields.map(({ label, field, type, placeholder }) => (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            {label} <span className="text-red-500">*</span>
          </label>
          <input
            type={type}
            value={contact[field] || ""}
            onChange={handleContactChange(field)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
          />
        </div>
      ))}
    </div>
  );
};

export default Input;
