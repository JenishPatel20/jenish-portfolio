"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { motion } from "motion/react";
import { buildChessBoardStates, chessSequences, type ChessPiece } from "@/data/live-demo/chess-demo";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

function getPieceLabel(piece: ChessPiece) {
  switch (piece.kind) {
    case "king":
      return "K";
    case "queen":
      return "Q";
    case "rook":
      return "R";
    case "bishop":
      return "B";
    case "knight":
      return "N";
    case "pawn":
      return "P";
  }
}

export function ChessReplayDemo() {
  const [sequenceId, setSequenceId] = useState(chessSequences[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const activeSequence = chessSequences.find((sequence) => sequence.id === sequenceId) ?? chessSequences[0];
  const states = buildChessBoardStates(activeSequence);
  const activeState = states[stepIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= states.length - 1) {
          window.clearInterval(timer);
          setPlaying(false);
          return current;
        }

        const nextStep = current + 1;
        if (nextStep >= states.length - 1) {
          window.clearInterval(timer);
          setPlaying(false);
        }

        return nextStep;
      });
    }, 1150);

    return () => window.clearInterval(timer);
  }, [playing, states.length]);

  const highlightSquares = new Set<string>();
  if (activeState.lastMove) {
    highlightSquares.add(activeState.lastMove.from);
    highlightSquares.add(activeState.lastMove.to);
    if (activeState.lastMove.captureSquare) {
      highlightSquares.add(activeState.lastMove.captureSquare);
    }
    if (activeState.lastMove.castle) {
      highlightSquares.add(activeState.lastMove.castle.rookFrom);
      highlightSquares.add(activeState.lastMove.castle.rookTo);
    }
  }

  return (
    <div className="glass-card h-full p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label mb-2">Systems Demo</p>
          <h3 className="text-xl font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
            Chess Engine Move Replay
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
            Pre-scripted rule demonstrations for special moves and fast tactical outcomes, without needing a backend engine in the portfolio.
          </p>
        </div>

        <Link
          href="/projects/chess-engine"
          className="inline-flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: "var(--color-pg-text-3)" }}
        >
          Full case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {chessSequences.map((sequence) => {
          const active = sequence.id === sequenceId;
          return (
            <button
              key={sequence.id}
              onClick={() => {
                setSequenceId(sequence.id);
                setStepIndex(0);
                setPlaying(false);
              }}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
              style={
                active
                  ? {
                      color: "var(--color-pg-text-1)",
                      background: "rgba(96,165,250,0.12)",
                      border: "1px solid rgba(96,165,250,0.28)",
                    }
                  : {
                      color: "var(--color-pg-text-2)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {sequence.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div
          className="rounded-[1.5rem] border p-4"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background:
              "radial-gradient(circle at top, rgba(96,165,250,0.08), transparent 40%), rgba(255,255,255,0.02)",
          }}
        >
          <div className="grid grid-cols-8 gap-1">
            {RANKS.flatMap((rank, rankIndex) =>
              FILES.map((file, fileIndex) => {
                const square = `${file}${rank}`;
                const piece = activeState.pieces.find((entry) => entry.square === square);
                const isDark = (rankIndex + fileIndex) % 2 === 1;
                const highlighted = highlightSquares.has(square);

                return (
                  <div
                    key={square}
                    className="relative aspect-square rounded-xl border"
                    style={{
                      background: isDark ? "rgba(96,165,250,0.08)" : "rgba(255,255,255,0.035)",
                      borderColor: highlighted ? activeSequence.accent : "rgba(255,255,255,0.04)",
                      boxShadow: highlighted ? `0 0 0 1px ${activeSequence.accent} inset` : "none",
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 text-[10px]"
                      style={{ color: "rgba(255,255,255,0.18)" }}
                    >
                      {square}
                    </span>
                    {piece && (
                      <motion.div
                        layout
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-2 flex items-center justify-center rounded-full text-sm font-semibold"
                        style={{
                          background:
                            piece.color === "white"
                              ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(238,238,242,0.75))"
                              : "linear-gradient(135deg, rgba(96,165,250,0.28), rgba(167,139,250,0.45))",
                          color: piece.color === "white" ? "#11131b" : "#f8fafc",
                          boxShadow:
                            piece.color === "white"
                              ? "0 10px 24px rgba(255,255,255,0.12)"
                              : "0 10px 24px rgba(96,165,250,0.18)",
                        }}
                      >
                        {getPieceLabel(piece)}
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
              Current Step
            </p>
            <p className="mt-2 text-lg font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
              {activeState.lastMove?.label ?? activeSequence.title}
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
              {activeState.note}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                if (stepIndex >= states.length - 1) {
                  setStepIndex(0);
                  setPlaying(true);
                  return;
                }

                setPlaying((current) => !current);
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
              style={{
                color: "var(--color-pg-text-1)",
                background: "rgba(96,165,250,0.12)",
                border: "1px solid rgba(96,165,250,0.28)",
              }}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play"}
            </button>

            <button
              onClick={() => setStepIndex((current) => Math.min(current + 1, states.length - 1))}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
              style={{
                color: "var(--color-pg-text-2)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <SkipForward className="h-3.5 w-3.5" />
              Step
            </button>

            <button
              onClick={() => {
                setPlaying(false);
                setStepIndex(0);
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
              style={{
                color: "var(--color-pg-text-2)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="mb-3 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                animate={{
                  width: `${(stepIndex / Math.max(states.length - 1, 1)) * 100}%`,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: `linear-gradient(90deg, ${activeSequence.accent}, rgba(255,255,255,0.8))`,
                }}
              />
            </div>
            <p className="text-xs" style={{ color: "var(--color-pg-text-3)" }}>
              Move {stepIndex} of {states.length - 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
