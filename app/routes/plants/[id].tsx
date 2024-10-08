import { createRoute } from 'honox/factory'
import { MicroCMSClient } from '../../libs/microcmsClient'
import type { Plant, GrowthHistoryResponse } from '../../types'
import type { MicroCMSQueries } from 'microcms-js-sdk'
import { HistoryImage } from '../../islands/HistoryImage'
import { jstDatetime } from '../../libs/jstDatetime'
import { ShareX } from '../../components/ShareX'
import { LinkToHome } from '../../components/LinkToHome'
import { config } from '../../settings/siteSettings'

export default createRoute(async (c) => {
    const { id } = c.req.param()
    const queries: MicroCMSQueries = { filters: `target[equals]${id}` }
    const serviceDomain = c.env.SERVICE_DOMAIN
    const apiKey = c.env.API_KEY
    const client = new MicroCMSClient(serviceDomain, apiKey)
    const plant = await client.getDetail<Plant>('plant', id)
    const history = await client.getListResponse<GrowthHistoryResponse>('growth_history', queries)
    const contentUrl = `${config.siteURL}/plants/${id}`
    const thumbnailUrl = history ? history.contents[0].images[0].url : ''
    const description = history ? history.contents[0].comment : ''

    return c.render(
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Growth History</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section className="lg:col-span-7">
                    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        {history?.contents.map((record, idx) => (
                            <li key={record.id} className="flex py-6 sm:py-10">
                                <div className="flex-shrink-0">
                                    <HistoryImage images={record.images}></HistoryImage>
                                </div>
                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <p>
                                        {jstDatetime(record.shooting_date).substring(0, 10)}
                                    </p>
                                    <p className="mt-4 flex space-x-2 text-gray-700">
                                        {record.comment}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section
                    className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                >
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        {plant?.title}
                    </h2>
                    <dl className="mt-6 space-y-4">
                        {plant?.description}
                    </dl>
                </section>
            </div>
            <div className="mt-4">
                <ShareX url={contentUrl} title={plant?.title || ''}></ShareX>
            </div>
            <div>
                <LinkToHome />
            </div>
        </div>, { title: plant?.title, description: description, contentUrl: contentUrl, thumbnailUrl: thumbnailUrl }
    )
})