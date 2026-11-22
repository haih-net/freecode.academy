import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import { DocumentationPage } from 'app/Custom/pages/Documentation'

export const meta: MetaFunction = ({ error }) =>
  error
    ? unavailableSeoMeta()
    : createSeoMeta({
        title: 'Документация',
        description:
          'Групповые P2P-видеозвонки, приглашения по ссылке, коды доступа и демонстрация экрана: устройство системы и ограничения.',
        noindex: true,
        path: '/docs',
      })

export default DocumentationPage
