
import { useTranslation } from 'react-i18next';

function MyComponent(world) {
  const { t } = useTranslation();
//console.log(world,t(world));


  return t(world)
}

export default MyComponent;
