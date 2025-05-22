'use client'

import { EditSection, EditSectionItem } from '@/src/shared/ui/custom/custom-edit'
import { MenuContent } from '@/src/shared/ui/custom/custom-menu'
import { ExternalLinksSection } from '@/src/widgets/media/sections/external-links-section'
import { DefaultInfoSection } from '@/src/widgets/media/sections/kino/default-info-section'
import { OriginalInfoSection } from '@/src/widgets/media/sections/kino/original-info-section'
import { KinoCategorySelect } from '@/src/widgets/media/selects/kino-category-select'
import { KinoTypeSelect } from '@/src/widgets/media/selects/kino-type-select'
import type { KinoDetailedInfoDataType } from '@/src/shared/types/edit-types'

type Props = KinoDetailedInfoDataType

export function DefaultInfoTab({
  links,
  genres,
  kinoType,
  languages,
  countries,
  kinoCategory,
  serialStatus,
  originalLanguage
}: Props) {
  return (
    <MenuContent>
      <EditSection isRequired title='Тип медиа'>
        <EditSectionItem>
          <KinoTypeSelect kinoType={kinoType} />
          <KinoCategorySelect kinoCategory={kinoCategory} />
        </EditSectionItem>
      </EditSection>

      <OriginalInfoSection
        countries={countries}
        languages={languages}
        originalLanguage={originalLanguage}
      />
      <DefaultInfoSection
        genres={genres}
        languages={languages}
        serialStatus={serialStatus}
      />
      <ExternalLinksSection links={links} />
    </MenuContent>
  )
}
