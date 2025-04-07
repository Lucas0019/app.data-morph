import React, { useRef, useState } from "react";
import "../../App.css";

export const CSVtoJSONConverter = () => {
  const [json, setJson] = useState<any[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertCSVToJSON = (csv: string) => {
    const rows = csv.trim().split("\n");
    const genderMap = new Map<string, any>();
    const result: any[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (!row) continue;

      const values = row.split(",");
      if (values.length < 3) {
        throw new Error(
          `Line ${i + 1} is incomplete. It must contain gender, locale and sizes.`
        );
      }

      const genderList = values[0]
        .split(" / ")
        .map((g) => g.trim().toLowerCase());
      const genderKey = [...genderList]
        .sort((a, b) => a.localeCompare(b))
        .join("|");
      const locale = values[1].trim().toLowerCase();
      const sizeStrings = values[2].split(" / ");
      const sizes = sizeStrings.map((size) => {
        const parsed = Number(size.trim());
        if (isNaN(parsed)) {
          throw new Error(
            `Oops! There's an invalid size on line ${i + 1}: "${size}". Please make sure all size values are numbers only (e.g., 36, 38.5, 42).`
          );
        }
        return parsed;
      });

      if (!genderMap.has(genderKey)) {
        const genderObj = { gender: genderList, fields: [] };
        genderMap.set(genderKey, genderObj);
        result.push(genderObj);
      }

      const genderObj = genderMap.get(genderKey);

      let localeObj = genderObj.fields.find((f: any) => f.locale === locale);
      if (!localeObj) {
        localeObj = { locale, sizes: [...sizes] };
        genderObj.fields.push(localeObj);
      } else {
        sizes.forEach((size) => {
          if (!localeObj.sizes.includes(size)) {
            localeObj.sizes.push(size);
          }
        });
      }
    }

    return result;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("The file is too large. Maximum allowed size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      try {
        const result = convertCSVToJSON(csvText);
        setJson(result);
      } catch (err: any) {
        setError(err.message);
        setJson(null);
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    if (!json) return;
    const text = JSON.stringify(json, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const clearData = () => {
    setJson(null);
    setCopied(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="container">
      <h2>Data Morph</h2>

      <label htmlFor="file-upload">Upload your CSV file:</label>
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        placeholder="Upload CSV file"
      />

      {error && (
        <div className="error-message" style={{ marginBottom: "12px" }}>
          <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
        </div>
      )}

      {(json || error) && (
        <div className="json-box-inputs fade-in slide-up">
          {json && (
            <button
              type="button"
              className={`copy-btn ${copied ? "copied" : "Copy JSON"}`}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy JSON"}
            </button>
          )}

          <button type="button" className="clear-btn" onClick={clearData}>
            Clear Data
          </button>
        </div>
      )}

      <div className="json-box fade-in slide-up">
        <pre style={{ textAlign: "left" }}>
          {json ? JSON.stringify(json, null, 2) : "// ..."}
        </pre>
      </div>

      <details className="attention-message" open>
        <summary>⚠️ Attention:</summary>
        The CSV file must contain <strong>three columns</strong>:{" "}
        <code>gender</code>, <code>locale</code>, and <code>sizes</code>.<br />-
        Multiple genders, because it can be in EN and IT should be separated by{" "}
        <strong>" / "</strong>.<br />- Multiple sizes should also be separated
        by <strong>" / "</strong>.<br />- Maximum file size:{" "}
        <strong>5MB</strong>.
      </details>
    </section>
  );
};
