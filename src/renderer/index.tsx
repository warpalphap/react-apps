import { createRoot } from 'react-dom/client';
import { Home } from './pages/home/Home';

import 'antd/dist/antd.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Home />);
