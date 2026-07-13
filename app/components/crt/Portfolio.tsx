"use client";

import { VT323 } from "next/font/google";
import CrtTerminal from "./Terminal";

/*
 * Full-screen retro CRT terminal — the amber-phosphor terminal fills the
 * entire viewport (no monitor bezel).
 */

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-vt323",
    display: "swap",
});

export default function CrtPortfolio() {
    return (
        <div
            className={vt323.variable}
            style={{
                position: "fixed",
                inset: 0,
                background: "#0a0a0c",
                overflow: "hidden",
                fontFamily: "var(--font-vt323), monospace",
            }}
        >
            <CrtTerminal phosphor="amber" />
        </div>
    );
}
