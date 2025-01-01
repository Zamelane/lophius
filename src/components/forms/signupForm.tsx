'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormHeader from "@/components/forms/subComponents/formHeader";
import FormFooter from "@/components/forms/subComponents/formFooter";
import StackLayout from "@/components/layouts/StackLayout";
import Container from "@/components/container";
import {SignupFormSchema} from "@/schemes";
import {signup} from "@/actions/auth";
import {useActionState} from 'react'

export default function SignupForm() {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <Container>
      <Form {...form}>
        <form action={action}>
          <StackLayout>
            <FormHeader title="Start your collection today" description="Create your Lophius account"/>
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="Nick123" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>Continue</Button>
            <FormFooter question="Already have an account?" actionText="Sign in" actionHref="#"/>
          </StackLayout>
        </form>
      </Form>
    </Container>
  )
}

/*
<form className="p-6 md:p-8" action={action}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to your Acme Inc account
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Login</Label>
          <Input
            id="login"
            type="text"
            placeholder="User123"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm password</Label>
          <Input id="confirmPassword" type="password" required/>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </div>
    </form>
*/