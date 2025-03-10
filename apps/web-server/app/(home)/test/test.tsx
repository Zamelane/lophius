'use client'

import React from "react";
import {Button} from "@/components/ui/button";
import {AuthFromSWR} from "@/hooks/auth-from-SWR";

export default function Test() {
  const auth = AuthFromSWR()
  const [list, setList] = React.useState<string[]>([])

  return (
    <>
      <div>{auth ? auth.nickname : "Ooops"}</div>
      {list.map(i => <div key={i}>{i}</div>)}
      <Button onClick={() => setList([...list, auth?.nickname ?? "none"])}>Add</Button>
    </>
  )
}