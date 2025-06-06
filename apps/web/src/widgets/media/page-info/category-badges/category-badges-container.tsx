import React from "react";
import { CategoryBadges } from ".";

type Props = {
  categories: CategoryBadges[]
}

export function CategoryBadgesContainer({ categories }: Props) {
  if (!categories.length)
    return
  
  return (
    <div className='flex flex-wrap gap-4'>
      {
        categories.map((category, i) => <CategoryBadges key={i} {...category} />)
      }
    </div>
  )
}