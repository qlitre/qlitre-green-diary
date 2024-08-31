import { createRoute } from 'honox/factory';
import type { PlantsResponse } from '../types';
import { getListResponse } from '../libs/microcmsFetch'


export default createRoute(async (c) => {
  const serviceDomain = c.env.SERVICE_DOMAIN;
  const apiKey = c.env.API_KEY;
  const plants = await getListResponse<PlantsResponse>(serviceDomain, apiKey, 'plant');
  if (!plants) {
    return c.render(
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Hello</h1>
        <p className="text-red-500">Failed to load plants data.</p>
      </div>
    );
  }

  return c.render(
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">QlitrePlant</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {plants.contents.map((plant) => (
            <div key={plant.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={plant.title}
                  src={plant.thumbnail.url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/plants/${plant.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {plant.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{plant.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
