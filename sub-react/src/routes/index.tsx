import Root from "../layout/root";
import { createBrowserRouter } from 'react-router-dom'
import { abilityRoute } from './ability.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      abilityRoute,
    ]
  },
]);

export default router;