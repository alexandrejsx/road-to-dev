import { describe, expect, it } from 'vitest';
import { getNodesBounds } from '@xyflow/react';
import {
  constrainViewport,
  getCamera,
  getInitialViewport,
  getWorldBounds,
  revealRect,
} from './viewport';

const world = getWorldBounds();

describe('finite map camera', () => {
  it('includes measured nodes outside the regions and the region headings', () => {
    expect(
      getWorldBounds(
        getNodesBounds([
          {
            id: 'outside',
            position: { x: 1200, y: -40 },
            data: {},
            measured: { width: 200, height: 100 },
            width: 10,
            height: 10,
          },
        ]),
      ),
    ).toEqual({ x: 0, y: -40, width: 1400, height: 680 });
  });

  it.each([
    [1440, 772],
    [2560, 1312],
    [390, 684],
    [320, 400],
  ])(
    'keeps the world visible at all pan/zoom extremes in %s × %s',
    (width, height) => {
      const camera = getCamera(world, width, height, width <= 1024);
      for (const zoom of [0.01, 1, 100]) {
        for (const x of [-100000, 100000]) {
          for (const y of [-100000, 100000]) {
            const next = constrainViewport({ x, y, zoom }, camera);
            expect(next.zoom).toBeGreaterThanOrEqual(camera.minZoom);
            expect(next.zoom).toBeLessThanOrEqual(camera.maxZoom);
            expect(next.x).toBeLessThan(width);
            expect(next.y).toBeLessThan(height);
            expect(next.x + world.width * next.zoom).toBeGreaterThan(0);
            expect(next.y + world.height * next.zoom).toBeGreaterThan(0);
            expect(constrainViewport(next, camera)).toEqual(next);
          }
        }
      }
    },
  );

  it('centers a world smaller than the viewport on both axes', () => {
    const camera = getCamera(world, 2560, 1400, false);
    const first = constrainViewport({ x: -9999, y: 9999, zoom: 1 }, camera);
    const last = constrainViewport({ x: 9999, y: -9999, zoom: 1 }, camera);
    expect(first).toEqual(last);
    expect(first.x + world.width / 2).toBe(1280);
    expect(first.y + world.height / 2).toBe((1400 + 24 - 80) / 2);
  });

  it('uses useful partial views on a phone, with legible names', () => {
    const camera = getCamera(world, 390, 684, true);
    const viewport = getInitialViewport(camera);
    expect(viewport.zoom * 16).toBeGreaterThanOrEqual(12.8);
    expect(viewport.x).toBe(camera.padding.left);
    expect(world.width * viewport.zoom).toBeGreaterThan(camera.width);
    expect(viewport.y).toBe(camera.padding.top);
    expect(camera.minZoom).not.toBe(getCamera(world, 1440, 772, false).minZoom);
  });

  it('reveals the selection after panel resize without changing zoom', () => {
    const wide = getCamera(world, 1440, 772, false);
    const narrow = getCamera(world, 1056, 772, false);
    const current = getInitialViewport(wide);
    const selection = { x: 896, y: 480, width: 176, height: 136 };
    const next = revealRect(current, selection, narrow);
    expect(next.zoom).toBe(current.zoom);
    expect(
      next.x + (selection.x + selection.width) * next.zoom,
    ).toBeLessThanOrEqual(1056 - narrow.padding.right);
    expect(
      next.y + (selection.y + selection.height) * next.zoom,
    ).toBeLessThanOrEqual(772 - narrow.padding.bottom);
    expect(revealRect(next, selection, narrow)).toEqual(next);
  });
});
