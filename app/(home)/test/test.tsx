'use client'

import React from "react";
import {useAuth} from "@/components/auth-provider";
import {Button} from "@/components/shadcn/ui/button";

export default function Test() {
  const auth = useAuth()
  const [list, setList] = React.useState<string[]>([])
  console.log(auth)

  return (
    <>
      <div>{auth.user ? auth.user?.nickname : "Ooops"}</div>
      {list.map(i => <div key={i}>{i}</div>)}
      <Button onClick={() => setList([...list, auth.user?.nickname ?? "none"])}>Add</Button>
    </>
  )
}