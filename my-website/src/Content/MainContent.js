import React, { useState } from 'react';
import './MainContent.css';
import axios from 'axios';

const Brp = () => {
  const [formData, setFormData] = useState({
    birthdate: '',
    lastname: ''
  });
  const [bsn, setBsn] = useState(''); // State to store the BSN
  const [straat, setStraat] = useState(''); // State to store the BSN
  const [stad, setStad] = useState(''); // State to store the BSN
  const [huisnummer, setHuisnummer] = useState('');
  const [postcode, setPostcode] = useState('');
  const [type, setType] = useState('');
  const [hypotheekhouders, setHypotheekhouders] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  // Function to fetch the BSN using the /get-bsn server-side endpoint
  const fetchBSNAndAddress = async () => {
    setLoading(true);
    setError(null);

    // const crypto = require('crypto');

    // // Generate code verifier
    // const codeVerifier = crypto.randomBytes(32).toString('base64')
    // .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    // // Generate code challenge
    // const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64')
    // .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    // console.log('Code Verifier:', codeVerifier);
    // console.log('Code Challenge:', codeChallenge);

    const tokenParams = new URLSearchParams();
    tokenParams.append('client_id', '0oabz7rwpt4cqJ9Kt697');
    tokenParams.append('client_secret', '5dW6DDiPZLYSMRUXpzXABfPvmoiO9Ph8EJtOweZgElv2R46Wrrl_Es_3Ub8h-Fns');
    // tokenParams.append('code_verifier', codeVerifier)
    // tokenParams.append('code_challenge', codeChallenge)
    tokenParams.append('grant_type', 'client_credentials');
    tokenParams.append('scope', 'mulescope');

    try {
        const response = await fetch('https://backend-server-test.azurewebsites.net/get-bsn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            birthdate: formData.birthdate,
            lastname: formData.lastname
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

      
      const data = await response.json();
      console.log(data);
      setBsn(data.bsn); // Assuming the server responds with an object that has a bsn property
    } catch (error) {
      console.error('Error fetching BSN and address:', error);
      setError(`Error fetching BSN and address: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="container">
        {/* Picture and text section */}
        <div className="picture-section">
            <img src="/logo.png" alt="Logo" />
            <div className="text-section">
                <p className="title">Eigendomscontrole</p>
                <div className="line"></div>
            </div>
        </div>

        {/* Form for input data */}
        <div className="form-container">
            <div className="form-group">
                <label htmlFor="birthdate">Birthdate:</label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Button to fetch the BSN */}
            <div className="form-group">
                <button onClick={fetchBSNAndAddress} disabled={loading}>
                    Controleer Eigenaarschap
                </button>
                {loading && <p>Loading...</p>}
            </div>
        </div>

        <div className="results">
            {bsn && (
                <>
                    <div className="bsn-result">
                        <p>Voornamen: {'Linda'}</p>
                        <p>Achternaam: {formData.lastname}</p>
                        <p>Geslacht: {'Vrouw'}</p>
                        <p>Geboortedatum: {formData.birthdate}</p>
                        <p>BSN: {'test'}</p>
                        <p>Type: {'test'}</p>
                        <p>Hypotheekhouder: {'test'}</p>
                        {/* Other person details here */}
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Straat</th>
                                <th>Huisnummer</th>
                                <th>Adresregel1</th>
                                <th>Adresregel2</th>
                                <th>Woonplaats</th>
                                <th>Postcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'test'}</td>
                                <td>{'test'}</td>
                                <td>{'test'}</td>
                                <td>{'test'} {'test'}</td>
                                <td>{'test'}</td>
                                <td>{bsn}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>

        {/* Display any error message */}
        {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Brp;