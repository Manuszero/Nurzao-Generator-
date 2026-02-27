import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [email, setEmail] = useState("Mansouralwaly050@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "free", displayName: "Free Plan", price: 0, monthlyLimit: 5, dailyLimit: 1 },
    { id: 2, name: "pro", displayName: "Pro Plan", price: 999, monthlyLimit: 100, dailyLimit: 10 },
    { id: 3, name: "premium", displayName: "Premium Plan", price: 2999, monthlyLimit: 500, dailyLimit: 50 },
  ]);

  const [editingPlan, setEditingPlan] = useState<any>(null);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSavePlan = (plan: any) => {
    if (!plan.displayName || !plan.monthlyLimit || !plan.dailyLimit) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubscriptions(
      subscriptions.map((p) => (p.id === plan.id ? plan : p))
    );
    setEditingPlan(null);
    toast.success("Subscription plan updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage subscriptions and system settings</p>
        </div>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="security">Security & Password</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
            <TabsTrigger value="payments">Manual Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Account</CardTitle>
                <CardDescription>Manage your admin credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Email Address</Label>
                  <Input value={email} disabled className="mt-2 bg-slate-50" />
                  <p className="text-sm text-slate-500 mt-2">Your admin email cannot be changed</p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password (min 8 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <Button onClick={handleChangePassword} className="w-full mt-4">
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid gap-6">
              {subscriptions.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.displayName}</CardTitle>
                        <CardDescription>Plan ID: {plan.id}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingPlan(plan)}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingPlan?.id === plan.id ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Plan Name</Label>
                          <Input
                            value={editingPlan.displayName}
                            onChange={(e) =>
                              setEditingPlan({ ...editingPlan, displayName: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Price (in cents)</Label>
                          <Input
                            type="number"
                            value={editingPlan.price}
                            onChange={(e) =>
                              setEditingPlan({ ...editingPlan, price: parseInt(e.target.value) })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Monthly Limit</Label>
                          <Input
                            type="number"
                            value={editingPlan.monthlyLimit}
                            onChange={(e) =>
                              setEditingPlan({ ...editingPlan, monthlyLimit: parseInt(e.target.value) })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Daily Limit</Label>
                          <Input
                            type="number"
                            value={editingPlan.dailyLimit}
                            onChange={(e) =>
                              setEditingPlan({ ...editingPlan, dailyLimit: parseInt(e.target.value) })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={() => handleSavePlan(editingPlan)}
                            className="flex-1"
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setEditingPlan(null)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Price</p>
                          <p className="text-lg font-semibold">${(plan.price / 100).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Monthly Limit</p>
                          <p className="text-lg font-semibold">{plan.monthlyLimit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Daily Limit</p>
                          <p className="text-lg font-semibold">{plan.dailyLimit}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Payment Management</CardTitle>
                <CardDescription>Add and manage manual payment records for users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-email">User Email</Label>
                    <Input
                      id="user-email"
                      placeholder="user@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-amount">Payment Amount ($)</Label>
                    <Input
                      id="payment-amount"
                      type="number"
                      placeholder="0.00"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Input
                      id="payment-method"
                      placeholder="e.g., Bank Transfer, Credit Card"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transaction-id">Transaction ID</Label>
                    <Input
                      id="transaction-id"
                      placeholder="Optional"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="payment-notes">Notes</Label>
                  <textarea
                    id="payment-notes"
                    placeholder="Add any notes about this payment"
                    className="w-full mt-2 p-3 border border-slate-300 rounded-md"
                    rows={4}
                  />
                </div>
                <Button className="w-full" onClick={() => toast.success("Payment recorded successfully")}>Record Payment</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>View all manual payment records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-900">user@example.com</p>
                        <p className="text-sm text-slate-600">Bank Transfer</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">$99.99</p>
                        <p className="text-sm text-slate-600">2026-02-25</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
