
"use client";

import React, { useEffect } from 'react';
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

interface EditAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: BankAccount;
  onAccountUpdated: (account: BankAccount) => void;
}

const formSchema = z.object({
  accountName: z.string().min(2, { message: "Account name must be at least 2 characters." }),
  bankName: z.string().min(2, { message: "Bank name must be at least 2 characters." }),
  balance: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number({invalid_type_error: "Balance must be a number."})
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function EditAccountDialog({ isOpen, onClose, account, onAccountUpdated }: EditAccountDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: account.name,
      bankName: account.bankName,
      balance: account.balance,
    }
  });

  useEffect(() => {
    if (account && isOpen) {
      reset({
        accountName: account.name,
        bankName: account.bankName,
        balance: account.balance,
      });
    }
  }, [account, isOpen, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onAccountUpdated({
      ...account, // Keep id, last4, currency
      name: data.accountName,
      bankName: data.bankName,
      balance: data.balance,
    });
    onClose(); // reset is handled by useEffect or can be called explicitly if needed
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if(!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Account: {account.name}</DialogTitle>
          <DialogDescription>
            Update the details for this bank account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountName" className="text-right">Account Nickname</Label>
              <Input id="accountName" {...register('accountName')} className="col-span-3" />
              {errors.accountName && <p className="col-span-4 text-sm text-destructive text-right">{errors.accountName.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">Bank Name</Label>
              <Input id="bankName" {...register('bankName')} className="col-span-3" />
              {errors.bankName && <p className="col-span-4 text-sm text-destructive text-right">{errors.bankName.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last4Display" className="text-right">Last 4 Digits</Label>
              <Input id="last4Display" value={account.last4} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">Current Balance</Label>
              <Input id="balance" type="number" step="0.01" {...register('balance')} className="col-span-3" />
              {errors.balance && <p className="col-span-4 text-sm text-destructive text-right">{errors.balance.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currencyDisplay" className="text-right">Currency</Label>
              <Input id="currencyDisplay" value={account.currency} className="col-span-3" disabled />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
