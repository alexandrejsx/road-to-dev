import { pixelAssets, type PixelIconName } from '../lib/pixel-assets';

export function PixelIcon({
  name,
  size = 48,
  className,
}: {
  name: PixelIconName;
  size?: 24 | 48 | 72;
  className?: string;
}) {
  const asset = pixelAssets[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${asset.size} ${asset.size}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {asset.layers.map((layer, index) => (
        <path key={index} d={layer.path} fill={layer.fill} />
      ))}
    </svg>
  );
}
