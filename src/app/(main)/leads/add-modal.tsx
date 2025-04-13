"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

import { useState } from "react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsList from "@/components/products-list";
import { OrderItem } from "@/types/shared";

const stages = ["New", "Thinking", "In Progress", "Closed", "Lost"];

export default function AddModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [stage, setStage] = useState("New");
  const [employeeId, setEmployeeId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [leadInterestProducts, setLeadInterestProducts] = useState<OrderItem[]>(
    []
  );
  const { data: employees } = trpc.employee.getAll.useQuery();
  const { data: products } = trpc.product.getAll.useQuery();

  const router = useRouter();

  const mutation = trpc.lead.create.useMutation({
    onSuccess: () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setStage("New");
      setEmployeeId("");
      setSelectedProductId("");
      setQuantity("1");
      setLeadInterestProducts([])

      toast.success("Lead added successfully");
      router.refresh();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Lead not added. Please check your inputs and try again."
      );
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      firstName,
      lastName,
      email,
      phone,
      notes,
      stage,
      employeeId,
      interests: leadInterestProducts,
    });
  };

  const handleAddProduct = () => {
    if (!selectedProductId || quantity === "") {
      toast.error("Please select a product and enter a quantity.");
      return;
    }

    const product = products?.find(
      (p: OrderItem) => p.id === selectedProductId
    );
    if (!product) {
      toast.error("Product not found.");
      return;
    }

    const isProductAlreadyAdded = leadInterestProducts.some(
      (p: OrderItem) => p.productId === selectedProductId
    );

    if (isProductAlreadyAdded) {
      console.log(leadInterestProducts);
      setLeadInterestProducts(prev => {
        const updatedProducts = prev.map((p: OrderItem) => {
          if (p.productId === selectedProductId) {
            return {
              ...p,
              quantity: p.quantity + Number(quantity),
            };
          }
          return p;
        });
        return updatedProducts;
      });

      setSelectedProductId("");
      setQuantity("1");
      return;
    }

    const newProduct = {
      productId: selectedProductId,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
    };

    setLeadInterestProducts([...leadInterestProducts, newProduct]);
    setSelectedProductId("");
    setQuantity("");
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = leadInterestProducts.filter(
      (product: OrderItem) => product.productId !== productId
    );

    setLeadInterestProducts(updatedProducts);
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Lead</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new lead. Ensure all fields are
            completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
            >
              First Name
            </Label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              id="first-name"
              placeholder="Yaroslav"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="last-name"
              className="text-right"
            >
              Last Name
            </Label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              id="last-name"
              placeholder="Bisyk"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right"
            >
              Email
            </Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              placeholder="example@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="phone"
              className="text-right"
            >
              Phone
            </Label>
            <Input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              id="phone"
              placeholder="+1234567890"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Stage
            </Label>
            <Select
              onValueChange={value => setStage(value)}
              value={stage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                {stages?.map((s: string) => (
                  <SelectItem
                    key={s}
                    value={s}
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Employee
            </Label>
            <Select
              onValueChange={value => setEmployeeId(value)}
              value={employeeId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees?.map(
                  (e: { id: string; firstName: string; lastName: string }) => (
                    <SelectItem
                      key={e.id}
                      value={e.id}
                    >
                      {e.firstName} {e.lastName}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="notes"
              className="text-right"
            >
              Notes
            </Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              id="notes"
              placeholder="Additional info about lead..."
              className="col-span-3 max-h-[200px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Product
            </Label>
            <div className="flex space-x-2 col-span-3">
              <Select
                onValueChange={value => setSelectedProductId(value)}
                value={selectedProductId}
              >
                <SelectTrigger className="w-[180px] md:w-[260px] lg:w-[400px]">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products?.map(
                    (p: { id: string; name: string; price: string }) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                      >
                        <div className="flex">
                          <div>
                            {p.name} /{" "}
                            <span className="text-gray-500 text-xs">
                              ${p.price}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Input
                onChange={e => setQuantity(e.target.value)}
                value={quantity}
                id="product-quantity"
                placeholder="Quantity"
                className="max-w-20 md:max-w-24 lg:max-w-28"
                type="number"
                min={1}
              />
              <Button onClick={handleAddProduct}>+</Button>
            </div>
          </div>
          {leadInterestProducts.length > 0 && (
            <ProductsList
              products={leadInterestProducts}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={e => {
                handleCreate(e);
              }}
            >
              Add Lead
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
