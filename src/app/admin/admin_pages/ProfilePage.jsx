"use client";

import React, { useState } from "react";
import { CustomInput , CustomSelect } from "@/app/components/CustomInput";

const ProfilePage = () => {
  const [hasCV, setHasCV] = useState(false);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        {/* Avatar Section */}
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Avatar"
            />
            <span className="font-weight-bold" style={{ color: "#000000" }}>
              Edogaru
            </span>
            <span className="text-black-50" style={{ color: "#000000" }}>
              edogaru@mail.com.my
            </span>
            <button className="btn btn-outline-primary mt-3" type="button">
              Modifier l'image
            </button>
          </div>
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
              <input
                type="email"
                className="form-control"
                placeholder="Modifier l'email"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Ancien mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Entrer l'ancien mot de passe"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Nouveau mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Entrer le nouveau mot de passe"
              />
            </div>
            <div className="mt-3">
              <label className="labels" style={{ color: "#000000" }}>
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirmer le nouveau mot de passe"
              />
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary" type="button">
                Confirmer les modifications
              </button>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
