import { createBrowserRouter } from 'react-router';
import { Suspense, lazy } from 'react';
import PokemonChallengeApp from '../../../../PokemonChallengeApp';
import { Loader, PageTransition } from '../../../../shared/components';

const PokemonListPage = lazy(() => import('../pages/PokemonListPage'));
const PokemonDetailPage = lazy(() => import('../pages/PokemonDetailPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonChallengeApp />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <PageTransition>
              <PokemonListPage />
            </PageTransition>
          </Suspense>
        ),
      },
      {
        path: '/pokemon/:name',
        element: (
          <Suspense fallback={<Loader />}>
            <PageTransition>
              <PokemonDetailPage />
            </PageTransition>
          </Suspense>
        ),
      },
    ],
  },
]);