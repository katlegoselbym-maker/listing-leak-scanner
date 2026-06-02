import { useState, useEffect, useRef } from "react";

const C = {
  ink: "#0A0A0A",
  bone: "#F5F2EC",
  blue: "#0055FF",
  red: "#C0392B",
  muted: "#6B6B6B",
  border: "#D8D4CC",
  white: "#FFFFFF",
  surface: "#FAFAF8",
  darkBorder: "#222222",
  gold: "#C9A84C",
};

const SCAN_STEPS = [
  "INITIALIZING LINGUISTIC FRICTION SCAN...",
  "PARSING COPY ARCHITECTURE...",
  "ISOLATING CONVERSION KILLERS...",
  "RUNNING BUYER PSYCHOLOGY ANALYSIS...",
  "GENERATING FORENSIC VERDICT...",
];

const LOCKED = [
  "5-Layer full forensic diagnosis",
  "72-hour republishing protocol",
  "3 alternative opening hooks",
  "Buyer psychology decoder",
  "Neighborhood emotional rewrite",
  "Silent killer count — all 4 layers",
];

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const sans = { fontFamily: "'DM Sans', sans-serif" };

export default function App() {
  const [listing, setListing] = useState("");
  const [phase, setPhase] = useState("input");
  const [scanStep, setScanStep] = useState(0);
  const [scanPct, setScanPct] = useState(0);
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { background: #F5F2EC; }
      textarea:focus { border-color: #0055FF !important; outline: none; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes scanline { 0%{top:0;opacity:0} 50%{opacity:1} 100%{top:100%;opacity:0} }
      .blink { animation: blink 1.5s ease-in-out infinite; }
      .fade-up { animation: fadeUp 0.45s ease forwards; }
      .scanline { position:absolute;left:0;width:100%;height:2px;background:#0055FF;animation:scanline 2s linear infinite; }
      button:not(:disabled):hover { opacity: 0.85; }
      a:hover { opacity: 0.85; }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (phase === "scanning") {
      let pct = 0,
        step = 0;
      timerRef.current = setInterval(() => {
        pct = Math.min(pct + 3.5, 90);
        setScanPct(pct);
        if (pct > 20 && step === 0) { step = 1; setScanStep(1); }
        if (pct > 40 && step === 1) { step = 2; setScanStep(2); }
        if (pct > 60 && step === 2) { step = 3; setScanStep(3); }
        if (pct > 78 && step === 3) { step = 4; setScanStep(4); }
      }, 160);
      return () => clearInterval(timerRef.current);
    }
  }, [phase]);

  const runScan = async () => {
    if (listing.trim().length < 60) return;
    setPhase("scanning");
    setScanStep(0);
    setScanPct(0);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
      });

      clearInterval(timerRef.current);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const parsed = await res.json();
      if (parsed.error) throw new Error(parsed.error);

      setScanPct(100);
      await new Promise((r) => setTimeout(r, 350));
      setResult(parsed);
      setPhase("result");
    } catch (err) {
      clearInterval(timerRef.current);
      setErrMsg("Scan failed. Paste more of your listing and try again.");
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("input");
    setListing("");
    setResult(null);
    setErrMsg("");
    setScanStep(0);
    setScanPct(0);
  };

  return (
    <div style={{ ...sans, minHeight: "100vh", background: C.bone, color: C.ink }}>

      {/* HEADER */}
      <header style={{ background: C.ink, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ ...mono, fontSize: "11px", letterSpacing: "0.22em", color: C.white, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: C.blue, fontSize: "18px", lineHeight: 1 }}>⬡</span>
          LISTING LEAK SCANNER
        </div>
        <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.2em", color: C.blue, border: `1px solid ${C.blue}`, padding: "3px 10px", textTransform: "uppercase" }}>
          Free Diagnostic
        </div>
      </header>

      {/* HERO */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "64px 24px 40px", textAlign: "center" }}>
        <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.28em", color: C.blue, textTransform: "uppercase", marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
          <span style={{ height: "1px", width: "36px", background: C.blue, display: "inline-block" }} />
          Forensic Copy Analysis
          <span style={{ height: "1px", width: "36px", background: C.blue, display: "inline-block" }} />
        </div>
        <h1 style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: "18px" }}>
          Your listing is not{" "}
          <span style={{ color: C.blue }}>slow.</span>
          <br />
          It is saying the{" "}
          <span style={{ color: C.red }}>wrong thing.</span>
        </h1>
        <p style={{ fontSize: "16px", lineHeight: 1.7, color: C.muted, maxWidth: "520px", margin: "0 auto 36px" }}>
          Paste your listing. This scanner reads it the way a buyer reads it at 10pm after scrolling 40 others. It finds the one word doing the most damage and tells you exactly why.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "28px", marginBottom: "48px", flexWrap: "wrap" }}>
          {[
            ["91%", "of stale listings share the same 3 failures"],
            ["14", "words is the avg change that restores conversion"],
            ["72h", "algorithm window after copy update"],
          ].map(([num, label], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              {i > 0 && <div style={{ width: "1px", height: "32px", background: C.border }} />}
              <div style={{ textAlign: "center" }}>
                <span style={{ ...mono, fontSize: "26px", fontWeight: 700, letterSpacing: "-0.04em", display: "block" }}>{num}</span>
                <span style={{ ...mono, fontSize: "9px", letterSpacing: "0.15em", color: C.muted, textTransform: "uppercase", display: "block", marginTop: "2px", maxWidth: "120px" }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT */}
      {phase === "input" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 72px" }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", borderBottom: `1px solid ${C.border}`, background: C.surface }}>
              <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: C.muted, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }} className="blink" />
                Forensic Input Terminal
              </div>
              <div style={{ ...mono, fontSize: "9px", color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Free · No Account Needed</div>
            </div>
            <div style={{ padding: "22px" }}>
              <textarea
                value={listing}
                onChange={(e) => setListing(e.target.value)}
                placeholder="Paste your listing description here. The more you paste, the more precise the diagnosis."
                style={{ width: "100%", minHeight: "170px", border: `1px solid ${C.border}`, padding: "14px 16px", ...sans, fontSize: "15px", lineHeight: 1.6, color: C.ink, background: C.surface, resize: "vertical" }}
              />
              <div style={{ ...mono, fontSize: "9px", color: C.muted, textAlign: "right", marginTop: "6px", letterSpacing: "0.1em" }}>
                {listing.length} characters
              </div>
              <button
                onClick={runScan}
                disabled={listing.trim().length < 60}
                style={{ width: "100%", marginTop: "14px", padding: "17px 28px", background: listing.trim().length < 60 ? C.border : C.ink, color: C.white, border: "none", ...mono, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: listing.trim().length < 60 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background 0.2s" }}
              >
                <span>⬡</span> RUN LEAK SCAN — FREE
              </button>
              <div style={{ ...mono, fontSize: "9px", color: C.muted, textAlign: "center", marginTop: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Results in under 10 seconds · No email required
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCANNING */}
      {phase === "scanning" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 72px" }} className="fade-up">
          <div style={{ background: C.ink, border: `1px solid ${C.darkBorder}`, padding: "52px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div className="scanline" />
            <div style={{ ...mono, fontSize: "11px", letterSpacing: "0.28em", color: C.blue, textTransform: "uppercase", marginBottom: "28px" }} className="blink">
              Forensic Scan In Progress
            </div>
            <div style={{ height: "2px", background: "#1A1A1A", borderRadius: "1px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.blue}, #00AAFF)`, width: `${scanPct}%`, transition: "width 0.25s ease" }} />
            </div>
            <div style={{ ...mono, fontSize: "10px", color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
              {SCAN_STEPS[scanStep]}
            </div>
            <div style={{ ...mono, fontSize: "36px", fontWeight: 700, color: C.blue, letterSpacing: "0.05em" }}>
              {Math.round(scanPct)}%
            </div>
          </div>
        </div>
      )}

      {/* ERROR */}
      {phase === "error" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 72px" }} className="fade-up">
          <div style={{ background: "#FFF5F5", border: "1px solid #FECACA", padding: "20px 24px", marginBottom: "14px" }}>
            <div style={{ ...mono, fontSize: "12px", color: C.red, letterSpacing: "0.05em" }}>{errMsg}</div>
          </div>
          <button onClick={reset} style={{ width: "100%", padding: "12px", background: "transparent", border: `1px solid ${C.border}`, ...mono, fontSize: "10px", letterSpacing: "0.18em", color: C.muted, textTransform: "uppercase", cursor: "pointer" }}>
            Try Again
          </button>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && result && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 72px" }} className="fade-up">
          <div style={{ background: C.red, padding: "12px 22px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", color: C.white }}>⚠</span>
            <span style={{ ...mono, fontSize: "10px", letterSpacing: "0.18em", color: C.white, textTransform: "uppercase", fontWeight: 700 }}>
              Conversion Killer Detected — Damage Level: Critical
            </span>
          </div>

          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: "none", padding: "28px" }}>
            {/* The phrase */}
            <div style={{ background: C.bone, border: `1px solid #FECACA`, borderLeft: `4px solid ${C.red}`, padding: "18px 22px", marginBottom: "26px" }}>
              <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: C.red, textTransform: "uppercase", marginBottom: "8px" }}>
                Primary Forensic Liability — {result.damageType}
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", color: C.ink, textDecoration: "line-through", textDecorationColor: C.red }}>
                "{result.phrase}"
              </div>
            </div>

            {/* Diagnosis */}
            <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: C.muted, textTransform: "uppercase", marginBottom: "10px" }}>
              Clinical Diagnosis
            </div>
            <div style={{ fontSize: "15px", lineHeight: 1.75, color: C.ink, marginBottom: "28px" }}>
              {result.diagnosis}
            </div>

            {/* THE WALL */}
            <div style={{ background: C.ink, padding: "28px" }}>
              <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: "12px" }}>
                Full Diagnosis Locked — 72-Hour Listing Autopsy
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", color: C.white, lineHeight: 1.2, marginBottom: "12px" }}>
                This is one of four silent killers buried in your listing.
              </div>
              <div style={{ fontSize: "14px", lineHeight: 1.7, color: "#777", marginBottom: "22px" }}>
                The full forensic toolkit runs a 5-layer scan, names every friction point, rewrites the highest-damage sections, and gives you a 72-hour republishing protocol. The scanner found the surface wound. The Autopsy finds where the bleeding actually starts.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
                {LOCKED.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", ...mono, fontSize: "10px", color: "#555", letterSpacing: "0.08em" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#1A1A1A", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: 0 }}>
                      🔒
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href="https://payhip.com/b/Og6Pd"
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", width: "100%", padding: "17px 28px", background: C.blue, color: C.white, border: "none", ...mono, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", textAlign: "center", textDecoration: "none", marginBottom: "10px", boxSizing: "border-box" }}
              >
                GET THE FULL AUTOPSY — $37
              </a>
              <div style={{ ...mono, fontSize: "9px", color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center" }}>
                One payment · Lifetime access · 30-day refund guarantee
              </div>
            </div>
          </div>

          <button onClick={reset} style={{ marginTop: "18px", width: "100%", padding: "12px", background: "transparent", border: `1px solid ${C.border}`, ...mono, fontSize: "10px", letterSpacing: "0.18em", color: C.muted, textTransform: "uppercase", cursor: "pointer" }}>
            Scan A Different Listing
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", background: C.white }}>
        <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.18em", color: C.muted, textTransform: "uppercase" }}>
          LISTING LEAK SCANNER // BLUECHEESE SYSTEMS 2026
        </div>
        <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase" }}>
          Powered by the 72-Hour Listing Autopsy Methodology
        </div>
      </footer>
    </div>
  );
  }
    
