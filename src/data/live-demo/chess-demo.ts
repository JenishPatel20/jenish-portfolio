export type ChessPieceKind =
  | "king"
  | "queen"
  | "rook"
  | "bishop"
  | "knight"
  | "pawn";

export interface ChessPiece {
  id: string;
  color: "white" | "black";
  kind: ChessPieceKind;
  square: string;
}

export interface ChessMove {
  label: string;
  from: string;
  to: string;
  note: string;
  captureSquare?: string;
  castle?: {
    rookFrom: string;
    rookTo: string;
  };
  promoteTo?: ChessPieceKind;
}

export interface ChessSequence {
  id: string;
  title: string;
  summary: string;
  accent: string;
  moves: ChessMove[];
}

export interface ChessBoardState {
  moveIndex: number;
  pieces: ChessPiece[];
  note: string;
  lastMove?: ChessMove;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const BACK_RANK: ChessPieceKind[] = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
];

function createStartingPieces() {
  const pieces: ChessPiece[] = [];

  for (const [index, file] of FILES.entries()) {
    pieces.push({
      id: `white-${BACK_RANK[index]}-${file}1`,
      color: "white",
      kind: BACK_RANK[index],
      square: `${file}1`,
    });
    pieces.push({
      id: `black-${BACK_RANK[index]}-${file}8`,
      color: "black",
      kind: BACK_RANK[index],
      square: `${file}8`,
    });
    pieces.push({
      id: `white-pawn-${file}2`,
      color: "white",
      kind: "pawn",
      square: `${file}2`,
    });
    pieces.push({
      id: `black-pawn-${file}7`,
      color: "black",
      kind: "pawn",
      square: `${file}7`,
    });
  }

  return pieces;
}

function applyMove(pieces: ChessPiece[], move: ChessMove) {
  const nextPieces = pieces.map((piece) => ({ ...piece }));
  const movingPiece = nextPieces.find((piece) => piece.square === move.from);

  if (!movingPiece) {
    return nextPieces;
  }

  const captureSquare = move.captureSquare ?? move.to;
  const captureIndex = nextPieces.findIndex((piece) => piece.square === captureSquare);

  if (captureIndex >= 0 && nextPieces[captureIndex].id !== movingPiece.id) {
    nextPieces.splice(captureIndex, 1);
  }

  movingPiece.square = move.to;

  if (move.promoteTo) {
    movingPiece.kind = move.promoteTo;
  }

  if (move.castle) {
    const rook = nextPieces.find((piece) => piece.square === move.castle?.rookFrom);
    if (rook) {
      rook.square = move.castle.rookTo;
    }
  }

  return nextPieces;
}

export const chessSequences: ChessSequence[] = [
  {
    id: "en-passant",
    title: "En Passant",
    summary: "Replay the special pawn capture that only exists for one turn window.",
    accent: "var(--pg-accent)",
    moves: [
      { label: "1. e4", from: "e2", to: "e4", note: "White advances two squares to contest the center." },
      { label: "... a6", from: "a7", to: "a6", note: "Black makes a quiet move and keeps the file clear." },
      { label: "2. e5", from: "e4", to: "e5", note: "The white pawn steps into the fifth rank." },
      { label: "... d5", from: "d7", to: "d5", note: "Black's double-step creates the en passant window." },
      {
        label: "3. exd6 e.p.",
        from: "e5",
        to: "d6",
        captureSquare: "d5",
        note: "White captures the pawn as if it had only moved one square.",
      },
    ],
  },
  {
    id: "castling",
    title: "Kingside Castling",
    summary: "This sequence shows how the king and rook move together in one legal action.",
    accent: "var(--pg-accent)",
    moves: [
      { label: "1. e4", from: "e2", to: "e4", note: "White opens the diagonal for the bishop." },
      { label: "... e5", from: "e7", to: "e5", note: "Black mirrors the central pawn push." },
      { label: "2. Nf3", from: "g1", to: "f3", note: "The knight develops and clears the castling lane." },
      { label: "... Nc6", from: "b8", to: "c6", note: "Black develops pressure toward the center." },
      { label: "3. Bc4", from: "f1", to: "c4", note: "White clears the final square between king and rook." },
      { label: "... Nf6", from: "g8", to: "f6", note: "Black develops naturally and keeps the structure balanced." },
      {
        label: "4. O-O",
        from: "e1",
        to: "g1",
        castle: {
          rookFrom: "h1",
          rookTo: "f1",
        },
        note: "White castles kingside: the king tucks away and the rook activates.",
      },
    ],
  },
  {
    id: "checkmate",
    title: "Fast Checkmate",
    summary: "A short tactical sequence that finishes with an immediate mate on f7.",
    accent: "var(--pg-accent)",
    moves: [
      { label: "1. e4", from: "e2", to: "e4", note: "White claims central space and opens the queen." },
      { label: "... e5", from: "e7", to: "e5", note: "Black mirrors and keeps the board open." },
      { label: "2. Qh5", from: "d1", to: "h5", note: "The queen eyes the vulnerable f7 square." },
      { label: "... Nc6", from: "b8", to: "c6", note: "Black develops but misses the direct threat." },
      { label: "3. Bc4", from: "f1", to: "c4", note: "The bishop joins the attack on the same target." },
      { label: "... Nf6", from: "g8", to: "f6", note: "Black attacks the queen, but f7 remains exposed." },
      {
        label: "4. Qxf7#",
        from: "h5",
        to: "f7",
        note: "The queen lands on f7 with support from the bishop, ending the game.",
      },
    ],
  },
];

export function buildChessBoardStates(sequence: ChessSequence) {
  const states: ChessBoardState[] = [
    {
      moveIndex: 0,
      pieces: createStartingPieces(),
      note: sequence.summary,
    },
  ];

  let currentPieces = createStartingPieces();

  sequence.moves.forEach((move, index) => {
    currentPieces = applyMove(currentPieces, move);
    states.push({
      moveIndex: index + 1,
      pieces: currentPieces.map((piece) => ({ ...piece })),
      note: move.note,
      lastMove: move,
    });
  });

  return states;
}
