'use client'

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    const form = e.currentTarget
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      institution: (form.elements.namedItem('institution') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      setNotification({
        type: 'success',
        message: 'Your message has been sent successfully!'
      })
      form.reset()
    } catch (error) {
      console.error(error)
      setNotification({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again or email Mohamed.shelan@insel.ch / Constantinos.Zamboglou@goc.com.cy.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="container mx-auto max-w-7xl px-4 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Contact Us</CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-xl mx-auto">
              Get in touch with our research team or inquire about joining the registry.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-8">
            {notification && (
              <div className={`p-4 mb-6 rounded-lg ${
                notification.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {notification.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    autoComplete="name"
                    placeholder="Enter your name" 
                    required 
                    className="h-11 px-4 transition-colors focus:border-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    autoComplete="email"
                    placeholder="Enter your email" 
                    type="email" 
                    required 
                    className="h-11 px-4 transition-colors focus:border-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="institution" className="text-sm font-medium text-gray-700">Institution</Label>
                  <Input 
                    id="institution" 
                    name="institution" 
                    autoComplete="organization"
                    placeholder="Enter your institution" 
                    required 
                    className="h-11 px-4 transition-colors focus:border-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    className="min-h-[120px] px-4 py-3 transition-colors focus:border-blue-500 resize-none"
                    required
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  className="w-full h-12 text-base font-medium bg-[#1a365d] hover:bg-[#2d4a7c] transition-all duration-300 
                  transform hover:scale-[1.02] hover:shadow-lg disabled:bg-[#1a365d]/70 disabled:cursor-not-allowed
                  text-white rounded-md focus:ring-2 focus:ring-[#1a365d]/50 focus:ring-offset-2" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

