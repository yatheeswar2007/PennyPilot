
"use client";

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BankAccount } from '@/types';

interface LinkAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountLinked: (account: Omit<BankAccount, 'id'>) => void;
}

const formSchema = z.object({
  bankName: z.string().min(2, { message: "Bank name must be at least 2 characters." }),
  name: z.string().min(2, { message: "Account name must be at least 2 characters." }),
  accountNumber: z.string().min(2, { message: "Account number must be at least 2 characters." }),
  balance: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().min(0, { message: "Balance must be a positive number." })
  ),
  currency: z.string().length(3, { message: "Currency code must be 3 letters." }).default('INR'),
});

type FormData = z.infer<typeof formSchema>;

export default function LinkAccountDialog({ isOpen, onClose, onAccountLinked }: LinkAccountDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'INR',
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onAccountLinked({
      name: data.name,
      accountNumber: data.accountNumber,
      balance: data.balance,
      currency: data.currency.toUpperCase(),
      bankName: data.bankName,
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link New Bank Account</DialogTitle>
          <DialogDescription>
            Enter your bank account details. This is a mock Plaid integration for demo purposes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">Bank Name</Label>
              <Input id="bankName" {...register('bankName')} className="col-span-3" />
              {errors.bankName && <p className="col-span-4 text-sm text-destructive text-right">{errors.bankName.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label> 
              <Input id="name" {...register('name')} className="col-span-3" />
              {errors.name && <p className="col-span-4 text-sm text-destructive text-right">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountNumber" className="text-right">Account Number</Label>
              <Input id="accountNumber" {...register('accountNumber')} className="col-span-3" placeholder="e.g., 00123456789" />
              {errors.accountNumber && <p className="col-span-4 text-sm text-destructive text-right">{errors.accountNumber.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">Current Balance</Label>
              <Input id="balance" type="number" step="0.01" {...register('balance')} className="col-span-3" />
              {errors.balance && <p className="col-span-4 text-sm text-destructive text-right">{errors.balance.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">Currency</Label>
              <Input id="currency" defaultValue="INR" {...register('currency')} className="col-span-3" />
              {errors.currency && <p className="col-span-4 text-sm text-destructive text-right">{errors.currency.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Link Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
