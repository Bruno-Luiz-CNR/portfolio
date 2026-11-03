"use client";
import { useEffect, useState } from "react";

const words = ["Back-End", "APIs REST", "Automação", "Dados & SQL", "Node.js · Java"];

export default function Rotator() {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, n = words[0].length, dir = -1, t: ReturnType<typeof setTimeout>;
    const step = () => {
      n += dir;
      setText(words[w].slice(0, n));
      let delay = dir < 0 ? 40 : 80;
      if (dir < 0 && n === 0) { w = (w + 1) % words.length; dir = 1; delay = 250; }
      else if (dir > 0 && n === words[w].length) { dir = -1; delay = 2200; }
      t = setTimeout(step, delay);
    };
    t = setTimeout(step, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="grad rotator">
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}
