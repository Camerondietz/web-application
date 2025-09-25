// app/learn/si-units/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "International System of Units (SI) – Base & Supplementary Units",
  description:
    "Reference guide to the International System of Units (SI), including base units, supplementary units, and their definitions for length, mass, time, current, temperature, substance, luminance, and angles.",
  keywords: [
    "SI Units",
    "International System of Units",
    "Base Units",
    "Supplementary Units",
    "Meter",
    "Kilogram",
    "Second",
    "Ampere",
    "Kelvin",
    "Mole",
    "Candela",
    "Radian",
    "Steradian",
  ],
};

export default function SIUnitsPage() {
  return (
    <main className="prose lg:prose-xl dark:prose-invert mx-auto p-6">
      <h1>International System of Units (SI) &amp; Usage</h1>

      <section>
        <h2>1. Scope of Application</h2>
        <p>
          This standard specifies how to use the International System of Units
          (SI) and other international unitary systems, as well as units used in
          correlation with units from international systems, and other units
          which may be used.
        </p>
      </section>

      <section>
        <h2>2. Terms and Definitions</h2>
        <ul>
          <li>
            <strong>International System of Units (SI):</strong> Coherent system
            of units adopted and recommended by the International Committee on
            Weights and Measures.
          </li>
          <li>
            <strong>SI Unit:</strong> Generic term used to describe base units,
            supplementary units, or derived units of SI.
          </li>
          <li>
            <strong>Base Unit:</strong> Defined in Table 1.
          </li>
          <li>
            <strong>Supplementary Units:</strong> Defined in Table 2.
          </li>
        </ul>
      </section>

      <section>
        <h2>Table 1. Base Units</h2>
        <table>
          <thead>
            <tr>
              <th>Base Quantity</th>
              <th>Unit</th>
              <th>Symbol</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Length</td>
              <td>Meter</td>
              <td>m</td>
              <td>
                The length of the path traveled by light in a vacuum during a
                time interval of 1/299,792,458 of a second.
              </td>
            </tr>
            <tr>
              <td>Mass</td>
              <td>Kilogram</td>
              <td>kg</td>
              <td>
                Equal to the mass of the international prototype of the
                kilogram.
              </td>
            </tr>
            <tr>
              <td>Time</td>
              <td>Second</td>
              <td>s</td>
              <td>
                Duration of 9,192,631,770 periods of radiation corresponding to
                the transition between two hyperfine levels of the ground state
                of the cesium-133 atom.
              </td>
            </tr>
            <tr>
              <td>Current</td>
              <td>Ampere</td>
              <td>A</td>
              <td>
                Constant current which, if maintained in two straight parallel
                conductors of infinite length and negligible cross-section in a
                vacuum, produces a force of 2×10<sup>-7</sup> newton per meter
                of length.
              </td>
            </tr>
            <tr>
              <td>Thermodynamic Temperature</td>
              <td>Kelvin</td>
              <td>K</td>
              <td>
                Fraction 1/273.16 of the thermodynamic temperature of the triple
                point of water.
              </td>
            </tr>
            <tr>
              <td>Amount of Substance</td>
              <td>Mole</td>
              <td>mol</td>
              <td>
                Amount of substance of a system containing as many elementary
                entities as there are atoms in 0.012 kilograms of carbon-12.
              </td>
            </tr>
            <tr>
              <td>Luminance Intensity</td>
              <td>Candela</td>
              <td>cd</td>
              <td>
                Luminous intensity, in a given direction, of a source that emits
                monochromatic radiation at a frequency of 540×10<sup>12</sup>{" "}
                Hz, with radiant intensity of 1/683 watt per steradian.
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm italic">
          Note: The elementary particles here may be atoms, molecules, ions,
          electrons, or other particles.
        </p>
      </section>

      <section>
        <h2>Table 2. Supplementary Units</h2>
        <table>
          <thead>
            <tr>
              <th>Base Quantity</th>
              <th>Unit</th>
              <th>Symbol</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plane Angle</td>
              <td>Radian</td>
              <td>rad</td>
              <td>
                Angle between two radii of a circle that cuts off an arc equal
                in length to the radius.
              </td>
            </tr>
            <tr>
              <td>Solid Angle</td>
              <td>Steradian</td>
              <td>sr</td>
              <td>
                Solid angle having its vertex in the center of a sphere, cutting
                off an area equal to that of a square with sides equal in length
                to the radius.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
