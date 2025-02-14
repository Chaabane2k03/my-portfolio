
import React from "react";

import Image from "next/image";
import styles from "../../styles/Buttons.module.css";
const CustomSaveButton = ({text}) => {

  return (
    <div className="w-auto flex items-center justify-center">
      <button className={`${styles.modal_button}`} type="submit">
        <Image
          src={"/checkmark.png"}
          alt="save"
          width={24}
          height={24}
          className="object-contain"
        ></Image>
        <p className="select-none">{text}</p>
      </button>
    </div>
  );
};

export default CustomSaveButton;
