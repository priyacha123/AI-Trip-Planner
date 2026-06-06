import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-10 pb-16">
      <div className="border border-stone-200 rounded-xl bg-stone-100 p-10 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <p className="text-[11px] font-medium text-stone-400 tracking-[0.08em] uppercase mb-3">
              Get started
            </p>
            <h2 className="font-serif text-[28px] font-normal text-stone-900 leading-[1.25] mb-2">
              Start your first trip
              <br />
              <i className="text-stone-400">for free.</i>
            </h2>
            <p className="text-[13.5px] font-light text-stone-500">
              No credit card. 5 trips per month on the free plan.
            </p>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex items-center gap-2.5 text-[14px] text-stone-700">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 stroke-emerald-700 fill-none"
                    strokeWidth={2.2}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
                  className="flex-1 px-4 py-[10px] text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg outline-none placeholder-stone-400 focus:border-stone-400 transition-colors duration-150 font-sans"
                />
                <button
                  type="submit"
                  className="text-sm font-medium text-stone-50 bg-stone-900 px-5 py-[10px] rounded-lg hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap cursor-pointer border-none"
                >
                  Get started
                </button>
              </form>
            )}

            {/* Trust line */}
            {!submitted && (
              <p className="text-[12px] text-stone-400 mt-2.5">
                By signing up you agree to our{" "}
                <a
                  href="#"
                  className="underline hover:text-stone-600 transition-colors"
                >
                  terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline hover:text-stone-600 transition-colors"
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