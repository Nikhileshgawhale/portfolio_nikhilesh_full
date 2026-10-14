import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { View } from "./scene/stations";
import { Hud, Intro, Panel } from "./ui/LabUI";
import ClassicView from "./ui/ClassicView";
import { ArticleView } from "./ui/Blog";

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

const articleFromHash = () => window.location.hash.match(/^#blog\/([\w-]+)$/)?.[1] ?? null;

export default function App() {
  const initialMode: Mode = !hasWebGL || window.location.hash === "#classic" ? "classic" : "lab";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [started, setStarted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [view, setView] = useState<View>("home");

  const select = useCallback((v: View) => setView(v), []);

  // Blog posts live at #blog/<slug> so they can be shared and opened directly.
  const [article, setArticle] = useState<string | null>(articleFromHash);
  const returnHash = useRef("");
  useEffect(() => {
    let last = window.location.hash;
    const onHash = () => {
      const slug = articleFromHash();
      if (slug && !last.startsWith("#blog/")) returnHash.current = last;
      last = window.location.hash;
      setArticle(slug);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const closeArticle = useCallback(() => {
    const back = returnHash.current || (mode === "classic" ? "#classic" : "");
    window.history.pushState(null, "", back || window.location.pathname);
    returnHash.current = "";
    setArticle(null);
  }, [mode]);
  const reader = <AnimatePresence>{article && <ArticleView key={article} slug={article} onClose={closeArticle} />}</AnimatePresence>;

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

  if (mode === "classic")
    return (
      <>
        <ClassicView onEnterLab={hasWebGL ? toLab : undefined} />
        {reader}
      </>
    );

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
      {reader}
    </div>
  );
}
