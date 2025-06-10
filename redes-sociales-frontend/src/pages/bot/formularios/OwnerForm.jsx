import { useState } from "react";
import config from "../../../config";
import axios from "axios";

const OwnerForm = ({ setidOwner }) => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerUrl, setownerUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${config.apiUrl}account_owners/`;
    const data = {
      owner_name: ownerName,
      owner_email: ownerEmail,
      owner_phone: ownerPhone,
      owner_urls: ownerUrl,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Success:", response.data);
      setidOwner(response.data);
      alert("Owner registered successfully!");
      // Reset the form fields to empty strings
      setOwnerName("");
      setOwnerEmail("");
      setOwnerPhone("");
      setownerUrl({});
    } catch (error) {
      console.error("Error:", error.response);
      // Here you would handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Account Owner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="ownerName" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ownerEmail" className="form-label">
            Owner Email
          </label>
          <input
            type="email"
            className="form-control"
            id="ownerEmail"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ownerPhone" className="form-label">
            Owner Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="ownerPhone"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ownerPhone" className="form-label">
            Fan page Url
          </label>
          <input
            type="tel"
            className="form-control"
            id="ownerUrl"
            value={ownerUrl}
            onChange={(e) => setownerUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OwnerForm;
