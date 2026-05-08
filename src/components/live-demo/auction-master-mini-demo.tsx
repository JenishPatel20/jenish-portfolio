"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { auctionDemo, auctionRoleViews, type AuctionRole } from "@/data/live-demo/auction-demo";

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const roleOrder: AuctionRole[] = ["buyer", "customer-representative", "admin"];

export function AuctionMasterMiniDemo() {
  const [activeRole, setActiveRole] = useState<AuctionRole>("buyer");
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= auctionDemo.durationSeconds) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing]);

  const visibleBids = auctionDemo.bids.filter((bid) => bid.revealAtSecond <= elapsed);
  const currentBid = visibleBids.length > 0 ? visibleBids[visibleBids.length - 1].amount : auctionDemo.startingPrice;
  const reserveMet = currentBid >= auctionDemo.reservePrice;
  const secondsRemaining = Math.max(auctionDemo.durationSeconds - elapsed, 0);
  const nextMinimumBid = currentBid + auctionDemo.minimumIncrement;
  const activeRoleView = auctionRoleViews[activeRole];

  return (
    <div className="glass-card h-full p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label mb-2">Full Stack Demo</p>
          <h3 className="text-xl font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
            Auction Master Mini Demo
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
            A read-only auction snapshot that highlights live bidding behavior, reserve enforcement, and role-based product thinking.
          </p>
        </div>

        <Link
          href="/projects/auction-master"
          className="inline-flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: "var(--color-pg-text-3)" }}
        >
          Full case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div
          className="rounded-[1.75rem] border p-5"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background:
              "radial-gradient(circle at top, rgba(34,211,238,0.08), transparent 36%), rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                {auctionDemo.title}
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
                {auctionDemo.subtitle}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                Time left
              </p>
              <p className="mt-2 text-2xl font-semibold tabular-nums" style={{ color: "var(--color-pg-text-1)" }}>
                {formatTime(secondsRemaining)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                Current bid
              </p>
              <p className="mt-2 text-xl font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
                {formatCurrency(currentBid)}
              </p>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                Reserve
              </p>
              <p
                className="mt-2 text-xl font-semibold"
                style={{ color: reserveMet ? "var(--color-pg-cyan)" : "var(--color-pg-text-1)" }}
              >
                {reserveMet ? "Met" : "Locked"}
              </p>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                Next min bid
              </p>
              <p className="mt-2 text-xl font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
                {formatCurrency(nextMinimumBid)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {auctionDemo.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  color: "var(--color-pg-text-2)",
                  borderColor: "rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
                Bid activity
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlaying((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                  style={{
                    color: "var(--color-pg-text-1)",
                    background: "rgba(34,211,238,0.12)",
                    border: "1px solid rgba(34,211,238,0.28)",
                  }}
                >
                  {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {playing ? "Pause" : "Resume"}
                </button>

                <button
                  onClick={() => {
                    setElapsed(0);
                    setPlaying(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                  style={{
                    color: "var(--color-pg-text-2)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Replay
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {visibleBids.length === 0 && (
                <div
                  className="rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "var(--color-pg-text-3)",
                    background: "rgba(255,255,255,0.025)",
                  }}
                >
                  Watching for incoming bids...
                </div>
              )}

              {visibleBids.map((bid, index) => (
                <motion.div
                  key={`${bid.bidder}-${bid.amount}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="flex items-center justify-between rounded-2xl border px-4 py-3"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: index === visibleBids.length - 1 ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.025)",
                  }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-pg-text-1)" }}>
                      {bid.bidder}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-pg-text-3)" }}>
                      +{bid.revealAtSecond}s into the auction
                    </p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums" style={{ color: "var(--color-pg-text-1)" }}>
                    {formatCurrency(bid.amount)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {roleOrder.map((role) => {
              const active = role === activeRole;
              return (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
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
                  {auctionRoleViews[role].label}
                </button>
              );
            })}
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-pg-text-3)" }}>
              {activeRoleView.headline}
            </p>
            <div className="mt-3 space-y-3">
              {activeRoleView.bullets.map((bullet) => (
                <p key={bullet} className="text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
                  {bullet}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
