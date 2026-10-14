import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Post, getPost, posts } from "../data/blog";
import { profile } from "../data/profile";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const postHref = (slug: string) => `#blog/${slug}`;

export function BlogContent() {
  return (
    <div className="grid gap-4">
      <p className="text-muted leading-relaxed">
        I read new AI research papers and write down what I'd actually change in production RAG, fine-tuning and
        agent systems because of them.
      </p>
      {posts.map((p, i) => (
        <a key={p.slug} href={postHref(p.slug)} className="group glass-card p-5 block transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5">
          <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span>{formatDate(p.date)}</span>
            <span>·</span>
            <span>{p.readMinutes} min read</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white mt-2 leading-snug group-hover:text-accent transition-colors">
            {p.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mt-2">{p.excerpt}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {p.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            <span className="ml-auto font-mono text-[11px] text-mint group-hover:text-white transition-colors">Read →</span>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ---------- tiny markdown renderer for post bodies ---------- */

function inline(text: string, keyBase: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**")) return <strong key={keyBase + i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={keyBase + i} className="inline-code">{part.slice(1, -1)}</code>;
    return part;
  });
}

function Markdown({ source }: { source: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = source.trim().split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = `b${i}`;
    if (!line.trim()) {
      i++;
    } else if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key} className="code-block">
          <code>{code.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={key} className="font-display text-2xl font-bold text-white mt-12 mb-4">{line.slice(3)}</h2>);
      i++;
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={key} className="border-l-2 border-accent pl-5 my-6 font-display text-xl text-white/90">
          {inline(line.slice(2), key)}
        </blockquote>
      );
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push(
        <ul key={key} className="my-5 space-y-2.5">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{inline(it, key + j)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(```|## |> |- )/.test(lines[i])) para.push(lines[i++]);
      blocks.push(<p key={key} className="my-5">{inline(para.join(" "), key)}</p>);
    }
  }
  return <>{blocks}</>;
}

export function ArticleView({ slug, onClose }: { slug: string; onClose: () => void }) {
  const post = getPost(slug);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    if (post) document.title = `${post.title} | ${profile.name}`;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.title = `${profile.name} | GenAI / ML Engineer`;
    };
  }, [slug, post, onClose]);

  const index = posts.findIndex((p) => p.slug === slug);
  const next: Post | undefined = posts[(index + 1) % posts.length];

  return (
    <motion.div
      ref={scroller}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-surface text-white bg-grid"
    >
      <div className="sticky top-0 z-10 bg-surface/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button type="button" onClick={onClose} className="font-mono text-xs text-muted hover:text-white transition-colors">
            ← Back
          </button>
          <span className="font-display font-bold">
            NG<span className="text-accent">.</span> <span className="font-mono text-xs text-muted font-normal ml-1">/ blog</span>
          </span>
        </div>
      </div>

      {!post ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-muted">That post doesn't exist.</p>
        </div>
      ) : (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-24">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            {post.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            <span className="ml-1">
              {formatDate(post.date)} · {post.readMinutes} min read
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight mt-5">{post.title}</h1>
          <p className="text-lg text-muted mt-5 leading-relaxed">{post.excerpt}</p>

          <a href={post.paper.url} target="_blank" rel="noopener noreferrer" className="group block glass-card p-5 mt-8 hover:border-accent/50 transition-colors">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Paper</p>
            <p className="font-semibold text-white mt-2 leading-snug group-hover:text-accent transition-colors">{post.paper.title}</p>
            <p className="text-sm text-muted mt-1">{post.paper.authors}</p>
            <p className="font-mono text-xs text-mint mt-2">{post.paper.venue} ↗</p>
          </a>

          <div className="prose-body mt-10">
            <Markdown source={post.body} />
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
            <div>
              <p className="font-display font-bold">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title}</p>
            </div>
            {next && next.slug !== post.slug && (
              <a href={postHref(next.slug)} className="glass-card p-4 max-w-sm hover:border-accent/50 transition-colors">
                <p className="font-mono text-[11px] text-muted">Next post →</p>
                <p className="text-white font-semibold mt-1 leading-snug">{next.title}</p>
              </a>
            )}
          </div>
        </article>
      )}
    </motion.div>
  );
}
