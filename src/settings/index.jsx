import { useState } from "react";
import { Sparkles, User } from "lucide-react";
import { ModeToggle } from "../components/ui/mode-toggle";
import SignInDialog from "../components/custom/sign-in-dialog";
import { Button } from "../components/ui/button";

const Settings = () => {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background transition-colors">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
            Preferences
          </p>
          <h1 className="font-serif text-4xl font-normal text-foreground md:text-5xl">
            Settings
          </h1>
        </header>

        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user?.name || "Profile"}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <User className="h-7 w-7 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-serif text-xl text-foreground">
                  {user?.name || "Guest"}
                </h2>
                <p className="truncate text-sm text-muted-foreground">
                  {user?.email || "Sign in to manage your account"}
                </p>
              </div>
              {!user && (
                <Button
                  onClick={() => setOpenDialog(true)}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign in
                </Button>
              )}
            </div>
          </section>

          {/* Appearance */}
          <section className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <h2 className="font-serif text-xl text-foreground">Appearance</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>
            <ModeToggle />
          </section>

          {/* About */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl text-foreground">About</h2>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              JOURNI — AI trip planner
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Plan any trip in seconds with AI-crafted itineraries, budgets,
              hotels and daily routes — all in one warm, simple place.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">Version 1.0.0</p>
          </section>
        </div>
      </div>

      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Settings;
