export default function OncoBoneHomePage({ setPage }) {

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">

        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            OncoBone AI
          </h1>
        </div>

        <div className="flex gap-4">

         

         

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <div className="bg-cyan-500/10 border border-cyan-500 text-cyan-300 px-6 py-2 rounded-full text-sm mb-8">
          ML Powered Bone Tumor Detection System
        </div>

        <h1 className="text-6xl font-extrabold leading-tight max-w-5xl">

          Detect Bone Tumors

          <span className="block text-cyan-400">
            Earlier. Smarter. Better.
          </span>

        </h1>

        <p className="mt-8 text-slate-300 text-lg max-w-3xl leading-8">

          OncoBone AI helps doctors analyze bone tumor risk using
          Machine Learning models like Logistic Regression,
          Random Forest, SVM, and Decision Tree.

        </p>

        <div className="flex gap-5 mt-10">

          <button
            onClick={() => setPage("login")}
            className="border border-cyan-400 text-cyan-300 px-8 py-4 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
          >
           Doctor's Login
          </button>

         <button
              onClick={() => setPage("adminLogin")}
                 className="border border-cyan-400 text-cyan-300 px-8 py-4 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
                          >
              Admin Login
           </button>

        </div>

      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 pb-20">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            97.2%
          </h2>

          <p className="mt-3 text-slate-400">
            Model Accuracy
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            4
          </h2>

          <p className="mt-3 text-slate-400">
            ML Algorithms
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            {"<1 sec"}
          </h2>

          <p className="mt-3 text-slate-400">
            Prediction Speed
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            500+
          </h2>

          <p className="mt-3 text-slate-400">
            Records Analyzed
          </p>

        </div>

      </section>

      {/* Features */}
      <section className="px-10 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          System Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              AI Prediction
            </h3>

            <p className="text-slate-300 leading-7">

              Predicts whether the tumor is malignant or benign
              using trained machine learning models.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Doctor Dashboard
            </h3>

            <p className="text-slate-300 leading-7">

              Doctors can manage patient prediction history and
              monitor reports easily.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Admin Panel
            </h3>

            <p className="text-slate-300 leading-7">

              Admin can manage doctors, records, and system
              activities securely.

            </p>

          </div>

        </div>

      </section>

{/* About Section */}
<section
  id="about"
  className="px-10 py-24 bg-slate-900 border-y border-slate-800"
>
  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center mb-6">
      About OncoBone AI
    </h2>

    <p className="text-center text-slate-300 text-lg leading-8 max-w-4xl mx-auto">
      OncoBone AI is a Machine Learning-based Bone Tumor Detection
      System developed to assist healthcare professionals in
      identifying potential bone tumors quickly and accurately.
      The system analyzes patient clinical information and applies
      advanced machine learning algorithms to predict whether a
      tumor is benign or malignant.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">
          Project Objective
        </h3>

        <p className="text-slate-300 leading-7">
          The primary objective of OncoBone AI is to support early
          detection of bone tumors through data-driven predictions.
          Early diagnosis can help doctors make informed decisions,
          improve treatment planning, and enhance patient outcomes.
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">
          Machine Learning Models
        </h3>

        <p className="text-slate-300 leading-7">
          Logistic Regression, Random Forest, Support Vector
          Machine (SVM), and Decision Tree models are used to
          improve prediction accuracy and reliability.
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">
          Doctor Dashboard
        </h3>

        <p className="text-slate-300 leading-7">
          Doctors can securely access patient records, prediction
          history, and diagnostic reports through a dedicated
          dashboard.
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">
          Admin Management
        </h3>

        <p className="text-slate-300 leading-7">
          Administrators can manage doctors, patient records,
          prediction history, and overall system operations from
          a centralized control panel.
        </p>
      </div>

    </div>

    <div className="mt-16 bg-cyan-500/10 border border-cyan-500 rounded-3xl p-8 text-center">

      <h3 className="text-3xl font-bold text-cyan-400 mb-4">
        Why OncoBone AI?
      </h3>

      <p className="text-slate-300 text-lg leading-8 max-w-4xl mx-auto">
        By combining Machine Learning with healthcare decision
        support, OncoBone AI enables faster analysis, improved
        diagnostic assistance, secure record management, and
        enhanced clinical efficiency.
      </p>

    </div>

  </div>
</section>
```

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">

        © 2026 OncoBone AI • Bone Tumor Detection Using Machine Learning

      </footer>

    </div>
  );
}