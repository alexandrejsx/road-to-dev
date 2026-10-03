import {
  getViewportForBounds,
  type CoordinateExtent,
  type Rect,
  type Viewport,
} from '@xyflow/react';
import { NODE_HEIGHT, NODE_WIDTH, regions } from './layout';

export function getWorldBounds(nodeBounds?: Rect): Rect {
  // Region headings live inside these same rectangles in ViewportPortal.
  const rectangles = [
    ...Object.values(regions),
    ...(nodeBounds ? [nodeBounds] : []),
  ];
  const x = Math.min(...rectangles.map((rect) => rect.x));
  const y = Math.min(...rectangles.map((rect) => rect.y));
  return {
    x,
    y,
    width: Math.max(...rectangles.map((rect) => rect.x + rect.width)) - x,
    height: Math.max(...rectangles.map((rect) => rect.y + rect.height)) - y,
  };
}

export function getCamera(
  bounds: Rect,
  width: number,
  height: number,
  compact: boolean,
) {
  const padding = { left: 32, right: 32, top: compact ? 80 : 24, bottom: 80 };
  const usefulWidth = Math.max(1, width - padding.left - padding.right);
  const usefulHeight = Math.max(1, height - padding.top - padding.bottom);
  const fit = getViewportForBounds(
    bounds,
    usefulWidth,
    usefulHeight,
    0.01,
    Number.MAX_VALUE,
    0,
  );
  // At least ~13px skill names; smaller screens explore a partial world.
  const readableFit =
    width <= 640 ? usefulWidth / regions.knowledge.width : fit.zoom * 0.85;
  const minZoom = Math.max(0.8, Math.min(1, readableFit));
  const maxZoom = Math.max(
    minZoom,
    Math.min(2, usefulWidth / NODE_WIDTH, usefulHeight / NODE_HEIGHT),
  );
  return { bounds, width, height, padding, minZoom, maxZoom };
}

export type Camera = ReturnType<typeof getCamera>;

export function getTranslateExtent(
  camera: Camera,
  zoom: number,
): CoordinateExtent {
  const { bounds, padding } = camera;
  return [
    [bounds.x - padding.left / zoom, bounds.y - padding.top / zoom],
    [
      bounds.x + bounds.width + padding.right / zoom,
      bounds.y + bounds.height + padding.bottom / zoom,
    ],
  ];
}

export function constrainViewport(
  viewport: Viewport,
  camera: Camera,
): Viewport {
  const zoom = Math.max(
    camera.minZoom,
    Math.min(camera.maxZoom, viewport.zoom),
  );
  const [min, max] = getTranslateExtent(camera, zoom);
  function axis(value: number, size: number, start: number, end: number) {
    const lower = size - end * zoom;
    const upper = -start * zoom;
    // Same constraint as d3/React Flow: deliberately center the smaller axis.
    return lower > upper
      ? (lower + upper) / 2
      : Math.max(lower, Math.min(upper, value));
  }
  return {
    x: axis(viewport.x, camera.width, min[0], max[0]),
    y: axis(viewport.y, camera.height, min[1], max[1]),
    zoom,
  };
}

export function getInitialViewport(camera: Camera): Viewport {
  const { bounds, width, height, padding, minZoom } = camera;
  const viewport = getViewportForBounds(
    bounds,
    Math.max(1, width - padding.left - padding.right),
    Math.max(1, height - padding.top - padding.bottom),
    minZoom,
    1,
    0,
  );
  return constrainViewport(
    {
      ...viewport,
      x:
        width <= 640
          ? padding.left - bounds.x * viewport.zoom
          : viewport.x + padding.left,
      y: Math.max(
        viewport.y + padding.top,
        padding.top - bounds.y * viewport.zoom,
      ),
    },
    camera,
  );
}

export function revealRect(
  viewport: Viewport,
  rect: Rect,
  camera: Camera,
): Viewport {
  const current = constrainViewport(viewport, camera);
  const { padding, width, height } = camera;
  function shift(
    start: number,
    size: number,
    available: number,
    before: number,
    after: number,
  ) {
    if (start < before) return before - start;
    if (start + size > available - after)
      return available - after - start - size;
    return 0;
  }
  return constrainViewport(
    {
      ...current,
      x:
        current.x +
        shift(
          rect.x * current.zoom + current.x,
          rect.width * current.zoom,
          width,
          padding.left,
          padding.right,
        ),
      y:
        current.y +
        shift(
          rect.y * current.zoom + current.y,
          rect.height * current.zoom,
          height,
          padding.top,
          padding.bottom,
        ),
    },
    camera,
  );
}
