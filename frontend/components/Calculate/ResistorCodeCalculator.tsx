import { useState } from "react";

const colorCodes = [
  { color: "Black", value: 0, multiplier: 1 },
  { color: "Brown", value: 1, multiplier: 10 },
  { color: "Red", value: 2, multiplier: 100 },
  { color: "Orange", value: 3, multiplier: 1_000 },
  { color: "Yellow", value: 4, multiplier: 10_000 },
  { color: "Green", value: 5, multiplier: 100_000 },
  { color: "Blue", value: 6, multiplier: 1_000_000 },
  { color: "Violet", value: 7, multiplier: 10_000_000 },
  { color: "Gray", value: 8, multiplier: 100_000_000 },
  { color: "White", value: 9, multiplier: 1_000_000_000 },
];

const multiplierCodes = [
  ...colorCodes,
  { color: "Gold", multiplier: 0.1 },
  { color: "Silver", multiplier: 0.01 },
];

const toleranceCodes = [
  { color: "Brown", tolerance: "±1%" },
  { color: "Red", tolerance: "±2%" },
  { color: "Gold", tolerance: "±5%" },
  { color: "Silver", tolerance: "±10%" },
];

export default function ResistorColorCodeCalculator() {
  const [band1, setBand1] = useState("");
  const [band2, setBand2] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateResistance = () => {
    try {
      if (!band1 || !band2 || !multiplier || !tolerance) {
        throw new Error("Please select all four bands.");
      }

      const sig1 = colorCodes.find(c => c.color === band1)?.value;
      const sig2 = colorCodes.find(c => c.color === band2)?.value;
      const mult = multiplierCodes.find(c => c.color === multiplier)?.multiplier;
      const tol = toleranceCodes.find(c => c.color === tolerance)?.tolerance;

      if (sig1 == null || sig2 == null || mult == null || !tol) {
        throw new Error("Invalid color selection.");
      }

      const resistance = ((sig1 * 10) + sig2) * mult;
      const display = resistance >= 1e6
        ? `${resistance / 1e6} MΩ`
        : resistance >= 1e3
        ? `${resistance / 1e3} kΩ`
        : `${resistance} Ω`;

      setResult(`${display} ${tol}`);
      setError(null);
    } catch (err: any) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Resistor Color Code Calculator</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {[["Band 1", band1, setBand1], ["Band 2", band2, setBand2]].map(
          ([label, val, setter]: any) => (
            <div key={label}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <select
                value={val}
                onChange={(e) => setter(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="">--</option>
                {colorCodes.map(c => (
                  <option key={c.color} value={c.color}>{c.color}</option>
                ))}
              </select>
            </div>
          )
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Multiplier</label>
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">--</option>
            {multiplierCodes.map(c => (
              <option key={c.color} value={c.color}>{c.color}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Tolerance</label>
          <select
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">--</option>
            {toleranceCodes.map(c => (
              <option key={c.color} value={c.color}>{c.color}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={calculateResistance}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Resistance: {result}
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
