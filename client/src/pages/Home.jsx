 import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="absolute top-0 right-0 p-6">
        <Link
          to="/admin/login"
          className="text-md   text-slate-600 transition hover:text-orange-400"
        >
          Owner Panel
        </Link>
      </nav>

      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Northline Roofing & Exteriors
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Know Your Roof Cost Before You Commit.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Get a realistic roofing estimate in just a few simple steps.
          </p>

          <Link
            to="/estimate"
            className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Get My Estimate
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
