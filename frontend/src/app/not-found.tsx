import { publicRoutes } from '@/config'
import PageNotFound from '@/themes/miqat/components/page-not-found'
import DefaultLayout from '@/themes/miqat/layouts/default.layout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <DefaultLayout route={publicRoutes.homepage}>
      <PageNotFound />
    </DefaultLayout>
  )
}