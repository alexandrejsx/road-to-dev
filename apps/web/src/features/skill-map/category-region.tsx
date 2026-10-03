import { PixelIcon } from '@road-to-dev/ui/components/pixel-icon';
import { categories, type CategoryId } from './types';
import { regions } from './layout';

export function CategoryRegion({ category }: { category: CategoryId }) {
  const region = regions[category];
  const definition = categories[category];
  return (
    <section
      className="category-region"
      data-category={category}
      style={{
        left: region.x,
        top: region.y,
        width: region.width,
        height: region.height,
      }}
      aria-label={definition.name}
    >
      <div className="category-heading">
        <PixelIcon name={definition.icon} size={48} />
        <h2>{definition.name}</h2>
      </div>
    </section>
  );
}
