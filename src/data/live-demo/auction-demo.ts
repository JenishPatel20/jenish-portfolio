export type AuctionRole = "buyer" | "customer-representative" | "admin";

export interface AuctionBid {
  bidder: string;
  amount: number;
  revealAtSecond: number;
}

export const auctionDemo = {
  title: "Sample live auction listing",
  subtitle: "Read-only frontend snapshot of reserve enforcement, bids, and role-based views.",
  startingPrice: 240,
  reservePrice: 320,
  minimumIncrement: 20,
  durationSeconds: 42,
  bids: [
    { bidder: "Buyer A", amount: 260, revealAtSecond: 6 },
    { bidder: "Buyer B", amount: 300, revealAtSecond: 15 },
    { bidder: "Buyer C", amount: 340, revealAtSecond: 28 },
  ] satisfies AuctionBid[],
  features: [
    "Preference-matched email notifications",
    "Reserve-price enforcement",
    "Role-based dashboards",
    "Image upload ready",
  ] as const,
};

export const auctionRoleViews: Record<
  AuctionRole,
  {
    label: string;
    headline: string;
    bullets: string[];
  }
> = {
  buyer: {
    label: "Buyer",
    headline: "Bid flow and reserve logic",
    bullets: [
      "Watch the current price rise as new bids arrive.",
      "The next legal bid respects the configured minimum increment.",
      "Reserve status flips automatically once the threshold is met.",
    ],
  },
  "customer-representative": {
    label: "CR",
    headline: "Listing management snapshot",
    bullets: [
      "Auction metadata and image assets are already attached to the listing.",
      "Preference-matched notification flow is ready to trigger on publish.",
      "The view stays read-only here, but mirrors the posting workflow conceptually.",
    ],
  },
  admin: {
    label: "Admin",
    headline: "Oversight and reporting surface",
    bullets: [
      "Role separation keeps administrative views distinct from bidding actions.",
      "Reserve enforcement and bid history feed downstream reporting.",
      "This mini demo focuses on monitoring signals instead of editable controls.",
    ],
  },
};
