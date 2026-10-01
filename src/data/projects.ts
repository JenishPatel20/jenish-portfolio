export type RoleFilter = "ai-ml" | "full-stack" | "systems" | "mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  roles: RoleFilter[];
  featured?: boolean;
  github?: string;
  demo?: string;
  status: "live" | "wip" | "research";
  year: number;
  highlight?: string;
  // Case study extended fields
  overview?: string;
  approach?: string;
  results?: string;
}

export const projects: Project[] = [
  // ─── FULL STACK ──────────────────────────────────────────────────────────────

  {
    id: "auction-master",
    title: "Auction Master",
    description:
      "Full-stack auction platform with role-based access for admins, customer representatives, and buyers. Features live bidding with reserve-price enforcement, preference-based email alerts, image uploads, and an admin analytics dashboard.",
    tags: ["Node.js", "Express", "MySQL", "Firebase", "JavaScript", "Multer", "Nodemailer", "REST API"],
    roles: ["full-stack"],
    featured: true,
    github: "https://github.com/JenishPatel20/auction_master",
    status: "wip",
    year: 2025,
    highlight: "3-role system · 20+ pages · preference-matched email notifications on new auctions",
    overview:
      "Auction Master is a multi-role web application built from scratch that simulates a real auction marketplace. Three distinct user types — Admin, Customer Representative (CR), and Buyer — each get a separate dashboard and permission set. Buyers browse live auctions, place bids, track their current positions, and manage order history. CRs create and post new auctions with photo uploads and product attributes. Admins oversee everything via audit logs and sales reports.",
    approach:
      "The backend is a Node.js/Express REST API backed by a relational MySQL database with tables for accounts, auctions, products, sub-categories, bids, and user preferences. Firebase handles password reset flow. Multer manages both auction-image and profile-photo uploads to disk. When a new auction is posted, the backend queries the preferences table for users whose saved category and price range match the listing, then fires individual HTML emails via Nodemailer. Bid placement enforces minimum-increment constraints and resolves against a reserve price at auction close. The frontend is a Vanilla JS multi-page application (20+ HTML/CSS/JS files) with a shared header component and a dark/light theme toggle.",
    results:
      "Delivered a fully functional auction platform covering the complete lifecycle: account creation → preference setup → auction posting → live bidding → win/loss resolution → order history. The preference-notification system correctly filters and emails matched users on every new listing. Three separate role flows (admin, CR, buyer) all operate from distinct dashboards.",
  },

  // ─── AI / ML ─────────────────────────────────────────────────────────────────

  {
    id: "edge-ai-benchmark",
    title: "Edge AI LLM Benchmark",
    description:
      "Browser-native LLM benchmarking tool that runs small open-source models entirely via WebGPU — zero server, zero API cost. Measures TTFT, tokens/sec, thermal throttling, and MMLU accuracy, then compares against cloud APIs (Gemini, Claude) on cost and quality.",
    tags: ["WebGPU", "WebLLM", "JavaScript", "Python", "Gemini API", "Anthropic API", "MMLU"],
    roles: ["ai-ml"],
    featured: true,
    github: "https://github.com/Antarathapliyal31/edge-ai-project",
    status: "research",
    year: 2026,
    highlight: "Llama 3.2 1B: 73–172ms TTFT · 48–52 TPS · $0 vs. measurable cloud API cost per 20 queries",
    overview:
      "A research tool that benchmarks small language models running entirely inside the browser using WebGPU acceleration — no backend inference server and no local-model API cost. Models are loaded via @mlc-ai/web-llm and cached in IndexedDB so subsequent runs skip the download. Companion Python scripts benchmark cloud APIs and compare latency, throughput, quality, and per-query cost. Results are exportable as CSV.",
    approach:
      "The web frontend is built in Vanilla JS with ES6 modules. Model cards let users select from Llama 3.2 1B, Qwen 2.5 1.5B, SmolLM2 1.7B, or Llama 3.1 8B (q4f16/q4f32 quantized). Each benchmark run records TTFT and TPS for 20 standardized queries across 8 categories (factual, technical, math, code, etc.). Thermal throttling is detected by comparing the first and last 5 queries. MMLU quality is measured using 57 subjects × 2 questions each, scored against ground-truth answers. The Python scripts (gemini_testing.py, anthropic_testing.py, mmlu_benchmark.py) call the respective APIs with temperature=0 and max_tokens=10 for consistent multiple-choice evaluation. All results are exported to timestamped CSVs from multiple hardware profiles (Windows NVIDIA GPU, Mac M1, Mac M2 Pro).",
    results:
      "Llama 3.2 1B delivered the best edge performance: 73–172ms average TTFT and 48–52 TPS on test hardware, at $0 per run. Qwen 2.5 1.5B and SmolLM2 1.7B followed at 32–39 TPS. Cloud APIs averaged ~300ms TTFT for Gemini 2.5 Flash with measurable per-query cost. Thermal throttling was observable on sustained multi-model runs. Combined benchmark CSVs across 3 hardware profiles enable apples-to-apples device comparison.",
  },

  {
    id: "industrial-anomaly-detection",
    title: "Industrial Fault Detection via SNNs",
    description:
      "Brain-inspired computing research project comparing CNN and Spiking Neural Network architectures for anomaly detection on industrial bearing vibration data (CWRU) and cardiac ECG signals. Implements CNN→SNN weight transfer and surrogate gradient training across 3 architectures × 2 datasets.",
    tags: ["PyTorch", "TensorFlow", "SNN", "CNN", "Python", "Jupyter", "CWRU", "ECG"],
    roles: ["ai-ml"],
    featured: true,
    github: "https://github.com/HerikPatel/Industrial-anomaly-detection",
    status: "research",
    year: 2025,
    highlight: "6 notebooks: CNN→SNN weight transfer + surrogate gradient SNNs on CWRU bearing & MIT-BIH ECG",
    overview:
      "A brain-inspired computing research project investigating whether Spiking Neural Networks (SNNs) — biologically plausible models where neurons communicate via discrete spikes — can match traditional CNNs for industrial anomaly detection. Two real-world datasets are used: the CWRU Bearing dataset (48kHz vibration signals from rotating motors across 10 fault classes: ball, inner race, outer race at three severities, plus normal) and the MIT-BIH / PTBDB ECG Heartbeat dataset for cardiac arrhythmia classification.",
    approach:
      "Three architectures are evaluated across both datasets (6 Jupyter notebooks total). Architecture 1 trains a TensorFlow/Keras CNN on 32×32 windowed signal patches, then transfers its weights into a PyTorch SNN and fine-tunes. Architecture 2 is an Enhanced Deep CNN with regularization, class weighting, early stopping, and LR scheduling — serving as a stronger CNN baseline. Architecture 3 is a pure PyTorch pipeline: a standard ANN is trained first, then a SNN is trained using surrogate gradient methods (approximating the non-differentiable Heaviside spike function) with rate coding for input representation. Raw .mat vibration files are loaded with SciPy and segmented into overlapping 32×32 windows; ECG CSVs are normalized, padded/truncated to equal length, and reshaped to 32×32.",
    results:
      "Architecture 1's CNN→SNN weight transfer showed that pre-trained CNN representations provide a strong initialization for SNNs, reducing training time on both datasets. Architecture 3's surrogate gradient approach enabled direct SNN backpropagation without a CNN intermediary. Architecture 2 (Enhanced CNN) served as the strongest pure-accuracy baseline with early stopping preventing overfitting on the smaller ECG dataset. Full results, methodology, and per-class performance metrics are documented in the included research report.",
  },

  {
    id: "customer-churn",
    title: "Customer Churn Prediction",
    description:
      "Explainable churn prediction pipeline trained on three real-world datasets — Telco (~7K rows), SaaS (~963 rows), and BankChurners (~10K rows). Compares Logistic Regression, Random Forest, and XGBoost with dataset-specific hyperparameter tuning, then explains every prediction via SHAP beeswarm and bar plots.",
    tags: ["Python", "XGBoost", "SHAP", "scikit-learn", "pandas", "RandomizedSearchCV"],
    roles: ["ai-ml"],
    featured: false,
    github: "https://github.com/JenishPatel20/customer-churn-project",
    status: "research",
    year: 2025,
    highlight: "AUC ≥ 0.85 on Telco & BankChurners · SHAP beeswarm + bar plots per dataset per model",
    overview:
      "A multi-dataset churn prediction system that goes beyond a single accuracy number — the goal is to understand which features drive churn at the individual customer level. Three industry datasets are used (telecom, SaaS, banking), each with different class imbalance ratios and feature sets. Three classifiers are compared: Logistic Regression (baseline), Random Forest (900 estimators), and XGBoost (2000 estimators). SHAP (SHapley Additive exPlanations) is applied to every trained model to produce feature importance visualizations that explain predictions, not just make them. Academic project under Prof. Dr. Ruixiang Tang.",
    approach:
      "Each dataset goes through a three-stage CLI pipeline: train (python -m src.train), evaluate (python -m src.eval), and explain (python -m src.explain). Training uses an 80/20 stratified split with class_weight='balanced' for LR and RF, and a computed scale_pos_weight for XGBoost. XGBoost is the only model subjected to RandomizedSearchCV (5-fold stratified CV, roc_auc scoring) with dataset-specific search grids: SaaS uses 120 iterations with a wider grid due to small sample size; Telco and BankChurners use 80 iterations. Evaluation produces ROC curves and confusion matrices. The explain step uses TreeExplainer for tree-based models and LinearExplainer for LR, generating both a mean-|SHAP| bar chart (top 15 features) and a beeswarm plot showing per-customer contribution distributions.",
    results:
      "XGBoost achieved AUC ≥ 0.85 on Telco and BankChurners datasets where strong predictive signals exist (contract type, tenure, transaction patterns). SaaS performance was lower due to its small sample (963 rows) and limited pre-churn behavioral indicators. SHAP analysis revealed that contract type and customer tenure dominate churn risk in telecom, while credit limit utilization and transaction frequency are the strongest signals in banking data.",
  },

  {
    id: "ai-localization",
    title: "Belief-State Robot Localization",
    description:
      "AI research project implementing robot self-localization under uncertainty across 4 phases: optimal BFS over belief-set state space → greedy strategy → CNN regressor trained to predict localization cost → 3-policy comparison. The agent navigates a maze without knowing its position, narrowing a belief set to a single cell.",
    tags: ["Python", "PyTorch", "BFS", "CNN", "NumPy", "matplotlib"],
    roles: ["ai-ml"],
    featured: false,
    github: "https://github.com/JenishPatel20/introtoai2",
    status: "research",
    year: 2025,
    highlight: "CNN regressor (π₁) outperforms greedy baseline (π₀) · dual-policy π₂ evaluated across belief sizes 1–20",
    overview:
      "A 4-phase AI project tackling the fundamental problem of robot localization under uncertainty: an agent moves through a grid maze without knowing its exact position. Instead of a single known position, it maintains a belief set L — the set of all cells where it could possibly be. The agent must take actions to reduce |L| to 1 (localized). This mirrors real-world robotics where sensor noise and map uncertainty mean a robot can only reason probabilistically about its location.",
    approach:
      "Phase 1 formulates localization cost C* as a BFS over the belief-set state space (each node is a frozenset of possible positions), computing the minimum number of moves to localize from any initial belief set. Phase 2 implements a greedy baseline strategy (π₀) that navigates toward dead-end/corner targets, which tend to collapse belief sets faster due to topological constraints. Phase 2 also generates training data. Phase 3 trains a CNN regressor in PyTorch to predict C* from the current belief state, encoded as a 6-channel 2D spatial tensor: one channel for blocked cells, one for the current belief positions, and four directional movement channels. Training uses a LazyBeliefDataset (on-the-fly episode generation) with MSE loss. Phase 4 compares three policies: π₀ (greedy), π₁ (uses the trained Ĉ₀ model to pick moves), and π₂ (dual-CNN: uses Ĉ₁ model guided by π₁), plotting average moves to localize vs. initial belief size |L| from 1 to 20. Two trained model checkpoints are saved: best_c0_model.pt and best_c1_model.pt.",
    results:
      "π₁ (CNN-guided) consistently outperforms π₀ (greedy) across belief sizes, particularly at larger initial uncertainty (|L| > 5). π₂ (dual-CNN) shows further improvement, demonstrating that composing learned cost heuristics reduces localization steps. The comparison plot across belief sizes 1–20 confirms that learned policies better exploit maze topology than pure greedy movement.",
  },

  // ─── MOBILE ───────────────────────────────────────────────────────────────────

  {
    id: "android-photo-manager",
    title: "Android Photo Album Manager",
    description:
      "Native Android photo management app built in Java with 11 Activities covering the complete feature set: create/rename/delete albums, add and tag photos from device storage, search across all albums by Location and Person tags with autocomplete, slideshow view, and on-device serialized persistence.",
    tags: ["Java", "Android SDK", "RecyclerView", "Material Design", "Intents", "Serialization"],
    roles: ["mobile"],
    featured: false,
    status: "live",
    year: 2023,
    highlight: "11 Activities · AND/OR tag search with autocomplete · zero third-party dependencies",
    overview:
      "A full-featured native Android photo album manager that handles the complete lifecycle of organizing a personal photo library on-device. Users create albums, add photos from device storage, assign Location and Person tags to each photo, search across all albums using tag filters, and view photos in a slideshow. All data is persisted locally via Java serialization — no cloud, no backend.",
    approach:
      "Built entirely in Java targeting Android SDK 29 with no third-party libraries beyond the standard AndroidX stack (RecyclerView, Material Design, ConstraintLayout). The app uses explicit Intents with Serializable extras to pass album and photo data between 11 Activities: MainActivity, AlbumViewerActivity, PhotoDisplayActivity, SlideShowActivity, SearchActivity, SearchResultActivity, SearchResultAlbumsActivity, TagManagerActivity, EditTagActivity, EditAlbumActivity, and AddAlbumActivity. The SearchActivity populates AutoCompleteTextView fields by scanning all existing tags across all albums, then filters photos using AND/OR logic on Location and Person tag pairs. File I/O via FileController handles serialization and deserialization of the full album model to internal app storage.",
    results:
      "Delivered a fully functional multi-screen Android app with clean Activity navigation, working tag-based search with live autocomplete, and persistent on-device storage. The app correctly handles edge cases: album renaming with duplicate detection, photo deletion with list re-selection, and tag editing without data loss.",
  },

  // ─── SYSTEMS / ALGORITHMS ────────────────────────────────────────────────────

  {
    id: "chess-engine",
    title: "Java Chess Engine",
    description:
      "Fully playable two-player console chess engine in Java implementing the complete rule set: all 6 piece types with legal move validation, check and checkmate detection, en passant, castling with first-move tracking, pawn promotion to any piece, draw offer, and resign.",
    tags: ["Java", "OOP", "Game Logic", "Algorithms", "2D Arrays"],
    roles: ["systems"],
    featured: false,
    status: "live",
    year: 2023,
    highlight: "Full rule set: en passant · castling · checkmate detection · pawn promotion",
    overview:
      "A complete command-line chess game where two players enter moves in algebraic notation (e.g. 'e2 e4'). The engine validates every move against the full FIDE rule set, renders the board after each turn with rank/file labels, detects check after every move, and terminates on checkmate or resignation. Pawn promotion supports all four target pieces (Queen, Rook, Bishop, Knight). En passant is tracked with a per-turn state flag, and castling respects the firstMove constraint on both King and Rook.",
    approach:
      "The design is a clean OOP hierarchy: an abstract pieces base class defines the contract (isValid, drawPiece, isWhite, firstMove), with six concrete subclasses — Pawn, Knight, Bishop, Rook, Queen, King — each implementing their own movement validation. The 8×8 board is a static pieces[][] array on chessBoard. Check detection scans the full board for any opponent piece whose isValid + isClearPath would reach the King. Checkmate is confirmed when the King has no legal escape that resolves check. En passant is implemented with a coordinate-level state machine that sets capture coordinates on double-pawn advances and validates the capture on the following move. Algebraic input is parsed with StringTokenizer and mapped to array coordinates via file-to-index and rank-to-index conversions.",
    results:
      "Fully playable two-player chess with all standard rules implemented. Check is announced each turn, checkmate terminates the game with a winner declaration, and all special moves (en passant, castling, promotion) function correctly. The OOP piece hierarchy keeps movement logic encapsulated per-piece and extensible.",
  },
];
