import { createRoute } from 'honox/factory';
import type { PlantsResponse } from '../types';
import { MicroCMSClient } from '../libs/microcmsClient'
import { PlantCard } from '../components/PlantCard'


export default createRoute(async (c) => {
  const serviceDomain = c.env.SERVICE_DOMAIN;
  const apiKey = c.env.API_KEY;
  const client = new MicroCMSClient(serviceDomain, apiKey)
  const plants = await client.getListResponse<PlantsResponse>('plant');
  if (!plants) {
    return c.render(
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Hello</h1>
        <p className="text-red-500">Failed to load plants data.</p>
      </div>
    );
  }

  return c.render(      
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Plants</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {plants.contents.map((plant) => (
            <PlantCard plant={plant} />
          ))}
        </div>
      </div>

  );
});
