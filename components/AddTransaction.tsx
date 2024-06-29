"use client";
import { useRef } from "react";
import addTransaction from "@/app/actions/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (fromData: FormData) => {
    const { data, error } = await addTransaction(fromData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added successfully!");
      formRef.current?.reset();
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="from-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="from-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step={"0.01"}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
