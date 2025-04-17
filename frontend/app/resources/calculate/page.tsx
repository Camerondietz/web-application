"use client";
import { useState } from "react";

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
      <p className="text-lg text-center text-gray-600 mb-8">
        Use these tools to simplify calculations and select the right components for your projects.
      </p>

      {/* Ohm's Law Calculator */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
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
      </div>

      {/* Placeholder for additional calculators */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Resistor Color Code Calculator</h2>
        <p className="text-gray-600">[Future implementation: Select colors to get resistance value]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Voltage Divider Calculator</h2>
        <p className="text-gray-600">[Future implementation: Enter R1, R2, and input voltage]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Capacitor Value Calculator</h2>
        <p className="text-gray-600">[Future implementation: Enter capacitance, frequency, etc.]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Inductor Selection</h2>
        <p className="text-gray-600">[Future implementation: Enter inductance, frequency, etc.]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Power Dissipation Calculator</h2>
        <p className="text-gray-600">[Future implementation: Enter voltage, current, resistance]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Wire Gauge Selector</h2>
        <p className="text-gray-600">[Future implementation: Choose wire size based on current]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Thermal Resistance Calculator</h2>
        <p className="text-gray-600">[Future implementation: Calculate heat dissipation]</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Frequency Calculator</h2>
        <p className="text-gray-600">[Future implementation: Enter time period or wavelength]</p>
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
            className="block p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center"
          >
            <span className="text-xl font-semibold text-blue-600">{tool.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
*/