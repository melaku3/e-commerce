"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function SettingsForm() {
  // We're using the activeTab value through the Tabs component's onValueChange
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your store information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Store Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Korah Store" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Store Email</Label>
                  <Input id="store-email" defaultValue="contact@korahstore.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Store Phone</Label>
                  <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="store-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Address</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address-line1">Address Line 1</Label>
                  <Input id="address-line1" defaultValue="123 Commerce St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-line2">Address Line 2</Label>
                  <Input id="address-line2" defaultValue="Suite 100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" defaultValue="94103" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Hours</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monday-hours">Monday - Friday</Label>
                  <Input id="monday-hours" defaultValue="9:00 AM - 6:00 PM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saturday-hours">Saturday</Label>
                  <Input id="saturday-hours" defaultValue="10:00 AM - 4:00 PM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunday-hours">Sunday</Label>
                  <Input id="sunday-hours" defaultValue="Closed" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="new-order" defaultChecked />
                  <Label htmlFor="new-order">New order received</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="order-status" defaultChecked />
                  <Label htmlFor="order-status">Order status changes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="low-stock" defaultChecked />
                  <Label htmlFor="low-stock">Low stock alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="new-customer" defaultChecked />
                  <Label htmlFor="new-customer">New customer registration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="product-reviews" />
                  <Label htmlFor="product-reviews">Product reviews</Label>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">SMS Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms-new-order" />
                  <Label htmlFor="sms-new-order">New order received</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms-low-stock" />
                  <Label htmlFor="sms-low-stock">Low stock alerts</Label>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Label htmlFor="phone-number">Phone Number for SMS</Label>
                <Input id="phone-number" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="enable-2fa" />
                  <Label htmlFor="enable-2fa">Enable two-factor authentication</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring both your password and a verification code
                  from your mobile phone.
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Management</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-logout" defaultChecked />
                  <Label htmlFor="auto-logout">Automatically log out after inactivity</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="session-timeout">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
