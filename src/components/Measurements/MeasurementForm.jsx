import { useState } from "react";

function MeasurementForm({
  lots,
  onSubmit
}) {
  const [formData, setFormData] =
    useState({
      lotId: "",
      day: "",
      date: "",
      temperature: "",
      humidity: "",
      ph: ""
    });

  const handleChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.lotId ||
      !formData.day ||
      !formData.date ||
      !formData.temperature
    ) {
      return;
    }

    onSubmit({
      lotId:
        formData.lotId,
      day: Number(
        formData.day
      ),
      date:
        formData.date,
      temperature:
        Number(
          formData.temperature
        ),
      humidity:
        formData.humidity ===
        ""
          ? null
          : Number(
              formData.humidity
            ),
      ph:
        formData.ph ===
        ""
          ? null
          : Number(
              formData.ph
            )
    });

    setFormData({
      lotId: "",
      day: "",
      date: "",
      temperature: "",
      humidity: "",
      ph: ""
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      style={{
        background:
          "#ffffff",
        padding:
          "20px",
        borderRadius:
          "10px",
        marginBottom:
          "20px"
      }}
    >
      <h2>
        Registrar
        Medición
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "15px"
        }}
      >
        <select
          name="lotId"
          value={
            formData.lotId
          }
          onChange={
            handleChange
          }
        >
          <option value="">
            Seleccione
            lote
          </option>

          {lots.map(
            (lot) => (
              <option
                key={
                  lot.id
                }
                value={
                  lot.id
                }
              >
                {
                  lot.name
                }
              </option>
            )
          )}
        </select>

        <input
          type="number"
          name="day"
          placeholder="Día"
          value={
            formData.day
          }
          onChange={
            handleChange
          }
        />

        <input
          type="date"
          name="date"
          value={
            formData.date
          }
          onChange={
            handleChange
          }
        />

        <input
          type="number"
          step="0.1"
          name="temperature"
          placeholder="Temperatura"
          value={
            formData.temperature
          }
          onChange={
            handleChange
          }
        />

        <input
          type="number"
          step="0.1"
          name="humidity"
          placeholder="Humedad"
          value={
            formData.humidity
          }
          onChange={
            handleChange
          }
        />

        <input
          type="number"
          step="0.1"
          name="ph"
          placeholder="pH"
          value={
            formData.ph
          }
          onChange={
            handleChange
          }
        />
      </div>

      <button
        type="submit"
        style={{
          marginTop:
            "15px"
        }}
      >
        Guardar
      </button>
    </form>
  );
}

export default MeasurementForm;