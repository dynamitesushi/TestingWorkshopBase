import React, { useState } from "react";
import styles from "./CreateToken.module.scss";
import { tokenCreate } from "../../minima";

const CREATE_TOKEN_SUCCESS_MESSAGE = "CREATE_TOKEN_SUCCESS_MESSAGE";
const CREATE_TOKEN_FAILURE_MESSAGE = "CREATE_TOKEN_FAILURE_MESSAGE";

const CreateToken = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const isDisabled = name === "" || amount === "" || isLoading;

  const handleNameOnChange = (evt) => setName(evt.target.value);
  const handleAmountOnChange = (evt) => setAmount(evt.target.value);

  /**
   * Submits the form to create a token with the values
   * entered. A success or failure message will be shown
   * based on the promise.
   * @param evt
   * @returns {Promise<void>}
   */
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setMessage(null);
      setIsLoading(true);
      await tokenCreate(name, amount);
      setMessage(CREATE_TOKEN_SUCCESS_MESSAGE);
      setName("");
      setAmount("");
    } catch (e) {
      setMessage(CREATE_TOKEN_FAILURE_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.heading}>Create a Token</h1>
        <div className={styles.formGroup}>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={handleNameOnChange}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            <span>Amount</span>
            <input
              type="number"
              value={amount}
              onChange={handleAmountOnChange}
            />
          </label>
        </div>
        <div className={styles.footer}>
          <button
            type="submit"
            disabled={isDisabled}
            data-loading={isLoading}
            className={styles.button}
          >
            Create Token
          </button>
        </div>
      </div>
      {message === CREATE_TOKEN_SUCCESS_MESSAGE && (
        <div
          className={`${styles.message} ${styles["message--success"]}`}
        >
          You have successfully created a token
        </div>
      )}
      {message === CREATE_TOKEN_FAILURE_MESSAGE && (
        <div
          className={`${styles.message} ${styles["message--failure"]}`}
        >
          Oops, something went wrong creating the token
        </div>
      )}
    </form>
  );
};

export default CreateToken;
