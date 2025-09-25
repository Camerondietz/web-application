"use client";
import { useState } from "react";

import ResistorColorCodeCalculator from "@/components/Calculate/ResistorCodeCalculator"; // adjust path as needed
import VoltageDividerCalculator from "@/components/Calculate/VoltageDividerCalculator";
import CapacitorValueCalculator from "@/components/Calculate/CapacitorValueCalculator";
import InductorSelectionCalculator from "@/components/Calculate/InductorSelectionCalculator";
import PowerDissipationCalculator from "@/components/Calculate/PowerDissipationCalculator";
import WireGaugeSelector from "@/components/Calculate/WireGaugeSelector";
import ThermalResistanceCalculator from "@/components/Calculate/ThermalResistanceCalculator";
import FrequencyCalculator from "@/components/Calculate/FrequencyCalculator";


export default function CalculatePage() {
  // Ohm's Law states: V = IR
  const [voltage, setVoltage] = useState<number | "">("");
  const [current, setCurrent] = useState<number | "">("");
  const [resistance, setResistance] = useState<number | "">("");

  const calculateOhmsLaw = () => {
    if (voltage === "" && current !== "" && resistance !== "") {
      setVoltage(current * resistance);
    } else if (current === "" && voltage !== "" && resistance !== "") {
      setCurrent(voltage / resistance);
    } else if (resistance === "" && voltage !== "" && current !== "") {
      setResistance(voltage / current);
    }
  };


  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Engineering Calculators</h1>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
        Use these tools to simplify calculations and select the right components for your projects.
      </p>

      {/* Ohm's Law Calculator */}
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Ohm’s Law Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Voltage (V)"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Current (A)"
            value={current}
            onChange={(e) => setCurrent(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Resistance (Ω)"
            value={resistance}
            onChange={(e) => setResistance(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          onClick={calculateOhmsLaw}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>
        <p>Ohm's Law states: V = IR</p>
      </div>

      {/* Placeholder for additional calculators */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <ResistorColorCodeCalculator />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <VoltageDividerCalculator />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <CapacitorValueCalculator />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <InductorSelectionCalculator />
        </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <PowerDissipationCalculator />
        </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <WireGaugeSelector />
        </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <ThermalResistanceCalculator />
        </div>

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <FrequencyCalculator />
        </div>
    </div>
  );
}



/*As a Route
"use client";
import Link from "next/link";

export default function CalculatePage() {
  const tools = [
    { title: "Ohm’s Law Calculator", path: "/calculate/ohms-law" },
    { title: "Resistor Color Code", path: "/calculate/resistor-color" },
    { title: "Voltage Divider", path: "/calculate/voltage-divider" },
    { title: "Capacitor Value Calculator", path: "/calculate/capacitor-value" },
    { title: "Inductor Selection", path: "/calculate/inductor-selection" },
    { title: "Power Dissipation", path: "/calculate/power-dissipation" },
    { title: "Wire Gauge Selector", path: "/calculate/wire-gauge" },
    { title: "Thermal Resistance", path: "/calculate/thermal-resistance" },
    { title: "Frequency Calculator", path: "/calculate/frequency" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Engineering Calculators</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Use these tools to simplify calculations and select the right components for your projects.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="block p-4 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center"
          >
            <span className="text-xl font-semibold text-blue-600">{tool.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
*/