'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  MarkerType,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  ViewportPortal,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  useStore,
  useViewport,
} from '@xyflow/react';
import { useReducedMotion } from 'motion/react';
import { Button } from '@road-to-dev/ui/components/button';
import { Icon } from '@road-to-dev/ui/components/icon';
import { Sheet } from '@road-to-dev/ui/components/sheet';
import { Tooltip } from '@road-to-dev/ui/components/tooltip';
import { CategoryRegion } from './category-region';
import { ObservatoryBackdrop } from './observatory-backdrop';
import {
  constrainViewport,
  getCamera,
  getInitialViewport,
  getTranslateExtent,
  getWorldBounds,
  revealRect,
} from './viewport';
import { MapActionsContext } from './map-actions';
import { SkillNode, type SkillFlowNode } from './skill-node';
import { SkillEdge, type SkillFlowEdge } from './skill-edge';
import { SkillDetailsPanel } from './skill-details-panel';
import { ActivityDemo } from './activity-demo';
import { skills } from './fixtures/skills';
import { progress } from './fixtures/progress';
import {
  getFixtureStatus,
  isFixtureRequirementMet,
} from './fixtures/availability';
import {
  NODE_HEIGHT,
  NODE_WIDTH,
  crossCategoryRoutes,
  positions,
  regions,
} from './layout';
import {
  categories,
  type Activity,
  type CategoryId,
  type SkillId,
} from './types';

const initialNodes: SkillFlowNode[] = Object.values(skills).map((skill) => ({
  id: skill.id,
  type: 'skill',
  position: positions[skill.id],
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  draggable: false,
  connectable: false,
  deletable: false,
  focusable: false,
  data: { skill, status: getFixtureStatus(skill, progress) },
}));

const nodeTypes = { skill: SkillNode };
const edgeTypes = { skill: SkillEdge };
const categoryIds = Object.keys(categories) as CategoryId[];
const getMobileSnapshot = () =>
  window.matchMedia('(max-width: 1024px)').matches;
const getServerSnapshot = () => false;
function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia('(max-width: 1024px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function SkillMapCanvas() {
  const [measuredNodes, , onNodesChange] = useNodesState(initialNodes);
  const [selectedId, setSelectedId] = useState<SkillId | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const mobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getServerSnapshot,
  );
  const reducedMotion = useReducedMotion();
  const canvas = useRef<HTMLDivElement>(null);
  const lastFocusedNode = useRef<SkillId | null>(null);
  const initialized = useRef(false);
  const flow = useReactFlow<SkillFlowNode, SkillFlowEdge>();
  const { zoom } = useViewport();
  const nodesReady = useNodesInitialized();
  const canvasWidth = useStore((state) => state.width);
  const canvasHeight = useStore((state) => state.height);
  const cameraReady =
    nodesReady &&
    flow.viewportInitialized &&
    canvasWidth > 0 &&
    canvasHeight > 0;
  const selectedSkill = selectedId ? skills[selectedId] : null;
  const duration = reducedMotion ? 0 : 200;

  const bounds = useMemo(
    () =>
      getWorldBounds(
        nodesReady ? flow.getNodesBounds(flow.getNodes()) : undefined,
      ),
    [nodesReady, flow],
  );
  const camera = useMemo(
    () => getCamera(bounds, canvasWidth, canvasHeight, mobile),
    [bounds, canvasWidth, canvasHeight, mobile],
  );
  const translateExtent = useMemo(
    () => getTranslateExtent(camera, zoom),
    [camera, zoom],
  );

  const revealNode = useCallback(
    (id: SkillId) => {
      if (!nodesReady) return;
      const next = revealRect(
        flow.getViewport(),
        {
          ...positions[id],
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        },
        camera,
      );
      void flow.setViewport(next);
    },
    [flow, camera, nodesReady],
  );

  const selectSkill = useCallback((id: SkillId) => {
    lastFocusedNode.current = id;
    setSelectedId(id);
    setActivity(null);
  }, []);

  const restoreNodeFocus = useCallback(() => {
    const id = lastFocusedNode.current;
    if (id)
      requestAnimationFrame(() =>
        document.getElementById(`skill-${id}`)?.focus({ preventScroll: true }),
      );
  }, []);

  const closePanel = useCallback(() => {
    setSelectedId(null);
    if (!mobile) restoreNodeFocus();
  }, [mobile, restoreNodeFocus]);

  useEffect(() => {
    if (
      !nodesReady ||
      !flow.viewportInitialized ||
      !canvasWidth ||
      !canvasHeight
    )
      return;
    if (!initialized.current) {
      initialized.current = true;
      void flow.setViewport(getInitialViewport(camera));
    } else if (selectedId) {
      revealNode(selectedId);
    } else {
      // Clamp an existing camera after resize; never refit or reset exploration.
      void flow.setViewport(constrainViewport(flow.getViewport(), camera));
    }
  }, [
    nodesReady,
    canvasWidth,
    canvasHeight,
    camera,
    flow,
    selectedId,
    revealNode,
  ]);

  useEffect(() => {
    if (!selectedId || mobile || activity) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        closePanel();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedId, mobile, activity, closePanel]);

  const nodes = useMemo(
    () =>
      measuredNodes.map((node) => ({
        ...node,
        selected: selectedId === node.id,
      })),
    [measuredNodes, selectedId],
  );

  const edges = useMemo<SkillFlowEdge[]>(
    () =>
      Object.values(skills).flatMap((skill) =>
        skill.prerequisites.map((requirement) => {
          const source = skills[requirement.skillId];
          const fulfilled = isFixtureRequirementMet(requirement, progress);
          const highlighted =
            selectedId === skill.id || selectedId === source.id;
          const color =
            fulfilled || highlighted
              ? `var(--rtd-${source.category})`
              : 'var(--rtd-edge-muted)';
          const route = crossCategoryRoutes[`${source.id}:${skill.id}`];
          return {
            id: `${source.id}:${skill.id}`,
            source: source.id,
            target: skill.id,
            type: 'skill',
            sourceHandle: route?.sourceHandle ?? 'bottom',
            targetHandle: route?.targetHandle ?? 'top',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color,
              width: 16,
              height: 16,
            },
            focusable: false,
            selectable: false,
            deletable: false,
            data: {
              fulfilled,
              highlighted,
              color,
              ...(route?.corridorY === undefined
                ? {}
                : { corridorY: route.corridorY }),
              ...(route?.corridorX === undefined
                ? {}
                : { corridorX: route.corridorX }),
            },
          };
        }),
      ),
    [selectedId],
  );

  function fitMap() {
    void flow.setViewport(getInitialViewport(camera), { duration });
  }

  function changeZoom(factor: number) {
    const current = flow.getViewport();
    const nextZoom = Math.max(
      camera.minZoom,
      Math.min(camera.maxZoom, current.zoom * factor),
    );
    const ratio = nextZoom / current.zoom;
    void flow.setViewport(
      constrainViewport(
        {
          x: canvasWidth / 2 - (canvasWidth / 2 - current.x) * ratio,
          y: canvasHeight / 2 - (canvasHeight / 2 - current.y) * ratio,
          zoom: nextZoom,
        },
        camera,
      ),
      { duration },
    );
  }

  function focusCategory(category: CategoryId) {
    const region = regions[category];
    const current = flow.getViewport();
    void flow.setViewport(
      constrainViewport(
        {
          ...current,
          x:
            (canvasWidth - region.width * current.zoom) / 2 -
            region.x * current.zoom,
          y: camera.padding.top - region.y * current.zoom,
        },
        camera,
      ),
      { duration },
    );
  }

  const details = selectedSkill && (
    <SkillDetailsPanel
      skill={selectedSkill}
      modal={mobile}
      onClose={closePanel}
      onSelect={selectSkill}
      onActivity={setActivity}
    />
  );

  return (
    <div className="map-workspace">
      <MapActionsContext.Provider value={{ selectSkill, revealNode }}>
        <div
          ref={canvas}
          className="map-canvas"
          data-testid="map-canvas"
          aria-busy={!cameraReady}
        >
          <ObservatoryBackdrop />
          <ReactFlow<SkillFlowNode, SkillFlowEdge>
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            edgesFocusable={false}
            edgesReconnectable={false}
            elementsSelectable={false}
            deleteKeyCode={null}
            selectionKeyCode={null}
            multiSelectionKeyCode={null}
            minZoom={camera.minZoom}
            maxZoom={camera.maxZoom}
            translateExtent={translateExtent}
            zoomOnDoubleClick={false}
            zoomOnScroll={false}
            panOnDrag
            panOnScroll={false}
            zoomActivationKeyCode={null}
            zoomOnPinch
            preventScrolling
            autoPanOnNodeFocus={false}
            colorMode="light"
            attributionPosition="bottom-right"
            aria-label="Mapa interativo de skills do mundo Inicial"
          >
            <ViewportPortal>
              <div className="category-regions">
                {categoryIds.map((category) => (
                  <CategoryRegion key={category} category={category} />
                ))}
              </div>
            </ViewportPortal>
            <Panel position="top-left" className="mobile-category-nav">
              <nav aria-label="Explorar categorias">
                {categoryIds.map((category) => (
                  <button
                    key={category}
                    onClick={() => focusCategory(category)}
                    data-category={category}
                    disabled={!cameraReady}
                  >
                    {categories[category].name}
                  </button>
                ))}
              </nav>
            </Panel>
            <Panel position="bottom-left" className="map-footer-note">
              <Icon name="info" size={15} />
              <span>Exploração de exemplo</span>
              <span className="map-gesture-hint">Arraste para explorar</span>
            </Panel>
            <Panel position="bottom-right" className="map-controls">
              <Tooltip content="Diminuir zoom">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Diminuir zoom"
                  onClick={() => changeZoom(1 / 1.2)}
                  disabled={!cameraReady || zoom <= camera.minZoom + 0.001}
                >
                  <Icon name="minus" />
                </Button>
              </Tooltip>
              <span className="zoom-value" aria-live="off">
                {Math.round(zoom * 100)}%
              </span>
              <Tooltip content="Aumentar zoom">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Aumentar zoom"
                  onClick={() => changeZoom(1.2)}
                  disabled={!cameraReady || zoom >= camera.maxZoom - 0.001}
                >
                  <Icon name="plus" />
                </Button>
              </Tooltip>
              <span className="control-divider" />
              <Tooltip content="Centralizar">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Centralizar"
                  onClick={fitMap}
                  disabled={!cameraReady}
                >
                  <Icon name="fit" />
                </Button>
              </Tooltip>
            </Panel>
          </ReactFlow>
        </div>
      </MapActionsContext.Provider>
      {selectedSkill && !mobile && (
        <aside
          className="desktop-skill-panel"
          aria-labelledby="skill-details-title"
        >
          {details}
        </aside>
      )}
      <Sheet
        open={mobile && selectedSkill !== null}
        onOpenChange={(open) => {
          if (!open) closePanel();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          restoreNodeFocus();
        }}
      >
        {mobile && details}
      </Sheet>
      {selectedSkill && (
        <ActivityDemo
          activity={activity}
          skill={selectedSkill}
          onClose={() => setActivity(null)}
        />
      )}
      <div className="sr-only" role="status" aria-live="polite">
        {selectedSkill
          ? `${selectedSkill.name}. ${getFixtureStatus(selectedSkill, progress) === 'locked' ? 'Bloqueada. Consulte os pré-requisitos.' : 'Detalhes disponíveis.'}`
          : 'Nenhuma skill selecionada.'}
      </div>
    </div>
  );
}

export function WorldSkillMap() {
  return (
    <ReactFlowProvider>
      <SkillMapCanvas />
    </ReactFlowProvider>
  );
}
