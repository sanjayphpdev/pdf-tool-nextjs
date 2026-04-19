import AnalyticsTracker from "@/components/AnalyticsTracker";
import Card from "@/components/Cards";
export default function HomePage({ children }) {
  return (
    <div className="container">
      <AnalyticsTracker />

      {/* HERO */}
      <div className="glass" style={{ padding: "40px", textAlign: "center" }}>
        <h1>All-in-One PDF Tools</h1>

        <p>
          Compress, Merge, Split, Convert and Protect PDFs instantly. No signup
          required.
        </p>
      </div>

      {/* TOOL GRID */}
      {children}
      <Card />

      {/* FEATURES */}
      <div className="glass" style={{ marginTop: "40px", padding: "30px" }}>
        <h2>Why Choose Us?</h2>

        <div className="grid" style={{ marginTop: "20px" }}>
          <div>⚡ Fast Processing</div>
          <div>🔒 Secure Files</div>
          <div>💯 Free</div>
          <div>📱 Mobile Friendly</div>
        </div>
      </div>
    </div>
  );
}
