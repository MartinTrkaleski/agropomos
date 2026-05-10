import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        setError("Ne moze da se povrze so backend.");
      });
  }, []);

  const handleDiagnosis = async () => {
    setError("");
    setResult(null);

    if (!symptoms.trim()) {
      setError("Vnesi simptomi prvo.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/ai-diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symptoms })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Nastana greska.");
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Greska pri prakjanje do backend.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="badge">AgroPomosh AI</div>

        <h1>{message}</h1>

        <p className="subtitle">
          Vnesi simptomi od rastenieto i dobii brza preporaka.
        </p>

        <div className="form">
          <label>Simptomi</label>

          <textarea
            placeholder="Primer: yellow leaves, dry spots, brown dots..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <button onClick={handleDiagnosis}>
            Napravi dijagnoza
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h2>Rezultat 🌿</h2>

            <div className="result-item">
              <span>Bolest</span>
              <strong>{result.disease}</strong>
            </div>

            <div className="result-item">
              <span>Sigurnost</span>
              <strong>{result.confidence}</strong>
            </div>

            <div className="result-item">
              <span>Preporaka</span>
              <strong>{result.recommendation}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;