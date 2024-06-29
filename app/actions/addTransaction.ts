'use server';
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData{
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction( fromData: FormData): Promise<TransactionResult> {

  const textValue = fromData.get("text");
  const amountValue = fromData.get("amount");

  // check for input values
  if ( !textValue || textValue === '' || !amountValue) {
    return { error: "Text or Amount is missing" };
  }

  const text: string = textValue.toString(); //Ensure text is a string 
  const amount: number = parseFloat(amountValue.toString()); //Parseamount as number

  // Get logged in user
  const { userId } = auth();
  
  // Check for user 
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId
      }
    })

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
}

export default addTransaction;