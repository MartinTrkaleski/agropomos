import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then(() => {
        setBackendStatus("Системот е успешно поврзан.");
      })
      .catch((err) => {
        console.error(err);
        setError("Не може да се поврзе со серверот.");
      });
  }, []);

  const handleDiagnosis = async () => {
    setError("");
    setResult(null);

    if (!symptoms.trim()) {
      setError("Внеси симптоми пред да направиш дијагноза.");
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
        setError(data.error || "Настана грешка при обработката.");
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Грешка при испраќање на податоците до серверот.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="badge">Агро Помош AI</div>

        <h1>Агро Помош</h1>

        {backendStatus && (
          <p className="status">{backendStatus}</p>
        )}

        <p className="subtitle">
          Внеси симптоми од растението и добиј брза препорака за можната болест.
        </p>

        <div className="form">
          <label>Симптоми</label>

          <textarea
            placeholder="Пример: жолти листови, суви дамки, кафени точки, бели наслаги..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <button onClick={handleDiagnosis}>
            Направи дијагноза
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h2>Резултат 🌿</h2>

            <div className="result-item">
              <span>Болест</span>
              <strong>{result.disease}</strong>
            </div>

            <div className="result-item">
              <span>Сигурност</span>
              <strong>{result.confidence}</strong>
            </div>

            <div className="result-item">
              <span>Препорака</span>
              <strong>{result.recommendation}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;