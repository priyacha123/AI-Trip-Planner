import { useState } from "react";
import { Check } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="rounded-2xl border border-border bg-card shadow-sm p-10 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
              Get started
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Start your first trip
              <br />
              <i className="text-muted-foreground">for free.</i>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              No credit card. 5 trips per month on the free plan.
            </p>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                You're on the list — check your inbox.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-[10px] text-sm text-foreground bg-background border rounded-lg outline-none placeholder-muted-foreground focus:border-primary transition-colors duration-150 font-sans"
                />
                <button
                  type="submit"
                  className="text-sm font-medium text-white bg-primary px-5 py-[10px] rounded-full hover:bg-primary/90 transition-colors duration-150 whitespace-nowrap cursor-pointer border-none"
                >
                  Get started
                </button>
              </form>
            )}

            {/* Trust line */}
            {!submitted && (
              <p className="text-xs text-muted-foreground mt-3">
                By signing up you agree to our{" "}
                <a
                  href="#"
                  className="underline hover:text-foreground transition-colors"
                >
                  terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline hover:text-foreground transition-colors"
                >
                  privacy policy
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
