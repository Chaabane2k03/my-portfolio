"use client";

import React, { useState } from "react";
import { CustomInput, CustomSelect } from "@/app/components/CustomInput";
import CustomSaveButton from "@/app/components/CustomBtn";
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [hasCV, setHasCV] = useState(false);
  const [image, setImage] = useState("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update the image state with the new image
        setIsModalOpen(false); // Close the modal after image is selected
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        {/* Avatar Section */}
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={image} // Dynamically render the selected image
              alt="Avatar"
            />
            <span className="font-weight-bold" style={{ color: "#000000" }}>
              Edogaru
            </span>
            <span className="text-black-50" style={{ color: "#000000" }}>
              edogaru@mail.com.my
            </span>
            <button
              className="btn btn-outline-primary mt-3"
              type="button"
              onClick={() => setIsModalOpen(true)} // Open the modal when the button is clicked
            >
              Modifier l'image
            </button>
          </div>

          {isModalOpen && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <h4 className="text-center" style={{ color: "#000000" }}>
                    Sélectionner une image
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Call the function to handle image selection
                    className={styles.fileInput}
                  />
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setIsModalOpen(false)} // Ensure the modal closes when this is clicked
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Email and Password Update Section */}
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <h4 className="text-center" style={{ color: "#000000" }}>
              Paramètres du compte
            </h4>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Email
              </label>
              <CustomInput
                type="email"
                placeholder="Modifier l'email"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Ancien mot de passe
              </label>
              <CustomInput
                type="password"
                placeholder="Entrer l'ancien mot de passe"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Nouveau mot de passe
              </label>
              <CustomInput
                type="password"
                placeholder="Entrer le nouveau mot de passe"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Confirmer le nouveau mot de passe
              </label>
              <CustomInput
                type="password"
                placeholder="Confirmer le nouveau mot de passe"
              />
            </div>
            <div className="text-center mt-4">
              <CustomSaveButton text="Confirmer les modifications" />
            </div>
          </div>
        </div>

        {/* CV Upload Section */}
        <div className="col-md-4">
          <div className="p-3 py-5">
            <h4 className="text-center" style={{ color: "#000000" }}>
              Gestion du CV
            </h4>
            {hasCV ? (
              <div className="text-center mt-3">
                <p style={{ color: "#000000" }}>Un CV est déjà uploadé.</p>
                <button className="btn btn-outline-primary" type="button">
                  Voir le CV
                </button>
              </div>
            ) : (
              <div className="text-center mt-3">
                <p style={{ color: "#000000" }}>Aucun CV disponible.</p>
                <button className="btn btn-primary" type="button">
                  Uploader un CV
                </button>
                <CustomSaveButton text="Save" />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
