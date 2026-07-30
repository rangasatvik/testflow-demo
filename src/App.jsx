import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  GraduationCap,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  ShieldQuestion,
  X,
} from "lucide-react";
import { trackEvent } from "./analytics.js";

const ASSESSMENT_AREAS = [
  {
    id: "identity",
    title: "Identity & access",
    description: "User accounts, MFA, privileged access, and joiner/mover/leaver hygiene.",
    questions: [
      "MFA is required for email, admin consoles, source control, finance, and customer-data systems.",
      "Admin accounts are separate from day-to-day accounts and reviewed at least quarterly.",
      "Access removal is part of employee and contractor offboarding.",
    ],
  },
  {
    id: "devices",
    title: "Devices & endpoints",
    description: "Laptop security, patching, malware defense, and device recovery readiness.",
    questions: [
      "Company devices use full-disk encryption and automatic screen locking.",
      "Operating systems, browsers, and business-critical apps are patched within 14 days.",
      "Lost or stolen devices can be remotely locked or wiped.",
    ],
  },
  {
    id: "data",
    title: "Data protection",
    description: "Customer records, backups, retention, and secure sharing.",
    questions: [
      "Sensitive files are stored in approved systems instead of personal drives or inboxes.",
      "Critical data is backed up automatically and restore tests are performed periodically.",
      "Data shared with vendors has an owner, purpose, and retention expectation.",
    ],
  },
  {
    id: "response",
    title: "Incident readiness",
    description: "Reporting paths, triage ownership, and recovery practices.",
    questions: [
      "Employees know how to report phishing, suspicious logins, and lost devices.",
      "There is a named owner for security incidents and customer-impact decisions.",
      "Security events are logged for core business systems and reviewed when alerts occur.",
    ],
  },
];

const TRAINING_MODULES = [
  {
    title: "Phishing triage",
    duration: "12 min",
    level: "Foundational",
    outcomes: ["Spot suspicious links", "Verify sender intent", "Report without forwarding"],
  },
  {
    title: "Password & MFA habits",
    duration: "10 min",
    level: "Foundational",
    outcomes: ["Use password managers", "Avoid code sharing", "Recover account access"],
  },
  {
    title: "Customer data handling",
    duration: "15 min",
    level: "Role based",
    outcomes: ["Classify sensitive data", "Share securely", "Reduce retention risk"],
  },
  {
    title: "Incident first response",
    duration: "18 min",
    level: "Manager",
    outcomes: ["Preserve evidence", "Escalate cleanly", "Coordinate communications"],
  },
];

const BEST_PRACTICES = [
  "Require MFA everywhere accounts can access customer, financial, or production data.",
  "Maintain an asset inventory for laptops, SaaS tools, domains, repositories, and vendors.",
  "Patch browsers, operating systems, and internet-facing systems on a defined cadence.",
  "Keep backups isolated from normal user accounts and test restores before an emergency.",
  "Document incident roles, severity levels, customer notice triggers, and legal contacts.",
  "Review vendor access and data sharing at renewal time and when business owners change.",
];

function initialAnswers() {
  return ASSESSMENT_AREAS.reduce((acc, area) => {
    area.questions.forEach((_, index) => {
      acc[`${area.id}-${index}`] = "unknown";
    });
    return acc;
  }, {});
}

function App() {
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = window.localStorage.getItem("security-assessment-answers");
      return saved ? JSON.parse(saved) : initialAnswers();
    } catch {
      return initialAnswers();
    }
  });
  const [isDemoModalOpen, setDemoModalOpen] = useState(false);
  const [demoRequestSent, setDemoRequestSent] = useState(false);

  useEffect(() => {
    trackEvent("website_visit", { path: window.location.pathname });
  }, []);

  function submitDemoRequest(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    trackEvent("demo_request", {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
    });
    setDemoRequestSent(true);
  }

  function closeDemoModal() {
    setDemoModalOpen(false);
    setDemoRequestSent(false);
  }

  const result = useMemo(() => {
    const values = Object.values(answers);
    const yes = values.filter((value) => value === "yes").length;
    const partial = values.filter((value) => value === "partial").length;
    const total = values.length;
    const score = Math.round(((yes + partial * 0.5) / total) * 100);
    const gaps = ASSESSMENT_AREAS.map((area) => {
      const areaAnswers = area.questions.map((_, index) => answers[`${area.id}-${index}`]);
      const areaScore = areaAnswers.reduce((sum, value) => {
        if (value === "yes") return sum + 1;
        if (value === "partial") return sum + 0.5;
        return sum;
      }, 0);
      return {
        ...area,
        score: Math.round((areaScore / area.questions.length) * 100),
        open: area.questions.filter((_, index) => answers[`${area.id}-${index}`] !== "yes"),
      };
    }).sort((a, b) => a.score - b.score);

    const readiness =
      score >= 85 ? "Strong baseline" : score >= 65 ? "Needs targeted work" : "High exposure";

    return { score, readiness, gaps };
  }, [answers]);

  function updateAnswer(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    window.localStorage.setItem("security-assessment-answers", JSON.stringify(next));
  }

  function resetAssessment() {
    const next = initialAnswers();
    setAnswers(next);
    window.localStorage.setItem("security-assessment-answers", JSON.stringify(next));
  }

  function downloadReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      score: result.score,
      readiness: result.readiness,
      priorityGaps: result.gaps.slice(0, 3).map((gap) => ({
        area: gap.title,
        score: gap.score,
        openItems: gap.open,
      })),
      recommendedTraining: TRAINING_MODULES.map((module) => module.title),
      bestPractices: BEST_PRACTICES,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "security-assessment-report.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const topGaps = result.gaps.slice(0, 3);

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <ShieldCheck size={18} />
            Security readiness MVP
          </div>
          <h1>Automated security assessment workspace</h1>
          <p>
            Run a practical baseline check, identify the highest-risk gaps, assign starter
            training, and export a lightweight action report.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={downloadReport}>
              <Download size={18} />
              Export report
            </button>
            <button className="secondary-button" onClick={() => setDemoModalOpen(true)}>
              <CalendarClock size={18} />
              Request a demo
            </button>
            <button className="icon-button" onClick={resetAssessment} aria-label="Reset assessment">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
        <div className="score-panel" aria-label="Security readiness score">
          <div className="score-ring" style={{ "--score": `${result.score}%` }}>
            <span>{result.score}</span>
          </div>
          <div>
            <strong>{result.readiness}</strong>
            <p>{topGaps[0]?.title} is the current priority area.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-grid" aria-label="Security assessment dashboard">
        <div className="assessment-panel">
          <div className="section-heading">
            <ClipboardCheck size={22} />
            <div>
              <h2>Assessment</h2>
              <p>Answer each control to calculate readiness and prioritize remediation.</p>
            </div>
          </div>

          <div className="assessment-list">
            {ASSESSMENT_AREAS.map((area) => (
              <article className="area" key={area.id}>
                <div className="area-header">
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                  <span>{result.gaps.find((gap) => gap.id === area.id)?.score}%</span>
                </div>
                {area.questions.map((question, index) => {
                  const key = `${area.id}-${index}`;
                  return (
                    <div className="question-row" key={question}>
                      <p>{question}</p>
                      <div className="segmented" aria-label={`Answer for ${question}`}>
                        {[
                          ["yes", "Yes"],
                          ["partial", "Partial"],
                          ["unknown", "No"],
                        ].map(([value, label]) => (
                          <button
                            className={answers[key] === value ? "active" : ""}
                            key={value}
                            onClick={() => updateAnswer(key, value)}
                            type="button"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </div>

        <aside className="insights-panel">
          <div className="section-heading">
            <AlertTriangle size={22} />
            <div>
              <h2>Priority gaps</h2>
              <p>Start here to reduce the largest exposed surface.</p>
            </div>
          </div>
          <div className="gap-list">
            {topGaps.map((gap) => (
              <article className="gap-card" key={gap.id}>
                <div>
                  <h3>{gap.title}</h3>
                  <span>{gap.score}% ready</span>
                </div>
                <ul>
                  {gap.open.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="learning-band">
        <div className="section-heading">
          <GraduationCap size={22} />
          <div>
            <h2>Training modules</h2>
            <p>Starter curriculum for broad security awareness and role-specific response.</p>
          </div>
        </div>
        <div className="module-grid">
          {TRAINING_MODULES.map((module) => (
            <article className="module-card" key={module.title}>
              <BookOpenCheck size={24} />
              <div>
                <h3>{module.title}</h3>
                <p>{module.level} · {module.duration}</p>
              </div>
              <ul>
                {module.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <CheckCircle2 size={16} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-band">
        <div className="section-heading">
          <FileText size={22} />
          <div>
            <h2>Best practices documentation</h2>
            <p>Baseline guidance teams can turn into policies, checklists, and onboarding docs.</p>
          </div>
        </div>
        <div className="docs-layout">
          <div className="doc-callout">
            <LockKeyhole size={28} />
            <h3>Minimum viable security program</h3>
            <p>
              The MVP focuses on controls that are low-friction, auditable, and useful before a
              company invests in a full GRC platform.
            </p>
          </div>
          <ol className="practice-list">
            {BEST_PRACTICES.map((practice) => (
              <li key={practice}>
                <ShieldQuestion size={18} />
                <span>{practice}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {isDemoModalOpen && (
        <div className="modal-overlay" role="presentation" onClick={closeDemoModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Request a demo"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="icon-button modal-close" onClick={closeDemoModal} aria-label="Close">
              <X size={18} />
            </button>
            {demoRequestSent ? (
              <div className="modal-confirmation">
                <CheckCircle2 size={28} />
                <h3>Thanks — we'll be in touch</h3>
                <p>A team member will reach out to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={submitDemoRequest}>
                <h3>Request a demo</h3>
                <p>Tell us where to reach you and we'll set up time to walk through the platform.</p>
                <label>
                  Name
                  <input name="name" type="text" required />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" required />
                </label>
                <label>
                  Company
                  <input name="company" type="text" />
                </label>
                <button className="primary-button" type="submit">
                  Send request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
