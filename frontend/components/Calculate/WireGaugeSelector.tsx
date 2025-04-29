import { useState } from "react";

// Simplified AWG table for copper conductors with max amps at 60°C (in free air or conduit)
const awgTable = [
  { gauge: 18, amps: 10 },
  { gauge: 16, amps: 13 },
  { gauge: 14, amps: 15 },
  { gauge: 12, amps: 20 },
  { gauge: 10, amps: 30 },
  { gauge: 8, amps: 40 },
  { gauge: 6, amps: 55 },
  { gauge: 4, amps: 70 },
  { gauge: 2, amps: 95 },
  { gauge: 1, amps: 110 },
  { gauge: 0, amps: 125 },
  { gauge: 0o0, amps: 145 },
  { gauge: 0o00, amps: 165 },
  { gauge: 0o000, amps: 195 }
];

export default function WireGaugeSelector() {
  const [current, setCurrent] = useState<number | "">("");
  const [recommendedGauge, setRecommendedGauge] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectWireGauge = () => {
    try {
      if (current === "" || current <= 0) {
        throw new Error("Please enter a valid current greater than 0.");
      }

      const match = awgTable.find((wire) => wire.amps >= current);

      if (!match) {
        throw new Error("Current too high — requires specialty wire.");
      }

      setRecommendedGauge(
        `AWG ${match.gauge} (Rated up to ${match.amps}A)`
      );
      setError(null);
    } catch (err: any) {
      setRecommendedGauge(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Wire Gauge Selector</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Required Current (A)"
          value={current}
          onChange={(e) => setCurrent(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full sm:w-1/2"
        />
      </div>

      <button
        onClick={selectWireGauge}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {recommendedGauge && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Recommended Wire Gauge: {recommendedGauge}
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
