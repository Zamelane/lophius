'use client'

import { EditSection, EditSectionItem } from '@/components/me-ui/custom-edit'
import { MenuContent } from '@/components/me-ui/custom-menu'
import { ExternalLinksSection } from '@/components/template-components/media/sections/external-links-section'
import { DefaultInfoSection } from '@/components/template-components/media/sections/kino/default-info-section'
import { OriginalInfoSection } from '@/components/template-components/media/sections/kino/original-info-section'
import { KinoCategorySelect } from '@/components/template-components/media/selects/kino-category-select'
import { KinoTypeSelect } from '@/components/template-components/media/selects/kino-type-select'
import type { KinoDetailedInfoDataType } from '@/interfaces/edit-types'

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
