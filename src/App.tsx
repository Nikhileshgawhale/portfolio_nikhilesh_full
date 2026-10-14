import React, { Suspense, lazy, useCallback, useState } from "react";
import { View } from "./scene/stations";
import { Hud, Intro, Panel } from "./ui/LabUI";
import ClassicView from "./ui/ClassicView";

const Scene = lazy(() => import("./scene/Scene"));

const hasWebGL = (() => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
})();

type Mode = "lab" | "classic";

export default function App() {
  const initialMode: Mode = !hasWebGL || window.location.hash === "#classic" ? "classic" : "lab";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [started, setStarted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [view, setView] = useState<View>("home");

  const select = useCallback((v: View) => setView(v), []);

  const toClassic = () => {
    setMode("classic");
    setView("home");
    window.history.replaceState(null, "", "#classic");
    window.scrollTo(0, 0);
  };
  const toLab = () => {
    setMode("lab");
    setStarted(true);
    window.history.replaceState(null, "", window.location.pathname);
  };

  if (mode === "classic") return <ClassicView onEnterLab={hasWebGL ? toLab : undefined} />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050507] text-white">
      <Suspense fallback={null}>
        <Scene
          view={started ? view : "home"}
          onSelect={select}
          panelOpen={view !== "home"}
          onReady={() => setSceneReady(true)}
        />
      </Suspense>

      {started && (
        <>
          <Hud view={view} onSelect={select} onClassic={toClassic} />
          <Panel view={view} onSelect={select} />
        </>
      )}

      <Intro visible={!started} ready={sceneReady} onStart={() => setStarted(true)} onClassic={toClassic} />
    </div>
  );
}
