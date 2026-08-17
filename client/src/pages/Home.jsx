import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.08)_0%,_transparent_60%)]" />

      <nav className="absolute top-0 right-0 p-6 z-10">
        <Link
          to="/admin/login"
          className="text-sm text-slate-400 transition hover:text-orange-400"
        >
          Owner Panel
        </Link>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400 animate-fade-in">
            Northline Roofing & Exteriors
          </p>

          <h1
            className="text-5xl font-bold leading-tight md:text-7xl animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Know Your Roof Cost
            <br />
            Before You Commit.
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg text-slate-300 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Get a realistic roofing estimate in just a few simple steps.
            Answer a few questions about your roof, and we'll give you an
            instant price range.
          </p>

          <Link
            to="/estimate"
            className="mt-8 inline-block rounded-lg bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 hover:shadow-orange-500/40 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Get My Estimate
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
