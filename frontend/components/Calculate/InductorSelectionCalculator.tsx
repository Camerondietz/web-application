import { useState } from "react";

export default function InductorSelectionCalculator() {
  const [inductance, setInductance] = useState<number | "">("");
  const [frequency, setFrequency] = useState<number | "">("");
  const [unit, setUnit] = useState<"H" | "mH" | "uH">("uH");
  const [reactance, setReactance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateInductiveReactance = () => {
    try {
      if (inductance === "" || frequency === "") {
        throw new Error("Please enter both inductance and frequency.");
      }

      let inductanceHenries: number;

      switch (unit) {
        case "H":
          inductanceHenries = inductance;
          break;
        case "mH":
          inductanceHenries = inductance * 1e-3;
          break;
        case "uH":
          inductanceHenries = inductance * 1e-6;
          break;
        default:
          throw new Error("Invalid unit.");
      }

      if (inductanceHenries <= 0 || frequency <= 0) {
        throw new Error("Values must be greater than zero.");
      }

      const xl = 2 * Math.PI * frequency * inductanceHenries;
      setReactance(`${xl.toFixed(3)} Ω`);
      setError(null);
    } catch (err: any) {
      setReactance(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Inductor Selection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Inductance"
            value={inductance}
            onChange={(e) => setInductance(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded w-full"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "H" | "mH" | "uH")}
            className="ml-2 p-2 border rounded"
          >
            <option value="H">H</option>
            <option value="mH">mH</option>
            <option value="uH">µH</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Frequency (Hz)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={calculateInductiveReactance}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {reactance && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Inductive Reactance (Xₗ): {reactance}
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
