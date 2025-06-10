import { useState } from "react";
import config from "../../../config";
function AccountForm() {
  const [formData, setFormData] = useState({
    BotPersonalityID: 0,
    grup: {},
    AccountName: "",
    AccessToken: "",
    AccessSecret: "",
    OtherCredentials: "",
    OwnerID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}accounts/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      alert("Error submitting data.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Account Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Bot Personality ID</label>
          <input
            type="number"
            className="form-control"
            name="BotPersonalityID"
            value={formData.BotPersonalityID}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Platform ID</label>
          <input
            type="number"
            className="form-control"
            name="PlatformID"
            value={formData.PlatformID}
            onChange={handleChange}
          />
        </div>
        {/* For the 'grup' field, you might want to create a more complex input or a nested form depending on its structure */}
        <div className="mb-3">
          <label className="form-label">Account Name</label>
          <input
            type="text"
            className="form-control"
            name="AccountName"
            value={formData.AccountName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Access Token</label>
          <input
            type="text"
            className="form-control"
            name="AccessToken"
            value={formData.AccessToken}
            onChange={handleChange}
            hidden
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Access Secret</label>
          <input
            type="text"
            className="form-control"
            name="AccessSecret"
            value={formData.AccessSecret}
            onChange={handleChange}
            hidden
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Other Credentials</label>
          <input
            type="text"
            className="form-control"
            name="OtherCredentials"
            value={formData.OtherCredentials}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Owner ID</label>
          <input
            type="text"
            className="form-control"
            name="OwnerID"
            value={formData.OwnerID}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AccountForm;
