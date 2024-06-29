'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string):Promise<{
  message?: string;
  error?: string
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId
      }
    })

    revalidatePath('/')
    
    return { message: 'Transaction deleted' };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export default deleteTransaction