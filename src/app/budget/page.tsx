"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Edit3, Trash2, DollarSign, AlertTriangle, CheckCircle2, Target, Utensils, Car, Home, ShoppingBag, Ticket, type LucideIcon } from 'lucide-react';
import type { Category } from '@/types';
import CreateCategoryDialog from '@/components/budget/create-category-dialog';
import SetLimitDialog from '@/components/budget/set-limit-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const ICONS: { [key: string]: LucideIcon } = {
  Utensils, Car, Home, ShoppingBag, Ticket, DollarSign, Target
};

const initialMockCategories: Category[] = [
  { id: '1', name: 'Food', icon: 'Utensils', limit: 500, limitType: 'monthly', spent: 250.75, color: 'hsl(var(--chart-1))' },
  { id: '2', name: 'Transportation', icon: 'Car', limit: 200, limitType: 'monthly', spent: 150.20, color: 'hsl(var(--chart-2))' },
  { id: '3', name: 'Entertainment', icon: 'Ticket', limit: 150, limitType: 'monthly', spent: 180.00, color: 'hsl(var(--chart-3))' }, // Over budget
  { id: '4', name: 'Utilities', icon: 'Home', limit: 300, limitType: 'monthly', spent: 280.50, color: 'hsl(var(--chart-4))' },
  { id: '5', name: 'Shopping', icon: 'ShoppingBag', limit: 400, limitType: 'monthly', spent: 100.00, color: 'hsl(var(--chart-5))' },
];

export default function BudgetPage() {
  const [categories, setCategories] = useState<Category[]>(initialMockCategories);
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] = useState(false);
  const [isSetLimitDialogOpen, setIsSetLimitDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = (newCategory: Omit<Category, 'id' | 'spent'>) => {
    setCategories(prev => [...prev, { ...newCategory, id: String(Date.now()), spent: 0 }]);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    setSelectedCategory(null);
    setIsSetLimitDialogOpen(false);
    setIsCreateCategoryDialogOpen(false); // Also close create if editing
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const openSetLimitDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsSetLimitDialogOpen(true);
  };

  const openEditCategoryDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsCreateCategoryDialogOpen(true); // Use CreateCategoryDialog for editing
  };


  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Budget Management</h1>
        <Button onClick={() => { setSelectedCategory(null); setIsCreateCategoryDialogOpen(true); }}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>No Categories Created</CardTitle>
            <CardDescription>Create spending categories and set limits to manage your budget effectively.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => { setSelectedCategory(null); setIsCreateCategoryDialogOpen(true); }}>Create First Category</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => {
            const IconComponent = typeof category.icon === 'string' ? ICONS[category.icon] || Target : category.icon;
            const progress = category.limit > 0 ? (category.spent / category.limit) * 100 : 0;
            const isOverBudget = category.spent > category.limit;

            return (
              <Card key={category.id} className={`${isOverBudget ? 'border-destructive' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <IconComponent className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription>
                          Limit: ${category.limit.toLocaleString()} {category.limitType}
                        </CardDescription>
                      </div>
                    </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditCategoryDialog(category)}>
                            <Edit3 className="h-5 w-5" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the category "{category.name}".
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteCategory(category.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-lg font-semibold ${isOverBudget ? 'text-destructive' : ''}`}>
                      ${category.spent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} spent
                    </span>
                    {isOverBudget ? (
                      <span className="text-sm text-destructive flex items-center">
                        <AlertTriangle className="mr-1 h-4 w-4" /> Over Budget!
                      </span>
                    ) : (
                       <span className="text-sm text-green-600 flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4" /> On Track
                      </span>
                    )}
                  </div>
                  <Progress value={progress > 100 ? 100 : progress} className={`h-3 ${isOverBudget ? '[&>div]:bg-destructive' : ''}`} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{progress.toFixed(0)}%</span>
                    <span>100%</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                   <Button variant="outline" className="w-full" onClick={() => openSetLimitDialog(category)}>
                    <DollarSign className="mr-2 h-4 w-4" /> Adjust Limit or Spending
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <CreateCategoryDialog
        isOpen={isCreateCategoryDialogOpen}
        onClose={() => { setSelectedCategory(null); setIsCreateCategoryDialogOpen(false); }}
        onCategorySaved={selectedCategory ? handleUpdateCategory : handleAddCategory}
        existingCategory={selectedCategory}
        icons={ICONS}
      />

      {selectedCategory && (
        <SetLimitDialog
          isOpen={isSetLimitDialogOpen}
          onClose={() => { setSelectedCategory(null); setIsSetLimitDialogOpen(false); }}
          category={selectedCategory}
          onLimitSet={(cat, limit, spent) => {
            handleUpdateCategory({...cat, limit, spent: spent === undefined ? cat.spent : spent });
          }}
        />
      )}
    </div>
  );
}
